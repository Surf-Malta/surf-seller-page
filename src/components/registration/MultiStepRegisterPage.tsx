"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ref, push, set } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";
import { OTPService } from "@/lib/otpService";

interface RegistrationData {
  // Step 1 - Business Information
  businessName: string;
  vatType: "individual" | "business";
  vatNumber?: string;
  hearAboutSurf: string;

  // Step 2 - Contact & Pickup Address
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  pincode: string;
  country: string;

  // Step 3 - Shipping Preferences
  shippingMethod: "own" | "integrated";
  shippingType?: "fixed_rate" | "free_delivery";
  deliveryTime?: "1-2_days" | "2-3_days" | "3-4_days";

  // Step 4 - Visibility & Ads
  showAdsOnWebsite: boolean;
}

export default function MultiStepRegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpSessionId, setOtpSessionId] = useState<string>("");
  const [otpCode, setOtpCode] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const [formData, setFormData] = useState<RegistrationData>({
    businessName: "",
    vatType: "individual",
    vatNumber: "",
    hearAboutSurf: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    pincode: "",
    country: "Malta",
    shippingMethod: "integrated",
    shippingType: "fixed_rate",
    deliveryTime: "2-3_days",
    showAdsOnWebsite: true,
  });

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof RegistrationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Reset OTP state if email changes
    if (field === "email") {
      setOtpSent(false);
      setOtpVerified(false);
      setOtpCode("");
      setOtpError("");
      setOtpSessionId("");
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSendOTP = async () => {
    if (!formData.email.trim()) {
      setOtpError("Please enter your email address");
      return;
    }

    setSendingOtp(true);
    setOtpError("");

    try {
      const result = await OTPService.sendOTP(formData.email);

      if (result.success && result.sessionId) {
        setOtpSent(true);
        setOtpSessionId(result.sessionId);
        setOtpError("");
      } else {
        setOtpError(result.error || "Failed to send OTP");
      }
    } catch (error) {
      setOtpError("Failed to send OTP. Please try again.");
      console.error("OTP send error:", error);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otpCode.trim()) {
      setOtpError("Please enter the OTP code");
      return;
    }

    if (otpCode.length !== 6) {
      setOtpError("OTP must be 6 digits");
      return;
    }

    setVerifyingOtp(true);
    setOtpError("");

    try {
      const result = await OTPService.verifyOTP(formData.email, otpCode);

      if (result.success) {
        setOtpVerified(true);
        setOtpError("");
      } else {
        setOtpError(result.error || "Invalid OTP");
      }
    } catch (error) {
      setOtpError("Failed to verify OTP. Please try again.");
      console.error("OTP verify error:", error);
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!realtimeDb) {
        throw new Error("Firebase not initialized");
      }

      // Final check if email is verified
      const isVerified = await OTPService.isEmailVerified(formData.email);
      if (!isVerified) {
        throw new Error("Email not verified. Please verify your email first.");
      }

      const sellersRef = ref(realtimeDb, "sellers");
      const newSellerRef = push(sellersRef);

      const sellerData = {
        ...formData,
        id: newSellerRef.key,
        status: "pending",
        emailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await set(newSellerRef, sellerData);

      // Clean up OTP after successful registration
      await OTPService.cleanupOTP(formData.email);

      setRegistrationComplete(true);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.businessName.trim() &&
          formData.hearAboutSurf &&
          (formData.vatType === "individual" ||
            (formData.vatType === "business" && formData.vatNumber?.trim()))
        );
      case 2:
        return (
          formData.firstName.trim() &&
          formData.lastName.trim() &&
          formData.email.trim() &&
          formData.phoneNumber.trim() &&
          formData.address.trim() &&
          formData.city.trim() &&
          formData.pincode.trim() &&
          otpVerified // Email must be verified
        );
      case 3:
        return formData.shippingMethod;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const stepTitles = {
    1: "Business Information",
    2: "Contact & Pickup Address",
    3: "Shipping Preferences",
    4: "Visibility & Ads",
  };

  // Show success page after registration
  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 lg:pt-24">
        <Container>
          <div className="max-w-4xl mx-auto py-16">
            <div className="text-center">
              <div className="ecommerce-card p-12 animate-scale-in">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-8 flex items-center justify-center text-white text-4xl">
                  ✅
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  <span className="gradient-text-ecommerce">
                    Registration Successful!
                  </span>
                </h1>

                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Thank you for joining Surf! Your business "
                  {formData.businessName}" has been submitted for review.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                  <div className="flex items-start">
                    <svg
                      className="w-6 h-6 text-blue-600 mt-1 mr-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">
                        What happens next?
                      </h3>
                      <ul className="text-blue-700 space-y-2">
                        <li>
                          📧 You'll receive a confirmation email within 24 hours
                        </li>
                        <li>
                          🔍 Our team will review your application (usually
                          takes 1-2 business days)
                        </li>
                        <li>
                          🚀 Once approved, you'll get access to the vendor
                          panel to start selling
                        </li>
                        <li>
                          💬 Our support team will contact you with next steps
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <button className="btn-ecommerce-primary">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      Back to Home
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 lg:pt-24">
      <Container>
        <div className="max-w-6xl mx-auto py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg mb-6">
              <span className="bg-green-500 w-3 h-3 rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">
                🚀 FREE to Start • No Hidden Fees
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="gradient-text-ecommerce">Join Surf</span>
              <br />
              <span className="text-gray-800">Start Selling Today</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect with thousands of customers in Malta and beyond. No setup
              fees, just simple commission-based pricing.
            </p>
          </div>

          {/* Progress Header */}
          <div className="mb-12">
            <div className="ecommerce-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Step {currentStep}: {stepTitles[currentStep]}
                </h2>
                <div className="text-sm font-medium text-gray-600">
                  {Math.round(progressPercentage)}% Complete
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>Business Info</span>
                <span>Contact Details</span>
                <span>Shipping</span>
                <span>Launch!</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Section - Info */}
            <div className="space-y-8">
              {currentStep === 1 && (
                <div className="ecommerce-card p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    🏢 Tell Us About Your Business
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Help us understand your business better so we can provide
                    the best selling experience.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Malta-Based Platform
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Designed specifically for Malta businesses
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          VAT Compliant
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Full Malta VAT compliance support
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="ecommerce-card p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    📞 Contact & Address Details
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    We need your contact details for account verification and
                    order management.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 text-yellow-600 mt-0.5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <h4 className="font-semibold text-yellow-800">
                          Email Verification Required
                        </h4>
                        <p className="text-yellow-700 text-sm mt-1">
                          Your email will be verified with a secure OTP for
                          account security.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="ecommerce-card p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    🚚 Smart Shipping Setup
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Choose your preferred shipping method to ensure smooth
                    deliveries to your customers.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        💡 Pro Tip
                      </h4>
                      <p className="text-blue-700 text-sm">
                        Our integrated shipping partners offer competitive rates
                        and reliable service across Malta and internationally.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="ecommerce-card p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    📈 Boost Your Visibility
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Increase your product visibility and reach more customers
                    with our advertising options.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        3x
                      </div>
                      <p className="text-green-800 font-semibold">
                        Higher visibility with sponsored listings
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Section - Form */}
            <div className="ecommerce-card p-10">
              {/* Step 1 Form - Business Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) =>
                        updateFormData("businessName", e.target.value)
                      }
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your business name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      VAT Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => updateFormData("vatType", "individual")}
                        className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                          formData.vatType === "individual"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">👤</div>
                          <div className="font-medium">Individual</div>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateFormData("vatType", "business")}
                        className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                          formData.vatType === "business"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">🏢</div>
                          <div className="font-medium">Business</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {formData.vatType === "business" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        VAT Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.vatNumber || ""}
                        onChange={(e) =>
                          updateFormData("vatNumber", e.target.value)
                        }
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter VAT number"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      How did you hear about Surf?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.hearAboutSurf}
                      onChange={(e) =>
                        updateFormData("hearAboutSurf", e.target.value)
                      }
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select an option</option>
                      <option value="google_search">Google Search</option>
                      <option value="social_media">Social Media</option>
                      <option value="friend_referral">Friend Referral</option>
                      <option value="online_ad">Online Advertisement</option>
                      <option value="local_news">Local News/Media</option>
                      <option value="business_network">Business Network</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2 Form - Contact & Pickup Address with OTP */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          updateFormData("firstName", e.target.value)
                        }
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          updateFormData("lastName", e.target.value)
                        }
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  {/* Email with OTP Verification */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email ID <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            updateFormData("email", e.target.value)
                          }
                          className="flex-1 px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your email"
                          disabled={otpVerified}
                        />
                        <button
                          type="button"
                          onClick={handleSendOTP}
                          disabled={
                            !formData.email ||
                            otpSent ||
                            sendingOtp ||
                            otpVerified
                          }
                          className={`px-6 py-4 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                            otpVerified
                              ? "bg-green-100 text-green-700 border-2 border-green-200"
                              : otpSent
                              ? "bg-blue-100 text-blue-700 border-2 border-blue-200"
                              : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                          }`}
                        >
                          {sendingOtp ? (
                            <span className="flex items-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Sending...
                            </span>
                          ) : otpVerified ? (
                            "✓ Verified"
                          ) : otpSent ? (
                            "OTP Sent"
                          ) : (
                            "Send OTP"
                          )}
                        </button>
                      </div>

                      {/* OTP Input Field */}
                      {otpSent && !otpVerified && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <div className="flex items-center mb-3">
                            <svg
                              className="w-5 h-5 text-blue-600 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="text-blue-800 font-medium">
                              Enter the 6-digit code sent to your email
                            </span>
                          </div>

                          <div className="flex gap-3">
                            <input
                              type="text"
                              value={otpCode}
                              onChange={(e) => {
                                const value = e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 6);
                                setOtpCode(value);
                                setOtpError("");
                              }}
                              className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-mono text-lg tracking-widest"
                              placeholder="000000"
                              maxLength={6}
                            />
                            <button
                              type="button"
                              onClick={handleVerifyOTP}
                              disabled={otpCode.length !== 6 || verifyingOtp}
                              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-all duration-200"
                            >
                              {verifyingOtp ? (
                                <span className="flex items-center">
                                  <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Verifying...
                                </span>
                              ) : (
                                "Verify"
                              )}
                            </button>
                          </div>

                          <div className="flex justify-between items-center mt-3">
                            <span className="text-blue-700 text-sm">
                              Didn't receive the code?
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setOtpSent(false);
                                setOtpCode("");
                                setOtpError("");
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Resend OTP
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Verification Success */}
                      {otpVerified && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <div className="flex items-center">
                            <svg
                              className="w-5 h-5 text-green-600 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-800 font-medium">
                              ✓ Email verified successfully!
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Error Display */}
                      {otpError && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                          <div className="flex items-center">
                            <svg
                              className="w-5 h-5 text-red-600 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-red-800 text-sm">
                              {otpError}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        updateFormData("phoneNumber", e.target.value)
                      }
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Pickup Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        updateFormData("address", e.target.value)
                      }
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter address"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) =>
                          updateFormData("pincode", e.target.value)
                        }
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Pincode"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) =>
                          updateFormData("country", e.target.value)
                        }
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="Malta">Malta</option>
                        <option value="Italy">Italy</option>
                        <option value="Sicily">Sicily</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 Form - Shipping Preferences */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div
                      className={`border-2 rounded-xl p-6 transition-all duration-200 cursor-pointer ${
                        formData.shippingMethod === "own"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => updateFormData("shippingMethod", "own")}
                    >
                      <div className="flex items-start space-x-4">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="own"
                          checked={formData.shippingMethod === "own"}
                          onChange={() =>
                            updateFormData("shippingMethod", "own")
                          }
                          className="mt-2 w-5 h-5 text-blue-600"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            📦 Own Shipping
                          </h3>
                          <p className="text-gray-600 mb-3">
                            Handle shipping yourself with your preferred
                            logistics partner
                          </p>
                          <div className="text-sm text-blue-600 font-medium">
                            ✨ More control over delivery experience
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`border-2 rounded-xl p-6 transition-all duration-200 cursor-pointer ${
                        formData.shippingMethod === "integrated"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() =>
                        updateFormData("shippingMethod", "integrated")
                      }
                    >
                      <div className="flex items-start space-x-4">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="integrated"
                          checked={formData.shippingMethod === "integrated"}
                          onChange={() =>
                            updateFormData("shippingMethod", "integrated")
                          }
                          className="mt-2 w-5 h-5 text-blue-600"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            🤝 Use Integrated Local Shipping Partner
                          </h3>
                          <p className="text-gray-600 mb-3">
                            Let us handle shipping with our verified local
                            partners
                          </p>
                          <div className="text-sm text-green-600 font-medium">
                            ✨ Most popular choice among successful sellers
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {formData.shippingMethod === "integrated" && (
                    <div className="space-y-6 bg-blue-50 p-6 rounded-xl">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Shipping Type
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() =>
                              updateFormData("shippingType", "fixed_rate")
                            }
                            className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                              formData.shippingType === "fixed_rate"
                                ? "border-blue-500 bg-white text-blue-700"
                                : "border-gray-200 hover:border-blue-300 bg-white"
                            }`}
                          >
                            <div className="font-medium">Fixed Rate</div>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateFormData("shippingType", "free_delivery")
                            }
                            className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                              formData.shippingType === "free_delivery"
                                ? "border-blue-500 bg-white text-blue-700"
                                : "border-gray-200 hover:border-blue-300 bg-white"
                            }`}
                          >
                            <div className="font-medium">Free Delivery</div>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Delivery Time Preference
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: "1-2_days", label: "1–2 days" },
                            { value: "2-3_days", label: "2–3 days" },
                            { value: "3-4_days", label: "3–4 days" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                updateFormData(
                                  "deliveryTime",
                                  option.value as any
                                )
                              }
                              className={`p-3 border-2 rounded-xl transition-all duration-200 ${
                                formData.deliveryTime === option.value
                                  ? "border-blue-500 bg-white text-blue-700"
                                  : "border-gray-200 hover:border-blue-300 bg-white"
                              }`}
                            >
                              <div className="font-medium text-sm">
                                {option.label}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4 Form - Visibility & Ads */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">
                      Want more visibility?
                    </h3>

                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-purple-200">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Show ads on website
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Increase your product visibility with sponsored
                          listings
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          checked={formData.showAdsOnWebsite}
                          onChange={(e) =>
                            updateFormData("showAdsOnWebsite", e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    {formData.showAdsOnWebsite && (
                      <div className="mt-4 p-4 bg-purple-100 rounded-lg">
                        <div className="flex items-center text-purple-800">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm font-medium">
                            Great choice! Your products will get priority
                            placement in search results.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="font-bold text-green-800 mb-2">
                      🎯 Ready to Launch!
                    </h4>
                    <p className="text-green-700 text-sm">
                      You're all set! Click submit to complete your registration
                      and start your selling journey with Surf.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
                {currentStep > 1 ? (
                  <button
                    onClick={prevStep}
                    className="btn-ecommerce-secondary px-8 py-3"
                  >
                    ← Previous
                  </button>
                ) : (
                  <div></div>
                )}

                <div className="flex space-x-4">
                  {currentStep < totalSteps ? (
                    <button
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className="btn-ecommerce-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!isStepValid() || loading}
                      className="btn-ecommerce-success px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting Registration...
                        </span>
                      ) : (
                        "🚀 Submit Registration!"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
