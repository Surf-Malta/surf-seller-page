// src/components/home/FeaturesSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const featureIcons = {
  onboarding: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  payments: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  mobile: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  shipping: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
  reports: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  support: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

const iconColors = [
  { bg: "bg-violet-100", text: "text-violet-600" },
  { bg: "bg-emerald-100", text: "text-emerald-600" },
  { bg: "bg-blue-100", text: "text-blue-600" },
  { bg: "bg-orange-100", text: "text-orange-600" },
  { bg: "bg-pink-100", text: "text-pink-600" },
  { bg: "bg-cyan-100", text: "text-cyan-600" },
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

  // Default features matching Figma design
  const defaultFeatures = [
    {
      id: "1",
      title: "Easy Seller Onboarding",
      content: "Start selling online with simple tools made for local businesses.",
      iconKey: "onboarding",
      features: [
        "Quick registration & verification",
        "Dedicated seller dashboard",
        "Bulk CSV upload or integrations",
        "Shopify, WooCommerce & PrestaShop sync",
      ],
    },
    {
      id: "2",
      title: "Secure Payments",
      content: "Accept payments smoothly with trusted gateways.",
      iconKey: "payments",
      features: [
        "PayPal & local payment options",
        "PCI-compliant checkout",
        "Built-in fraud protection",
        "Easy payout setup",
      ],
    },
    {
      id: "3",
      title: "Mobile Excellence",
      content: "Deliver a smooth shopping experience on every device.",
      iconKey: "mobile",
      features: [
        "Fully responsive storefront",
        "Intuitive product navigation",
        "Fast mobile checkout",
        "Speed-optimized pages",
      ],
    },
    {
      id: "4",
      title: "Smart Shipping",
      content: "Flexible delivery tools for local & international customers.",
      iconKey: "shipping",
      features: [
        "Real-time shipping rates",
        "Live order tracking",
        "MaltaPost & DHL integration",
        "Custom shipping methods",
      ],
    },
    {
      id: "5",
      title: "Reports & Insights",
      content: "Make data-driven decisions with built-in analytics.",
      iconKey: "reports",
      features: [
        "Order & inventory stats",
        "Per-seller sales reports",
        "Customer insights",
        "Performance optimization",
      ],
    },
    {
      id: "6",
      title: "Dedicated Support",
      content: "Get help when you need it - always.",
      iconKey: "support",
      features: [
        "Personal onboarding assistance",
        "Knowledge base & tutorials",
        "Priority email & chat support",
        "Seller community group",
      ],
    },
  ];

  const displayFeatures =
    featureContent.length > 0
      ? featureContent.map((f, i) => ({
          ...f,
          iconKey: Object.keys(featureIcons)[i % 6],
        }))
      : defaultFeatures;

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <Container>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-flex items-center bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            FEATURES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything you need to sell in Malta
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional e-commerce tools designed specifically for Maltese businesses.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {displayFeatures.slice(0, 6).map((feature, index) => {
            const colorStyle = iconColors[index % iconColors.length];
            const iconKey = (feature as any).iconKey || Object.keys(featureIcons)[index % 6];

            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <div className={`w-14 h-14 ${colorStyle.bg} ${colorStyle.text} rounded-2xl flex items-center justify-center mb-5`}>
                  {featureIcons[iconKey as keyof typeof featureIcons] || featureIcons.onboarding}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  {feature.content}
                </p>

                {/* Feature list */}
                {(feature.features || []).length > 0 && (
                  <ul className="space-y-2.5">
                    {(feature.features || []).slice(0, 4).map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <svg
                          className={`w-5 h-5 ${colorStyle.text} mr-2 flex-shrink-0 mt-0.5`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
