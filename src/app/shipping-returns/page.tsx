import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function ShippingReturnsPage() {
  const shippingFeatures = [
    {
      title: "Free Shipping Labels",
      description: "Generate and print shipping labels at no extra cost",
      icon: "🏷️",
    },
    {
      title: "Multiple Carriers",
      description: "Choose from India Post, BlueDart, DTDC, and more",
      icon: "🚚",
    },
    {
      title: "Real-time Tracking",
      description: "Track shipments and update customers automatically",
      icon: "📍",
    },
    {
      title: "Easy Returns",
      description: "Simplified return process with automated approvals",
      icon: "↩️",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-20">
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Shipping & Returns Made Simple
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline your order fulfillment with our integrated shipping and
            returns management
          </p>
        </div>

        {/* Shipping Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Hassle-free Shipping
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {shippingFeatures.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-blue-50 rounded-xl"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Competitive Shipping Rates
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                Local Delivery
              </h3>
              <div className="text-2xl font-bold text-green-600 mb-2">₹40</div>
              <p className="text-gray-600">Within city limits</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                Domestic Shipping
              </h3>
              <div className="text-2xl font-bold text-blue-600 mb-2">₹60</div>
              <p className="text-gray-600">Anywhere in India</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                Express Delivery
              </h3>
              <div className="text-2xl font-bold text-purple-600 mb-2">
                ₹120
              </div>
              <p className="text-gray-600">Next day delivery</p>
            </div>
          </div>
        </div>

        {/* Returns Policy */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Customer-friendly Returns
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-green-50 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  7-Day Return Window
                </h3>
                <p className="text-gray-600">
                  Customers can return products within 7 days of delivery for a
                  full refund, no questions asked.
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Free Return Pickup
                </h3>
                <p className="text-gray-600">
                  We arrange free pickup for returns, making it convenient for
                  your customers and building trust.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="px-8 py-4 text-lg">
            Start Shipping Today
          </Button>
        </div>
      </Container>
    </div>
  );
}
