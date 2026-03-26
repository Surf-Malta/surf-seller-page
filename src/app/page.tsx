"use client";

import { HeroSection } from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FAQSection from "@/components/home/FAQSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import MobileAppBanner from "@/components/home/MobileAppBanner";
import StatsStrip from "@/components/home/StatsStripSection";
import GetStarted from "@/components/home/GetStartedSection";
import Testimonials from "@/components/home/TestimonialsSection";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";

export interface steps {
  num: string;
  title: string;
  desc: string;
}

const stepsData: steps[] = [
  { num: "01", title: "Register & Set Up", desc: "Create your account with valid business info and get approved instantly." },
  { num: "02", title: "Add Your Products", desc: "Upload manually, bulk CSV, or connect Shopify / WooCommerce." },
  { num: "03", title: "Choose Logistics", desc: "Pick from trusted local delivery partners like MaltaPost or DHL." },
  { num: "04", title: "Start Earning", desc: "Go live and start receiving orders from customers across Malta." },
];

export interface testimonials {
  name: string;
  title: string;
  quote: string;
  avatar: string;
  stars: number;

}

const testimonialsData: testimonials[] = [
  {
    name: "Maria Garcia",
    title: "Owner, Valletta Crafts",
    quote: "Surf has been a game-changer for our small business. The platform is user-friendly, and the support is exceptional. We've seen a significant increase in sales.",
    avatar: "https://images.unsplash.com/photo-1769636930016-5d9f0ca653aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGVudHJlcHJlbmV1ciUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyNzE1OTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stars: 5,
  },
  {
    name: "David Borg",
    title: "CEO, Malta Tech Solutions",
    quote: "We were hesitant at first, but Surf's robust features and seamless integration with our existing systems made the transition smooth. Our online sales have skyrocketed.",
    avatar: "https://images.unsplash.com/photo-1768467485681-d4f93929fd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0JTIwaGVhZHNob3QlMjBtZWRpdGVycmFuZWFufGVufDF8fHx8MTc3MjcyMTkyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stars: 5,
  },
  {
    name: "Sophia Camilleri",
    title: "Founder, Green Living Malta",
    quote: "The platform's sustainability initiatives have helped us attract a more conscious customer base. Setting up was incredibly easy and our sales have grown accordingly.",
    avatar: "https://images.unsplash.com/photo-1568337339905-7165c43848b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwZm91bmRlciUyMHN0YXJ0dXAlMjBwb3J0cmFpdCUyMHNtaWxlfGVufDF8fHx8MTc3MjcyMTkyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stars: 5,
  },
];

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: "general" | "selling" | "shipping" | "payment";
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How much does it cost to start selling on Surf?",
    answer:
      "It's completely free to start! There are no setup fees, monthly subscriptions, or hidden costs. You only pay a small commission when you make a sale, so you can start selling with zero upfront investment.",
    category: "general",
  },
  {
    id: 2,
    question: "Do I need a Malta VAT number to sell?",
    answer:
      "Yes, you need a valid Malta VAT number to sell on Surf. We accept both individual and business VAT numbers. For business VAT numbers, we verify them through the EU VIES system to ensure compliance.",
    category: "general",
  },
  {
    id: 3,
    question: "How quickly can I start selling?",
    answer:
      "Most sellers are approved and can start listing products within 24-48 hours of registration. The process is simple: register, get approved, upload your products, and start selling immediately.",
    category: "selling",
  },
  {
    id: 4,
    question: "What commission do I pay on sales?",
    answer:
      "We currently offer a 0% commission rate to support new sellers and help them grow their business. This promotional rate helps you keep more of your earnings while you establish your presence on our platform.",
    category: "payment",
  },
  {
    id: 5,
    question: "Can I use my own shipping methods?",
    answer:
      "Yes! You can choose to handle shipping yourself or use our integrated shipping partners. Our partners include trusted local services like MaltaPost and DHL, offering competitive rates and reliable delivery across Malta and internationally.",
    category: "shipping",
  },
  {
    id: 6,
    question: "What types of products can I sell on Surf?",
    answer:
      "You can sell a wide range of products including crafts, electronics, fashion, home goods, food items, and more. We focus on supporting local Malta businesses and unique products that serve our community.",
    category: "selling",
  },
];

export default function HomePage() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PAYPAL_API_URL}/sections/active`);
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setSections(result.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch sections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const renderSection = (section: any) => {
    switch (section.type) {
      case "hero":
        return <HeroSection key={section.id} content={section.content} />;
      case "stats":
        return <StatsStrip key={section.id} content={section.content} />;
      case "how-it-works":
        return <HowItWorksSection key={section.id} content={section.content} steps={stepsData} />;
      case "features":
        return <FeaturesSection key={section.id} content={section.content} />;
      case "mobile-app":
        return <MobileAppBanner key={section.id} content={section.content} />;
      case "testimonials":
        return <Testimonials key={section.id} content={section.content} testimonials={testimonialsData} />;
      case "faq":
        return <FAQSection key={section.id} content={section.content} faqData={faqData} />;
      case "get-started":
        return <GetStarted key={section.id} content={section.content} />;
      case "footer":
        return <Footer key={section.id} content={section.content} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16 lg:pt-3">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
          </div>
        ) : (
          <>
            {sections.length > 0 ? (
              sections.map((section) => renderSection(section))
            ) : (
              <>
                <HeroSection />
                <StatsStrip />
                <HowItWorksSection steps={stepsData} />
                <FeaturesSection />
                <MobileAppBanner />
                <Testimonials testimonials={testimonialsData} />
                <FAQSection faqData={faqData} />
                <GetStarted />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
