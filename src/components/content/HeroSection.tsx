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
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
            {hero.title}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 animate-slide-up">
            {hero.content}
          </p>
          {hero.buttonText && (
            <div className="animate-scale-in">
              <Link href={hero.buttonLink || "#"}>
                <Button size="lg" className="px-8 py-4 text-lg">
                  {hero.buttonText}
                </Button>
              </Link>
            </div>
          )}
        </div>
        {hero.imageUrl && (
          <div className="mt-12 text-center">
            <img
              src={hero.imageUrl}
              alt={hero.title}
              className="mx-auto rounded-lg shadow-lg max-w-4xl w-full"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
