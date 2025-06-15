import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 lg:pt-24">
      <Container>
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)]">
          <div className="w-full max-w-md">
            <div className="elevated-card p-10 animate-scale-in">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold gradient-text mb-4">
                  Welcome Back
                </h1>
                <p className="text-gray-600">Sign in to your account</p>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rounded" />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button className="btn-primary-enhanced w-full">Sign In</button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
