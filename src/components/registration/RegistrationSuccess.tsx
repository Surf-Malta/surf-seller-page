// src/components/registration/RegistrationSuccess.tsx
"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RegistrationSuccessProps {
  userName: string;
  boothTitle: string;
  onContinue: () => void;
}

export function RegistrationSuccess({
  userName,
  boothTitle,
  onContinue,
}: RegistrationSuccessProps) {
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onContinue();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onContinue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center relative overflow-hidden">
      {/* Floating celebration elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">
          🎉
        </div>
        <div className="absolute top-20 right-16 text-3xl animate-pulse">
          ✨
        </div>
        <div
          className="absolute bottom-20 left-20 text-4xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          🚀
        </div>
        <div
          className="absolute bottom-10 right-10 text-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          🎊
        </div>
        <div
          className="absolute top-1/3 left-1/4 text-2xl animate-bounce"
          style={{ animationDelay: "1.5s" }}
        >
          ⭐
        </div>
        <div
          className="absolute top-1/2 right-1/4 text-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          🌟
        </div>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="mb-8 animate-scale-in">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-12 h-12 text-white"
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
          </div>

          {/* Success Message */}
          <div className="animate-slide-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="gradient-text">Welcome to Surf Seller!</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-6">
              Congratulations, {userName}! 🎉
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Your seller account has been successfully created. Your booth
              <span className="font-semibold text-blue-600">
                {" "}
                "{boothTitle}"{" "}
              </span>
              is now ready to start selling!
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl mb-3">🏪</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Your Booth is Ready
              </h3>
              <p className="text-sm text-gray-600">
                Start adding products and customize your storefront
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl mb-3">📦</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Easy Product Upload
              </h3>
              <p className="text-sm text-gray-600">
                Add your first product in just a few clicks
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Start Earning
              </h3>
              <p className="text-sm text-gray-600">
                Begin making sales immediately
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8 animate-scale-in">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              What's Next?
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">1</span>
                </div>
                <span className="text-gray-700">
                  Set up your booth profile and branding
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">2</span>
                </div>
                <span className="text-gray-700">
                  Add your first product with photos and descriptions
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">3</span>
                </div>
                <span className="text-gray-700">
                  Configure your shipping and payment methods
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">4</span>
                </div>
                <span className="text-gray-700">
                  Start promoting your products and making sales!
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in">
            <Button
              onClick={onContinue}
              className="btn-primary-enhanced px-8 py-4 text-lg"
            >
              <span>Go to Dashboard</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/seller/products/add")}
              className="px-8 py-4 text-lg"
            >
              Add First Product
            </Button>
          </div>

          {/* Auto-redirect notice */}
          <div className="mt-8 text-sm text-gray-500">
            Automatically redirecting to dashboard in{" "}
            <span className="font-semibold text-blue-600">{countdown}</span>{" "}
            seconds...
          </div>
        </div>
      </Container>

      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/80 to-transparent"></div>
    </div>
  );
}
