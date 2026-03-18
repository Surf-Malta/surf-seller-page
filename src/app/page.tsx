// src/app/page.tsx - Updated with new Figma design
"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import MobileAppSection from "@/components/home/MobileAppSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function HomePage() {
  const howItWorksSteps = [
    {
      step: "01",
      title: "Register & Set Up",
      description: "Create your account with valid business info and get approved instantly.",
    },
    {
      step: "02",
      title: "Add Your Products",
      description: "Upload manually, bulk CSV, or connect Shopify / WooCommerce directly.",
    },
    {
      step: "03",
      title: "Choose Logistics",
      description: "Pick from trusted local delivery partners like MaltaPost or DHL.",
    },
    {
      step: "04",
      title: "Start Earning",
      description: "Go live and start receiving orders from customers across Malta.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        hero={{
          id: "home-hero",
          title: "Grow your online the smarter way",
          content:
            "Join Malta's local eCommerce Network and reach thousands of customers across the Island.",
          buttonText: "Get Started For Free (T&C Apply)",
          buttonLink: "/register",
        }}
      />

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="inline-flex items-center bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Up and running in four steps
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From registration to your first sale - it's faster than you think.
            </p>
          </motion.div>

          {/* Steps Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {howItWorksSteps.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative group"
              >
                {/* Connector line */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-gradient-to-r from-violet-300 to-violet-100 z-0" />
                )}
                
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative z-10">
                  {/* Step number */}
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-700 rounded-full flex items-center justify-center text-white text-xl font-bold mb-5 mx-auto shadow-lg shadow-violet-200 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Mobile App Section */}
      <MobileAppSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
