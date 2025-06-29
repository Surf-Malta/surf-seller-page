"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  boothTitle: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get user from localStorage (temporary solution)
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 lg:pt-24">
        <Container>
          <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Please log in to access your dashboard
              </h1>
              <Link href="/login">
                <Button variant="primary">Go to Login</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 lg:pt-24">
      <Container>
        <div className="py-8">
          {/* Welcome Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-4">
                🎉
              </div>
              <h1 className="text-4xl font-bold gradient-text mb-4">
                Welcome to Surf Seller, {user.name}!
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Your registration was successful! You're now ready to start
                selling.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">
                  🏪 Your Booth: "{user.boothTitle}"
                </h3>
                <p className="text-green-700 text-sm">
                  Your seller account is being reviewed. You'll receive an email
                  once it's approved (usually within 24 hours).
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Add Products
              </h3>
              <p className="text-gray-600 mb-4">
                Start listing your first products to sell
              </p>
              <Button variant="primary" className="w-full">
                Add Product
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Setup Booth
              </h3>
              <p className="text-gray-600 mb-4">
                Customize your store appearance and details
              </p>
              <Button variant="outline" className="w-full">
                Customize Booth
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                View Analytics
              </h3>
              <p className="text-gray-600 mb-4">
                Track your sales and performance
              </p>
              <Button variant="outline" className="w-full">
                View Stats
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Payment Setup
              </h3>
              <p className="text-gray-600 mb-4">Configure payment methods</p>
              <Button variant="outline" className="w-full">
                Setup Payments
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Shipping Settings
              </h3>
              <p className="text-gray-600 mb-4">Configure shipping options</p>
              <Button variant="outline" className="w-full">
                Setup Shipping
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Get Support
              </h3>
              <p className="text-gray-600 mb-4">
                Need help? We're here for you
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </div>
          </div> */}

          {/* Getting Started Guide */}
          {/* <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Getting Started Guide
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Account Created
                  </h3>
                  <p className="text-gray-600 text-sm">
                    You've successfully created your seller account
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Add Your First Product
                  </h3>
                  <p className="text-gray-600 text-sm">
                    List your first item to start selling
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">
                    Get Your First Sale
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Start earning money from your products
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">
                    Scale Your Business
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Grow your inventory and customer base
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </Container>
    </div>
  );
}
