// src/app/pricing/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

export default function PricingPage() {
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  // Malta-specific pricing plans
  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for testing the waters",
      icon: "🚀",
      price: "Free",
      popular: false,
      features: [
        { name: "Product Limit", value: "Up to 200 SKUs", included: true },
        { name: "Commission", value: "10% commission", included: true },
        {
          name: "Transaction Fee",
          value: "3.5% transaction fee",
          included: true,
        },
        { name: "Seller Dashboard", value: "", included: true },
        {
          name: "Order & Inventory Management",
          value: "Basic",
          included: true,
        },
        { name: "Product Bulk Import (CSV/XML)", value: "", included: true },
        {
          name: "Branded Seller Storefront",
          value: "Basic Branding",
          included: true,
        },
        { name: "Seller Ratings & Reviews", value: "", included: true },
        { name: "Support", value: "Email (48hr SLA)", included: true },
        { name: "Shopify/WooCommerce Integration", value: "", included: true },
        { name: "API Access", value: "", included: true },
        { name: "Buyer–Seller Messaging", value: "", included: true },
        { name: "Seller App", value: "", included: true },
        { name: "Product SEO (Meta, Tags, Slugs)", value: "", included: false },
        {
          name: "Video Listings / Product Banners",
          value: "",
          included: false,
        },
        { name: "Discounts & Coupons Engine", value: "", included: false },
        { name: "Shipping & Tax Configurations", value: "", included: false },
        { name: "Advanced Analytics", value: "", included: false },
      ],
    },
    {
      id: "growth",
      name: "Growth",
      description: "Ideal for growing businesses",
      icon: "⭐",
      price: "€49",
      priceUnit: "/month",
      popular: true,
      features: [
        { name: "Product Limit", value: "Up to 2000 SKUs", included: true },
        { name: "Commission", value: "8% commission", included: true },
        {
          name: "Transaction Fee",
          value: "3.2% transaction fee",
          included: true,
        },
        { name: "Seller Dashboard", value: "", included: true },
        { name: "Order & Inventory Management", value: "Full", included: true },
        { name: "Product Bulk Import (CSV/XML)", value: "", included: true },
        { name: "Product SEO (Meta, Tags, Slugs)", value: "", included: true },
        { name: "Video Listings / Product Banners", value: "", included: true },
        {
          name: "Branded Seller Storefront",
          value: "Custom Logo",
          included: true,
        },
        { name: "Discounts & Coupons Engine", value: "", included: true },
        { name: "Shipping & Tax Configurations", value: "", included: true },
        { name: "Advanced Analytics", value: "", included: true },
        { name: "Seller Ratings & Reviews", value: "", included: true },
        { name: "Support", value: "Chat & Email (24hr SLA)", included: true },
        { name: "Shopify/WooCommerce Integration", value: "", included: true },
        { name: "API Access", value: "", included: true },
        { name: "Buyer–Seller Messaging", value: "", included: true },
        { name: "Seller App", value: "Up to 2 users", included: true },
        {
          name: "Personalized Banners",
          value: "Up to 5/month",
          included: true,
        },
        { name: "SEO Optimiser", value: "", included: true },
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large brands and high-volume sellers",
      icon: "👑",
      price: "Custom",
      popular: false,
      features: [
        {
          name: "Tailored features for large brands",
          value: "",
          included: true,
        },
        { name: "High-volume seller support", value: "", included: true },
        {
          name: "Priority support & dedicated account manager",
          value: "",
          included: true,
        },
        { name: "Advanced integrations", value: "", included: true },
        { name: "Custom commission rates", value: "", included: true },
        { name: "White-label solutions", value: "", included: true },
        { name: "Advanced reporting & analytics", value: "", included: true },
        {
          name: "Multi-location inventory management",
          value: "",
          included: true,
        },
        { name: "Custom API endpoints", value: "", included: true },
        { name: "Dedicated server resources", value: "", included: true },
      ],
    },
  ];

  const comingSoonFeatures = [
    {
      name: "Ad Credit for Google/Meta",
      description: "Free advertising credits to boost your product visibility",
    },
    {
      name: "Turbo Visibility (Google Shopping)",
      description: "Enhanced product listings on Google Shopping",
    },
    {
      name: "Affiliate/Influencer Exposure",
      description: "Connect with local influencers and affiliates",
    },
    {
      name: "Product Bundles",
      description: "Create product bundles and packages (Free & Growth)",
    },
    {
      name: "Personalized Banners",
      description: "Custom promotional banners (Free)",
    },
    {
      name: "SEO Optimiser",
      description: "Advanced SEO tools and optimization (Free)",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 lg:pt-24 relative overflow-hidden">
      {/* Subtle floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-purple-200 rounded-full px-6 py-3 shadow-lg mb-8">
            <span className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] w-3 h-3 rounded-full mr-3"></span>
            <span className="text-sm font-medium text-purple-700">
              💎 Plans Made for Local Sellers
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Plans Made for
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] bg-clip-text text-transparent">
              Local Sellers
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Start for free and grow your business with tools designed for Malta.
          </p>

          <Link href="/register">
            <button className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-[#8001BF] hover:to-[#4D0186] transition-all duration-300 shadow-lg hover:-translate-y-1">
              🚀 Start Selling for Free
            </button>
          </Link>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative group ${
                plan.popular
                  ? "lg:scale-105 border-2 border-orange-300"
                  : "border border-gray-200"
              } bg-white/95 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <div className="text-3xl mb-4">{plan.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold bg-gradient-to-r from-[#9101CF] to-[#5D0196] bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  {plan.priceUnit && (
                    <span className="text-gray-600 text-lg">
                      {plan.priceUnit}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      {feature.included ? (
                        <div className="w-5 h-5 bg-gradient-to-r from-[#9101CF] to-[#5D0196] rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span
                        className={`text-sm ${
                          feature.included ? "text-gray-700" : "text-gray-400"
                        }`}
                      >
                        <strong>{feature.name}</strong>
                        {feature.value && (
                          <span className="text-gray-600 ml-1">
                            {feature.value}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="text-center">
                {plan.id === "starter" && (
                  <Link href="/register">
                    <button className="w-full bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#8001BF] hover:to-[#4D0186] transition-all duration-300">
                      Start Free
                    </button>
                  </Link>
                )}
                {plan.id === "growth" && (
                  <Link href="/register">
                    <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                      Upgrade to Growth
                    </button>
                  </Link>
                )}
                {plan.id === "enterprise" && (
                  <a href="mailto:hello@surf.mt">
                    <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300">
                      Contact to Discuss Custom Plan
                    </button>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                What's Coming Soon
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] bg-clip-text text-transparent">
                to All Plans
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Exciting new features currently in development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonFeatures.map((feature, index) => (
              <div
                key={feature.name}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-center">
                  <div className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    Launching Soon
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-4">
              Want early access? Contact us at
            </p>
            <a
              href="mailto:hello@surf.mt"
              className="inline-flex items-center bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#8001BF] hover:to-[#4D0186] transition-all duration-300"
            >
              📧 hello@surf.mt
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Frequently Asked
              </span>
              <span className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-[#9101CF] to-[#5D0196] rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  ?
                </span>
                How does the commission structure work?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Commission is automatically deducted from your sales. Starter
                plan has 10% commission, Growth plan has 8% commission, and
                Enterprise plans have custom rates.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-[#9101CF] to-[#5D0196] rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  ?
                </span>
                Can I upgrade my plan anytime?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! You can upgrade from Starter to Growth at any time. Your
                new features will be activated immediately and billing will be
                prorated.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-[#9101CF] to-[#5D0196] rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  ?
                </span>
                What's included in the transaction fee?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Transaction fees cover payment processing, security, and
                platform maintenance. Starter plan: 3.5%, Growth plan: 3.2%,
                Enterprise: custom rates.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-[#9101CF] to-[#5D0196] rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  ?
                </span>
                How many products can I list?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Starter plan allows up to 200 SKUs, Growth plan supports up to
                2000 SKUs, and Enterprise plans have unlimited products with
                custom configurations.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32"></div>

            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
                Join Malta's most innovative e-commerce platform designed
                specifically for local sellers
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <Link href="/register" className="flex-1">
                  <button className="w-full bg-white text-purple-600 py-4 px-8 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300">
                    🚀 Start Free Today
                  </button>
                </Link>
                <a href="mailto:hello@surf.mt" className="flex-1">
                  <button className="w-full bg-white/10 backdrop-blur-sm text-white border border-white/30 py-4 px-8 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                    📧 Contact Sales
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
