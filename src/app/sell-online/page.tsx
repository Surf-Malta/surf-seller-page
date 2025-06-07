import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function SellOnlinePage() {
  const benefits = [
    {
      title: "Reach Millions of Customers",
      description: "Access to a vast customer base across the country",
      icon: "🌍",
    },
    {
      title: "No Inventory Investment",
      description: "Start selling without buying stock upfront",
      icon: "📦",
    },
    {
      title: "Instant Store Setup",
      description: "Get your online store live in under 10 minutes",
      icon: "⚡",
    },
    {
      title: "Multiple Payment Options",
      description: "Accept payments via UPI, cards, wallets, and COD",
      icon: "💳",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Start Selling Online with{" "}
              <span className="text-green-600">Zero Investment</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your business with our comprehensive online selling
              platform. No setup fees, no monthly charges, no hidden costs.
            </p>
            <Link href="/register">
              <Button
                size="lg"
                className="px-8 py-4 text-lg bg-green-600 hover:bg-green-700"
              >
                Start Selling Today
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <Container>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Sell Online with Surf?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Simple 3-Step Process
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Account</h3>
              <p className="text-gray-600">
                Sign up for free and verify your details
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">List Products</h3>
              <p className="text-gray-600">
                Add your products with photos and descriptions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Earning</h3>
              <p className="text-gray-600">
                Receive orders and get paid instantly
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
