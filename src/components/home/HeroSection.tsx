"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
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

export default function HeroSection() {
  const [heroContent, setHeroContent] = useState<ContentHeading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!realtimeDb) {
      setLoading(false);
      return;
    }

    try {
      // Fetch content from Firebase
      const contentRef = ref(realtimeDb, "nav_items_content");
      const unsubscribe = onValue(contentRef, (snapshot) => {
        if (snapshot.exists()) {
          const data: NavItemContent = snapshot.val();

          // Find hero section from any navigation item (typically from home page)
          let foundHero: ContentHeading | null = null;

          Object.values(data).forEach((pageContent) => {
            if (pageContent.headings) {
              const hero = pageContent.headings.find(
                (heading) => heading.type === "hero" && heading.isVisible
              );
              if (hero && !foundHero) {
                foundHero = hero;
              }
            }
          });

          setHeroContent(foundHero);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching hero content:", error);
      setLoading(false);
    }
  }, []);

  // Fallback content if no hero section is found in Firebase
  const fallbackContent = {
    title: "Start Your Online Business Today",
    content:
      "Join thousands of sellers on Surf platform. Sell online with zero investment, manage your inventory, and grow your business with our comprehensive seller tools.",
    buttonText: "Start Selling Now",
    buttonLink: "/register",
  };

  const displayContent = heroContent || fallbackContent;

  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 rounded mb-6 max-w-3xl mx-auto"></div>
              <div className="h-6 bg-gray-300 rounded mb-4 max-w-2xl mx-auto"></div>
              <div className="h-6 bg-gray-300 rounded mb-8 max-w-xl mx-auto"></div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="h-12 bg-gray-300 rounded w-40"></div>
                <div className="h-12 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
            {displayContent.title?.includes("Online Business") ? (
              <>
                Start Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Online Business
                </span>{" "}
                Today
              </>
            ) : (
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {displayContent.title}
              </span>
            )}
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 mb-8 animate-slide-up text-balance">
            {displayContent.content}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Link href={displayContent.buttonLink || "/register"}>
              <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
                {displayContent.buttonText || "Start Selling Now"}
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-lg"
              >
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      </div>
    </section>
  );
}
