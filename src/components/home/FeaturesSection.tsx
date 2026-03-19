// src/components/home/FeaturesSection.tsx
"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";
import { SectionHeader } from "./SectionHeader";
import { BarChart3, CreditCard, Shield, ShoppingCart, Smartphone, Truck } from "lucide-react";
import { motion } from "motion/react";
import { fade, stagger } from "@/utils/animations";

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
    icon: ShoppingCart,
    color: "var(--blue)",
    bgColor: "var(--blue-light)",
    iconBg: "bg-blue-500",
  },
  {
    icon: CreditCard,
    color: "var(--green)",
    bgColor: "var(--green-light)",
    iconBg: "bg-green-500",
  },
  {
    icon: Smartphone,
    color: "var(--primary)",
    bgColor: "var(--primary-light)",
    iconBg: "bg-purple-500",
  },
  {
    icon: Truck,
    color: "var(--orange)",
    bgColor: "var(--orange-light)",
    iconBg: "bg-orange-500",
  },
  {
    icon: BarChart3,
    color: "var(--indigo)",
    bgColor: "var(--indigo-light)",
    iconBg: "bg-indigo-500",
  },
  {
    icon: Shield,
    color: "var(--gray)",
    bgColor: "var(--gray-light)",
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
                (heading) => heading.type === "feature"
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
      content: "Start selling with simple tools built for local businesses.",
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
      content: "Get help when you need it — always.",
      features: [
        "Personal onboarding assistance",
        "Knowledge base & tutorials",
        "Priority email & chat support",
        "Seller community group",
      ],
    },
  ];

  const displayFeatures =
    featureContent.length > 0 ? featureContent : defaultFeatures;

  return (
    <section className="relative py-8 sm:py-12 bg-[var(--bg-light)] via-white to-blue-50/30 overflow-hidden">
      {/* Background decoration */}
      {/* <div className="absolute inset-0">
        <div className="absolute top-12 sm:top-20 left-12 sm:left-20 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-12 sm:bottom-20 right-12 sm:right-20 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div> */}

      <Container className="relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge="Features"
          title="Everything you need to sell in Malta"
          subtitle="Professional e-commerce tools designed specifically for Maltese businesses."
        />


        {/* Features Grid - Mobile optimized */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 md:mx-12">
          {displayFeatures.slice(0, 6).map((feature, index) => {
            const featureStyle = premiumFeatures[index % premiumFeatures.length];

            return (
              <motion.div
                variants={fade}
                custom={index}
                key={feature.id}
                className="bg-white border border-black/[0.04] rounded-2xl p-7 hover:shadow-[0_4px_24px_-6px_rgba(0,0,0,0.06)] transition-all"
              >
                {/* Icon inside colored square */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: featureStyle.bgColor }}
                >
                  {feature.imageUrl ? (
                    <img
                      src={feature.imageUrl}
                      alt={feature.title}
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    <featureStyle.icon className="w-5 h-5" style={{ color: featureStyle.color }} />
                  )}
                </div>

                {/* Title & Content */}
                <h3 className="mt-5 text-[#0f172a] text-[16px] font-bold">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-[#64748b] text-[14px] leading-relaxed font-normal">
                  {feature.content}
                </p>

                {/* Feature list */}
                {feature.features && feature.features.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {feature.features.slice(0, 4).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <svg
                          className="w-3.5 h-3.5 shrink-0"
                          fill="none"
                          viewBox="0 0 12 12"
                        >
                          <path
                            d="M10.28 3.22a.75.75 0 0 0-1.06-1.06L4.5 6.88 2.78 5.16a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5z"
                            fill={featureStyle.color}
                          />
                        </svg>
                        <span className="text-[#334155] text-[13px] font-medium">{item}</span>
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
