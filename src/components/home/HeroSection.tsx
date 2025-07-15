"use client";

// src/components/home/HeroSection.tsx
import { Container } from "@/components/ui/Container";
import Link from "next/link";

interface ContentHeading {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface HeroSectionProps {
  hero: ContentHeading;
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 overflow-hidden pt-16 sm:pt-20 lg:pt-0">
      {/* Modern geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating elements - smaller on mobile */}
      <div className="absolute top-16 sm:top-20 left-6 sm:left-10 w-2 h-2 sm:w-4 sm:h-4 bg-blue-500 rounded-full animate-pulse opacity-60"></div>
      <div
        className="absolute top-24 sm:top-32 right-12 sm:right-20 w-3 h-3 sm:w-6 sm:h-6 bg-purple-500 rounded-full animate-pulse opacity-40"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-16 sm:bottom-20 left-12 sm:left-20 w-2 h-2 sm:w-3 sm:h-3 bg-indigo-500 rounded-full animate-pulse opacity-50"
        style={{ animationDelay: "2s" }}
      ></div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 xl:gap-20 items-center min-h-[75vh] sm:min-h-[80vh] lg:min-h-[85vh] py-8 sm:py-12">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 shadow-lg">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                🚀 Join our pool of local businesses
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent block">
                  Grow Your Online Store
                </span>
                <span className="bg-gradient-to-r from-[#FF6900] to-[#FB2C36] bg-clip-text text-transparent block">
                  The Smarter Way
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {hero.content}
              </p>
            </div>

            {/* CTA Buttons - Mobile optimized */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href={hero.buttonLink || "/register"}>
                <button className="group relative bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl lg:rounded-2xl font-semibold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden w-full sm:w-auto">
                  <span className="relative z-10 flex items-center justify-center">
                    <span>
                      <span className="hidden sm:inline">
                        Get Started For Free
                      </span>
                      <span className="sm:hidden">Get Started For Free</span>
                      <span className="text-xs opacity-80 ml-1">
                        (T&C Apply)
                      </span>
                    </span>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform"
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
                  </span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </Link>

              <button
                className="group bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-300 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl lg:rounded-2xl font-semibold text-sm sm:text-base hover:bg-white hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                onClick={() =>
                  window.open("https://youtube.com/@surfsellerhub", "_blank")
                }
              >
                <span className="flex items-center justify-center">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V9a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z"
                    />
                  </svg>
                  Seller Guide
                </span>
              </button>
            </div>
          </div>

          {/* Right Visual - Mobile optimized */}
          <div className="relative mt-6 lg:mt-0">
            {/* Main dashboard mockup */}
            <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transform rotate-1 sm:rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] p-2.5 sm:p-4">
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/30 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/30 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/30 rounded-full"></div>
                  <div className="flex-1 text-center">
                    <div className="text-white font-medium text-xs sm:text-sm">
                      Surf Seller Dashboard
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
                {/* Stats cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="bg-green-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-green-200">
                    <div className="text-green-800 text-xs font-medium">
                      Sales Today
                    </div>
                    <div className="text-green-900 text-sm sm:text-lg font-bold">
                      €2,450
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-blue-200">
                    <div className="text-blue-800 text-xs font-medium">
                      Orders
                    </div>
                    <div className="text-blue-900 text-sm sm:text-lg font-bold">
                      47
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-purple-200">
                    <div className="text-purple-800 text-xs font-medium">
                      Products
                    </div>
                    <div className="text-purple-900 text-sm sm:text-lg font-bold">
                      156
                    </div>
                  </div>
                </div>

                {/* Chart area */}
                <div className="bg-gray-50 rounded-lg sm:rounded-xl h-20 sm:h-28 lg:h-32 border border-gray-200 flex items-end justify-between p-2 sm:p-3 lg:p-4">
                  <div
                    className="w-2 sm:w-3 lg:w-4 bg-blue-500 rounded-t"
                    style={{ height: "60%" }}
                  ></div>
                  <div
                    className="w-2 sm:w-3 lg:w-4 bg-blue-500 rounded-t"
                    style={{ height: "80%" }}
                  ></div>
                  <div
                    className="w-2 sm:w-3 lg:w-4 bg-blue-500 rounded-t"
                    style={{ height: "45%" }}
                  ></div>
                  <div
                    className="w-2 sm:w-3 lg:w-4 bg-blue-500 rounded-t"
                    style={{ height: "90%" }}
                  ></div>
                  <div
                    className="w-2 sm:w-3 lg:w-4 bg-blue-500 rounded-t"
                    style={{ height: "70%" }}
                  ></div>
                  <div
                    className="w-2 sm:w-3 lg:w-4 bg-blue-500 rounded-t"
                    style={{ height: "95%" }}
                  ></div>
                  <div
                    className="w-2 sm:w-3 lg:w-4 bg-blue-500 rounded-t"
                    style={{ height: "85%" }}
                  ></div>
                </div>

                {/* Product list */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-md sm:rounded-lg"></div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-900">
                        Malta Honey Jar
                      </div>
                      <div className="text-xs text-gray-600">
                        €12.99 • 15 sold
                      </div>
                    </div>
                    <div className="text-green-600 text-xs font-bold">
                      +€194
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-md sm:rounded-lg"></div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-900">
                        Handmade Crafts
                      </div>
                      <div className="text-xs text-gray-600">
                        €25.50 • 8 sold
                      </div>
                    </div>
                    <div className="text-green-600 text-xs font-bold">
                      +€204
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating success indicators - Mobile optimized */}
            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-green-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs font-bold shadow-lg animate-bounce">
              ✅ Store Live
            </div>
            <div
              className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-blue-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs font-bold shadow-lg animate-pulse"
              style={{ animationDelay: "1s" }}
            >
              📈 Sales Growing
            </div>
            <div
              className="absolute top-1/2 -right-4 sm:-right-8 bg-purple-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs font-bold shadow-lg animate-bounce"
              style={{ animationDelay: "2s" }}
            >
              🌍 Local Reach
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
