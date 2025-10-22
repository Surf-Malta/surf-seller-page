"use client";

// src/components/home/HeroSection.tsx
import { useState, useEffect } from "react";
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

// Banner images for the carousel
const bannerImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    alt: "E-commerce Success",
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    alt: "Business Growth",
    gradient: "from-green-500/20 to-teal-500/20",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    alt: "Online Store",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
    alt: "Digital Commerce",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
];

export function HeroSection({ hero }: HeroSectionProps) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Auto-rotate banners every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 overflow-hidden pt-16 sm:pt-20 lg:pt-30">
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
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-[75vh] sm:min-h-[80vh] lg:min-h-[65vh] py-8 sm:py-12 lg:py-10">
          {/* Left Content - Title and CTA */}
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

          {/* Right - Floating Banner Carousel */}
          <div className="relative mt-6 lg:mt-0">
            {/* Carousel Container */}
            <div className="relative h-auto overflow-hidden rounded-3xl">
              {/* Floating banners */}
              <div className="relative">
                {bannerImages.map((banner, index) => {
                  const position =
                    (index - currentBannerIndex + bannerImages.length) %
                    bannerImages.length;
                  const isCurrent = position === 0;

                  return (
                    <div
                      key={banner.id}
                      className={`transition-all duration-1000 ease-in-out ${
                        isCurrent
                          ? "opacity-100 translate-y-0 relative"
                          : "opacity-0 translate-y-full absolute inset-0"
                      }`}
                    >
                      {isCurrent && (
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group hover:scale-105 transition-transform duration-500">
                          {/* Image - Full height */}
                          <img
                            src={banner.src}
                            alt={banner.alt}
                            className="w-full h-96 sm:h-[450px] lg:h-[500px] object-cover"
                          />

                          {/* Gradient overlay */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${banner.gradient} mix-blend-overlay`}
                          ></div>

                          {/* Content overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                            <h3 className="text-white font-bold text-2xl sm:text-3xl mb-2">
                              {banner.alt}
                            </h3>
                            <p className="text-white/90 text-base sm:text-lg">
                              Empowering Malta's e-commerce future
                            </p>
                          </div>

                          {/* Shine effect on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Carousel indicators */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2">
                {bannerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBannerIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentBannerIndex === index
                        ? "bg-white w-10"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
            <div
              className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full blur-xl opacity-60 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
