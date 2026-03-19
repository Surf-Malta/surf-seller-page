// src/app/page.tsx - Updated with Testimonials Section
import { HeroSection } from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FAQSection from "@/components/home/FAQSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { Star } from "lucide-react";
import MobileAppBanner from "@/components/home/MobileAppBanner";
import StatsStrip from "@/components/home/StatsStripSection";
import GetStarted from "@/components/home/GetStartedSection";
import Testimonials from "@/components/home/TestimonialsSection";

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
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16 lg:pt-3">
        <HeroSection />
        <StatsStrip />
        <HowItWorksSection steps={stepsData} />
        <FeaturesSection />
        <MobileAppBanner />
        <Testimonials testimonials={testimonialsData} />
        <FAQSection faqData={faqData} />
        <GetStarted />

        {/* Pricing - Mobile optimized - UPDATED VERSION - removed instead add mobile app download section*/}
        {/* <section className="py-8 sm:py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <div className="inline-flex items-center bg-gradient-to-r from-[#FF6900] to-[#FB2C36] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 text-white">
                💎 Transparent Pricing
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
                <span className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] bg-clip-text text-transparent">
                  When You Succeed
                </span>
                , We Succeed
              </h2>
              <p className="text-base sm:text-lg text-gray-600 px-2">
                Start for free and pay only a small commission on successful
                sale.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-200 mt-6 sm:mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9810FA] mb-2">
                      €0
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      Setup Cost
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Everything you need to start is completely free
                    </p>
                  </div>

                  <div className="sm:border-l sm:border-r border-gray-300 border-t border-b sm:border-t-0 sm:border-b-0 pt-6 pb-6 sm:pt-0 sm:pb-0 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 sm:-top-12">
                      <div className="bg-[#9810FA] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold inline-block">
                        Most Popular
                      </div>
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-2 mt-4 sm:mt-0">
                      Low
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      commission
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Pay only when you make a sale
                    </p>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600 mb-2">
                      0%
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      Commission
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Enjoy our 0% commission offer to support your growth
                    </p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 text-center">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <a
                      href="/pricing"
                      className="inline-flex items-center bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-blue-700 transition-all duration-300 justify-center"
                    >
                      💎 View All Plans
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2"
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
                    <a
                      href="/register"
                      className="inline-flex items-center bg-white text-purple-600 border-2 border-purple-200 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-purple-50 transition-all duration-300 justify-center"
                    >
                      🚀 Start Free
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* CTA Section - Uncomment if you want to add it back */}
        {/* <CTASection /> */}
      </div>
    </div>
  );
}
