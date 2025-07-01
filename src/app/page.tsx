import { HeroSection } from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Add proper spacing from header */}
      <div className="pt-20">
        <HeroSection
          hero={{
            id: "home-hero",
            title: "Launch Your Online Store Today",
            content:
              "Transform your business dreams into reality. Join 50,000+ successful entrepreneurs who've built their e-commerce empire with zero investment. Start selling online and reach millions of customers worldwide.",
            buttonText: "Start Your Store FREE",
            buttonLink: "/register",
          }}
        />

        {/* Success Stories Section */}
        <section className="section-ecommerce bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg mb-8">
                <span className="bg-green-500 w-3 h-3 rounded-full mr-3 animate-pulse"></span>
                <span className="text-sm font-medium text-gray-700">
                  ✨ SUCCESS STORIES
                </span>
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                <span className="gradient-text-ecommerce">Real Stories</span>
                <br />
                <span className="text-gray-800">Real Success</span>
              </h2>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how ordinary people built extraordinary e-commerce
                businesses
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="ecommerce-card p-8 text-center group hover-lift">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl">
                  👨‍💼
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Rajesh Kumar
                </h3>
                <p className="text-gray-600 mb-4 italic">
                  "From ₹0 to ₹5 lakhs monthly revenue in just 6 months. This
                  platform changed my life!"
                </p>
                <div className="text-sm text-gray-500">
                  Electronics Seller, Mumbai
                </div>
                <div className="mt-4 flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="ecommerce-card p-8 text-center group hover-lift">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl">
                  👩‍💼
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Priya Sharma
                </h3>
                <p className="text-gray-600 mb-4 italic">
                  "Started my fashion store from home. Now I have a team of 10
                  people!"
                </p>
                <div className="text-sm text-gray-500">
                  Fashion Boutique, Delhi
                </div>
                <div className="mt-4 flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="ecommerce-card p-8 text-center group hover-lift">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl">
                  👨‍🎓
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Amit Patel
                </h3>
                <p className="text-gray-600 mb-4 italic">
                  "College student to successful entrepreneur. Earning more than
                  my friends' salaries!"
                </p>
                <div className="text-sm text-gray-500">
                  Handmade Crafts, Ahmedabad
                </div>
                <div className="mt-4 flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section-ecommerce bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-3 mb-8">
                <span className="text-blue-600 font-semibold text-sm">
                  🚀 HOW IT WORKS
                </span>
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                <span className="gradient-text-ecommerce">Start Selling</span>
                <br />
                <span className="text-gray-800">In 3 Simple Steps</span>
              </h2>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                No technical knowledge required. Get your store up and running
                in minutes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
                    ⚡
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Register & Setup
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Create your account and set up your store in under 10 minutes.
                  Choose from beautiful templates and customize your brand.
                </p>
              </div>

              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                  <div
                    className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  >
                    📦
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Add Products
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Upload your products with high-quality images and
                  descriptions. Set competitive prices and manage your inventory
                  effortlessly.
                </p>
              </div>

              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <div
                    className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce"
                    style={{ animationDelay: "1s" }}
                  >
                    💰
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Start Earning
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Go live and start receiving orders! We handle payments,
                  provide analytics, and support you every step of the way.
                </p>
              </div>
            </div>

            <div className="text-center mt-16">
              <a
                href="/register"
                className="btn-ecommerce-primary inline-flex items-center"
              >
                Get Started Now - It's FREE!
                <svg
                  className="w-6 h-6 ml-2"
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

        {/* Pricing Teaser Section */}
        <section className="section-ecommerce bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg mb-8">
                <span className="bg-green-500 w-3 h-3 rounded-full mr-3 animate-pulse"></span>
                <span className="text-sm font-medium text-gray-700">
                  💎 TRANSPARENT PRICING
                </span>
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                <span className="gradient-text-ecommerce">No Hidden Fees</span>
                <br />
                <span className="text-gray-800">Pay Only When You Sell</span>
              </h2>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Start for free and pay only a small commission on successful
                sales. No setup fees, no monthly charges, no surprises.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="ecommerce-card p-10 text-center">
                <div className="text-6xl font-bold gradient-text-ecommerce mb-4">
                  ₹0
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Setup Cost
                </h3>
                <p className="text-gray-600 text-lg">
                  Launch your store without any upfront investment. Everything
                  you need to start is completely free.
                </p>
              </div>

              <div className="ecommerce-card p-10 text-center">
                <div className="text-6xl font-bold gradient-text-success mb-4">
                  5%
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Commission Only
                </h3>
                <p className="text-gray-600 text-lg">
                  Pay only when you make a sale. Our success is tied to your
                  success. No monthly fees, ever.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <a href="/pricing" className="btn-ecommerce-secondary">
                View Detailed Pricing
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="section-ecommerce bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-purple-50 rounded-full px-6 py-3 mb-8">
                <span className="text-purple-600 font-semibold text-sm">
                  ⭐ WHY CHOOSE US
                </span>
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                <span className="gradient-text-ecommerce">Built for</span>
                <br />
                <span className="text-gray-800">E-commerce Success</span>
              </h2>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to build, grow, and scale your online
                business
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="ecommerce-card p-8 text-center group hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mx-auto mb-6 flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  🚀
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Quick Launch
                </h3>
                <p className="text-gray-600">
                  Get your store live in under 10 minutes with our one-click
                  setup
                </p>
              </div>

              <div className="ecommerce-card p-8 text-center group hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mx-auto mb-6 flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  💳
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Secure Payments
                </h3>
                <p className="text-gray-600">
                  Accept all payment methods with bank-level security and
                  instant settlements
                </p>
              </div>

              <div className="ecommerce-card p-8 text-center group hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mx-auto mb-6 flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  📱
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Mobile Ready
                </h3>
                <p className="text-gray-600">
                  Your store works perfectly on all devices with app-like
                  experience
                </p>
              </div>

              <div className="ecommerce-card p-8 text-center group hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl mx-auto mb-6 flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  📊
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Smart Analytics
                </h3>
                <p className="text-gray-600">
                  Track sales, customers, and growth with real-time business
                  insights
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="section-ecommerce bg-gradient-to-r from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="ecommerce-card-featured p-16 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Ready to Join the E-commerce Revolution?
              </h2>
              <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Over 50,000 entrepreneurs have already transformed their lives.
                Your success story starts today.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <a
                  href="/register"
                  className="btn-ecommerce-primary text-xl px-12 py-4"
                >
                  🚀 Start Your Store FREE
                </a>
                <a
                  href="/how-it-works"
                  className="btn-ecommerce-secondary text-xl px-12 py-4"
                >
                  See How It Works
                </a>
              </div>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    100%
                  </div>
                  <div className="text-gray-600">Free to Start</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    24/7
                  </div>
                  <div className="text-gray-600">Expert Support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    10min
                  </div>
                  <div className="text-gray-600">Setup Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </div>
  );
}
