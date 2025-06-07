import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function CommunicationPage() {
  const features = [
    {
      title: "Real-time Chat",
      description: "Instant messaging with customers for quick support",
      icon: "💬",
    },
    {
      title: "Order Updates",
      description: "Automated notifications for order status changes",
      icon: "📱",
    },
    {
      title: "Bulk Messaging",
      description: "Send promotional messages to multiple customers",
      icon: "📢",
    },
    {
      title: "Customer Support",
      description: "24/7 helpdesk integration for customer queries",
      icon: "🎧",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-20">
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Seamless Customer Communication
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build stronger relationships with your customers through our
            integrated communication tools
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Stay Connected with Your Customers
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our communication platform helps you maintain excellent customer
              relationships through multiple channels - chat, email, SMS, and
              push notifications.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">
                Communication Dashboard
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                  <span className="text-sm">Active Chats</span>
                  <span className="font-bold text-green-600">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <span className="text-sm">Messages Sent Today</span>
                  <span className="font-bold text-blue-600">47</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                  <span className="text-sm">Response Rate</span>
                  <span className="font-bold text-purple-600">98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="px-8 py-4 text-lg">
            Start Communicating Better
          </Button>
        </div>
      </Container>
    </div>
  );
}
