// src/components/home/FAQSection.tsx
"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "./SectionHeader";
import { ChevronDown } from "lucide-react";
import { FAQItem } from "@/app/page";
import { motion } from "motion/react";
import { fade, stagger } from "@/utils/animations";

// const categories = [
//   { id: "all", label: "All Questions", icon: "❓" },
//   { id: "general", label: "Getting Started", icon: "🚀" },
//   { id: "selling", label: "Selling", icon: "💼" },
//   { id: "payment", label: "Payments", icon: "💳" },
//   { id: "shipping", label: "Shipping", icon: "📦" },
// ];
type FAQSectionProps = {
  faqData: FAQItem[];
};
export default function FAQSection({ content, faqData: legacyFaqData }: { content?: any, faqData: FAQItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const data = content || {
    badge: "FAQ",
    title: "Common questions, answered",
    subtitle: "Everything you need to know about selling on Surf.",
    questions: legacyFaqData || []
  };

  const filteredFAQs =
    selectedCategory === "all"
      ? data.questions
      : data.questions.filter((faq: any) => faq.category === selectedCategory);

  const toggleFAQ = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isOpen = (id: number) => openItems.includes(id);

  return (
    <section id="faq" className="py-8 sm:py-12 lg:py-14">
      <Container>
        {/* Section Header */}
        <SectionHeader
          badge={data.badge}
          title={data.title}
          subtitle={data.subtitle}
        />

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
        <motion.div initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger} className="mt-10 max-w-3xl mx-auto space-y-2">
          {filteredFAQs.map((faq: any, index: number) => (
            <motion.div
              key={faq.id}
              variants={fade}
              custom={index}
              className={`md:mx-8.5 rounded-xl overflow-hidden border transition-colors ${isOpen(faq.id)
                ? "border-black/[0.08] bg-[var(--bg-light)]"
                : "border-black/[0.04] hover:border-black/[0.06]"
                }`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              >
                <span className="text-[#0f172a] text-[15px] font-semibold">{faq.question}</span>
                <div
                  className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isOpen(faq.id) ? "bg-[var(--primary)]" : "bg-[#f1f5f9]"
                    }`}
                >
                  <ChevronDown
                    className={`size-3.5 transition-transform duration-200 ${isOpen(faq.id) ? "rotate-180 text-white" : "text-[#64748b]"
                      }`}
                  />
                </div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: isOpen(faq.id) ? "auto" : 0,
                  opacity: isOpen(faq.id) ? 1 : 0
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 text-[#64748b] text-[14px] font-normal leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
