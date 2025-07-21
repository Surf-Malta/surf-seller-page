// src/components/home/FAQSection.tsx
"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

interface FAQItem {
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

// const categories = [
//   { id: "all", label: "All Questions", icon: "❓" },
//   { id: "general", label: "Getting Started", icon: "🚀" },
//   { id: "selling", label: "Selling", icon: "💼" },
//   { id: "payment", label: "Payments", icon: "💳" },
//   { id: "shipping", label: "Shipping", icon: "📦" },
// ];

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const filteredFAQs =
    selectedCategory === "all"
      ? faqData
      : faqData.filter((faq) => faq.category === selectedCategory);

  const toggleFAQ = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isOpen = (id: number) => openItems.includes(id);

  return (
    <section className="py-8 sm:py-12 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-[#FF6900] to-[#FB2C36] text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mr-2 sm:mr-3 animate-pulse"></span>
            Frequently Asked Questions
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
            <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Everything You Need to Know
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] bg-clip-text text-transparent">
              About Selling on Surf
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Quick answers to common questions about starting your e-commerce
            journey with Malta's leading platform
          </p>
        </div>

        {/* Category Filter */}
        {/* <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm lg:text-base transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-purple-300"
              }`}
            >
              <span className="mr-1 sm:mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div> */}

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {filteredFAQs.map((faq, index) => (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl animate-scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 pr-4 leading-relaxed">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#9101CF] to-[#5D0196] flex items-center justify-center transition-transform duration-300 ${
                      isOpen(faq.id) ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen(faq.id)
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
                    <div className="border-t border-gray-100 pt-4 sm:pt-6">
                      <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <div className="bg-gradient-to-br from-[#9101CF] to-[#5D0196] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden mx-2 sm:mx-0">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full -translate-y-16 sm:-translate-y-24 translate-x-16 sm:translate-x-24"></div>
            <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full translate-y-16 sm:translate-y-24 -translate-x-16 sm:-translate-x-24"></div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
                Still Have Questions?
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Our dedicated support team is here to help you succeed. Get in
                touch with us anytime.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto">
                <a
                  href="mailto:sell@surf.mt"
                  className="flex-1 bg-white text-purple-600 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base hover:bg-gray-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Email Support
                  </span>
                </a>
                <a
                  href="tel:+35677413456"
                  className="flex-1 bg-white/10 backdrop-blur-sm text-white border border-white/30 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base hover:bg-white/20 transition-all duration-300"
                >
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Call Us
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
