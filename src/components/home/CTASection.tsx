import { Container } from "@/components/ui/Container";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="section-ecommerce bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Floating e-commerce icons */}
          <div className="absolute top-20 left-10 animate-float opacity-10">
            <svg
              className="w-20 h-20 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </div>

          <div
            className="absolute top-32 right-16 animate-float opacity-10"
            style={{ animationDelay: "2s" }}
          >
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path
                fillRule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div
            className="absolute bottom-24 left-20 animate-float opacity-10"
            style={{ animationDelay: "4s" }}
          >
            <svg
              className="w-18 h-18 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div
            className="absolute bottom-32 right-24 animate-float opacity-10"
            style={{ animationDelay: "1s" }}
          >
            <svg
              className="w-14 h-14 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center text-white max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 animate-scale-in">
            <span className="bg-green-400 w-3 h-3 rounded-full mr-3 animate-pulse"></span>
            <span className="text-sm font-medium">
              🚀 Limited Time: Zero Setup Fees
            </span>
          </div>

          {/* Headline */}
          <div className="animate-bounce-in">
            <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Ready to</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Transform Your Business?
              </span>
            </h2>
          </div>

          {/* Description */}
          <div className="animate-slide-up">
            <p className="text-2xl lg:text-3xl mb-8 opacity-90 leading-relaxed font-light">
              Join over 50,000 successful entrepreneurs who've built their
              online empire with us.
              <br />
              <span className="text-yellow-400 font-semibold">
                Start selling today and see results tomorrow.
              </span>
            </p>
          </div>

          {/* Success metrics */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 animate-fade-in">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                ₹10L+
              </div>
              <div className="text-white/80">Average Monthly Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">
                48hrs
              </div>
              <div className="text-white/80">Average Store Launch Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-white/80">Customer Satisfaction Rate</div>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 animate-scale-in">
            <Link href="/register">
              <button className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105">
                <span className="relative z-10 flex items-center">
                  🚀 Start Your Store FREE
                  <svg
                    className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform"
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
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
              </button>
            </Link>

            <Link href="/how-it-works">
              <button className="group bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 hover:border-white/50 transform hover:-translate-y-2 transition-all duration-300">
                <span className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform"
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
                  Watch Demo
                </span>
              </button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="animate-fade-in">
            <p className="text-white/60 mb-6 text-lg">
              Trusted by entrepreneurs worldwide
            </p>

            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Trust badges */}
              <div className="flex items-center space-x-2">
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
                <span className="text-sm font-medium">SSL Secured</span>
              </div>

              <div className="flex items-center space-x-2">
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
                <span className="text-sm font-medium">100% Safe</span>
              </div>

              <div className="flex items-center space-x-2">
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium">5-Star Rated</span>
              </div>

              <div className="flex items-center space-x-2">
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
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
