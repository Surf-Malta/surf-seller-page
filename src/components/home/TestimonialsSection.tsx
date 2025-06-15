import { Container } from "@/components/ui/Container";

interface ContentHeading {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
}

interface TestimonialsSectionProps {
  testimonials: ContentHeading[];
  title?: string;
}

export function TestimonialsSection({
  testimonials,
  title = "What Our Customers Say",
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-blue-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-center">
                {testimonial.imageUrl && (
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.title}
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {testimonial.title}
                </h3>
                <blockquote className="text-gray-600 italic">
                  "{testimonial.content}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
