// src/components/home/FeaturesSection.tsx
"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";
import Link from "next/link";

interface ContentHeading {
  id: string;
  title: string;
  order: number;
  content: string;
  isVisible: boolean;
  type: "text" | "hero" | "feature" | "pricing" | "testimonial" | "faq";
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  price?: string;
  features?: string[];
}

interface NavItemContent {
  [navItemId: string]: {
    headings: ContentHeading[];
  };
}

const premiumFeatures = [
  {
    icon: "🛒",
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100",
    iconBg: "bg-blue-500",
  },
  {
    icon: "💳",
    color: "from-green-500 to-green-600",
    bgColor: "from-green-50 to-green-100",
    iconBg: "bg-green-500",
  },
  {
    icon: "📱",
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100",
    iconBg: "bg-purple-500",
  },
  {
    icon: "🚚",
    color: "from-orange-500 to-orange-600",
    bgColor: "from-orange-50 to-orange-100",
    iconBg: "bg-orange-500",
  },
  {
    icon: "📊",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "from-indigo-50 to-indigo-100",
    iconBg: "bg-indigo-500",
  },
  {
    icon: "🔐",
    color: "from-gray-500 to-gray-600",
    bgColor: "from-gray-50 to-gray-100",
    iconBg: "bg-gray-500",
  },
];

export default function FeaturesSection() {
  const [featureContent, setFeatureContent] = useState<ContentHeading[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!realtimeDb) {
      setLoading(false);
      return;
    }

    try {
      const contentRef = ref(realtimeDb, "nav_items_content");
      const unsubscribe = onValue(contentRef, (snapshot) => {
        if (snapshot.exists()) {
          const data: NavItemContent = snapshot.val();
          const features: ContentHeading[] = [];

          Object.values(data).forEach((pageContent) => {
            if (pageContent.headings) {
              const pageFeatures = pageContent.headings.filter(
                (heading) =>
                  heading.type === "feature" &&
                  heading.isVisible &&
                  // Filter out placeholder content
                  !heading.title.toLowerCase().includes("feature") &&
                  !heading.content
                    .toLowerCase()
                    .includes("describe your feature") &&
                  heading.title.trim() !== "" &&
                  heading.content.trim() !== ""
              );
              features.push(...pageFeatures);
            }
          });

          features.sort((a, b) => a.order - b.order);

          // Only use Firebase features if we have valid, non-placeholder content
          if (features.length > 0) {
            setFeatureContent(features);
          } else {
            setFeatureContent([]);
          }
        } else {
          setFeatureContent([]);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      setFeatureContent([]);
      setLoading(false);
    }
  }, []);

  // Premium default features
  const defaultFeatures = [
    {
      id: "1",
      title: "Easy Seller Onboarding",
      content:
        "Start selling online with simple tools made for local businesses.",
      features: [
        "Quick seller registration",
        "Access to a dedicated seller dashboard",
        "List products manually, via bulk CSV upload, or through integrations",
        "Connect your existing store from Shopify, WooCommerce, or PrestaShop",
      ],
    },
    {
      id: "2",
      title: "Secure Payment Integration",
      content: "Accept payments smoothly with trusted gateways.",
      features: [
        "PayPal and local payment options",
        "Secure checkout with PCI compliance",
        "Fraud protection",
        "Easy seller payout setup",
      ],
    },
    {
      id: "3",
      title: "Mobile Commerce Excellence",
      content: "Deliver a smooth shopping experience across all devices.",
      features: [
        "Mobile-responsive shopping experience",
        "Easy navigation and product displays",
        "Fast and secure mobile checkout",
        "Optimized for speed and usability",
      ],
    },
    {
      id: "4",
      title: "Smart Shipping & Delivery",
      content:
        "Flexible shipping tools to serve local and international customers.",
      features: [
        "Real-time shipping rates",
        "Real-time tracking",
        "Flexible delivery with local partners including MaltaPost and DHL",
        "Seller-specific shipping methods",
      ],
    },
    {
      id: "5",
      title: "Built-in Reports & Insights",
      content: "Make informed decisions with marketplace analytics.",
      features: [
        "Order, product & inventory stats",
        "Sales reports per seller",
        "Customer insights",
        "Performance optimization",
      ],
    },
    {
      id: "6",
      title: "Dedicated Seller Support",
      content: "Get help when you need it — always.",
      features: [
        "Onboarding assistance for sellers",
        "Knowledge base and tutorials",
        "Priority seller support via email & chat",
        "Community support group",
      ],
    },
  ];

  const displayFeatures =
    featureContent.length > 0 ? featureContent : defaultFeatures;

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-[#FF6900] to-[#FB2C36] text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <span className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></span>
            Enterprise-Grade Features
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              To Grow Your Online Presence in Malta
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional e-commerce tools designed specifically for Malta
            businesses
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {displayFeatures.slice(0, 6).map((feature, index) => {
            const featureStyle =
              premiumFeatures[index % premiumFeatures.length];

            return (
              <div
                key={feature.id}
                className={`group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  index === 1 ? "lg:scale-105 border-blue-200 shadow-lg" : ""
                }`}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${featureStyle.bgColor} rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                ></div>

                {/* Featured badge for middle card */}
                {/* {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                )} */}

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 ${featureStyle.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {feature.imageUrl ? (
                      <img
                        src={feature.imageUrl}
                        alt={feature.title}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <span className="text-3xl text-white">
                        {featureStyle.icon}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.content}
                  </p>

                  {/* Feature list */}
                  {(feature.features || []).length > 0 && (
                    <ul className="space-y-3">
                      {(feature.features || []).slice(0, 4).map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-gray-700"
                        >
                          <div
                            className={`w-5 h-5 ${featureStyle.iconBg} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}
                          >
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
                          <span className="font-medium text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA Button */}
                  {feature.buttonText && (
                    <div className="mt-6">
                      <Link href={feature.buttonLink || "#"}>
                        <button
                          className={`w-full bg-gradient-to-r ${featureStyle.color} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                        >
                          {feature.buttonText}
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32"></div>

            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to <span className="text-yellow-300">Transform</span> Your
                Business?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join Malta's most successful e-commerce marketplace platform and
                start scaling your business today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link href="/register" className="flex-1">
                  <button className="w-full bg-white text-blue-600 py-3 px-6 rounded-xl font-bold text-base hover:bg-gray-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 whitespace-nowrap">
                    Create Free Account
                  </button>
                </Link>
                <a
                  href="https://surf.mt/vendor.php?dispatch=auth.login_form&return_url=vendor.php"
                  className="flex-1"
                >
                  <button className="w-full bg-white/10 backdrop-blur-sm text-white border border-white/30 py-3 px-6 rounded-xl font-bold text-base hover:bg-white/20 transition-all duration-300 whitespace-nowrap">
                    Seller Login
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
