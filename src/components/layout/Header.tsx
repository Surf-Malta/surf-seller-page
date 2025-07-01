"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";
import { useAuth } from "@/context/AuthContext";
import { RootState } from "@/store";
import { toggleMobileMenu } from "@/store/slices/navigationSlice";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMobileMenuOpen } = useSelector(
    (state: RootState) => state.navigation
  );
  const { user, isAuthenticated, logout } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100"
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
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-700">
                        Welcome back!
                      </div>
                      <div className="text-gray-500">{user.name}</div>
                    </div>
                  </div>
                  <Link href="/dashboard">
                    <button className="btn-ecommerce-primary px-6 py-2 text-sm">
                      <svg
                        className="w-4 h-4 mr-2 inline"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <button className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                      <svg
                        className="w-4 h-4 mr-2 inline"
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
                      Vendor Login
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="btn-ecommerce-primary px-6 py-2 text-sm group">
                      <svg
                        className="w-4 h-4 mr-2 inline group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Start Selling FREE
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              {/* Mobile auth indicator */}
              {isAuthenticated && user && (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}

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
          <div className="lg:hidden border-t border-gray-100 py-2">
            {!isAuthenticated && (
              <div className="flex items-center justify-center space-x-4">
                <Link href="/register" className="flex-1">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium text-sm">
                    🚀 Start Selling FREE
                  </button>
                </Link>
              </div>
            )}
          </div>
        </Container>

        {/* Success notification bar */}
        {isScrolled && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-1 text-center text-xs font-medium">
            <span className="animate-pulse">
              ✨ Join 50,000+ successful sellers
            </span>
            <span className="mx-2">•</span>
            <span>₹100Cr+ revenue generated</span>
            <span className="mx-2">•</span>
            <span>Zero setup cost</span>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <MobileMenu />
    </>
  );
}
