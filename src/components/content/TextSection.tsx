import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface ContentHeading {
  id: string;
  title: string;
  content: string;
  buttonText?: string;
  buttonLink?: string;
}

interface TextSectionProps {
  textItems: ContentHeading[];
}

export function TextSection({ textItems }: TextSectionProps) {
  if (textItems.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto space-y-12">
          {textItems.map((text) => (
            <div key={text.id} className="prose max-w-none">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {text.title}
              </h2>
              <div className="text-xl text-gray-600 leading-relaxed">
                {text.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              {text.buttonText && (
                <div className="mt-6">
                  <Link href={text.buttonLink || "#"}>
                    <Button size="lg">{text.buttonText}</Button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
