// src/app/page.tsx (Updated with fallback content)
"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { realtimeDb, firebaseInitialized } from "@/lib/firebase";
import { HeroSection } from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer"; // Use original footer as fallback

interface HomepageSection {
  id: string;
  type: string;
  title: string;
  order: number;
  isVisible: boolean;
  content: any;
}

interface HomepageContent {
  sections: HomepageSection[];
  lastUpdated: string;
}

// Default content that matches your existing homepage
const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  sections: [
    {
      id: "hero",
      type: "hero",
      title: "Hero Section",
      order: 1,
      isVisible: true,
      content: {
        title: "Launch Your Online Store Today",
        subtitle: "Transform your business dreams into reality",
        description:
          "Join 50,000+ successful entrepreneurs who've built their e-commerce empire with zero investment. Start selling online and reach millions of customers worldwide.",
        buttonText: "Start Your Store FREE",
        buttonLink: "/register",
      },
    },
    {
      id: "success_stories",
      type: "success_stories",
      title: "Success Stories",
      order: 2,
      isVisible: true,
      content: {
        title: "Real Stories",
        subtitle: "Real Success",
        description:
          "See how ordinary people built extraordinary e-commerce businesses",
        stories: [
          {
            id: "1",
            name: "Rajesh Kumar",
            role: "Electronics Seller, Mumbai",
            quote:
              "From ₹0 to ₹5 lakhs monthly revenue in just 6 months. This platform changed my life!",
            avatar: "👨‍💼",
            rating: 5,
          },
          {
            id: "2",
            name: "Priya Sharma",
            role: "Fashion Boutique, Delhi",
            quote:
              "Started my fashion store from home. Now I have a team of 10 people!",
            avatar: "👩‍💼",
            rating: 5,
          },
          {
            id: "3",
            name: "Amit Patel",
            role: "Handmade Crafts, Ahmedabad",
            quote:
              "College student to successful entrepreneur. Earning more than my friends' salaries!",
            avatar: "👨‍🎓",
            rating: 5,
          },
        ],
      },
    },
    {
      id: "how_it_works",
      type: "how_it_works",
      title: "How It Works",
      order: 3,
      isVisible: true,
      content: {
        title: "Start Selling",
        subtitle: "In 3 Simple Steps",
        description:
          "No technical knowledge required. Get your store up and running in minutes.",
        steps: [
          {
            id: "1",
            number: 1,
            title: "Register & Setup",
            description:
              "Create your account and set up your store in under 10 minutes. Choose from beautiful templates and customize your brand.",
            icon: "⚡",
          },
          {
            id: "2",
            number: 2,
            title: "Add Products",
            description:
              "Upload your products with high-quality images and descriptions. Set competitive prices and manage your inventory effortlessly.",
            icon: "📦",
          },
          {
            id: "3",
            number: 3,
            title: "Start Earning",
            description:
              "Go live and start receiving orders! We handle payments, provide analytics, and support you every step of the way.",
            icon: "💰",
          },
        ],
      },
    },
    {
      id: "pricing_teaser",
      type: "pricing_teaser",
      title: "Pricing Teaser",
      order: 4,
      isVisible: true,
      content: {
        title: "No Hidden Fees",
        subtitle: "Pay Only When You Sell",
        description:
          "Start for free and pay only a small commission on successful sales. No setup fees, no monthly charges, no surprises.",
        setupCost: {
          value: "₹0",
          label: "Setup Cost",
          description:
            "Launch your store without any upfront investment. Everything you need to start is completely free.",
        },
        commission: {
          value: "5%",
          label: "Commission Only",
          description:
            "Pay only when you make a sale. Our success is tied to your success. No monthly fees, ever.",
        },
      },
    },
    {
      id: "why_choose_us",
      type: "why_choose_us",
      title: "Why Choose Us",
      order: 5,
      isVisible: true,
      content: {
        title: "Built for",
        subtitle: "E-commerce Success",
        description:
          "Everything you need to build, grow, and scale your online business",
        features: [
          {
            id: "1",
            title: "Quick Launch",
            description:
              "Get your store live in under 10 minutes with our one-click setup",
            icon: "🚀",
          },
          {
            id: "2",
            title: "Secure Payments",
            description:
              "Accept all payment methods with bank-level security and instant settlements",
            icon: "💳",
          },
          {
            id: "3",
            title: "Mobile Ready",
            description:
              "Your store works perfectly on all devices with app-like experience",
            icon: "📱",
          },
          {
            id: "4",
            title: "Smart Analytics",
            description:
              "Track sales, customers, and growth with real-time business insights",
            icon: "📊",
          },
        ],
      },
    },
    {
      id: "final_cta",
      type: "final_cta",
      title: "Final Call to Action",
      order: 6,
      isVisible: true,
      content: {
        title: "Ready to Join the E-commerce Revolution?",
        description:
          "Over 50,000 entrepreneurs have already transformed their lives. Your success story starts today.",
        primaryButton: {
          text: "🚀 Start Your Store FREE",
          link: "/register",
        },
        secondaryButton: {
          text: "See How It Works",
          link: "/how-it-works",
        },
        trustIndicators: [
          { label: "Free to Start", value: "100%" },
          { label: "Expert Support", value: "24/7" },
          { label: "Setup Time", value: "10min" },
        ],
      },
    },
  ],
  lastUpdated: new Date().toISOString(),
};

export default function HomePage() {
  const [homepageContent, setHomepageContent] = useState<HomepageContent>(
    DEFAULT_HOMEPAGE_CONTENT
  );
  const [loading, setLoading] = useState(firebaseInitialized);

  useEffect(() => {
    // Only try to fetch from Firebase if it's initialized
    if (!firebaseInitialized || !realtimeDb) {
      console.log("Firebase not available, using default homepage content");
      setLoading(false);
      return;
    }

    const homepageRef = ref(realtimeDb, "homepage_content");
    const unsubscribe = onValue(
      homepageRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setHomepageContent(snapshot.val());
        }
        setLoading(false);
      },
      (error) => {
        console.warn("Error fetching homepage content:", error);
        console.log("Using default homepage content");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const getVisibleSections = () => {
    if (!homepageContent) return [];
    return homepageContent.sections
      .filter((section) => section.isVisible)
      .sort((a, b) => a.order - b.order);
  };

  const getSectionByType = (type: string) => {
    return getVisibleSections().find((section) => section.type === type);
  };

  const renderSuccessStories = (section: HomepageSection) => {
    const { title, subtitle, description, stories } = section.content;

    return (
      <section className="section-ecommerce bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg mb-8">
              <span className="bg-green-500 w-3 h-3 rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">
                ✨ SUCCESS STORIES
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="gradient-text-ecommerce">{title}</span>
              <br />
              <span className="text-gray-800">{subtitle}</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stories?.map((story: any) => (
              <div
                key={story.id}
                className="ecommerce-card p-8 text-center group hover-lift"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl">
                  {story.avatar}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {story.name}
                </h3>
                <p className="text-gray-600 mb-4 italic">"{story.quote}"</p>
                <div className="text-sm text-gray-500">{story.role}</div>
                <div className="mt-4 flex justify-center">
                  {[...Array(story.rating || 5)].map((_, i) => (
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
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderHowItWorks = (section: HomepageSection) => {
    const { title, subtitle, description, steps } = section.content;

    return (
      <section className="section-ecommerce bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-3 mb-8">
              <span className="text-blue-600 font-semibold text-sm">
                🚀 HOW IT WORKS
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="gradient-text-ecommerce">{title}</span>
              <br />
              <span className="text-gray-800">{subtitle}</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {steps?.map((step: any) => (
              <div key={step.id} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              href="/register"
              className="btn-ecommerce-primary inline-flex items-center"
            >
              Get Started Now - It's FREE!
              <svg
                className="w-6 h-6 ml-2"
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
            </a>
          </div>
        </div>
      </section>
    );
  };

  const renderPricingTeaser = (section: HomepageSection) => {
    const { title, subtitle, description, setupCost, commission } =
      section.content;

    return (
      <section className="section-ecommerce bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg mb-8">
              <span className="bg-green-500 w-3 h-3 rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">
                💎 TRANSPARENT PRICING
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="gradient-text-ecommerce">{title}</span>
              <br />
              <span className="text-gray-800">{subtitle}</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              {description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="ecommerce-card p-10 text-center">
              <div className="text-6xl font-bold gradient-text-ecommerce mb-4">
                {setupCost?.value}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {setupCost?.label}
              </h3>
              <p className="text-gray-600 text-lg">{setupCost?.description}</p>
            </div>

            <div className="ecommerce-card p-10 text-center">
              <div className="text-6xl font-bold gradient-text-success mb-4">
                {commission?.value}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {commission?.label}
              </h3>
              <p className="text-gray-600 text-lg">{commission?.description}</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="/pricing" className="btn-ecommerce-secondary">
              View Detailed Pricing
            </a>
          </div>
        </div>
      </section>
    );
  };

  const renderWhyChooseUs = (section: HomepageSection) => {
    const { title, subtitle, description, features } = section.content;

    return (
      <section className="section-ecommerce bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-purple-50 rounded-full px-6 py-3 mb-8">
              <span className="text-purple-600 font-semibold text-sm">
                ⭐ WHY CHOOSE US
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="gradient-text-ecommerce">{title}</span>
              <br />
              <span className="text-gray-800">{subtitle}</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features?.map((feature: any) => (
              <div
                key={feature.id}
                className="ecommerce-card p-8 text-center group hover-lift"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mx-auto mb-6 flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderFinalCTA = (section: HomepageSection) => {
    const {
      title,
      description,
      primaryButton,
      secondaryButton,
      trustIndicators,
    } = section.content;

    return (
      <section className="section-ecommerce bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ecommerce-card-featured p-16 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <a
                href={primaryButton?.link || "/register"}
                className="btn-ecommerce-primary text-xl px-12 py-4"
              >
                {primaryButton?.text}
              </a>
              <a
                href={secondaryButton?.link || "/how-it-works"}
                className="btn-ecommerce-secondary text-xl px-12 py-4"
              >
                {secondaryButton?.text}
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              {trustIndicators?.map((indicator: any, index: number) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {indicator.value}
                  </div>
                  <div className="text-gray-600">{indicator.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading homepage content...</p>
        </div>
      </div>
    );
  }

  const heroSection = getSectionByType("hero");
  const successStoriesSection = getSectionByType("success_stories");
  const howItWorksSection = getSectionByType("how_it_works");
  const pricingTeaserSection = getSectionByType("pricing_teaser");
  const whyChooseUsSection = getSectionByType("why_choose_us");
  const finalCTASection = getSectionByType("final_cta");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Add proper spacing from header */}
      <div className="pt-20">
        {/* Hero Section */}
        {heroSection && (
          <HeroSection
            hero={{
              id: heroSection.id,
              title: heroSection.content.title,
              content: heroSection.content.description,
              buttonText: heroSection.content.buttonText,
              buttonLink: heroSection.content.buttonLink,
            }}
          />
        )}

        {/* Success Stories Section */}
        {successStoriesSection && renderSuccessStories(successStoriesSection)}

        {/* How It Works Section */}
        {howItWorksSection && renderHowItWorks(howItWorksSection)}

        {/* Features Section - Keep existing one from FeaturesSection component */}
        <FeaturesSection />

        {/* Pricing Teaser Section */}
        {pricingTeaserSection && renderPricingTeaser(pricingTeaserSection)}

        {/* Why Choose Us Section */}
        {whyChooseUsSection && renderWhyChooseUs(whyChooseUsSection)}

        {/* Final CTA Section */}
        {finalCTASection && renderFinalCTA(finalCTASection)}

        {/* Regular CTA Section - Keep existing one */}
        <CTASection />
      </div>

      {/* Use original Footer - no dynamic footer to avoid errors */}
      <Footer />
    </div>
  );
}
