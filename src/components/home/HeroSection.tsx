import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
            Start Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Online Business
            </span>{" "}
            Today
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 mb-8 animate-slide-up text-balance">
            Join thousands of sellers on Surf platform. Sell online with zero
            investment, manage your inventory, and grow your business with our
            comprehensive seller tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Link href="/register">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-lg"
              >
                Start Selling Now
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-lg"
              >
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      </div>
    </section>
  )
}