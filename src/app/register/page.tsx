// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";
import { UserService, UserRegistrationData } from "@/services/userService";
import { RegistrationSuccess } from "@/components/registration/RegistrationSuccess";

interface RegistrationData extends UserRegistrationData {}

const HEAR_ABOUT_OPTIONS = [
  "Search Engine (Google, Bing, etc.)",
  "Social Media",
  "Friend or Family",
  "Online Advertisement",
  "News/Blog Article",
  "Other",
];

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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
    country: "United States",
    zipCode: "",
    shippingMethod: "free",
    advertiseItems: true,
    phoneNumber: "",
  });

  const updateFormData = (field: keyof RegistrationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Check booth identity availability with debouncing
  const checkBoothIdentity = async (identity: string) => {
    if (identity.length < 3) return;

    try {
      const isAvailable = await UserService.checkBoothIdentityAvailability(
        identity
      );
      if (!isAvailable) {
        setErrors((prev) => ({
          ...prev,
          boothIdentity: "This booth identity is already taken",
        }));
      }
    } catch (error) {
      console.error("Error checking booth identity:", error);
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const validateCurrentStep = () => {
    const newErrors: { [key: string]: string } = {};

    switch (currentStep) {
      case 1:
        if (!formData.boothIdentity)
          newErrors.boothIdentity = "Booth identity is required";
        if (!formData.boothTitle)
          newErrors.boothTitle = "Booth title is required";
        if (!formData.agreeToTerms)
          newErrors.agreeToTerms = "You must agree to the terms";
        break;
      case 2:
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.state) newErrors.state = "State/Province is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.zipCode)
          newErrors.zipCode = "Zip/Postal code is required";
        break;
      case 3:
        if (!formData.shippingMethod)
          newErrors.shippingMethod = "Please select a shipping method";
        break;
      case 4:
        // All fields are optional in step 4
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    try {
      // Register user using UserService
      const newUser = await UserService.registerUser(formData);

      // Log the user in
      dispatch(
        loginSuccess({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          createdAt: newUser.createdAt,
        })
      );

      // Store user data for success screen
      setRegisteredUser(newUser);
      setShowSuccess(true);
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";

      if (errorMessage.includes("booth identity")) {
        setErrors({ boothIdentity: errorMessage });
        setCurrentStep(1); // Go back to step 1 to fix the error
      } else {
        alert(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessContinue = () => {
    router.push("/dashboard");
  };

  // Show success screen if registration completed
  if (showSuccess && registeredUser) {
    return (
      <RegistrationSuccess
        userName={registeredUser.name}
        boothTitle={registeredUser.boothTitle}
        onContinue={handleSuccessContinue}
      />
    );
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Getting Started";
      case 2:
        return "Personal Information";
      case 3:
        return "Shipping Preferences";
      case 4:
        return "Advertising Options";
      default:
        return "Registration";
    }
  };

  const getProgressPercentage = () => {
    return (currentStep / 4) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20">
      <Container>
        {/* Progress Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Step {currentStep} of 4: {getStepTitle()}
            </h1>
            <div className="text-sm text-gray-600">
              {Math.round(getProgressPercentage())}% complete
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Left Section - Information */}
          <div className="space-y-6">
            {currentStep === 1 && (
              <div className="elevated-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Welcome to Surf Seller! 🚀
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
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
                      <h3 className="font-semibold text-gray-900">
                        Zero Investment
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Start selling without any upfront costs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
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
                      <h3 className="font-semibold text-gray-900">
                        Easy Setup
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Get your store ready in minutes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
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
                      <h3 className="font-semibold text-gray-900">
                        Grow Your Business
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Access tools to scale your operations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="elevated-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Where are you located? 📍
                </h2>
                <p className="text-gray-600 mb-4">
                  Your postal code is part of your public user profile so buyers
                  can verify where your items ship from. Everything else is just
                  between you and us.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-blue-800">
                      Your information is secure and private
                    </span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="elevated-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  How do you determine shipping costs? 🚚
                </h2>
                <p className="text-gray-600 mb-4">
                  This information will be used to determine the tax code needed
                  for the order. This information will not be shared with
                  buyers.
                </p>
                <p className="text-sm text-gray-500">
                  If you use multiple shipping methods, select the option that
                  aligns with how you most often set shipping prices.
                </p>
              </div>
            )}

            {currentStep === 4 && (
              <div className="elevated-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Boost Your Sales with Advertising 📈
                </h2>
                <p className="text-gray-600 mb-4">
                  We collect a base commission fee of 11.0% on each sale. You
                  may opt into a higher commission rate to advertise your items
                  across multiple websites.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-green-800">
                      96.5% of sales come from sellers who advertise
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Form */}
          <div className="elevated-card p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Booth Setup
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Booth Identity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.boothIdentity}
                    onChange={(e) => {
                      const value = e.target.value.replace(
                        /[^a-zA-Z0-9_]/g,
                        ""
                      ); // Only allow letters, numbers, underscores
                      updateFormData("boothIdentity", value);
                      if (value.length >= 3) {
                        checkBoothIdentity(value);
                      }
                    }}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.boothIdentity
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your unique booth identity"
                  />
                  {errors.boothIdentity && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.boothIdentity}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    This is your unique identity on Surf. Letters, numbers, and
                    underscores are allowed (no spaces).
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Booth Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.boothTitle}
                    onChange={(e) =>
                      updateFormData("boothTitle", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your booth title"
                    maxLength={50}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>
                      This is the title of your storefront on Surf. You can
                      change this at any time.
                    </span>
                    <span>{formData.boothTitle.length}/50</span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) =>
                        updateFormData("agreeToTerms", e.target.checked)
                      }
                      className="mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      I have read and agree to Surf's{" "}
                      <Link
                        href="/terms"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Terms of Use
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    value={formData.hearAboutUs}
                    onChange={(e) =>
                      updateFormData("hearAboutUs", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">-- Choose an option --</option>
                    {HEAR_ABOUT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Personal Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        updateFormData("firstName", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        updateFormData("lastName", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                    placeholder="Street address"
                  />
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) =>
                      updateFormData("addressLine2", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State/Province <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => updateFormData("state", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="State/Province"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) =>
                        updateFormData("country", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="India">India</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zip/Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) =>
                        updateFormData("zipCode", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Zip/Postal code"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Shipping Method
                </h3>

                <div className="space-y-4">
                  <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      value="free"
                      checked={formData.shippingMethod === "free"}
                      onChange={(e) =>
                        updateFormData("shippingMethod", e.target.value)
                      }
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        I cover the cost of shipping for my items
                      </div>
                      <div className="text-sm text-gray-600">
                        This option is most similar to "Free shipping"
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      value="flat"
                      checked={formData.shippingMethod === "flat"}
                      onChange={(e) =>
                        updateFormData("shippingMethod", e.target.value)
                      }
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        I use flat rate or marked up shipping costs
                      </div>
                      <div className="text-sm text-gray-600">
                        This option is most similar to flat rate shipping or
                        methods that build additional revenue into shipping
                        costs.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      value="calculated"
                      checked={formData.shippingMethod === "calculated"}
                      onChange={(e) =>
                        updateFormData("shippingMethod", e.target.value)
                      }
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        I charge buyers the exact amount that shipping costs
                      </div>
                      <div className="text-sm text-gray-600">
                        This option is most similar to "Calculated Shipping"
                      </div>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      updateFormData("phoneNumber", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your phone number"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Sorry to be nosy – here's why we ask for this.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Advertising Preferences
                </h3>

                <div className="space-y-4">
                  <label className="flex items-start space-x-3 p-4 border-2 border-blue-200 bg-blue-50 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      checked={formData.advertiseItems}
                      onChange={(e) => updateFormData("advertiseItems", true)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900 flex items-center space-x-2">
                        <span>Yes, please advertise my items</span>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Recommended
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        We'll advertise your items on other sites like Google
                        Shopping. There is no upfront cost when you make a sale.
                      </div>
                      <div className="text-sm font-medium text-blue-800">
                        You'll pay up to 13%. You can change this rate at any
                        time.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      checked={!formData.advertiseItems}
                      onChange={(e) => updateFormData("advertiseItems", false)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        No need to advertise my items
                      </div>
                      <div className="text-sm text-gray-600">
                        If you choose not to advertise, your items will only
                        appear when someone searches directly on Surf.com. 96.5%
                        of sales are made from sellers who opted into
                        advertising.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="px-6"
                >
                  Previous Step
                </Button>
              )}

              <div className="flex-1 flex justify-end">
                {currentStep < 4 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!validateCurrentStep()}
                    className="px-6"
                  >
                    Continue Setup
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!validateCurrentStep() || isSubmitting}
                    isLoading={isSubmitting}
                    className="px-6"
                  >
                    Complete Registration
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Already have account link */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
