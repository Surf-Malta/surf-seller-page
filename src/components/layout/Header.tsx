// src/components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";
import { RootState } from "@/store";
import { toggleMobileMenu } from "@/store/slices/navigationSlice";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const { isMobileMenuOpen } = useSelector(
    (state: RootState) => state.navigation
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href: string, key: string) => {
    setLoadingStates((prev) => ({ ...prev, [key]: true }));

    // Simulate loading for external links
    if (href.startsWith("http")) {
      setTimeout(() => {
        window.open(href, "_blank", "noopener,noreferrer");
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
      }, 500);
    } else {
      router.push(href);
      // Reset loading state after navigation
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
      }, 1000);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-white/90 backdrop-blur-sm"
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <div className="flex items-center mr-1">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <Navigation />
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() =>
                  handleNavigation(
                    "https://surf.mt/vendor.php?dispatch=auth.login_form&return_url=vendor.php",
                    "vendor-login"
                  )
                }
                disabled={loadingStates["vendor-login"]}
                className="group relative text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 disabled:opacity-50"
              >
                {loadingStates["vendor-login"] ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin w-4 h-4 mr-2"
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
                    Loading...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Seller Login
                  </span>
                )}
              </button>

              <button
                onClick={() => handleNavigation("/register", "register")}
                disabled={loadingStates["register"]}
                className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <span className="relative z-10 flex items-center">
                  {loadingStates["register"] ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4 mr-2"
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
                      Loading...
                    </>
                  ) : (
                    <>Start Selling FREE</>
                  )}
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              <button
                onClick={() => dispatch(toggleMobileMenu())}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile CTA Bar */}
          <div className="lg:hidden border-t border-gray-100 py-3">
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => handleNavigation("/register", "mobile-register")}
                disabled={loadingStates["mobile-register"]}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50"
              >
                {loadingStates["mobile-register"] ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin w-4 h-4 mr-2"
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
                    Loading...
                  </span>
                ) : (
                  "🚀 Start Selling FREE"
                )}
              </button>
            </div>
          </div>
        </Container>

        {/* {isScrolled && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-1 text-center text-xs font-medium overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
              <span className="mx-8">✨ Malta's #1 E-commerce Platform</span>
              <span className="mx-8">•</span>
              <span className="mx-8">€2M+ revenue generated</span>
              <span className="mx-8">•</span>
              <span className="mx-8">5K+ active sellers</span>
              <span className="mx-8">•</span>
              <span className="mx-8">Zero setup cost</span>
            </div>
          </div>
        )} */}
      </header>

      {/* Mobile Menu */}
      <MobileMenu />
    </>
  );
}
