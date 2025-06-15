import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface ContentHeading {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  features?: string[];
}

interface FeaturesSectionProps {
  features: ContentHeading[];
  title?: string;
  subtitle?: string;
}

export function FeaturesSection({
  features,
  title = "Features",
  subtitle = "Everything you need to succeed",
}: FeaturesSectionProps) {
  if (features.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">
                {feature.imageUrl ? (
                  <img
                    src={feature.imageUrl}
                    alt={feature.title}
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  ["💰", "⚡", "🔒", "📈", "🎧", "📊", "✨", "🚀", "🎯", "🌟"][
                    index % 10
                  ]
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">{feature.content}</p>

              {feature.features && feature.features.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {feature.features.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {feature.buttonText && (
                <Link href={feature.buttonLink || "#"}>
                  <Button size="sm">{feature.buttonText}</Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
