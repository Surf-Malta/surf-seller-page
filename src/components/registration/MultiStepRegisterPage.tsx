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
    country: "United States",
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

      // Save to Firebase Realtime Database
      const sellersRef = ref(realtimeDb, "sellers");
      const newSellerRef = push(sellersRef);

      const sellerData = {
        ...formData,
        id: newSellerRef.key,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      await set(newSellerRef, sellerData);

      // Simulate login (you can implement proper auth later)
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: newSellerRef.key,
          name: `${formData.firstName} ${formData.lastName}`,
          email: "", // You might want to add email field
          boothTitle: formData.boothTitle,
        })
      );

      // Show success and redirect
      alert("Registration successful! Welcome to Surf Seller!");
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
    1: "Getting Started",
    2: "Personal Information",
    3: "Shipping Information",
    4: "Advertising Options",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 lg:pt-24">
      <Container>
        <div className="max-w-6xl mx-auto py-8">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Booth Setup</h1>
              <div className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}: {stepTitles[currentStep]}
              </div>
              <div className="text-sm font-medium text-gray-900">
                {Math.round(progressPercentage)}% complete
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Section - Info */}
            <div className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Create Your Seller Account
                  </h2>
                  <p className="text-lg text-gray-600">
                    A "Booth" is what we call your collection of items. Your
                    Booth title will appear to buyers at the top of the page
                    where your items are listed.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Why Join Surf Seller?
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Zero investment to start</li>
                      <li>• Reach millions of customers</li>
                      <li>• Easy inventory management</li>
                      <li>• 24/7 support</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Great to have you here!
                  </h2>
                  <p className="text-lg text-gray-600">
                    We'd love to get to know you better. Most of this
                    information is optional, but helps us provide support should
                    you need it.
                  </p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 mb-2">
                      Where are you located?
                    </h3>
                    <p className="text-sm text-yellow-800">
                      Your postal code is part of your public user profile so
                      buyers can verify where your items ship from. Everything
                      else is just between you and us.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Shipping Setup
                  </h2>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      How do you determine the shipping cost for an order?
                    </h3>
                    <p className="text-gray-600">
                      This information will be used to determine the tax code
                      needed for the order. This information will not be shared
                      with buyers.
                    </p>
                    <p className="text-sm text-gray-500">
                      If you use multiple shipping methods, select the option
                      that aligns with how you most often set shipping prices.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Boost Your Sales
                  </h2>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Would you like to advertise your items?
                    </h3>
                    <p className="text-gray-600">
                      We collect a base commission fee of 11.0% on each sale.
                      You may opt into a higher commission rate to advertise
                      your items across multiple websites.
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>96.5%</strong> of sales are made from sellers
                        who opted into advertising
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Section - Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booth Identity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.boothIdentity}
                      onChange={(e) =>
                        updateFormData("boothIdentity", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="bonzuser_exemb"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This is your unique identity on Bonanza. Letters, numbers,
                      and underscores are allowed (no spaces).
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="bonzuser_exemb's booth"
                      maxLength={80}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This is the title of your storefront on Bonanza. You can
                      change this at any time. {formData.boothTitle.length}/80
                    </p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.agreeToTerms}
                      onChange={(e) =>
                        updateFormData("agreeToTerms", e.target.checked)
                      }
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I have read and agree to Bonanza's{" "}
                      <Link href="#" className="text-blue-600 hover:underline">
                        Terms of Use
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How did you hear about Bonanza?{" "}
                      <span className="text-gray-500">(optional)</span>
                    </label>
                    <select
                      value={formData.hearAboutUs}
                      onChange={(e) =>
                        updateFormData("hearAboutUs", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

              {currentStep === 2 && (
                <div className="space-y-6">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ray"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Yadav"
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
                      onChange={(e) =>
                        updateFormData("address", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="130 Street, 47 W 13th St, New York, NY 10011, USA"
                    />
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        /* Add another address line logic */
                      }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Add another address line
                    </button>
                    {formData.addressLine2 !== undefined && (
                      <input
                        type="text"
                        value={formData.addressLine2}
                        onChange={(e) =>
                          updateFormData("addressLine2", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                        placeholder="Apartment, suite, etc."
                      />
                    )}
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Luqa"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State / Province <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) =>
                          updateFormData("state", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="NY"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="India">India</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Zip / Post Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) =>
                          updateFormData("zipCode", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="NY 10011"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number{" "}
                      <span className="text-gray-500">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        updateFormData("phoneNumber", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="555-555-5555"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Sorry to be nosy — here's why we ask for this.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        id="cover_cost"
                        name="shippingMethod"
                        value="cover_cost"
                        checked={formData.shippingMethod === "cover_cost"}
                        onChange={(e) =>
                          updateFormData("shippingMethod", e.target.value)
                        }
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="cover_cost"
                          className="font-medium text-gray-900"
                        >
                          I cover the cost of shipping for my items
                        </label>
                        <p className="text-sm text-gray-600 mt-1">
                          This option is most similar to "Free shipping"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        id="flat_rate"
                        name="shippingMethod"
                        value="flat_rate"
                        checked={formData.shippingMethod === "flat_rate"}
                        onChange={(e) =>
                          updateFormData("shippingMethod", e.target.value)
                        }
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="flat_rate"
                          className="font-medium text-gray-900"
                        >
                          I use flat rate or marked up shipping costs
                        </label>
                        <p className="text-sm text-gray-600 mt-1">
                          This option is most similar to flat rate shipping or
                          methods that build additional revenue into shipping
                          costs.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        id="exact_amount"
                        name="shippingMethod"
                        value="exact_amount"
                        checked={formData.shippingMethod === "exact_amount"}
                        onChange={(e) =>
                          updateFormData("shippingMethod", e.target.value)
                        }
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="exact_amount"
                          className="font-medium text-gray-900"
                        >
                          I charge buyers the exact amount that shipping costs
                        </label>
                        <p className="text-sm text-gray-600 mt-1">
                          This option is most similar to "Calculated Shipping"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="advertise_yes"
                          name="advertiseItems"
                          checked={formData.advertiseItems}
                          onChange={() =>
                            updateFormData("advertiseItems", true)
                          }
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor="advertise_yes"
                            className="font-medium text-blue-900"
                          >
                            Yes, please advertise my items (recommended)
                          </label>
                          <p className="text-sm text-blue-800 mt-1">
                            We'll advertise your items on other sites like
                            Google Shopping. There is no upfront cost when you
                            make a sale.
                          </p>
                          <p className="text-sm font-medium text-blue-900 mt-2">
                            You'll pay up to 13%. You can change this rate at
                            any time.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="advertise_no"
                          name="advertiseItems"
                          checked={!formData.advertiseItems}
                          onChange={() =>
                            updateFormData("advertiseItems", false)
                          }
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor="advertise_no"
                            className="font-medium text-gray-900"
                          >
                            No need to advertise my items
                          </label>
                          <p className="text-sm text-gray-600 mt-1">
                            If you choose not to advertise, your items will only
                            appear when someone searches directly on
                            Bonanza.com. 96.5% of sales are made from sellers
                            who opted into advertising.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-gray-200">
                {currentStep > 1 ? (
                  <Button variant="outline" onClick={prevStep} className="px-6">
                    Previous Step
                  </Button>
                ) : (
                  <div></div>
                )}

                <div className="flex space-x-3">
                  {currentStep < totalSteps && (
                    <Button variant="ghost" className="px-6">
                      Finish Later
                    </Button>
                  )}

                  {currentStep < totalSteps ? (
                    <Button
                      variant="primary"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className="px-6"
                    >
                      Continue Setup
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      disabled={!isStepValid() || loading}
                      isLoading={loading}
                      className="px-6"
                    >
                      Complete Registration
                    </Button>
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
