// src/components/registration/MultiStepRegisterPage.tsx
"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ref,
  push,
  set,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";
import { realtimeDb } from "@/lib/firebase";
import { OTPService } from "@/lib/otpService";
import { VATService, VATVerificationResult } from "@/lib/vatService";

interface RegistrationData {
  // Step 1 - Business Information
  businessName: string;
  vatType: "individual" | "business";
  vatNumber: string;

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
  hearAboutSurf: string;
}

export default function MultiStepRegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  // Email duplicate check states
  const [emailCheckLoading, setEmailCheckLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [emailCheckError, setEmailCheckError] = useState("");
  const [emailCheckComplete, setEmailCheckComplete] = useState(false); // NEW STATE

  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otpSessionId, setOtpSessionId] = useState<string>("");
  const [otpCode, setOtpCode] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [canResend, setCanResend] = useState(true);

  // VAT Verification States
  const [vatVerifying, setVatVerifying] = useState(false);
  const [vatVerified, setVatVerified] = useState(false);
  const [vatError, setVatError] = useState("");
  const [vatCompanyInfo, setVatCompanyInfo] = useState<{
    name?: string;
    address?: string;
  }>({});

  const [formData, setFormData] = useState<RegistrationData>({
    businessName: "",
    vatType: "individual",
    vatNumber: "",
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
    hearAboutSurf: "",
  });

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Countdown effect for resend button
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendCooldown]);

  // UPDATED: Check if email already exists in database
  const checkEmailExists = async (email: string): Promise<boolean> => {
    if (!realtimeDb || !email.trim()) {
      setEmailCheckComplete(false);
      return false;
    }

    try {
      setEmailCheckLoading(true);
      setEmailCheckError("");
      setEmailCheckComplete(false); // Reset completion state

      // Query the sellers collection for existing email
      // Note: Check both 'email' and 'address' fields for backward compatibility
      const sellersRef = ref(realtimeDb, "sellers");

      // First check the new 'email' field
      const emailQuery = query(
        sellersRef,
        orderByChild("email"),
        equalTo(email.toLowerCase().trim())
      );

      // Also check the legacy 'address' field
      const addressQuery = query(
        sellersRef,
        orderByChild("address"),
        equalTo(email.toLowerCase().trim())
      );
      const snapshot = await get(emailQuery);
      const addressSnapshot = await get(addressQuery);

      const exists = snapshot.exists() || addressSnapshot.exists();
      setEmailExists(exists);
      setEmailCheckComplete(true); // Mark check as complete

      if (exists) {
        setEmailCheckError(
          "An account with this email already exists. Please use a different email or login if you already have an account."
        );
      }

      return exists;
    } catch (error) {
      console.error("Error checking email:", error);
      setEmailCheckError("Unable to verify email. Please try again.");
      setEmailCheckComplete(false); // Mark as incomplete on error
      return false;
    } finally {
      setEmailCheckLoading(false);
    }
  };

  // UPDATED: Form data update handler
  const updateFormData = (field: keyof RegistrationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Reset email-related states when email changes
    if (field === "email") {
      setOtpSent(false);
      setOtpVerified(false);
      setOtpCode("");
      setOtpError("");
      setOtpSessionId("");
      setResendCooldown(0);
      setCanResend(true);
      setEmailExists(false);
      setEmailCheckError("");
      setEmailCheckComplete(false); // Reset completion state

      // Check email after a short delay (debounce)
      if (value && value.trim()) {
        const timeoutId = setTimeout(() => {
          checkEmailExists(value.trim());
        }, 500);

        // Clear previous timeout
        return () => clearTimeout(timeoutId);
      }
    }

    // Reset VAT verification when VAT type changes
    if (field === "vatType") {
      setVatVerified(false);
      setVatError("");
      setVatCompanyInfo({});
      setFormData((prev) => ({ ...prev, vatNumber: "" }));
    }

    // Reset VAT verification when VAT number changes for business
    if (field === "vatNumber" && formData.vatType === "business") {
      setVatVerified(false);
      setVatError("");
      setVatCompanyInfo({});
    }

    // Reset shipping type when switching to integrated logistics
    if (field === "shippingMethod" && value === "integrated") {
      setFormData((prev) => ({
        ...prev,
        shippingType: undefined,
        deliveryTime: undefined,
      }));
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

  // VAT Verification Handler
  const handleVerifyVAT = async () => {
    if (!formData.vatNumber.trim()) {
      setVatError("Please enter your VAT number");
      return;
    }

    if (!VATService.validateMaltaVATFormat(formData.vatNumber)) {
      setVatError("Invalid Malta VAT format. Must be MT followed by 8 digits.");
      return;
    }

    setVatVerifying(true);
    setVatError("");

    try {
      const result = await VATService.verifyVAT(formData.vatNumber);

      if (result.success && result.valid) {
        setVatVerified(true);
        setVatCompanyInfo({
          name: result.companyName,
          address: result.companyAddress,
        });
        setVatError("");

        // Auto-fill business name if available and not already filled
        if (result.companyName && !formData.businessName.trim()) {
          updateFormData("businessName", result.companyName);
        }
      } else if (result.success && result.valid === false) {
        setVatVerified(false);
        setVatError(
          "This VAT number is not valid or not found in the EU VIES database. Please check the number and try again."
        );
      } else {
        setVatVerified(false);
        setVatError(
          result.error || "VAT verification failed. Please try again."
        );
      }
    } catch (error) {
      setVatVerified(false);
      setVatError("Failed to verify VAT number. Please try again.");
      console.error("VAT verification error:", error);
    } finally {
      setVatVerifying(false);
    }
  };

  // UPDATED: Enhanced OTP sending with proper email validation
  const handleSendOTP = async () => {
    if (!formData.email.trim()) {
      setOtpError("Please enter your email address");
      return;
    }

    // If email check is still loading, wait for it to complete
    if (emailCheckLoading) {
      setOtpError("Please wait for email validation to complete");
      return;
    }

    // If email check hasn't been completed yet, trigger it and wait
    if (!emailCheckComplete) {
      setOtpError("Please wait while we validate your email");
      const emailAlreadyExists = await checkEmailExists(formData.email.trim());
      if (emailAlreadyExists) {
        setOtpError(
          "This email is already registered. Please use a different email."
        );
        return;
      }
    }

    // Double-check email existence before proceeding
    if (emailExists) {
      setOtpError(
        "This email is already registered. Please use a different email."
      );
      return;
    }

    if (!canResend) {
      setOtpError(
        `Please wait ${resendCooldown} seconds before requesting a new OTP`
      );
      return;
    }

    setSendingOtp(true);
    setOtpError("");
    setCanResend(false);

    try {
      const result = await OTPService.sendOTP(formData.email);

      if (result.success && result.sessionId) {
        setOtpSent(true);
        setOtpSessionId(result.sessionId);
        setOtpError("");
        setResendCooldown(60);
      } else {
        setOtpError(result.error || "Failed to send OTP");
        setCanResend(true);
      }
    } catch (error) {
      setOtpError("Failed to send OTP. Please try again.");
      setCanResend(true);
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

      // Final check for email duplication before submission
      const emailAlreadyExists = await checkEmailExists(formData.email.trim());
      if (emailAlreadyExists) {
        throw new Error(
          "This email is already registered. Please use a different email address."
        );
      }

      const isVerified = await OTPService.isEmailVerified(formData.email);
      if (!isVerified) {
        throw new Error("Email not verified. Please verify your email first.");
      }

      // Additional validation for business VAT
      if (formData.vatType === "business" && !vatVerified) {
        throw new Error(
          "Please verify your business VAT number before proceeding."
        );
      }

      const sellersRef = ref(realtimeDb, "sellers");
      const newSellerRef = push(sellersRef);

      const sellerData = {
        businessName: formData.businessName,
        vatType: formData.vatType,
        vatNumber: formData.vatNumber,
        ...(formData.vatType === "business" &&
          vatVerified && {
            vatVerified: true,
            vatCompanyInfo: vatCompanyInfo,
          }),
        hearAboutSurf: formData.hearAboutSurf,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email.toLowerCase().trim(), // Store email in lowercase
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        country: formData.country,
        shippingMethod: formData.shippingMethod,
        ...(formData.shippingMethod === "own" && {
          shippingType: formData.shippingType,
          deliveryTime: formData.deliveryTime,
        }),
        showAdsOnWebsite: formData.showAdsOnWebsite,
        id: newSellerRef.key,
        status: "pending",
        emailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await set(newSellerRef, sellerData);

      try {
        await OTPService.cleanupOTP(formData.email);
      } catch (otpCleanupError) {
        console.warn("OTP cleanup failed:", otpCleanupError);
      }

      setRegistrationComplete(true);
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = "Registration failed. Please try again.";

      if (error instanceof Error) {
        if (error.message.includes("Firebase not initialized")) {
          errorMessage =
            "System error: Database not available. Please try again later.";
        } else if (error.message.includes("Email not verified")) {
          errorMessage = "Please verify your email address before proceeding.";
        } else if (error.message.includes("VAT number")) {
          errorMessage = error.message;
        } else if (error.message.includes("email is already registered")) {
          errorMessage = error.message;
        }
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // UPDATED: Step validation including email check completion
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        const basicValidation =
          formData.businessName.trim() &&
          formData.vatNumber.trim() &&
          VATService.validateMaltaVATFormat(formData.vatNumber) &&
          formData.hearAboutSurf;

        // For business VAT, require verification
        if (formData.vatType === "business") {
          return basicValidation && vatVerified;
        }

        // For individual VAT, only require format validation
        return basicValidation;
      case 2:
        return (
          formData.firstName.trim() &&
          formData.lastName.trim() &&
          formData.email.trim() &&
          formData.phoneNumber.trim() &&
          formData.address.trim() &&
          formData.city.trim() &&
          formData.pincode.trim() &&
          emailCheckComplete && // Email check must be complete
          !emailExists && // Email should not already exist
          !emailCheckLoading && // Email check should not be loading
          otpVerified // OTP must be verified
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
      <div className="min-h-screen bg-white pt-32 lg:pt-24 relative overflow-hidden">
        {/* Subtle floating shapes for background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-[#9101CF] to-[#5D0196] rounded-full"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-[#9101CF] to-[#5D0196] rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-[#9101CF] to-[#5D0196] rounded-full"></div>
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto py-6 lg:py-12 px-4">
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-100 rounded-3xl shadow-2xl p-6 lg:p-12 animate-scale-in">
                <div className="w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 lg:mb-8 flex items-center justify-center text-white text-2xl lg:text-4xl shadow-lg">
                  ✅
                </div>

                <h1 className="text-2xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6">
                  <span className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] bg-clip-text text-transparent">
                    Registration Successful!
                  </span>
                </h1>

                <p className="text-lg lg:text-xl text-gray-700 mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed">
                  Thank you for joining Surf! Your business "
                  {formData.businessName}" has been submitted for review.
                </p>

                <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-4 lg:p-6 mb-6 lg:mb-8">
                  <div className="flex flex-col lg:flex-row lg:items-start">
                    <svg
                      className="w-6 h-6 text-purple-600 mt-1 mr-0 lg:mr-4 mx-auto lg:mx-0 mb-3 lg:mb-0"
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
                    <div className="text-center lg:text-left">
                      <h3 className="text-base lg:text-lg font-semibold text-purple-800 mb-4">
                        What happens next?
                      </h3>
                      <div className="grid grid-cols-1 gap-3 text-sm lg:text-base text-purple-700">
                        <div className="flex items-start space-x-3 bg-white/50 rounded-lg p-3">
                          <span className="text-purple-600 font-bold">📧</span>
                          <span>
                            You'll receive a confirmation email within 24 hours
                          </span>
                        </div>
                        <div className="flex items-start space-x-3 bg-white/50 rounded-lg p-3">
                          <span className="text-purple-600 font-bold">🔍</span>
                          <span>
                            Our team will review your application (usually takes
                            1-2 business days)
                          </span>
                        </div>
                        <div className="flex items-start space-x-3 bg-white/50 rounded-lg p-3">
                          <span className="text-purple-600 font-bold">🚀</span>
                          <span>
                            Once approved, you'll get access to the seller panel
                            to start selling
                          </span>
                        </div>
                        <div className="flex items-start space-x-3 bg-white/50 rounded-lg p-3">
                          <span className="text-purple-600 font-bold">💬</span>
                          <span>
                            Our support team will contact you with next steps
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <button className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-[#8001BF] hover:to-[#4D0186] transform hover:-translate-y-1 transition-all duration-300 shadow-xl w-full sm:w-auto">
                      <svg
                        className="w-5 h-5 mr-2 inline"
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
    <div className="min-h-screen bg-white pt-32 lg:pt-24 relative overflow-hidden">
      {/* Subtle floating shapes for background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-[#9101CF] to-[#5D0196] rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-[#9101CF] to-[#5D0196] rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-[#9101CF] to-[#5D0196] rounded-full"></div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-7xl mx-auto py-4 lg:py-8 px-4">
          {/* Hero Section - Mobile Optimized following landing page style */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-full px-4 lg:px-6 py-2 lg:py-3 shadow-lg mb-4 lg:mb-6">
              <span className="bg-green-400 w-2 h-2 lg:w-3 lg:h-3 rounded-full mr-2 lg:mr-3 animate-pulse"></span>
              <span className="text-xs lg:text-sm font-medium text-purple-700">
                🚀 Join our pool of local businesses
              </span>
            </div>

            <h1 className="text-3xl lg:text-5xl xl:text-7xl font-bold mb-4 lg:mb-6 leading-tight">
              <span className="text-gray-800">Join</span>
              <br />
              <span className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] bg-clip-text text-transparent">
                Surf Seller
              </span>
              <span className="text-gray-800"> Today</span>
            </h1>

            <p className="text-lg lg:text-xl max-w-3xl mx-auto mb-6 lg:mb-8 text-gray-600 leading-relaxed">
              Connect with thousands of customers in Malta and beyond. No setup
              fees, just simple commission-based pricing.
            </p>
          </div>

          {/* Progress Header - Mobile Optimized */}
          <div className="mb-6 lg:mb-8">
            <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-100 rounded-2xl shadow-xl p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-0">
                  Step {currentStep}: {stepTitles[currentStep]}
                </h2>
                <div className="text-sm font-medium text-gray-600">
                  {Math.round(progressPercentage)}% Complete
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 lg:h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] h-2 lg:h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>Business Info</span>
                <span className="hidden sm:inline">Contact Details</span>
                <span className="sm:hidden">Contact</span>
                <span>Shipping</span>
                <span>Launch!</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Left Section - Info Cards - Following landing page style */}
            <div className="space-y-4 lg:space-y-6 order-2 lg:order-1">
              {currentStep === 1 && (
                <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-100 rounded-2xl shadow-xl p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                    🏢 Tell Us About Your Business
                  </h3>
                  <p className="text-base lg:text-lg text-gray-600 mb-6">
                    Help us understand your business better so we can provide
                    the best selling experience.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-purple-600"
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
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
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
                          Malta VAT compliance for both individual and business
                          sellers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-100 rounded-2xl shadow-xl p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                    📞 Contact & Address Details
                  </h3>
                  <p className="text-base lg:text-lg text-gray-600 mb-6">
                    We need your contact details for account verification and
                    order management.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0"
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
                          account security and to prevent duplicate
                          registrations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-100 rounded-2xl shadow-xl p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                    🚚 Smart Shipping Setup
                  </h3>
                  <p className="text-base lg:text-lg text-gray-600 mb-6">
                    Choose your preferred shipping method to ensure smooth
                    deliveries to your customers.
                  </p>
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
              )}

              {currentStep === 4 && (
                <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-100 rounded-2xl shadow-xl p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                    📈 Boost Your Visibility
                  </h3>
                  <p className="text-base lg:text-lg text-gray-600 mb-6">
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

            {/* Right Section - Form with FIXED mobile padding */}
            <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-100 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-10 order-1 lg:order-2">
              {/* Step 1 Form - Business Information with VAT Verification */}
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
                      className="w-full px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                        className={`p-3 lg:p-4 border-2 rounded-xl transition-all duration-200 ${
                          formData.vatType === "individual"
                            ? "border-purple-500 bg-purple-50 text-purple-700"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-xl lg:text-2xl mb-2">👤</div>
                          <div className="font-medium text-sm lg:text-base">
                            Individual
                          </div>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateFormData("vatType", "business")}
                        className={`p-3 lg:p-4 border-2 rounded-xl transition-all duration-200 ${
                          formData.vatType === "business"
                            ? "border-purple-500 bg-purple-50 text-purple-700"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-xl lg:text-2xl mb-2">🏢</div>
                          <div className="font-medium text-sm lg:text-base">
                            Business
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Enhanced VAT Number Section with Verification */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      VAT Number <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          value={formData.vatNumber}
                          onChange={(e) => {
                            const value = e.target.value.toUpperCase();
                            updateFormData("vatNumber", value);
                          }}
                          className="flex-1 px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          placeholder="MT12345678"
                          disabled={
                            vatVerified && formData.vatType === "business"
                          }
                        />

                        {/* Show Verify button only for business VAT */}
                        {formData.vatType === "business" && (
                          <button
                            type="button"
                            onClick={handleVerifyVAT}
                            disabled={
                              !formData.vatNumber ||
                              vatVerifying ||
                              vatVerified ||
                              !VATService.validateMaltaVATFormat(
                                formData.vatNumber
                              )
                            }
                            className={`px-4 sm:px-6 py-3 lg:py-4 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                              vatVerified
                                ? "bg-green-100 text-green-700 border-2 border-green-200"
                                : VATService.validateMaltaVATFormat(
                                    formData.vatNumber
                                  )
                                ? "bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white hover:from-[#8001BF] hover:to-[#4D0186]"
                                : "bg-gray-100 text-gray-500 border-2 border-gray-200 cursor-not-allowed"
                            }`}
                          >
                            {vatVerifying ? (
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
                            ) : vatVerified ? (
                              "✓ Verified"
                            ) : (
                              "Verify VAT"
                            )}
                          </button>
                        )}
                      </div>

                      {/* Individual VAT Info */}
                      {/* {formData.vatType === "individual" &&
                        VATService.validateMaltaVATFormat(
                          formData.vatNumber
                        ) && (
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-start">
                              <svg
                                className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <div>
                                <h4 className="font-semibold text-blue-800">
                                  Individual VAT Format Accepted
                                </h4>
                              </div>
                            </div>
                          </div>
                        )} */}

                      {/* VAT Format Help - Show for both individual and business */}
                      {!VATService.validateMaltaVATFormat(formData.vatNumber) &&
                        formData.vatNumber && (
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <div className="flex items-start">
                              <svg
                                className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0"
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
                                <h4 className="font-semibold text-amber-800">
                                  Malta VAT Format Required
                                </h4>
                                <p className="text-amber-700 text-sm mt-1">
                                  {formData.vatType === "individual"
                                    ? 'Malta individual VAT numbers must start with "MT" followed by 8 digits (e.g., MT12345678)'
                                    : 'Malta business VAT numbers must start with "MT" followed by 8 digits (e.g., MT12345678)'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                      {/* VAT Verification Success */}
                      {vatVerified && formData.vatType === "business" && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <div className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="flex-1">
                              <h4 className="font-semibold text-green-800">
                                ✓ VAT Number Verified
                              </h4>
                              {vatCompanyInfo.name && (
                                <div className="mt-2 text-sm text-green-700">
                                  <p>
                                    <strong>Company:</strong>{" "}
                                    {vatCompanyInfo.name}
                                  </p>
                                  {vatCompanyInfo.address && (
                                    <p>
                                      <strong>Address:</strong>{" "}
                                      {vatCompanyInfo.address}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* VAT Verification Error */}
                      {vatError && formData.vatType === "business" && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                          <div className="flex items-start">
                            <svg
                              className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div>
                              <h4 className="font-semibold text-red-800">
                                VAT Verification Failed
                              </h4>
                              <p className="text-red-700 text-sm mt-1">
                                {vatError}
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  setVatError("");
                                  setVatVerified(false);
                                }}
                                className="text-red-600 hover:text-red-800 text-sm font-medium mt-2 underline"
                              >
                                Try Again
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-gray-500 mt-2">
                        {formData.vatType === "individual"
                          ? "Individual Malta VAT numbers follow the same MT + 8 digits format"
                          : "We'll verify your business VAT number with the EU VIES system"}
                      </p>
                    </div>
                  </div>

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
                      className="w-full px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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

              {/* Step 2 Form - Contact & Pickup Address with Enhanced Email Validation */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                        className="w-full px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                        className="w-full px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  {/* UPDATED: Enhanced Email Field with Proper Validation Flow */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email ID <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              updateFormData("email", e.target.value)
                            }
                            className={`w-full px-4 py-3 lg:py-4 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                              emailExists
                                ? "border-red-300 bg-red-50"
                                : emailCheckLoading
                                ? "border-yellow-300 bg-yellow-50"
                                : "border-gray-200"
                            }`}
                            placeholder="Enter your email"
                            disabled={otpVerified}
                          />

                          {/* Email validation indicators */}
                          {emailCheckLoading && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <svg
                                className="animate-spin h-5 w-5 text-yellow-500"
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
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                            </div>
                          )}

                          {!emailCheckLoading &&
                            formData.email &&
                            !emailExists &&
                            emailCheckComplete && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <svg
                                  className="h-5 w-5 text-green-500"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}

                          {emailExists && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <svg
                                className="h-5 w-5 text-red-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* UPDATED: Send OTP Button with Enhanced Validation */}
                        <button
                          type="button"
                          onClick={handleSendOTP}
                          disabled={
                            !formData.email ||
                            !formData.email.trim() ||
                            emailCheckLoading ||
                            !emailCheckComplete ||
                            emailExists ||
                            otpSent ||
                            sendingOtp ||
                            otpVerified
                          }
                          className={`px-4 sm:px-6 py-3 lg:py-4 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                            otpVerified
                              ? "bg-green-100 text-green-700 border-2 border-green-200"
                              : otpSent
                              ? "bg-purple-100 text-purple-700 border-2 border-purple-200"
                              : emailExists
                              ? "bg-red-100 text-red-700 border-2 border-red-200 cursor-not-allowed"
                              : emailCheckLoading || !emailCheckComplete
                              ? "bg-gray-100 text-gray-500 border-2 border-gray-200 cursor-not-allowed"
                              : "bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white hover:from-[#8001BF] hover:to-[#4D0186]"
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
                          ) : emailExists ? (
                            "Email Exists"
                          ) : emailCheckLoading ? (
                            "Checking..."
                          ) : !emailCheckComplete && formData.email.trim() ? (
                            "Validating..."
                          ) : (
                            "Send OTP"
                          )}
                        </button>
                      </div>

                      {/* Email Error Display */}
                      {(emailCheckError || (emailExists && formData.email)) && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                          <div className="flex items-start">
                            <svg
                              className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div>
                              <h4 className="font-semibold text-red-800">
                                Email Already Registered
                              </h4>
                              <p className="text-red-700 text-sm mt-1">
                                {emailCheckError ||
                                  "This email is already registered. Please use a different email or login if you already have an account."}
                              </p>
                              <div className="mt-3 flex gap-2">
                                <a
                                  href="https://surf.mt/vendor.php?dispatch=auth.login_form&return_url=vendor.php"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-red-600 hover:text-red-800 text-sm font-medium underline"
                                >
                                  Login to Existing Account
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* OTP Input Field */}
                      {otpSent && !otpVerified && (
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                          <div className="flex items-center mb-3">
                            <svg
                              className="w-5 h-5 text-purple-600 mr-2"
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
                            <span className="text-purple-800 font-medium text-sm lg:text-base">
                              Enter the 6-digit code sent to your email
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3">
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
                              className="flex-1 px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center font-mono text-lg tracking-widest"
                              placeholder="000000"
                              maxLength={6}
                            />
                            <button
                              type="button"
                              onClick={handleVerifyOTP}
                              disabled={otpCode.length !== 6 || verifyingOtp}
                              className="px-4 sm:px-6 py-3 bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white rounded-lg font-medium hover:from-[#8001BF] hover:to-[#4D0186] disabled:opacity-50 transition-all duration-200"
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

                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2">
                            <span className="text-purple-700 text-sm">
                              Didn't receive the code?
                            </span>
                            <button
                              type="button"
                              onClick={handleSendOTP}
                              disabled={!canResend || sendingOtp}
                              className={`text-sm font-medium transition-colors ${
                                canResend && !sendingOtp
                                  ? "text-purple-600 hover:text-purple-800 cursor-pointer"
                                  : "text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              {!canResend
                                ? `Resend in ${resendCooldown}s`
                                : "Resend OTP"}
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
                              className="w-5 h-5 text-red-600 mr-2 flex-shrink-0"
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
                      className="w-full px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                      className="w-full px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter address"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                        className="w-full px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                        className="w-full px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                        className="w-full px-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                      className={`border-2 rounded-xl p-4 lg:p-6 transition-all duration-200 cursor-pointer ${
                        formData.shippingMethod === "own"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
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
                          className="mt-2 w-5 h-5 text-purple-600"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                            📦 Own Shipping
                          </h3>
                          <p className="text-gray-600 mb-3">
                            Handle shipping yourself with your preferred
                            logistics partner
                          </p>
                          <div className="text-sm text-purple-600 font-medium">
                            ✨ More control over delivery experience
                          </div>
                        </div>
                      </div>

                      {/* Shipping Type and Delivery Time */}
                      {formData.shippingMethod === "own" && (
                        <div className="mt-6 space-y-6 bg-white/50 p-4 lg:p-6 rounded-xl border border-purple-200">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                              Shipping Type
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <button
                                type="button"
                                onClick={() =>
                                  updateFormData("shippingType", "fixed_rate")
                                }
                                className={`p-3 lg:p-4 border-2 rounded-xl transition-all duration-200 ${
                                  formData.shippingType === "fixed_rate"
                                    ? "border-purple-500 bg-white text-purple-700"
                                    : "border-gray-200 hover:border-purple-300 bg-white"
                                }`}
                              >
                                <div className="font-medium">Fixed Rate</div>
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  updateFormData(
                                    "shippingType",
                                    "free_delivery"
                                  )
                                }
                                className={`p-3 lg:p-4 border-2 rounded-xl transition-all duration-200 ${
                                  formData.shippingType === "free_delivery"
                                    ? "border-purple-500 bg-white text-purple-700"
                                    : "border-gray-200 hover:border-purple-300 bg-white"
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
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                                      ? "border-purple-500 bg-white text-purple-700"
                                      : "border-gray-200 hover:border-purple-300 bg-white"
                                  }`}
                                >
                                  <div className="font-medium text-sm lg:text-base">
                                    {option.label}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className={`border-2 rounded-xl p-4 lg:p-6 transition-all duration-200 cursor-pointer ${
                        formData.shippingMethod === "integrated"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
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
                          className="mt-2 w-5 h-5 text-purple-600"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
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

                  {/* Info message for integrated shipping */}
                  {formData.shippingMethod === "integrated" && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 lg:p-6">
                      <div className="flex items-start">
                        <svg
                          className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <h4 className="font-semibold text-green-800 mb-2">
                            All Set!
                          </h4>
                          <p className="text-green-700 text-sm">
                            Our shipping partners will handle delivery times and
                            rates automatically based on your location and
                            product types.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4 Form - Visibility & Ads */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6 lg:p-8">
                    <h3 className="text-lg lg:text-xl font-bold text-purple-900 mb-4">
                      Want more visibility?
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white rounded-lg border border-purple-200">
                      <div className="flex-1 mb-4 sm:mb-0">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Show ads on website
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Increase your product visibility with sponsored
                          listings
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
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
                            className="w-5 h-5 mr-2 flex-shrink-0"
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

                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 lg:p-6">
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

              {/* Navigation Buttons - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row sm:justify-between pt-6 lg:pt-8 mt-6 lg:mt-8 border-t border-gray-200 gap-4">
                {currentStep > 1 ? (
                  <button
                    onClick={prevStep}
                    className="bg-white border-2 border-gray-300 text-gray-700 px-6 lg:px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 order-2 sm:order-1"
                  >
                    ← Previous
                  </button>
                ) : (
                  <div className="hidden sm:block"></div>
                )}

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 order-1 sm:order-2">
                  {currentStep < totalSteps ? (
                    <button
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white px-6 lg:px-8 py-3 rounded-xl font-medium hover:from-[#8001BF] hover:to-[#4D0186] disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto transition-all duration-200"
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!isStepValid() || loading}
                      className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white px-6 lg:px-8 py-3 rounded-xl font-medium hover:from-[#8001BF] hover:to-[#4D0186] disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto transition-all duration-200"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
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
