"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";
import Link from "next/link";
import { notFound } from "next/navigation";

import { HeroSection } from "@/components/content/HeroSection";
import { FeaturesSection } from "@/components/content/FeaturesSection";
import { PricingSection } from "@/components/content/PricingSection";
import { TestimonialsSection } from "@/components/content/TestimonialsSection";
import { FAQSection } from "@/components/content/FAQSection";
import { TextSection } from "@/components/content/TextSection";

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

interface PageContent {
  headings: ContentHeading[];
}

interface NavItemContent {
  [navItemId: string]: PageContent;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  description: string;
  order: number;
}

export default function DynamicPage() {
  const params = useParams();
  const [pageContent, setPageContent] = useState<ContentHeading[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageExists, setPageExists] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  // Construct the current path from params
  const currentPath = Array.isArray(params.slug)
    ? `/${params.slug.join("/")}`
    : `/${params.slug}`;

  useEffect(() => {
    if (!realtimeDb) {
      setLoading(false);
      return;
    }

    try {
      // Fetch navigation items to check if this route exists
      const navItemsRef = ref(realtimeDb, "navigation_items");
      const navUnsubscribe = onValue(navItemsRef, (snapshot) => {
        if (snapshot.exists()) {
          const navData = snapshot.val();
          const navItems: NavigationItem[] = Object.keys(navData)
            .map((key) => ({
              id: key,
              ...navData[key],
            }))
            .sort((a, b) => a.order - b.order);

          // Check if current path matches any navigation item
          const currentPage = navItems.find(
            (item) => item.href === currentPath
          );

          if (currentPage) {
            setPageExists(true);
            setPageTitle(currentPage.label);

            // Fetch content for this specific page
            const contentRef = ref(realtimeDb, "nav_items_content");
            const contentUnsubscribe = onValue(
              contentRef,
              (contentSnapshot) => {
                if (contentSnapshot.exists()) {
                  const contentData: NavItemContent = contentSnapshot.val();
                  const pageContentData = contentData[currentPage.id];

                  if (pageContentData && pageContentData.headings) {
                    const visibleContent = pageContentData.headings
                      .filter((heading) => heading.isVisible)
                      .sort((a, b) => a.order - b.order);
                    setPageContent(visibleContent);
                  }
                }
                setLoading(false);
              }
            );

            return () => contentUnsubscribe();
          } else {
            // Page doesn't exist in Firebase navigation
            setPageExists(false);
            setLoading(false);
          }
        } else {
          setPageExists(false);
          setLoading(false);
        }
      });

      return () => navUnsubscribe();
    } catch (error) {
      console.error("Error fetching page content:", error);
      setPageExists(false);
      setLoading(false);
    }
  }, [currentPath]);

  // Show 404 if page doesn't exist and we're done loading
  if (!loading && !pageExists) {
    notFound();
  }

  // Organize content by sections for better rendering
  const organizeContent = (content: ContentHeading[]) => {
    const sections = {
      hero: content.filter((item) => item.type === "hero"),
      features: content.filter((item) => item.type === "feature"),
      pricing: content.filter((item) => item.type === "pricing"),
      testimonials: content.filter((item) => item.type === "testimonial"),
      faqs: content.filter((item) => item.type === "faq"),
      text: content.filter((item) => item.type === "text"),
    };
    return sections;
  };

  const renderHeroSection = (hero: ContentHeading) => (
    <section
      key={hero.id}
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            {hero.title}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-8">
            {hero.content}
          </p>
          {hero.buttonText && (
            <Link href={hero.buttonLink || "#"}>
              <Button size="lg" className="px-8 py-4 text-lg">
                {hero.buttonText}
              </Button>
            </Link>
          )}
        </div>
        {hero.imageUrl && (
          <div className="mt-12 text-center">
            <img
              src={hero.imageUrl}
              alt={hero.title}
              className="mx-auto rounded-lg shadow-lg max-w-4xl w-full"
            />
          </div>
        )}
      </Container>
    </section>
  );

  const renderFeaturesSection = (features: ContentHeading[]) => {
    if (features.length === 0) return null;

    return (
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">
                  {feature.imageUrl ? (
                    <img
                      src={feature.imageUrl}
                      alt={feature.title}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    // Default icons
                    [
                      "💰",
                      "⚡",
                      "🔒",
                      "📈",
                      "🎧",
                      "📊",
                      "✨",
                      "🚀",
                      "🎯",
                      "🌟",
                    ][index % 10]
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.content}</p>
                {feature.features && feature.features.length > 0 && (
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <svg
                          className="w-4 h-4 text-green-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {feature.buttonText && (
                  <div className="mt-4">
                    <Link href={feature.buttonLink || "#"}>
                      <Button size="sm">{feature.buttonText}</Button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  };

  const renderPricingSection = (pricing: ContentHeading[]) => {
    if (pricing.length === 0) return null;

    return (
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-xl shadow-lg p-8 text-center border-2 border-gray-200 hover:border-blue-500 transition-colors"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {plan.title}
                </h3>
                {plan.price && (
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    {plan.price}
                  </div>
                )}
                <p className="text-gray-600 mb-6">{plan.content}</p>
                {plan.features && plan.features.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-center"
                      >
                        <svg
                          className="w-5 h-5 text-green-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                {plan.buttonText && (
                  <Link href={plan.buttonLink || "#"}>
                    <Button size="lg" className="w-full">
                      {plan.buttonText}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  };

  const renderTestimonialsSection = (testimonials: ContentHeading[]) => {
    if (testimonials.length === 0) return null;

    return (
      <section className="py-20 bg-blue-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="text-center">
                  {testimonial.imageUrl && (
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.title}
                      className="w-16 h-16 rounded-full mx-auto mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {testimonial.title}
                  </h3>
                  <blockquote className="text-gray-600 italic mb-4">
                    "{testimonial.content}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  };

  const renderFAQSection = (faqs: ContentHeading[]) => {
    if (faqs.length === 0) return null;

    return (
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {faq.title}
                </h3>
                <p className="text-gray-600">{faq.content}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  };

  const renderTextSection = (textItems: ContentHeading[]) => {
    if (textItems.length === 0) return null;

    return (
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {textItems.map((text) => (
              <div key={text.id}>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {text.title}
                </h2>
                <div className="text-xl text-gray-600 leading-relaxed">
                  {text.content.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {text.buttonText && (
                  <div className="mt-6">
                    <Link href={text.buttonLink || "#"}>
                      <Button size="lg">{text.buttonText}</Button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-20">
        <Container>
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded mb-6 max-w-2xl mx-auto"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 rounded max-w-4xl mx-auto"></div>
              <div className="h-6 bg-gray-300 rounded max-w-3xl mx-auto"></div>
              <div className="h-6 bg-gray-300 rounded max-w-2xl mx-auto"></div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // If no content but page exists, show default content
  if (pageContent.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {pageTitle}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              This page is under construction. Content will be available soon!
            </p>
            <Link href="/">
              <Button size="lg">Go Back Home</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // Organize content into sections
  const sections = organizeContent(pageContent);

  return (
    <div className="min-h-screen">
      {/* Render Hero Section (should be first) */}
      {sections.hero.map(renderHeroSection)}

      {/* Render Features Section */}
      {renderFeaturesSection(sections.features)}

      {/* Render Pricing Section */}
      {renderPricingSection(sections.pricing)}

      {/* Render Text Content */}
      {renderTextSection(sections.text)}

      {/* Render Testimonials */}
      {renderTestimonialsSection(sections.testimonials)}

      {/* Render FAQs */}
      {renderFAQSection(sections.faqs)}
    </div>
  );
}
