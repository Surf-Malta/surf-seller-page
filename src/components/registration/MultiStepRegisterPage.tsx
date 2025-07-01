"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ref, push, set } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";

interface RegistrationData {
  // Step 1
  boothIdentity: string;
  boothTitle: string;
  agreeToTerms: boolean;
  hearAboutUs: string;

  // Step 2
  firstName: string;
  lastName: string;
  address: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phoneNumber?: string;

  // Step 3
  shippingMethod: "cover_cost" | "flat_rate" | "exact_amount";

  // Step 4
  advertiseItems: boolean;
}

export default function MultiStepRegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegistrationData>({
    boothIdentity: "",
    boothTitle: "",
    agreeToTerms: false,
    hearAboutUs: "",
    firstName: "",
    lastName: "",
    address: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "India",
    zipCode: "",
    phoneNumber: "",
    shippingMethod: "cover_cost",
    advertiseItems: true,
  });

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof RegistrationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!realtimeDb) {
        throw new Error("Firebase not initialized");
      }

      const sellersRef = ref(realtimeDb, "sellers");
      const newSellerRef = push(sellersRef);

      const sellerData = {
        ...formData,
        id: newSellerRef.key,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      await set(newSellerRef, sellerData);

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: newSellerRef.key,
          name: `${formData.firstName} ${formData.lastName}`,
          email: "",
          boothTitle: formData.boothTitle,
        })
      );

      router.push("/dashboard");
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
          formData.boothIdentity && formData.boothTitle && formData.agreeToTerms
        );
      case 2:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.address &&
          formData.city &&
          formData.state &&
          formData.zipCode
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
    1: "Create Your Store",
    2: "Your Information",
    3: "Shipping Setup",
    4: "Growth Options",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 lg:pt-24">
      <Container>
        <div className="max-w-7xl mx-auto py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg mb-6">
              <span className="bg-green-500 w-3 h-3 rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">
                🚀 FREE to Start • No Hidden Fees
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="gradient-text-ecommerce">Launch Your</span>
              <br />
              <span className="text-gray-800">E-commerce Store</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join 50,000+ successful entrepreneurs. Build your online business
              with zero investment and start earning today.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 mb-8">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                No Setup Fees
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                24/7 Support
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Ready in 10 Minutes
              </div>
            </div>
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
                <span>Store Setup</span>
                <span>Your Details</span>
                <span>Shipping</span>
                <span>Launch!</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Section - Info & Benefits */}
            <div className="space-y-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="ecommerce-card p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      🏪 Create Your Digital Storefront
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                      Your store identity is how customers will find and
                      remember you. Choose something unique and memorable.
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
                            Professional Storefront
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Get a beautiful, mobile-responsive store
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
                            Zero Investment
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Start selling without any upfront costs
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
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
                            Instant Setup
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Your store goes live in minutes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="ecommerce-card p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      👤 Seller Verification
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                      We need some basic information to set up your seller
                      account and ensure secure transactions.
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
                            Privacy Protected
                          </h4>
                          <p className="text-yellow-700 text-sm mt-1">
                            Your personal information is encrypted and only used
                            for account verification and support.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="ecommerce-card p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      🚚 Smart Shipping Setup
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                      Choose how you want to handle shipping costs. This helps
                      us calculate the right fees and taxes for your orders.
                    </p>
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">
                          💡 Pro Tip
                        </h4>
                        <p className="text-blue-700 text-sm">
                          Free shipping often increases sales by 30%+. You can
                          adjust pricing to include shipping costs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="ecommerce-card p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      📈 Boost Your Sales
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                      Get your products seen by millions of potential customers
                      across multiple platforms.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          96.5%
                        </div>
                        <p className="text-green-800 font-semibold">
                          of our successful sellers use advertising to boost
                          their sales
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Success stories */}
              <div className="ecommerce-card p-6">
                <h4 className="font-bold text-gray-900 mb-4">
                  🌟 Success Story
                </h4>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-lg">
                    R
                  </div>
                  <div>
                    <p className="text-gray-600 italic mb-2">
                      "I went from ₹0 to ₹5 lakhs monthly revenue in just 6
                      months!"
                    </p>
                    <p className="text-sm text-gray-500">
                      - Rajesh K., Electronics Seller
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="ecommerce-card p-10">
              {/* Step 1 Form */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Store Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.boothIdentity}
                      onChange={(e) =>
                        updateFormData("boothIdentity", e.target.value)
                      }
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., my_awesome_store"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      This will be your unique store URL. Only letters, numbers,
                      and underscores allowed.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Store Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.boothTitle}
                      onChange={(e) =>
                        updateFormData("boothTitle", e.target.value)
                      }
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="My Awesome Store"
                      maxLength={80}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      This is what customers will see. You can change this
                      anytime. {formData.boothTitle.length}/80
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.agreeToTerms}
                        onChange={(e) =>
                          updateFormData("agreeToTerms", e.target.checked)
                        }
                        className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the{" "}
                        <Link
                          href="#"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="#"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      How did you hear about us?{" "}
                      <span className="text-gray-400">(optional)</span>
                    </label>
                    <select
                      value={formData.hearAboutUs}
                      onChange={(e) =>
                        updateFormData("hearAboutUs", e.target.value)
                      }
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">-- Choose an option --</option>
                      <option value="google">Google Search</option>
                      <option value="social_media">Social Media</option>
                      <option value="friend_referral">Friend Referral</option>
                      <option value="online_ad">Online Advertisement</option>
                      <option value="blog_article">Blog/Article</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2 Form */}
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
                        placeholder="John"
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
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        updateFormData("address", e.target.value)
                      }
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) =>
                          updateFormData("state", e.target.value)
                        }
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Maharashtra"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Pin Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) =>
                          updateFormData("zipCode", e.target.value)
                        }
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="400001"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Phone Number{" "}
                      <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        updateFormData("phoneNumber", e.target.value)
                      }
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              )}

              {/* Step 3 Form - Fixed Radio Buttons */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    {/* Free Shipping Option */}
                    <div
                      className={`border-2 rounded-xl p-6 transition-all duration-200 cursor-pointer ${
                        formData.shippingMethod === "cover_cost"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300 hover:bg-blue-25"
                      }`}
                      onClick={() =>
                        updateFormData("shippingMethod", "cover_cost")
                      }
                    >
                      <div className="flex items-start space-x-4">
                        <input
                          type="radio"
                          id="cover_cost"
                          name="shippingMethod"
                          value="cover_cost"
                          checked={formData.shippingMethod === "cover_cost"}
                          onChange={(e) =>
                            updateFormData("shippingMethod", e.target.value)
                          }
                          className="mt-2 w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor="cover_cost"
                            className="font-bold text-gray-900 text-lg cursor-pointer block"
                          >
                            🆓 Free Shipping (Recommended)
                          </label>
                          <p className="text-gray-600 mt-2">
                            I'll include shipping costs in my product prices.
                            This increases sales by 30%+
                          </p>
                          <div className="mt-3 text-sm text-green-600 font-medium">
                            ✨ Most popular choice among successful sellers
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Flat Rate Option */}
                    <div
                      className={`border-2 rounded-xl p-6 transition-all duration-200 cursor-pointer ${
                        formData.shippingMethod === "flat_rate"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300 hover:bg-blue-25"
                      }`}
                      onClick={() =>
                        updateFormData("shippingMethod", "flat_rate")
                      }
                    >
                      <div className="flex items-start space-x-4">
                        <input
                          type="radio"
                          id="flat_rate"
                          name="shippingMethod"
                          value="flat_rate"
                          checked={formData.shippingMethod === "flat_rate"}
                          onChange={(e) =>
                            updateFormData("shippingMethod", e.target.value)
                          }
                          className="mt-2 w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor="flat_rate"
                            className="font-bold text-gray-900 text-lg cursor-pointer block"
                          >
                            📦 Flat Rate Shipping
                          </label>
                          <p className="text-gray-600 mt-2">
                            I charge a fixed shipping fee or include markup in
                            shipping costs
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Calculated Shipping Option */}
                    <div
                      className={`border-2 rounded-xl p-6 transition-all duration-200 cursor-pointer ${
                        formData.shippingMethod === "exact_amount"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300 hover:bg-blue-25"
                      }`}
                      onClick={() =>
                        updateFormData("shippingMethod", "exact_amount")
                      }
                    >
                      <div className="flex items-start space-x-4">
                        <input
                          type="radio"
                          id="exact_amount"
                          name="shippingMethod"
                          value="exact_amount"
                          checked={formData.shippingMethod === "exact_amount"}
                          onChange={(e) =>
                            updateFormData("shippingMethod", e.target.value)
                          }
                          className="mt-2 w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor="exact_amount"
                            className="font-bold text-gray-900 text-lg cursor-pointer block"
                          >
                            ⚖️ Calculated Shipping
                          </label>
                          <p className="text-gray-600 mt-2">
                            Customers pay the exact shipping cost based on
                            weight and distance
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 Form - Fixed Radio Buttons */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    {/* Advertising Yes Option */}
                    <div
                      className={`border-2 rounded-xl p-8 transition-all duration-200 cursor-pointer ${
                        formData.advertiseItems
                          ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-100"
                          : "border-gray-200 hover:border-blue-300 hover:bg-blue-25"
                      }`}
                      onClick={() => updateFormData("advertiseItems", true)}
                    >
                      <div className="flex items-start space-x-4">
                        <input
                          type="radio"
                          id="advertise_yes"
                          name="advertiseItems"
                          checked={formData.advertiseItems}
                          onChange={() =>
                            updateFormData("advertiseItems", true)
                          }
                          className="mt-2 w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor="advertise_yes"
                            className="font-bold text-blue-900 text-xl cursor-pointer block"
                          >
                            🚀 YES! Advertise My Products (Recommended)
                          </label>
                          <p className="text-blue-800 mt-3 text-lg">
                            Reach millions of customers on Google, Facebook, and
                            other platforms. No upfront cost - pay only when you
                            make sales.
                          </p>
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="bg-white/50 rounded-lg p-3">
                              <div className="text-2xl font-bold text-green-600">
                                5X
                              </div>
                              <div className="text-sm text-blue-800">
                                More Visibility
                              </div>
                            </div>
                            <div className="bg-white/50 rounded-lg p-3">
                              <div className="text-2xl font-bold text-green-600">
                                96.5%
                              </div>
                              <div className="text-sm text-blue-800">
                                Success Rate
                              </div>
                            </div>
                          </div>
                          <p className="text-sm font-bold text-blue-900 mt-4">
                            💰 Commission: Only 8% (vs 5% without advertising)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* No Advertising Option */}
                    <div
                      className={`border-2 rounded-xl p-8 transition-all duration-200 cursor-pointer ${
                        !formData.advertiseItems
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300 hover:bg-blue-25"
                      }`}
                      onClick={() => updateFormData("advertiseItems", false)}
                    >
                      <div className="flex items-start space-x-4">
                        <input
                          type="radio"
                          id="advertise_no"
                          name="advertiseItems"
                          checked={!formData.advertiseItems}
                          onChange={() =>
                            updateFormData("advertiseItems", false)
                          }
                          className="mt-2 w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor="advertise_no"
                            className="font-bold text-gray-900 text-lg cursor-pointer block"
                          >
                            📍 No Advertising - Local Sales Only
                          </label>
                          <p className="text-gray-600 mt-2">
                            Products will only appear on our marketplace.
                            Limited reach but lower commission.
                          </p>
                          <p className="text-sm text-gray-500 mt-3">
                            💰 Commission: 5% only
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mt-6">
                    <h4 className="font-bold text-green-800 mb-2">
                      🎯 Pro Tip for Success
                    </h4>
                    <p className="text-green-700 text-sm">
                      You can always change your advertising preferences later.
                      Many sellers start without advertising and upgrade once
                      they see initial success!
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons - Fixed positioning */}
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
                          Creating Your Store...
                        </span>
                      ) : (
                        "🚀 Launch My Store!"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Section */}
          <div className="mt-16 text-center">
            <div className="ecommerce-card p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                🛡️ Why 50,000+ Sellers Trust Us
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                    💰
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Zero Risk</h4>
                  <p className="text-gray-600 text-sm">
                    No setup fees, no monthly charges. Pay only when you sell.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                    🔒
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Secure & Safe
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Bank-level security with 99.9% uptime guarantee.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                    🎧
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">24/7 Support</h4>
                  <p className="text-gray-600 text-sm">
                    Dedicated support team to help you succeed every step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
