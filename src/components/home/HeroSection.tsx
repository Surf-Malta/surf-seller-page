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
    <section className="relative pt-20 lg:pt-24 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* E-commerce floating shapes */}
      <div className="ecommerce-floating-shapes">
        <div className="ecommerce-shape"></div>
        <div className="ecommerce-shape"></div>
        <div className="ecommerce-shape"></div>
        <div className="ecommerce-shape"></div>
      </div>

      {/* Shopping cart icons floating */}
      <div className="absolute top-20 left-10 animate-float opacity-20">
        <svg
          className="w-16 h-16 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
      </div>

      <div
        className="absolute top-32 right-20 animate-float opacity-20"
        style={{ animationDelay: "2s" }}
      >
        <svg
          className="w-12 h-12 text-indigo-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div
        className="absolute bottom-32 left-20 animate-float opacity-20"
        style={{ animationDelay: "4s" }}
      >
        <svg
          className="w-14 h-14 text-purple-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
          <path
            fillRule="evenodd"
            d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-6xl mx-auto py-12 lg:py-16">
          <div className="animate-bounce-in">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg mb-8">
              <span className="bg-green-500 w-3 h-3 rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">
                🚀 Join our pool of local businesses
              </span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              <span className="gradient-text-ecommerce">Grow Your</span>
              <br />
              <span className="text-gray-800">Online Store</span>
              <br />
              <span className="gradient-text-success">The Smarter Way</span>
            </h1>
          </div>

          <div className="animate-slide-up">
            <p className="text-2xl lg:text-3xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
              Join Malta's local eCommerce Network and reach thousands of
              customers across the Island.
            </p>
          </div>

          {/* Call to action buttons */}
          <div className="animate-scale-in mb-16 flex flex-col sm:flex-row gap-6 justify-center">
            <Link href={hero.buttonLink || "/register"}>
              <button className="btn-ecommerce-primary inline-flex items-center space-x-3 group">
                <span>
                  {hero.buttonText || "Get Started For Free (T&C Apply)"}
                </span>
                <svg
                  className="w-6 h-6 group-hover:translate-x-1 transition-transform"
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
              </button>
            </Link>

            <Link href="/how-it-works">
              <button className="btn-ecommerce-secondary inline-flex items-center space-x-3 group">
                <svg
                  className="w-6 h-6 group-hover:scale-110 transition-transform"
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
                <span>See How It Works</span>
              </button>
            </Link>
          </div>

          {/* Key benefits highlight */}
          <div className="grid md:grid-cols-3 gap-8 mb-20 animate-fade-in">
            <div className="ecommerce-card p-8 text-center group hover-lift">
              <div className="ecommerce-icon-container-alt bg-gradient-to-r from-green-500 to-emerald-500 text-white mx-auto">
                💰
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Low Investment
              </h3>
              <p className="text-gray-600">
                Start selling without any upfront costs
              </p>
            </div>

            <div className="ecommerce-card p-8 text-center group hover-lift">
              <div className="ecommerce-icon-container-alt bg-gradient-to-r from-blue-500 to-indigo-500 text-white mx-auto">
                🌟
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Easy Setup
              </h3>
              <p className="text-gray-600">
                Launch your store in under 10 minutes
              </p>
            </div>

            <div className="ecommerce-card p-8 text-center group hover-lift">
              <div className="ecommerce-icon-container-alt bg-gradient-to-r from-purple-500 to-pink-500 text-white mx-auto">
                📈
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                High visibility
              </h3>
              <p className="text-gray-600">
                Reach customers worldwide instantly
              </p>
            </div>
          </div>

          {hero.imageUrl && (
            <div className="mt-20 text-center animate-fade-in">
              <div className="relative inline-block max-w-5xl">
                <img
                  src={hero.imageUrl}
                  alt={hero.title}
                  className="w-full rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-20 -z-10"></div>

                {/* Floating success indicators */}
                <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">
                  ✅ Store Live
                </div>
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">
                  📊 Sales Growing
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">
                  🚀 Global Reach
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
