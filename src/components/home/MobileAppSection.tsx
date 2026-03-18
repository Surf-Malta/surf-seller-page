// src/components/home/MobileAppSection.tsx
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const GOOGLE_PLAY_LINK =
  "https://play.google.com/store/apps/details?id=com.surf.sellerhub&hl=en";
const APP_STORE_LINK = "https://apps.apple.com/app/surf-seller-hub";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function MobileAppSection() {
  const appFeatures = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      text: "Instant order notifications",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      text: "Real-time sales dashboard",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      text: "Quick product management",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#1A0A3E] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <span className="inline-flex items-center bg-violet-500/20 text-violet-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-violet-500/30">
              MOBILE APP
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Your store in{" "}
              <span className="text-violet-400">your pocket</span>
            </h2>

            <p className="text-lg text-violet-200 mb-8 leading-relaxed max-w-lg">
              Manage orders, track sales, and respond to customers on the go. 
              The Surf Seller app puts your entire business at your fingertips.
            </p>

            {/* Feature list */}
            <ul className="space-y-4 mb-8">
              {appFeatures.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-white"
                >
                  <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center text-violet-300 border border-violet-500/30">
                    {feature.icon}
                  </div>
                  <span className="text-violet-100">{feature.text}</span>
                </motion.li>
              ))}
            </ul>

            {/* App Store Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={GOOGLE_PLAY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 9.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                Google Play
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={APP_STORE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors border border-gray-700"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </motion.a>
            </div>
          </motion.div>

          {/* Right - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Phone frame */}
            <motion.div
              animate={floatAnimation}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-violet-500/30 to-purple-500/30 rounded-full blur-3xl" />
              
              {/* Phone mockup */}
              <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl border border-gray-700">
                {/* Screen */}
                <div className="bg-white rounded-[2.5rem] overflow-hidden w-64 h-[520px]">
                  {/* Status bar */}
                  <div className="bg-violet-600 px-6 py-3 flex items-center justify-between">
                    <span className="text-white text-xs">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 bg-white/80 rounded-sm" />
                      <div className="w-4 h-2 bg-white/80 rounded-sm" />
                    </div>
                  </div>

                  {/* App header */}
                  <div className="bg-violet-600 px-4 pb-4">
                    <h3 className="text-white font-semibold text-lg">Seller Dashboard</h3>
                  </div>

                  {/* Dashboard content */}
                  <div className="p-4 space-y-4">
                    {/* Stats card */}
                    <div className="bg-gradient-to-br from-violet-50 to-white rounded-xl p-4 border border-violet-100">
                      <p className="text-xs text-gray-500 mb-1">Today's Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">EUR 347.50</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-green-600 font-medium">+12%</span>
                        <span className="text-xs text-gray-400">vs yesterday</span>
                      </div>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500">Orders</p>
                        <p className="text-lg font-bold text-gray-900">24</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500">Products</p>
                        <p className="text-lg font-bold text-gray-900">156</p>
                      </div>
                    </div>

                    {/* Recent order */}
                    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-900">New Order #1847</span>
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Paid</span>
                      </div>
                      <p className="text-xs text-gray-500">2 items - EUR 89.00</p>
                    </div>

                    {/* Chart placeholder */}
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-2">Weekly Sales</p>
                      <div className="flex items-end gap-1 h-16">
                        {[40, 65, 45, 80, 55, 75, 90].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-violet-500 to-violet-400 rounded-t"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="flex justify-center mt-2">
                  <div className="w-32 h-1 bg-gray-600 rounded-full" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
