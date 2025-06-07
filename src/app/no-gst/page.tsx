import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NoGSTPage() {
  const benefits = [
    {
      title: "No GST Registration Required",
      description: "Start selling immediately without GST paperwork",
      icon: "📄",
    },
    {
      title: "Simplified Compliance",
      description: "We handle all tax-related formalities for you",
      icon: "✅",
    },
    {
      title: "Focus on Business",
      description: "Spend time growing sales, not managing paperwork",
      icon: "📈",
    },
    {
      title: "Legal Protection",
      description: "Stay compliant with all government regulations",
      icon: "🛡️",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-20">
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Sell Online Without{" "}
            <span className="text-red-600">GST Hassles</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your online business today without worrying about GST
            registration, returns, or compliance issues
          </p>
        </div>

        {/* Hero Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* How it Works */}
        <div className="bg-gray-50 rounded-xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            How We Handle GST for You
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  We Act as Aggregator
                </h3>
                <p className="text-gray-600">
                  Surf acts as the GST-registered entity for all transactions
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Automatic Compliance
                </h3>
                <p className="text-gray-600">
                  All GST calculations and filings are handled automatically
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  You Get Clean Money
                </h3>
                <p className="text-gray-600">
                  Receive your earnings without any GST complications
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Information */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Stay Legally Compliant
          </h2>
          <div className="max-w-4xl mx-auto bg-blue-50 p-8 rounded-xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  For Sellers Under ₹20 Lakhs Annual Turnover
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    No GST registration required
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Automatically compliant with composition scheme
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Full legal protection under aggregator model
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    No monthly/quarterly returns needed
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Our GST Compliance Promise
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Valid GST registration and compliance
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Timely GST return filing
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Proper tax invoicing and documentation
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    24/7 compliance monitoring
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Selling Without GST Worries?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of sellers who trust us with their GST compliance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Start Selling Now
            </Button>
            <Button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold bg-transparent">
              Learn More
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-80">
            * No setup fees • No hidden charges • Start in 5 minutes
          </p>
        </div>
      </Container>
    </div>
  );
}
