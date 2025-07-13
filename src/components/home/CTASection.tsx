// src/components/home/CTASection.tsx
import { Container } from "@/components/ui/Container";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
        <div
          className="absolute top-40 right-32 w-3 h-3 bg-blue-300/40 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-40 w-2 h-2 bg-purple-300/40 rounded-full animate-bounce"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-4 h-4 bg-cyan-300/30 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center text-white max-w-6xl mx-auto">
          {/* Premium badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-8 py-4 mb-8 animate-scale-in">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4 animate-pulse"></div>
            <span className="text-lg font-semibold text-yellow-300">
              🚀 Limited Time: Zero Setup Fees Forever
            </span>
          </div>

          {/* Main headline */}
          <div className="animate-bounce-in">
            <h2 className="text-5xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="text-white">Ready to</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Dominate Malta's
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                E-commerce Market?
              </span>
            </h2>
          </div>

          {/* Premium description */}
          <div className="animate-slide-up">
            <p className="text-2xl lg:text-3xl mb-8 text-blue-100 leading-relaxed font-light max-w-4xl mx-auto">
              Join Malta's elite circle of{" "}
              <span className="text-yellow-300 font-semibold">
                successful entrepreneurs
              </span>{" "}
              who've transformed their businesses into digital powerhouses.
            </p>

            <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto">
              Start selling today. Scale tomorrow.{" "}
              <span className="text-yellow-300 font-semibold">
                Dominate forever.
              </span>
            </p>
          </div>

          {/* Premium success metrics */}
          <div className="grid md:grid-cols-4 gap-8 mb-16 animate-fade-in">
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-3">
                €2M+
              </div>
              <div className="text-blue-200 text-lg">Revenue Generated</div>
              <div className="text-blue-300 text-sm">This Year Alone</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-400 mb-3">5K+</div>
              <div className="text-blue-200 text-lg">Active Sellers</div>
              <div className="text-blue-300 text-sm">Growing Daily</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-400 mb-3">24hrs</div>
              <div className="text-blue-200 text-lg">Avg Launch Time</div>
              <div className="text-blue-300 text-sm">Record: 10 Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400 mb-3">
                99.9%
              </div>
              <div className="text-blue-200 text-lg">Success Rate</div>
              <div className="text-blue-300 text-sm">Industry Leading</div>
            </div>
          </div>

          {/* Premium CTA buttons */}
          <div className="flex flex-col lg:flex-row gap-6 justify-center mb-16 animate-scale-in max-w-2xl mx-auto">
            <Link href="/register" className="flex-1">
              <button className="group relative w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-gray-900 px-10 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-2 transition-all duration-500 hover:scale-105 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  🚀 Launch My Empire FREE
                  <svg
                    className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                {/* Premium shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
              </button>
            </Link>

            <Link href="/how-it-works" className="flex-1">
              <button className="group w-full bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-6 rounded-2xl font-bold text-xl hover:bg-white/20 hover:border-white/50 transform hover:-translate-y-2 transition-all duration-500">
                <span className="flex items-center justify-center">
                  <svg
                    className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300"
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
                  Watch Success Stories
                </span>
              </button>
            </Link>
          </div>

          {/* Premium trust indicators */}
          <div className="animate-fade-in">
            <p className="text-blue-200 mb-8 text-lg">
              Trusted by Malta's most ambitious entrepreneurs
            </p>

            <div className="flex flex-wrap justify-center items-center gap-12 opacity-80">
              {/* Enhanced trust badges */}
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Bank-Level Security</span>
              </div>

              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Malta Compliant</span>
              </div>

              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">5-Star Platform</span>
              </div>

              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">24/7 Expert Support</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Premium bottom wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
