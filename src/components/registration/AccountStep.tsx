"use client";

import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import OtpBoxes from "./OtpBoxes";
import { OtpRegService } from "@/lib/otpRegService";
import { useState } from "react";

const countries = [
    { name: "AF", code: "+93" },
    { name: "AL", code: "+355" },
    { name: "DZ", code: "+213" },
    { name: "AD", code: "+376" },
    { name: "AO", code: "+244" },
    { name: "AR", code: "+54" },
    { name: "AM", code: "+374" },
    { name: "AU", code: "+61" },
    { name: "AT", code: "+43" },
    { name: "AZ", code: "+994" },
    { name: "BH", code: "+973" },
    { name: "BD", code: "+880" },
    { name: "BY", code: "+375" },
    { name: "BE", code: "+32" },
    { name: "BR", code: "+55" },
    { name: "BG", code: "+359" },
    { name: "CA", code: "+1" },
    { name: "CL", code: "+56" },
    { name: "CN", code: "+86" },
    { name: "CO", code: "+57" },
    { name: "CR", code: "+506" },
    { name: "HR", code: "+385" },
    { name: "CY", code: "+357" },
    { name: "CZ", code: "+420" },
    { name: "DK", code: "+45" },
    { name: "EG", code: "+20" },
    { name: "EE", code: "+372" },
    { name: "FI", code: "+358" },
    { name: "FR", code: "+33" },
    { name: "GE", code: "+995" },
    { name: "DE", code: "+49" },
    { name: "GR", code: "+30" },
    { name: "HK", code: "+852" },
    { name: "HU", code: "+36" },
    { name: "IS", code: "+354" },
    { name: "IN", code: "+91" },
    { name: "ID", code: "+62" },
    { name: "IR", code: "+98" },
    { name: "IQ", code: "+964" },
    { name: "IE", code: "+353" },
    { name: "IL", code: "+972" },
    { name: "IT", code: "+39" },
    { name: "JP", code: "+81" },
    { name: "JO", code: "+962" },
    { name: "KZ", code: "+7" },
    { name: "KE", code: "+254" },
    { name: "KW", code: "+965" },
    { name: "LV", code: "+371" },
    { name: "LB", code: "+961" },
    { name: "LT", code: "+370" },
    { name: "LU", code: "+352" },
    { name: "MY", code: "+60" },
    { name: "MT", code: "+356" }, // Malta default
    { name: "MX", code: "+52" },
    { name: "MA", code: "+212" },
    { name: "NL", code: "+31" },
    { name: "NZ", code: "+64" },
    { name: "NG", code: "+234" },
    { name: "NO", code: "+47" },
    { name: "PK", code: "+92" },
    { name: "PH", code: "+63" },
    { name: "PL", code: "+48" },
    { name: "PT", code: "+351" },
    { name: "QA", code: "+974" },
    { name: "RO", code: "+40" },
    { name: "RU", code: "+7" },
    { name: "SA", code: "+966" },
    { name: "SG", code: "+65" },
    { name: "SK", code: "+421" },
    { name: "SI", code: "+386" },
    { name: "ZA", code: "+27" },
    { name: "KR", code: "+82" },
    { name: "ES", code: "+34" },
    { name: "LK", code: "+94" },
    { name: "SE", code: "+46" },
    { name: "CH", code: "+41" },
    { name: "TH", code: "+66" },
    { name: "TR", code: "+90" },
    { name: "AE", code: "+971" },
    { name: "GB", code: "+44" },
    { name: "US", code: "+1" },
    { name: "UA", code: "+380" },
    { name: "VN", code: "+84" },
];


export default function AccountStep({
    form,
    setForm,
    showOtp,
    setShowOtp,
    selectedCountry,
    setSelectedCountry,
    countryOpen,
    setCountryOpen,
    onContinue,
    verified,
    setVerified,
    onSendOtp, // (type: 'email' | 'whatsapp') => Promise<void>
    onVerifyOtp, // (type: 'email' | 'whatsapp', code: string) => void
}: any) {
    const [loading, setLoading] = useState({
        email: false,
        whatsapp: false
    });

    const handleSendEmail = async () => {
        if (!form.email) {
            alert("Please enter an email address");
            return;
        }
        setLoading(prev => ({ ...prev, email: true }));
        await onSendOtp('email');
        setLoading(prev => ({ ...prev, email: false }));
    };

    const handleSendWhatsapp = async () => {
        if (!form.whatsapp) {
            alert("Please enter a WhatsApp number");
            return;
        }
        setLoading(prev => ({ ...prev, whatsapp: true }));
        await onSendOtp('whatsapp');
        setLoading(prev => ({ ...prev, whatsapp: false }));
    };

    const isStepValid = form.firstName && form.lastName && verified.email && verified.whatsapp;

    return (
        <div className="space-y-4">

            {/* First + Last */}
            <div className="flex gap-3">
                <input
                    placeholder="First name"
                    className="flex-1 p-3 rounded-lg border border-[var(--border-muted)] outline-none focus:border-black"
                    value={form.firstName}
                    onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                    }
                />
                <input
                    placeholder="Last name"
                    className="flex-1 p-3 rounded-lg border border-[var(--border-muted)] outline-none focus:border-black"
                    value={form.lastName}
                    onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                    }
                />
            </div>

            {/* Email */}
            <div>
                <div className="flex gap-2">
                    <input
                        placeholder="Email address"
                        type="email"
                        className="flex-1 p-3 rounded-lg border border-[var(--border-muted)] outline-none focus:border-black"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />
                    {
                        verified.email ? (
                            <span className="px-4 flex items-center text-green-600 text-sm font-medium">
                                Verified
                            </span>

                        ) :
                            (
                                <button
                                    type="button"
                                    onClick={handleSendEmail}
                                    disabled={loading.email}
                                    className={`cursor-pointer px-6 bg-[var(--primary)] text-white rounded-lg transition-opacity ${loading.email ? 'opacity-50' : ''}`}
                                >
                                    {loading.email ? "Sending..." : "Verify"}
                                </button>
                            )
                    }

                </div>

                {showOtp.email && !verified.email && (
                    <OtpBoxes 
                        label="email" 
                        onComplete={(code) => onVerifyOtp('email', code)}
                        onResend={handleSendEmail}
                        isLoading={loading.email}
                    />
                )}
            </div>

            {/* WhatsApp */}
            <div>
                <div className="flex gap-2">

                    {/* Country */}
                    <div className="relative w-[110px]">
                        <button
                            type="button"
                            onClick={() => setCountryOpen(!countryOpen)}
                            className="w-full h-[50px] px-2 border border-[var(--border-muted)] outline-none focus:border-black rounded-lg flex justify-between items-center bg-white"
                        >
                            <span className="text-xs">{selectedCountry.name}</span>
                            <span className="text-sm font-medium">{selectedCountry.code}</span>
                            {countryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {countryOpen && (
                            <div className="absolute bg-white mt-1 rounded-lg border border-[var(--border-muted)] max-h-40 overflow-y-auto w-full z-10 shadow-lg">
                                {countries.map((c) => (
                                    <div
                                        key={c.name}
                                        onClick={() => {
                                            setSelectedCountry(c);
                                            setCountryOpen(false);
                                        }}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                    >
                                        <span className="text-[11px] font-medium">{c.name}</span>
                                        <span className="text-sm font-medium">
                                            {c.code}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <input
                        placeholder="WhatsApp number"
                        type="tel"
                        className="flex-1 p-3 rounded-lg border border-[var(--border-muted)] outline-none focus:border-black"
                        value={form.whatsapp}
                        onChange={(e) =>
                            setForm({ ...form, whatsapp: e.target.value })
                        }
                    />

                    {
                        verified.whatsapp ? (
                            <span className="px-4 flex items-center text-green-600 text-sm font-medium">
                                Verified
                            </span>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSendWhatsapp}
                                disabled={loading.whatsapp}
                                className={`cursor-pointer px-6 bg-[var(--primary)] text-white rounded-lg transition-opacity ${loading.whatsapp ? 'opacity-50' : ''}`}
                            >
                                {loading.whatsapp ? "Sending..." : "Verify"}
                            </button>
                        )
                    }

                </div>
                {showOtp.whatsapp && !verified.whatsapp && (
                    <OtpBoxes 
                        label="WhatsApp" 
                        onComplete={(code) => onVerifyOtp('whatsapp', code)}
                        onResend={handleSendWhatsapp}
                        isLoading={loading.whatsapp}
                    />
                )}
            </div>

            {/* Continue */}
            <button
                type="button"
                onClick={onContinue}
                disabled={!isStepValid}
                className={`cursor-pointer w-full py-3 bg-[var(--primary)] text-white rounded-lg flex justify-center items-center gap-3 transition-opacity ${!isStepValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <span>
                    Register & Continue
                </span>
                <ArrowRight size={19} />
            </button>
        </div>
    );
}