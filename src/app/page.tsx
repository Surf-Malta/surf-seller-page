// src/app/page.tsx
import { HeroSection } from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Mobile optimized spacing */}
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

        {/* How It Works - Mobile optimized */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <div className="inline-flex items-center bg-gradient-to-r from-[#FF6900] to-[#FB2C36] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                🚀 Get Started
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Start Selling in{" "}
                <span className="text-[#9101CF]">5 Simple Steps</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 px-2">
                Have your store up and running instantly.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative">
              {/* Connection lines - hidden on mobile */}
              <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 transform -translate-y-1/2"></div>

              <div className="relative">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-[#AD46FF] to-[#F6339A] rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-5 lg:mb-6 mx-auto">
                    1
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
                    Register & Set Up
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 text-center flex-grow leading-relaxed">
                    Create your account using valid business information and get
                    approved instantly.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-[#AD46FF] to-[#F6339A] rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-5 lg:mb-6 mx-auto">
                    2
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
                    Choose Your Plan
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 text-center flex-grow leading-relaxed">
                    Select the plan that best suits your needs from our
                    carefully crafted options for local success.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-[#AD46FF] to-[#F6339A] rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-5 lg:mb-6 mx-auto">
                    3
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
                    Add Products
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 text-center flex-grow leading-relaxed">
                    Upload products manually or connect your website to import
                    your entire catalog in a flash.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mt-6 sm:mt-8 lg:mt-12">
              <div className="relative">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-[#AD46FF] to-[#F6339A] rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-5 lg:mb-6 mx-auto">
                    4
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
                    Choose Your Logistics
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 text-center flex-grow leading-relaxed">
                    Pick from our list of trusted local delivery partners to
                    handle your shipments.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-[#AD46FF] to-[#F6339A] rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-5 lg:mb-6 mx-auto">
                    5
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
                    Start Earning
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 text-center flex-grow leading-relaxed">
                    Go live and start receiving orders right away!
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 sm:mt-10 lg:mt-12">
              <a
                href="/register"
                className="inline-flex items-center bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <span className="hidden sm:inline">
                  Get Started Now - It's FREE!
                </span>
                <span className="sm:hidden">Get Started Now - It's FREE!</span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2"
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

        {/* Pricing - Mobile optimized */}
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <div className="inline-flex items-center bg-gradient-to-r from-[#FF6900] to-[#FB2C36] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 text-white">
                💎 Transparent Pricing
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
                <span className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] bg-clip-text text-transparent">
                  When You Succeed
                </span>
                , We Succeed
              </h2>
              <p className="text-base sm:text-lg text-gray-600 px-2">
                Start for free and pay only a small commission on successful
                sale.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-200 mt-6 sm:mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9810FA] mb-2">
                      €0
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      Setup Cost
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Everything you need to start is completely free
                    </p>
                  </div>

                  <div className="sm:border-l sm:border-r border-gray-300 border-t border-b sm:border-t-0 sm:border-b-0 pt-6 pb-6 sm:pt-0 sm:pb-0 relative">
                    {/* Most Popular Badge - Responsive positioning */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 sm:-top-12">
                      <div className="bg-[#9810FA] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold inline-block">
                        Most Popular
                      </div>
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-2 mt-4 sm:mt-0">
                      Low
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      commission
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Pay only when you make a sale
                    </p>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600 mb-2">
                      0%
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      Commission
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Enjoy our 0% commission offer to support your growth
                    </p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 text-center">
                  <a
                    href="/pricing"
                    className="inline-flex items-center bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-blue-700 transition-all duration-300"
                  >
                    Register Now
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2"
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

        {/* Social Proof - Mobile optimized */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-[#9101CF] to-[#5D0196]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-2">
                Join Malta's{" "}
                <span className="text-yellow-300">Success Stories</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto px-2">
                Real businesses, real growth, real results on our platform
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20">
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">👨‍💼</div>
                  <blockquote className="text-sm sm:text-base text-white/90 italic mb-3 sm:mb-4 leading-relaxed">
                    "From €0 to €50k monthly revenue in 6 months. This platform
                    transformed my business."
                  </blockquote>
                  <div className="text-yellow-300 font-semibold text-sm sm:text-base">
                    - Alex M., Electronics
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20">
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">👩‍💼</div>
                  <blockquote className="text-sm sm:text-base text-white/90 italic mb-3 sm:mb-4 leading-relaxed">
                    "Started from home, now I have a team of 8. Malta's best
                    e-commerce platform."
                  </blockquote>
                  <div className="text-yellow-300 font-semibold text-sm sm:text-base">
                    - Maria S., Fashion
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20 sm:col-span-2 lg:col-span-1">
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">👨‍🎓</div>
                  <blockquote className="text-sm sm:text-base text-white/90 italic mb-3 sm:mb-4 leading-relaxed">
                    "Student to entrepreneur. Earning more than my friends'
                    full-time jobs."
                  </blockquote>
                  <div className="text-yellow-300 font-semibold text-sm sm:text-base">
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
