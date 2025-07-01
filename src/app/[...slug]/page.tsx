"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";
import Link from "next/link";
import { notFound } from "next/navigation";

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

const featureIcons = [
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
  "💎",
  "🛡️",
  "⭐",
  "🎨",
  "📱",
  "💻",
  "🔥",
  "🚀",
  "💯",
  "🎪",
];

const gradientColors = [
  "from-blue-500 to-purple-600",
  "from-green-500 to-teal-600",
  "from-pink-500 to-rose-600",
  "from-orange-500 to-red-600",
  "from-indigo-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-green-600",
];

export default function DynamicPage() {
  const params = useParams();
  const [pageContent, setPageContent] = useState<ContentHeading[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageExists, setPageExists] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");

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
            setPageDescription(currentPage.description);

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

  // E-commerce floating shapes component
  const EcommerceFloatingShapes = () => (
    <div className="ecommerce-floating-shapes">
      <div className="ecommerce-shape"></div>
      <div className="ecommerce-shape"></div>
      <div className="ecommerce-shape"></div>
      <div className="ecommerce-shape"></div>

      {/* Additional e-commerce icons */}
      <div className="absolute top-20 left-10 animate-float opacity-10">
        <svg
          className="w-16 h-16 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
      </div>

      <div
        className="absolute top-32 right-20 animate-float opacity-10"
        style={{ animationDelay: "2s" }}
      >
        <svg
          className="w-12 h-12 text-indigo-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div
        className="absolute bottom-32 left-20 animate-float opacity-10"
        style={{ animationDelay: "4s" }}
      >
        <svg
          className="w-14 h-14 text-purple-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
          <path
            fillRule="evenodd"
            d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );

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
      className="relative pt-20 lg:pt-24 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden"
    >
      <EcommerceFloatingShapes />
      <Container className="relative z-10">
        <div className="text-center max-w-6xl mx-auto py-12 lg:py-16">
          <div className="animate-bounce-in">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg mb-8">
              <span className="bg-green-500 w-3 h-3 rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">
                🚀 E-COMMERCE SOLUTION
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              <span className="gradient-text-ecommerce">{hero.title}</span>
            </h1>
          </div>
          <div className="animate-slide-up">
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              {hero.content}
            </p>
          </div>
          {hero.buttonText && (
            <div className="animate-scale-in">
              <Link href={hero.buttonLink || "#"}>
                <button className="btn-ecommerce-primary inline-flex items-center space-x-2">
                  <span>{hero.buttonText}</span>
                  <svg
                    className="w-5 h-5"
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
        {hero.imageUrl && (
          <div className="mt-16 text-center animate-fade-in">
            <div className="relative inline-block">
              <img
                src={hero.imageUrl}
                alt={hero.title}
                className="mx-auto rounded-3xl shadow-2xl max-w-5xl w-full transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-20 -z-10"></div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );

  const renderFeaturesSection = (features: ContentHeading[]) => {
    if (features.length === 0) return null;

    return (
      <section className="section-ecommerce bg-white relative overflow-hidden">
        <EcommerceFloatingShapes />
        <Container className="relative z-10">
          <div className="text-center mb-20 animate-slide-up">
            <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-3 mb-8">
              <span className="text-blue-600 font-semibold text-sm">
                ✨ FEATURES
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="gradient-text-ecommerce">Powerful Features</span>
              <br />
              <span className="text-gray-800">For Your Success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to build and grow your e-commerce business
            </p>
          </div>
          <div className="ecommerce-grid-featured">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="ecommerce-card p-10 group animate-scale-in hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`ecommerce-icon-container bg-gradient-to-r ${
                    gradientColors[index % gradientColors.length]
                  } text-white group-hover:rotate-12`}
                >
                  {feature.imageUrl ? (
                    <img
                      src={feature.imageUrl}
                      alt={feature.title}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <span className="text-3xl">
                      {featureIcons[index % featureIcons.length]}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.content}
                </p>
                {feature.features && feature.features.length > 0 && (
                  <ul className="space-y-3 mb-6">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <svg
                            className="w-3 h-3 text-green-600"
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
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {feature.buttonText && (
                  <div className="mt-6">
                    <Link href={feature.buttonLink || "#"}>
                      <button className="btn-ecommerce-secondary w-full">
                        {feature.buttonText}
                      </button>
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
      <section className="section-ecommerce bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <EcommerceFloatingShapes />
        <Container className="relative z-10">
          <div className="text-center mb-20 animate-slide-up">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg mb-8">
              <span className="bg-green-500 w-3 h-3 rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">
                💎 PRICING
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="gradient-text-ecommerce">Simple Pricing</span>
              <br />
              <span className="text-gray-800">For Every Business</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan that grows with your business
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricing.map((plan, index) => (
              <div
                key={plan.id}
                className={`ecommerce-pricing-card ${
                  index === 1 ? "featured" : ""
                } animate-scale-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {plan.title}
                </h3>
                {plan.price && (
                  <div className="mb-6">
                    <div className="text-5xl font-bold gradient-text-ecommerce mb-2">
                      {plan.price}
                    </div>
                    <div className="text-gray-500">per month</div>
                  </div>
                )}
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {plan.content}
                </p>
                {plan.features && plan.features.length > 0 && (
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-center text-gray-700"
                      >
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <svg
                            className="w-3 h-3 text-green-600"
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
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                {plan.buttonText && (
                  <Link href={plan.buttonLink || "#"}>
                    <button
                      className={
                        index === 1
                          ? "btn-ecommerce-primary w-full"
                          : "btn-ecommerce-secondary w-full"
                      }
                    >
                      {plan.buttonText}
                    </button>
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
      <section className="section-ecommerce bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
        <EcommerceFloatingShapes />
        <Container className="relative z-10">
          <div className="text-center mb-20 animate-slide-up">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg mb-8">
              <span className="bg-yellow-500 w-3 h-3 rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">
                ⭐ TESTIMONIALS
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="gradient-text-ecommerce">Success Stories</span>
              <br />
              <span className="text-gray-800">From Real Sellers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our amazing customers who've transformed their
              businesses
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="ecommerce-testimonial animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  {testimonial.imageUrl && (
                    <div className="mb-6">
                      <img
                        src={testimonial.imageUrl}
                        alt={testimonial.title}
                        className="w-20 h-20 rounded-full mx-auto object-cover shadow-lg ring-4 ring-white"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {testimonial.title}
                  </h3>
                  <blockquote className="text-gray-600 italic text-lg leading-relaxed mb-4">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
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
      <section className="section-ecommerce bg-white relative overflow-hidden">
        <EcommerceFloatingShapes />
        <Container className="relative z-10">
          <div className="text-center mb-20 animate-slide-up">
            <div className="inline-flex items-center bg-purple-50 rounded-full px-6 py-3 mb-8">
              <span className="text-purple-600 font-semibold text-sm">
                ❓ FAQ
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="gradient-text-ecommerce">Frequently Asked</span>
              <br />
              <span className="text-gray-800">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to commonly asked questions
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="ecommerce-card p-8 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center text-sm font-bold mr-4">
                    {index + 1}
                  </span>
                  {faq.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed ml-12">
                  {faq.content}
                </p>
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
      <section className="section-ecommerce bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <EcommerceFloatingShapes />
        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto space-y-20">
            {textItems.map((text, index) => (
              <div
                key={text.id}
                className={`animate-slide-in-${
                  index % 2 === 0 ? "left" : "right"
                }`}
              >
                <div className="ecommerce-card p-12">
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                    <span className="gradient-text-ecommerce">
                      {text.title}
                    </span>
                  </h2>
                  <div className="text-xl text-gray-600 leading-relaxed space-y-6">
                    {text.content.split("\n").map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-lg leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {text.buttonText && (
                    <div className="mt-10">
                      <Link href={text.buttonLink || "#"}>
                        <button className="btn-ecommerce-primary">
                          {text.buttonText}
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
        <EcommerceFloatingShapes />
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="text-center mb-12">
                <div className="h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl mb-8 mx-auto max-w-2xl"></div>
                <div className="space-y-4">
                  <div className="h-6 bg-gray-300 rounded-xl mx-auto max-w-3xl"></div>
                  <div className="h-6 bg-gray-300 rounded-xl w-4/5 mx-auto"></div>
                  <div className="h-6 bg-gray-300 rounded-xl w-3/5 mx-auto"></div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 bg-gray-300 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // If no content but page exists, show default content
  if (pageContent.length === 0) {
    return (
      <div className="relative pt-20 lg:pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
        <EcommerceFloatingShapes />
        <Container className="relative z-10">
          <div className="text-center animate-scale-in">
            <div className="mb-12">
              <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg mb-8">
                <span className="bg-blue-500 w-3 h-3 rounded-full mr-3 animate-pulse"></span>
                <span className="text-sm font-medium text-gray-700">
                  🚧 COMING SOON
                </span>
              </div>

              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-6xl">
                🚧
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                <span className="gradient-text-ecommerce">{pageTitle}</span>
              </h1>
              <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                {pageDescription}
              </p>
              <p className="text-xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed">
                This e-commerce feature is being crafted with care. Amazing
                content and tools are coming soon!
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/">
                  <button className="btn-ecommerce-primary">
                    <span>Explore Other Features</span>
                    <svg
                      className="w-5 h-5 ml-2"
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

                <Link href="/register">
                  <button className="btn-ecommerce-secondary">
                    <span>🚀 Start Selling Now</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Feature preview cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="ecommerce-card p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mx-auto mb-4 flex items-center justify-center text-2xl text-white">
                  🛒
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  E-commerce Tools
                </h3>
                <p className="text-gray-600">
                  Professional selling features coming soon
                </p>
              </div>

              <div className="ecommerce-card p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mx-auto mb-4 flex items-center justify-center text-2xl text-white">
                  📊
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Analytics
                </h3>
                <p className="text-gray-600">
                  Detailed insights and reporting tools
                </p>
              </div>

              <div className="ecommerce-card p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mx-auto mb-4 flex items-center justify-center text-2xl text-white">
                  🎯
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Marketing
                </h3>
                <p className="text-gray-600">
                  Boost your sales with smart marketing
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Organize content into sections
  const sections = organizeContent(pageContent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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

      {/* Bottom CTA Section */}
      <section className="section-ecommerce bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <EcommerceFloatingShapes />
        <Container className="relative z-10">
          <div className="text-center text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Your E-commerce Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join thousands of successful sellers who've transformed their
              businesses with our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/register">
                <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-xl">
                  🚀 Start Selling FREE
                </button>
              </Link>
              <Link href="/">
                <button className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
