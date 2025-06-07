import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    {
      step: 1,
      title: "Create Your Account",
      description: "Sign up for free and set up your seller profile in minutes",
      icon: "👤",
    },
    {
      step: 2,
      title: "Add Your Products",
      description:
        "Upload your products with photos, descriptions, and pricing",
      icon: "📦",
    },
    {
      step: 3,
      title: "Start Selling",
      description:
        "Your products go live instantly and customers can start buying",
      icon: "🛒",
    },
    {
      step: 4,
      title: "Get Paid",
      description: "Receive payments directly to your account after each sale",
      icon: "💳",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-20">
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How Surf Seller Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start selling online in 4 simple steps. No technical knowledge
            required.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {steps.map((item, index) => (
            <div key={index} className="flex gap-6 p-6 bg-gray-50 rounded-xl">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
              </div>
              <div>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of successful sellers on our platform
          </p>
          <Link href="/register">
            <Button size="lg" className="px-8 py-4 text-lg">
              Start Selling Now
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
