// src/components/home/FAQSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How much does it cost to start selling on Surf?",
    answer:
      "It's completely free to start! There are no setup fees, monthly subscriptions, or hidden costs. You only pay a small commission when you make a sale, so you can start selling with zero upfront investment.",
  },
  {
    id: 2,
    question: "Do I need a Malta VAT number to sell?",
    answer:
      "Yes, you need a valid Malta VAT number to sell on Surf. We accept both individual and business VAT numbers. For business VAT numbers, we verify them through the EU VIES system to ensure compliance.",
  },
  {
    id: 3,
    question: "How quickly can I start selling?",
    answer:
      "Most sellers are approved and can start listing products within 24-48 hours of registration. The process is simple: register, get approved, upload your products, and start selling immediately.",
  },
  {
    id: 4,
    question: "Can I use my own shipping methods?",
    answer:
      "Yes! You can choose to handle shipping yourself or use our integrated shipping partners. Our partners include trusted local services like MaltaPost and DHL, offering competitive rates and reliable delivery across Malta and internationally.",
  },
  {
    id: 5,
    question: "What types of products can I sell?",
    answer:
      "You can sell a wide range of products including crafts, electronics, fashion, home goods, food items, and more. We focus on supporting local Malta businesses and unique products that serve our community.",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleFAQ = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isOpen = (id: number) => openItems.includes(id);

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
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Common questions, answered
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about selling on Surf.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen(faq.id) ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600"
                  >
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
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
