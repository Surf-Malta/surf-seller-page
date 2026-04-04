"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle, X } from "lucide-react";
import AccountStep from "./AccountStep";
import BusinessDetailsStep from "./BusinessDetailsStep";
import { OtpRegService } from "@/lib/otpRegService";
import { ref, push, set } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";

export default function SignupModal({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState<1 | 2>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        businessName: "",
        email: "",
        whatsapp: "",
    });

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [customCategory, setCustomCategory] = useState("");

    const [countryOpen, setCountryOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({
        name: "MT",
        code: "+356",
    });

    const [showOtp, setShowOtp] = useState({
        email: false,
        whatsapp: false,
    });
    
    const [verified, setVerified] = useState({
        email: false,
        whatsapp: false,
    });

    // Store the expected OTPs (returned by API)
    const [expectedOtp, setExpectedOtp] = useState<{
        email: string | null;
        whatsapp: string | null;
    }>({
        email: null,
        whatsapp: null,
    });

    const handleSendOtp = async (type: 'email' | 'whatsapp') => {
        let result;
        if (type === 'email') {
            result = await OtpRegService.sendEmailOtp(form.email);
        } else {
            // Combine country code and number
            const fullPhone = selectedCountry.code + form.whatsapp;
            result = await OtpRegService.sendWhatsAppOtp(fullPhone);
        }

        if (result.success && result.otp) {
            setExpectedOtp(prev => ({
                ...prev,
                [type]: result.otp?.toString()
            }));
            setShowOtp(prev => ({
                ...prev,
                [type]: true
            }));
        } else {
            alert(result.error || `Failed to send ${type} OTP`);
        }
    };

    const handleVerifyOtp = (type: 'email' | 'whatsapp', code: string) => {
        if (code === expectedOtp[type]) {
            setVerified(prev => ({
                ...prev,
                [type]: true
            }));
            setShowOtp(prev => ({
                ...prev,
                [type]: false
            }));
        } else {
            alert("Invalid OTP code. Please try again.");
        }
    };

    const handleSignup = async () => {
        if (!realtimeDb) {
            alert("Database connection error. Please try again later.");
            return;
        }

        setIsSubmitting(true);
        try {
            const sellersRef = ref(realtimeDb, "sellers");
            const newSellerRef = push(sellersRef);

            const sellerData = {
                id: newSellerRef.key,
                firstName: form.firstName,
                lastName: form.lastName,
                businessName: form.businessName,
                email: form.email.toLowerCase().trim(),
                phoneNumber: selectedCountry.code + form.whatsapp,
                country: selectedCountry.name,
                categories: selectedCategories,
                status: "pending",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                emailVerified: true,
                whatsappVerified: true,
                source: "new_registration_flow"
            };

            await set(newSellerRef, sellerData);
            setIsSuccess(true);
            
            // Optional: close modal after delay or show success message
            setTimeout(() => {
                onClose();
            }, 3000);

        } catch (error: any) {
            console.error("Signup error:", error);
            alert("Failed to complete registration. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
                <div className="bg-white w-full max-w-xl rounded-2xl py-16 px-12 relative shadow-xl text-center">
                    <div className="flex justify-center mb-6">
                        <CheckCircle size={80} className="text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-[var(--heading-color)] mb-4">
                        Registration Successful!
                    </h2>
                    <p className="text-[var(--text-muted)] text-lg">
                        Thank you for joining Surf. Your account is now pending approval.
                    </p>
                    <button 
                        onClick={onClose}
                        className="mt-8 px-8 py-3 bg-[var(--primary)] text-white rounded-lg font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-xl min-h-[500px] rounded-2xl py-12 px-12 relative shadow-xl">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 border border-[var(--border-muted)] rounded-full p-1 hover:bg-gray-100"
                >
                    <X size={18} />
                </button>

                {/* Title */}
                <h2 className="text-3xl font-bold text-center px-12 pb-3 text-[var(--heading-color)]">
                    Sign up and grow your business with Surf🚀
                </h2>

                <div className="flex items-center justify-between pb-5">

                    {/* Left (fixed width) */}
                    <div className="w-[80px]">
                        {step === 2 && (
                            <button
                                onClick={() => setStep(1)}
                                className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--primary)]"
                            >
                                <ArrowLeft size={16} />
                            </button>
                        )}
                    </div>

                    {/* Center (always centered) */}
                    <div className="flex items-center gap-2 text-sm justify-center flex-1">
                        <span className={step === 1 ? "text-[var(--primary)] font-medium" : "text-[var(--text-muted)]"}>
                            Account
                        </span>
                        <span className="text-[var(--text-muted)]">/</span>
                        <span className={step === 2 ? "text-[var(--primary)] font-medium" : "text-[var(--text-muted)]"}>
                            Business
                        </span>
                    </div>

                    {/* Right (same width as left) */}
                    <div className="w-[80px]" />
                </div>

                {step === 1 && (
                    <AccountStep
                        form={form}
                        setForm={setForm}
                        showOtp={showOtp}
                        setShowOtp={setShowOtp}
                        selectedCountry={selectedCountry}
                        setSelectedCountry={setSelectedCountry}
                        countryOpen={countryOpen}
                        setCountryOpen={setCountryOpen}
                        onContinue={() => setStep(2)}
                        verified={verified}
                        setVerified={setVerified}
                        onSendOtp={handleSendOtp}
                        onVerifyOtp={handleVerifyOtp}
                    />
                )}

                {step === 2 && (
                    <BusinessDetailsStep
                        form={form}
                        setForm={setForm}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        categoryOpen={categoryOpen}
                        setCategoryOpen={setCategoryOpen}
                        customCategory={customCategory}
                        setCustomCategory={setCustomCategory}
                        selectedCountry={selectedCountry}
                        onSubmit={handleSignup}
                        isLoading={isSubmitting}
                    />
                )}
            </div>
        </div>
    );
}