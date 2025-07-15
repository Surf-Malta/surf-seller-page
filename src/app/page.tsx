// src/app/page.tsx
import { HeroSection } from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Reduced spacing */}
      <div className="pt-16">
        <HeroSection
          hero={{
            id: "home-hero",
            title: "Grow your online the smarter way",
            content:
              "Join Malta's local eCommerce Network and reach thousands of customers across the Island.",
            buttonText: "Get Started For Free (T&C Apply)",
            buttonLink: "/register",
          }}
        />

        {/* <section className="py-8 bg-gradient-to-r from-gray-50 to-gray-100 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-600 mb-4">
              Trusted by entrepreneurs worldwide
            </div>
            <div className="flex justify-center items-center space-x-12 opacity-60">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                <span className="font-medium">50K+ Active Sellers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="font-medium">₹100Cr+ Revenue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-medium">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </section> */}

        {/* <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why{" "}
                <span className="text-blue-600">Entrepreneurs Choose Surf</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to build, grow and scale your online
                business
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Quick Launch</h3>
                <p className="text-sm text-gray-600">
                  Get your store live in under 10 minutes
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">💳</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Secure Payments
                </h3>
                <p className="text-sm text-gray-600">
                  Accept all payment methods with bank-level security
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Mobile Ready</h3>
                <p className="text-sm text-gray-600">
                  Your store works perfectly on all devices
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Smart Analytics
                </h3>
                <p className="text-sm text-gray-600">
                  Track sales and growth with real-time insights
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* How It Works - Streamlined */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                🚀 Get Started
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Start Selling in{" "}
                <span className="text-blue-600">5 Simple Steps</span>
              </h2>
              <p className="text-lg text-gray-600">
                Have your store up and running instantly.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection lines */}
              <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 transform -translate-y-1/2"></div>

              <div className="relative">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    Register & Set Up
                  </h3>
                  <p className="text-gray-600 text-center">
                    Create your account using valid business information and get
                    approved instantly.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    Choose Your Plan
                  </h3>
                  <p className="text-gray-600 text-center">
                    Select the plan that best suits your needs from our
                    carefully crafted options for local success.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    Add Products
                  </h3>
                  <p className="text-gray-600 text-center">
                    Upload products manually or connect your website to import
                    your entire catalog in a flash.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    4
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    Choose Your Logistics
                  </h3>
                  <p className="text-gray-600 text-center">
                    Pick from our list of trusted local delivery partners to
                    handle your shipments.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    5
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    Start Earning
                  </h3>
                  <p className="text-gray-600 text-center">
                    Go live and start receiving orders right away!
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <a
                href="/register"
                className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                Get Started Now - It's FREE!
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
              </a>
            </div>
          </div>
        </section>

        <FeaturesSection />

        {/* Pricing - Compact & Modern */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                💎 Transparent Pricing
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                <span className="text-green-600">When You Succeed</span>, We
                Succeed
              </h2>
              <p className="text-lg text-gray-600">
                Start for free and pay only a small commission on successful
                sale.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-200">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-5xl font-bold text-green-600 mb-2">
                      €0
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Setup Cost
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Everything you need to start is completely free
                    </p>
                  </div>

                  <div className="border-l border-r border-gray-300 md:border-l md:border-r md:border-t-0 md:border-b-0">
                    <div className="text-5xl font-bold text-blue-600 mb-2">
                      Low
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      commission
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Pay only when you make a sale
                    </p>
                  </div>

                  <div>
                    <div className="text-5xl font-bold text-purple-600 mb-2">
                      0%
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Commission
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Enjoy our 0% commission offer to support your growth
                    </p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <a
                    href="/pricing"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                  >
                    Register Now
                    <svg
                      className="w-4 h-4 ml-2"
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
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof - New section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Join Malta's{" "}
                <span className="text-yellow-300">Success Stories</span>
              </h2>
              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                Real businesses, real growth, real results on our platform
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl mb-4">👨‍💼</div>
                  <blockquote className="text-white/90 italic mb-4">
                    "From €0 to €50k monthly revenue in 6 months. This platform
                    transformed my business."
                  </blockquote>
                  <div className="text-yellow-300 font-semibold">
                    - Alex M., Electronics
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl mb-4">👩‍💼</div>
                  <blockquote className="text-white/90 italic mb-4">
                    "Started from home, now I have a team of 8. Malta's best
                    e-commerce platform."
                  </blockquote>
                  <div className="text-yellow-300 font-semibold">
                    - Maria S., Fashion
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl mb-4">👨‍🎓</div>
                  <blockquote className="text-white/90 italic mb-4">
                    "Student to entrepreneur. Earning more than my friends'
                    full-time jobs."
                  </blockquote>
                  <div className="text-yellow-300 font-semibold">
                    - David C., Crafts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <CTASection /> */}
      </div>
    </div>
  );
}
