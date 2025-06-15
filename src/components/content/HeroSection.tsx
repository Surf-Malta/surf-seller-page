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
}

interface HeroSectionProps {
  hero: ContentHeading;
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="relative pt-20 lg:pt-24 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Floating shapes */}
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-5xl mx-auto py-12 lg:py-16">
          <div className="animate-bounce-in">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              <span className="gradient-text">{hero.title}</span>
            </h1>
          </div>
          <div className="animate-slide-up">
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              {hero.content}
            </p>
          </div>
          {hero.buttonText && (
            <div className="animate-scale-in">
              <Link href={hero.buttonLink || "#"}>
                <button className="btn-primary-enhanced inline-flex items-center space-x-2">
                  <span>{hero.buttonText}</span>
                  <svg
                    className="w-5 h-5"
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
            </div>
          )}

          {hero.imageUrl && (
            <div className="mt-16 text-center animate-fade-in">
              <div className="relative inline-block">
                <img
                  src={hero.imageUrl}
                  alt={hero.title}
                  className="mx-auto rounded-3xl shadow-2xl max-w-5xl w-full transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-20 -z-10"></div>
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
