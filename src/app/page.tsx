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

        {/* How It Works - Streamlined */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-gradient-to-r from-[#FF6900] to-[#FB2C36] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                🚀 Get Started
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Start Selling in{" "}
                <span className="text-[#9101CF]">5 Simple Steps</span>
              </h2>
              <p className="text-lg text-gray-600">
                Have your store up and running instantly.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection lines */}
              <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 transform -translate-y-1/2"></div>

              <div className="relative">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative z-10 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#AD46FF] to-[#F6339A] rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    Register & Set Up
                  </h3>
                  <p className="text-gray-600 text-center flex-grow">
                    Create your account using valid business information and get
                    approved instantly.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative z-10 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#AD46FF] to-[#F6339A] rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    Choose Your Plan
                  </h3>
                  <p className="text-gray-600 text-center flex-grow">
                    Select the plan that best suits your needs from our
                    carefully crafted options for local success.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative z-10 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#AD46FF] to-[#F6339A] rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    Add Products
                  </h3>
                  <p className="text-gray-600 text-center flex-grow">
                    Upload products manually or connect your website to import
                    your entire catalog in a flash.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative z-10 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#AD46FF] to-[#F6339A] rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    4
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    Choose Your Logistics
                  </h3>
                  <p className="text-gray-600 text-center flex-grow">
                    Pick from our list of trusted local delivery partners to
                    handle your shipments.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative z-10 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#AD46FF] to-[#F6339A] rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    5
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    Start Earning
                  </h3>
                  <p className="text-gray-600 text-center flex-grow">
                    Go live and start receiving orders right away!
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <a
                href="/register"
                className="inline-flex items-center bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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
              <div className="inline-flex items-center bg-gradient-to-r from-[#FF6900] to-[#FB2C36] px-4 py-2 rounded-full text-sm font-medium mb-4 text-white">
                💎 Transparent Pricing
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                <span className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] bg-clip-text text-transparent">
                  When You Succeed
                </span>
                , We Succeed
              </h2>
              <p className="text-lg text-gray-600">
                Start for free and pay only a small commission on successful
                sale.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-200 mt-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-5xl font-bold text-[#9810FA] mb-2">
                      €0
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Setup Cost
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Everything you need to start is completely free
                    </p>
                  </div>

                  <div className="border-l border-r border-gray-300 md:border-l md:border-r md:border-t-0 md:border-b-0 relative">
                    {/* Most Popular Badge - Different approach for mobile vs desktop */}
                    <div className="md:absolute md:-top-12 md:left-1/2 md:transform md:-translate-x-1/2 mb-4 md:mb-0">
                      <div className="bg-[#9810FA] text-white px-4 py-2 rounded-full text-sm font-bold inline-block">
                        Most Popular
                      </div>
                    </div>
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
                    className="inline-flex items-center bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
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
        <section className="py-16 bg-gradient-to-br from-[#9101CF] to-[#5D0196]">
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
