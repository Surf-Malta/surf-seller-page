"use client";

import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import AccountStep from "./AccountStep";
import BusinessDetailsStep from "./BusinessDetailsStep";

export default function SignupModal({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState<1 | 2>(1);

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
                    />
                )}
            </div>
        </div>
    );
}