import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Floating shapes */}
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>

      <Container className="relative z-10">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center animate-scale-in">
            {/* 404 Number with gradient */}
            <div className="mb-12">
              <h1 className="text-[12rem] lg:text-[16rem] font-bold gradient-text leading-none mb-4">
                404
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            </div>

            {/* Content */}
            <div className="animate-slide-up">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Oops! Page Not Found
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                The page you're looking for seems to have wandered off into the
                digital void. Let's get you back on track!
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-bounce-in">
              <Link href="/">
                <button className="btn-primary-enhanced">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Go Home
                </button>
              </Link>
              <Link href="/register">
                <button className="btn-secondary-enhanced">
                  <svg
                    className="w-5 h-5 mr-2"
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
                  Start Selling
                </button>
              </Link>
            </div>

            {/* Additional help */}
            <div className="mt-16 p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Need Help?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                If you believe this is an error, please contact our support
                team.
              </p>
              <Link
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/50 to-transparent"></div>
    </div>
  );
}
