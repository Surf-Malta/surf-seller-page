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

const ecommerceIcons = [
  { icon: "🛒", color: "from-blue-500 to-indigo-500" },
  { icon: "💳", color: "from-green-500 to-emerald-500" },
  { icon: "📱", color: "from-purple-500 to-pink-500" },
  { icon: "🚚", color: "from-orange-500 to-red-500" },
  { icon: "📊", color: "from-teal-500 to-cyan-500" },
  { icon: "🔐", color: "from-gray-600 to-gray-800" },
  { icon: "⚡", color: "from-yellow-500 to-orange-500" },
  { icon: "🌟", color: "from-indigo-500 to-purple-500" },
  { icon: "📈", color: "from-pink-500 to-rose-500" },
  { icon: "🎯", color: "from-cyan-500 to-blue-500" },
];

export default function FeaturesSection() {
  const [featureContent, setFeatureContent] = useState<ContentHeading[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!realtimeDb) {
      console.warn("Firebase not initialized - features will not load");
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
                (heading) => heading.type === "feature" && heading.isVisible
              );
              features.push(...pageFeatures);
            }
          });

          features.sort((a, b) => a.order - b.order);
          setFeatureContent(features);
        } else {
          console.warn("No feature content found in Firebase");
          setFeatureContent([]);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching feature content:", error);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <section className="section-ecommerce bg-white">
        <Container>
          <div className="text-center mb-20">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 rounded mb-6 max-w-md mx-auto"></div>
              <div className="h-6 bg-gray-300 rounded max-w-lg mx-auto"></div>
            </div>
          </div>
          <div className="ecommerce-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl p-8">
                  <div className="w-16 h-16 bg-gray-300 rounded-xl mb-6"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Default features if none found in Firebase
  const defaultFeatures = [
    {
      id: "1",
      title: "Easy Store Setup",
      content:
        "Launch your online store in minutes with our intuitive setup wizard. No technical knowledge required.",
      features: [
        "One-click store creation",
        "Pre-built templates",
        "Mobile-responsive design",
      ],
    },
    {
      id: "2",
      title: "Secure Payments",
      content:
        "Accept payments safely with our integrated payment gateway supporting all major payment methods.",
      features: ["Multi-payment support", "SSL encryption", "Fraud protection"],
    },
    {
      id: "3",
      title: "Mobile Commerce",
      content:
        "Reach customers on any device with our fully mobile-optimized e-commerce platform.",
      features: [
        "Mobile-first design",
        "App-like experience",
        "Touch-friendly interface",
      ],
    },
    {
      id: "4",
      title: "Smart Logistics",
      content:
        "Streamline your shipping with automated logistics and real-time tracking for customers.",
      features: ["Auto shipping rates", "Multiple carriers", "Order tracking"],
    },
    {
      id: "5",
      title: "Analytics Dashboard",
      content:
        "Make data-driven decisions with comprehensive analytics and sales reporting tools.",
      features: ["Real-time metrics", "Sales insights", "Customer analytics"],
    },
    {
      id: "6",
      title: "24/7 Support",
      content:
        "Get help whenever you need it with our dedicated customer support team.",
      features: ["Live chat support", "Email assistance", "Knowledge base"],
    },
  ];

  const displayFeatures =
    featureContent.length > 0 ? featureContent : defaultFeatures;

  return (
    <section className="section-ecommerce bg-white relative overflow-hidden">
      {/* Floating shapes */}
      <div className="ecommerce-floating-shapes">
        <div className="ecommerce-shape"></div>
        <div className="ecommerce-shape"></div>
        <div className="ecommerce-shape"></div>
        <div className="ecommerce-shape"></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-3 mb-8">
            <span className="text-blue-600 font-semibold text-sm">
              🎯 POWERFUL FEATURES
            </span>
          </div>

          <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
            <span className="gradient-text-ecommerce">Everything You Need</span>
            <br />
            <span className="text-gray-800">To Succeed Online</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From store setup to scaling globally, we've got all the tools and
            features you need to build a thriving e-commerce business.
          </p>
        </div>

        <div className="ecommerce-grid-featured">
          {displayFeatures.map((feature, index) => {
            const iconData = ecommerceIcons[index % ecommerceIcons.length];

            return (
              <div
                key={feature.id}
                className={`${
                  index === 1 ? "ecommerce-card-featured" : "ecommerce-card"
                } p-10 group animate-scale-in hover-lift`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`ecommerce-icon-container bg-gradient-to-r ${iconData.color} text-white group-hover:rotate-12 hover-glow`}
                >
                  {feature.imageUrl ? (
                    <img
                      src={feature.imageUrl}
                      alt={feature.title}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <span className="text-3xl">{iconData.icon}</span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                  {feature.content}
                </p>

                {(feature.features || []).length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {(feature.features || []).map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-green-600"
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
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {feature.buttonText && (
                  <div className="mt-8">
                    <Link href={feature.buttonLink || "#"}>
                      <button className="btn-ecommerce-secondary w-full group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                        {feature.buttonText}
                        <svg
                          className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-20 animate-fade-in">
          <div className="ecommerce-card-featured p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Start Your E-commerce Journey?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of successful sellers who've built their online
              empire with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <button className="btn-ecommerce-primary">
                  Start Your Store Now
                  <svg
                    className="w-5 h-5 ml-2 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </Link>
              <Link href="/pricing">
                <button className="btn-ecommerce-secondary">
                  View Pricing Plans
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
