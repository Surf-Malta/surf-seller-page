"use client";

import { fade, stagger } from "@/utils/animations";
import { Smartphone, Bell, BarChart3, Zap, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function MobileAppBanner() {
    const features = [
        { icon: Bell, text: "Instant order notifications" },
        { icon: BarChart3, text: "Real-time sales dashboard" },
        { icon: Zap, text: "Quick product management" },
    ];

    return (
        <section className="bg-white overflow-hidden py-14 px-0">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger}
                    className="relative rounded-3xl overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, var(--bg-dark-gradient-start) 0%, var(--bg-dark-gradient-middle) 40%, var(--bg-dark-gradient-end) 100%)",
                    }}
                >
                    {/* Decorations */}
                    <div className="absolute top-0 right-0 w-[30rem] h-[30rem] rounded-full blur-[150px] pointer-events-none" style={{ backgroundColor: "var(--primary)30" }} />
                    <div className="absolute -bottom-20 -left-20 w-[18rem] h-[18rem] rounded-full blur-[100px] pointer-events-none bg-blue-500/15" />
                    <div className="absolute top-10 left-1/3 w-[12rem] h-[12rem] rounded-full blur-[80px] pointer-events-none bg-fuchsia-500/10" />

                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-center">
                        {/* Left: Text */}
                        <div className="px-8 py-12 md:pl-14 md:pr-6 md:py-16">
                            <motion.div
                                variants={fade} className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 mb-6 border border-white/15 bg-white/8">
                                <Smartphone className="text-fuchsia-300 w-3.5 h-3.5" />
                                <span className="text-white/70 text-xs font-semibold tracking-wide">MOBILE APP</span>
                            </motion.div>

                            <motion.h2
                                variants={fade} className="text-white text-2xl md:text-4xl font-extrabold">
                                Your store in
                                <br />
                                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #c084fc, #f0abfc)" }}>
                                    your pocket
                                </span>
                            </motion.h2>

                            <motion.p
                                variants={fade} className="mt-4 text-[#a5b4fc] text-base leading-relaxed max-w-[24rem] font-normal">
                                Manage orders, track sales, and respond to customers on the go. The Surf Seller app puts your entire business at your fingertips.
                            </motion.p>

                            {/* Features list */}
                            <motion.div variants={fade} className="mt-6 flex flex-col gap-2.5">
                                {features.map((item) => (
                                    <div key={item.text} className="flex items-center gap-2.5">
                                        <div className="w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center">
                                            <item.icon className="text-fuchsia-300 w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-white/70 text-sm font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Store buttons */}
                            <motion.div variants={fade} className="mt-8 flex flex-wrap gap-3">
                                {/* Google Play */}
                                <a
                                    href="#"
                                    className="group inline-flex items-center gap-3 bg-white hover:bg-gray-50 rounded-xl px-5 py-3 transition-shadow hover:shadow-lg"
                                >
                                    {/* SVG Play Store */}
                                    <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92z" fill="#4285F4" />
                                        <path d="M17.727 8.27L5.547.63a1 1 0 0 0-.504-.18L15.176 10.58l2.55-2.31z" fill="#EA4335" />
                                        <path d="M15.176 13.42L5.043 23.55a1 1 0 0 0 .504-.18l12.18-7.64-2.55-2.31z" fill="#34A853" />
                                        <path d="M21.397 10.672l-3.67-2.402-2.55 2.31L17.726 13l3.67-2.328z" fill="#FBBC05" />
                                    </svg>
                                    <div className="px-0.5">
                                        <div className="text-gray-500 text-[10px] font-medium leading-none">GET IT ON</div>
                                        <div className="text-gray-900 text-sm font-bold leading-tight">Google Play</div>
                                    </div>
                                </a>

                                {/* Apple — Coming Soon */}
                                <div className="relative inline-flex items-center gap-3 bg-white/8 border border-white/10 rounded-xl px-5 py-3 cursor-default">
                                    <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="white" fillOpacity="0.6">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                    <div>
                                        <div className="text-white/40 text-[10px] font-medium leading-none">COMING SOON ON</div>
                                        <div className="text-white/70 text-sm font-bold leading-tight">App Store</div>
                                    </div>
                                    <div className="absolute -top-2.5 -right-2 bg-amber-400 text-gray-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                        SOON
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Phone mockup */}
                        <motion.div
                            variants={fade} className="relative flex justify-center md:justify-end items-end">
                            <div className="relative w-67 md:w-75 mx-auto md:mr-14">
                                <div className="relative bg-gray-900 rounded-[2.5rem] p-2.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] my-6 scale-90 origin-center">
                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-30 h-6 bg-gray-900 rounded-b-2xl z-10" />
                                    {/* Screen */}
                                    {/* Screen */}
                                    <div className="relative rounded-[2rem] overflow-hidden">

                                        {/* Background Image */}
                                        <img
                                            src="https://images.unsplash.com/photo-1609162554108-6490759499ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
                                            alt="Surf Seller App"
                                            className="w-full aspect-[9/18] object-cover"
                                        />

                                        {/* Dark Gradient Overlay */}
                                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#1E1B4BCC,#00000000,#1E1B4BE5)]" />
                                        {/* Content */}
                                        <div className="absolute inset-0 px-5 py-7 flex flex-col text-white">

                                            <div className="flex items-center justify-between text-xs opacity-80">
                                                {/* Time */}
                                                <div>9:41</div>

                                                {/* Right dots */}
                                                <div className="flex items-center gap-1">
                                                    <div className="w-3.5 h-2 bg-white/50 rounded-full"></div>
                                                    <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-xs opacity-70 mt-5">Good morning</p>
                                                <h2 className="text-lg font-semibold">Seller Dashboard</h2>
                                            </div>

                                            {/* Revenue Card */}
                                            <div className="mt-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 space-y-0.4">
                                                <p className="text-[10px] text-white/50">Today's Revenue</p>
                                                <h3 className="text-2xl font-bold">€247.50</h3>
                                                <p className="text-xs text-emerald-400">+18% vs yesterday</p>
                                            </div>
                                            <div className="mt-3 bg-white/10 rounded-xl p-3 border border-white/10 flex items-center justify-between">

                                                <div className="flex items-center gap-3">

                                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-400/20">
                                                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                                    </div>

                                                    <div>
                                                        <p className="text-xs font-medium text-white">New order #1084</p>
                                                        <p className="text-[10px] text-white/60">€47.50 - 2 items</p>
                                                    </div>
                                                </div>

                                                <p className="text-[10px] text-white/40">2m ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating notification */}
                                <motion.div initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.5 }} className="absolute -left-6 md:-left-16 top-1/3">
                                    <div className="bg-white rounded-xl shadow-lg px-3.5 py-2.5 flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-100">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <div className="text-gray-900 text-[11px] font-semibold">Order shipped!</div>
                                            <div className="text-gray-400 text-[10px] font-normal">#1083 - Sliema</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </div >
        </section >
    );
}