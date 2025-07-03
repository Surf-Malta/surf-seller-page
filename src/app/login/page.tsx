"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { useEffect } from "react";

export default function LoginPage() {
  // Redirect to CS-Cart vendor login immediately
  useEffect(() => {
    // Redirect to CS-Cart vendor login page
    window.location.href =
      "https://surf.mt/vendor.php?dispatch=auth.login_form&return_url=vendor.php";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 lg:pt-24">
      <Container>
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)]">
          <div className="w-full max-w-md">
            <div className="elevated-card p-10 animate-scale-in text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold gradient-text mb-4">
                  Redirecting to Vendor Login
                </h1>
                <p className="text-gray-600">
                  Taking you to the CS-Cart vendor panel...
                </p>
              </div>

              <div className="mb-8">
                <div className="flex justify-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                    <div
                      className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Fallback button in case redirect doesn't work */}
              <div className="space-y-4">
                <a
                  href="https://surf.mt/vendor.php?dispatch=auth.login_form&return_url=vendor.php"
                  className="btn-primary-enhanced w-full inline-block"
                >
                  Continue to Vendor Login
                </a>

                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </div>

              {/* Information about the redirect */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-0.5 mr-3"
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
                    <p className="text-sm text-blue-800 font-medium">
                      Secure Vendor Access
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      You&apos;re being redirected to our secure CS-Cart vendor
                      panel where you can manage your store, products, and
                      orders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
