import { Container } from "@/components/ui/Container";

interface ContentHeading {
  id: string;
  title: string;
  content: string;
}

interface FAQSectionProps {
  faqs: ContentHeading[];
  title?: string;
}

export function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
}: FAQSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {faq.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{faq.content}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
