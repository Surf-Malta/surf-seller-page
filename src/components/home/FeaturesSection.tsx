"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";

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

          // Find all feature sections from navigation items
          const features: ContentHeading[] = [];

          Object.values(data).forEach((pageContent) => {
            if (pageContent.headings) {
              const pageFeatures = pageContent.headings.filter(
                (heading) => heading.type === "feature" && heading.isVisible
              );
              features.push(...pageFeatures);
            }
          });

          // Sort by order
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
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-300 rounded mb-4 max-w-md mx-auto"></div>
              <div className="h-6 bg-gray-300 rounded max-w-lg mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gray-300 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // If no features found in Firebase, show empty state
  if (featureContent.length === 0) {
    return (
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Features Coming Soon
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our features are being configured. Please check back later.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Surf Seller?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to start, manage, and grow your online business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureContent.map((feature, index) => (
            <div
              key={feature.id}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">
                {/* Use a simple icon system or get from Firebase */}
                {
                  ["💰", "⚡", "🔒", "📈", "🎧", "📊", "✨", "🚀", "🎯", "🌟"][
                    index % 10
                  ]
                }
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.content}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
