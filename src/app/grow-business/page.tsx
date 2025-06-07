import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function GrowBusinessPage() {
  const growthTools = [
    {
      title: "Marketing Campaigns",
      description: "Run targeted ads and promotional campaigns",
      icon: "📊",
      features: [
        "Social media integration",
        "Email marketing",
        "SMS campaigns",
      ],
    },
    {
      title: "Analytics & Insights",
      description: "Deep insights into your business performance",
      icon: "📈",
      features: ["Sales reports", "Customer behavior", "Trend analysis"],
    },
    {
      title: "SEO Optimization",
      description: "Improve your product visibility in search",
      icon: "🔍",
      features: [
        "Keyword optimization",
        "Product ranking",
        "Search visibility",
      ],
    },
    {
      title: "Customer Retention",
      description: "Tools to keep customers coming back",
      icon: "🎯",
      features: [
        "Loyalty programs",
        "Personalized offers",
        "Follow-up campaigns",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white py-20">
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Grow Your Business with{" "}
            <span className="text-green-600">Smart Tools</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scale your online business with our comprehensive growth toolkit
            designed for Indian sellers
          </p>
        </div>

        {/* Growth Tools */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {growthTools.map((tool, index) => (
            <div
              key={index}
              className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl border"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{tool.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <ul className="space-y-2">
                    {tool.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
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
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="bg-blue-50 rounded-xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">300%</div>
              <p className="text-gray-600">
                Average sales increase in first 6 months
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">50k+</div>
              <p className="text-gray-600">
                Sellers have grown their business with us
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                ₹10L+
              </div>
              <p className="text-gray-600">
                Average annual revenue of active sellers
              </p>
            </div>
          </div>
        </div>

        {/* Growth Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Your Growth Journey
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Month 1-2: Setup & Launch
                  </h3>
                  <p className="text-gray-600">
                    Get your store online and start receiving orders
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Month 3-6: Scale & Optimize
                  </h3>
                  <p className="text-gray-600">
                    Use analytics to optimize and scale your operations
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Month 6+: Expand & Dominate
                  </h3>
                  <p className="text-gray-600">
                    Expand to new categories and dominate your market
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="px-8 py-4 text-lg bg-green-600 hover:bg-green-700"
          >
            Start Growing Today
          </Button>
        </div>
      </Container>
    </div>
  );
}
