import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface ContentHeading {
  id: string;
  title: string;
  content: string;
  price?: string;
  features?: string[];
  buttonText?: string;
  buttonLink?: string;
}

interface PricingSectionProps {
  pricing: ContentHeading[];
  title?: string;
  subtitle?: string;
}

export function PricingSection({
  pricing,
  title = "Pricing",
  subtitle = "Choose the plan that fits your needs",
}: PricingSectionProps) {
  if (pricing.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricing.map((plan, index) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl shadow-lg p-8 text-center border-2 transition-all duration-300 hover:shadow-xl ${
                index === 1
                  ? "border-blue-500 scale-105"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {plan.title}
              </h3>
              {plan.price && (
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {plan.price}
                </div>
              )}
              <p className="text-gray-600 mb-6">{plan.content}</p>

              {plan.features && plan.features.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center">
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
              )}

              {plan.buttonText && (
                <Link href={plan.buttonLink || "#"}>
                  <Button
                    size="lg"
                    className={`w-full ${
                      index === 1 ? "bg-blue-600 hover:bg-blue-700" : ""
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
