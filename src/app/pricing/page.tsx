import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "Up to 50 products",
        "Basic analytics",
        "Email support",
        "Standard listing",
        "Mobile app access",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Growth",
      price: "₹299",
      period: "/month",
      description: "Best for growing businesses",
      features: [
        "Unlimited products",
        "Advanced analytics",
        "Priority support",
        "Featured listings",
        "Marketing tools",
        "Bulk upload",
        "Custom branding",
      ],
      buttonText: "Start Free Trial",
      popular: true,
    },
    {
      name: "Pro",
      price: "₹599",
      period: "/month",
      description: "For established sellers",
      features: [
        "Everything in Growth",
        "Dedicated account manager",
        "API access",
        "White-label solution",
        "Advanced integrations",
        "Custom reports",
        "24/7 phone support",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white py-20">
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your business needs. Start free, upgrade
            anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl border-2 p-8 relative ${
                plan.popular ? "border-blue-500 shadow-lg" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            All plans include our core selling features with no setup fees
          </p>
          <Link href="/contact" className="text-blue-600 hover:underline">
            Need a custom plan? Contact us
          </Link>
        </div>
      </Container>
    </div>
  );
}
