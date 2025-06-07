import { Container } from "@/components/ui/Container";

export default function FeaturesSection() {
  const features = [
    {
      title: "Zero Investment",
      description: "Start selling without any upfront costs or hidden fees",
      icon: "💰",
    },
    {
      title: "Easy Setup",
      description: "Get your store up and running in just a few minutes",
      icon: "⚡",
    },
    {
      title: "Secure Payments",
      description: "Safe and secure payment processing for all transactions",
      icon: "🔒",
    },
    {
      title: "Marketing Tools",
      description: "Built-in tools to help you promote and grow your business",
      icon: "📈",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you succeed",
      icon: "🎧",
    },
    {
      title: "Analytics",
      description: "Detailed insights and reports to track your performance",
      icon: "📊",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Surf Seller?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to start, manage, and grow your online business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
