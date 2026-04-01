"use client";

import { Container } from "@/components/ui/Container";
import { ArrowRight, CheckCircle2, Package, Play, ShoppingCart, Sparkles, TrendingUp } from "lucide-react";
import { fade, stagger } from "@/utils/animations";
import { motion } from "motion/react";
import SignupModal from "../registration/SignupModal";
import { useState } from "react";

export function HeroSection({ content }: { content?: any }) {
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const data = content || {
    badge: "Malta's #1 Seller Platform",
    title: "Sell online in Malta,\nwithout the hassle",
    subtitle: "Join hundreds of local businesses already growing on Surf.\nSet up in minutes, reach thousands of customers, pay nothing upfront.",
    primaryCta: "Start Selling Free",
    secondaryCta: "How it works",
    features: ["Free to start", "No setup fees", "Go live in minutes"]
  };

  const mainCard = data.mainCard || {
    title: "Manage & Ship",
    subtitle: "Handle orders with integrated logistics",
    imageUrl: "https://images.unsplash.com/photo-1687422808248-f807f4ea2a2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGJ1c2luZXNzJTIwb3duZXIlMjBtYW4lMjBwYWNraW5nJTIwb3JkZXJzJTIwc21pbGV8ZW58MXx8fHwxNzcyNzE2NTUwfDA"
  };

  const revenueCard = data.revenueCard || {
    title: "Monthly Revenue",
    value: "€12,450",
    change: "+32%",
    orders: "148",
    customers: "89"
  };

  const maltaCard = data.maltaCard || {
    title: "Built for Malta",
    subtitle: "Local commerce, local solutions",
    imageUrl: "https://images.unsplash.com/photo-1675773680276-7e544248a111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWx0YSUyMFZhbGxldHRhJTIwY29sb3JmdWwlMjBidWlsZGluZ3MlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc3MjcxNjU0Nnww"
  };

  const notifications = data.notifications || [
    {
      type: "join",
      title: "New seller joined!",
      subtitle: "Valletta Crafts · just now",
      imageUrl: "https://images.unsplash.com/photo-1573495628363-7114730a4a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGVudHJlcHJlbmV1ciUyMHdvbWFuJTIwdGFibGV0JTIwc3RvcmUlMjBpbnZlbnRvcnl8ZW58MXx8fHwxNzcyNzE2NTQ3fDA"
    },
    {
      type: "order",
      title: "New order received",
      subtitle: "€47.50 · Sliema delivery"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(165deg,var(--hero-bg-1)_0%,var(--hero-bg-2)_35%,var(--hero-bg-3)_65%,var(--hero-bg-4)_100%)] pt-24 pb-16">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/30 blur-[120px] opacity-40"></div>
      </div>

      <Container className="relative z-10">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
          <motion.div variants={fade} className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-7 border border-white/10 bg-white/[0.06]">
            <Sparkles className="size-3.5 text-amber-400" />
            <span className="text-white/70 text-xs tracking-wide font-semibold">{data.badge}</span>
          </motion.div>

          <motion.h1 variants={fade} className="text-4xl md:text-5xl lg:text-6xl text-white font-extrabold tracking-[-0.02em] whitespace-pre-line">
            {data.title}
          </motion.h1>

          <motion.p variants={fade} className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed max-w-[520px] mx-auto font-normal">
            {data.subtitle}
          </motion.p>

          <motion.div variants={fade} className="mt-8 flex flex-row flex-wrap justify-center gap-3">
            <button
              onClick={() => setSignupModalOpen(true)}
              className="text-[15px] group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_4px_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_30px_rgba(var(--primary-rgb),0.4)]">
              {data.primaryCta}
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="inline-flex items-center gap-2 text-white/80 hover:text-white text-[15px] px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.06] transition-all">
              <Play className="size-3.5" />
              {data.secondaryCta}
            </button>
          </motion.div>

          <motion.div variants={fade} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 justify-center text-white/40 text-[13px] font-normal">
            {data.features.map((item: string) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="pb-0 relative mt-16 md:mx-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}>
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {/* Main large card */}
            <div className="col-span-12 md:col-span-7 relative rounded-2xl overflow-hidden h-[280px] md:h-[340px]">
              <img src={mainCard.imageUrl} alt={mainCard.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/15 backdrop-blur-md">
                    <Package className="size-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white text-[14px] font-semibold">{mainCard.title}</div>
                    <div className="text-white/60 text-[12px] font-normal">{mainCard.subtitle}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column — stacked */}
            <div className="col-span-12 md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
              <div className="relative rounded-2xl md:rounded-tr-2xl overflow-hidden h-[160px] md:h-[160px]" style={{ background: "linear-gradient(135deg, #2d1052 0%, #4c1d95 50%, #581c87 100%)" }}>
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-[12px] font-medium">{revenueCard.title}</span>
                    <div className="flex items-center gap-1 text-emerald-400 text-[12px] font-semibold">
                      <TrendingUp className="size-3.5" />
                      {revenueCard.change}
                    </div>
                  </div>
                  <div>
                    <div className="text-white text-[32px] tracking-tight font-extrabold">{revenueCard.value}</div>
                    <div className="flex gap-4 mt-2">
                      <div>
                        <div className="text-white/40 text-[11px] font-medium">Orders</div>
                        <div className="text-white text-[15px] font-bold">{revenueCard.orders}</div>
                      </div>
                      <div>
                        <div className="text-white/40 text-[11px] font-medium">Customers</div>
                        <div className="text-white text-[15px] font-bold">{revenueCard.customers}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden h-[160px] md:h-[164px]">
                <img src={maltaCard.imageUrl} alt={maltaCard.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="text-white text-[13px] font-semibold">{maltaCard.title}</div>
                  <div className="text-white/60 text-[11px] font-normal">{maltaCard.subtitle}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating notifications */}
          {notifications.map((n: any, idx: number) => (
            <motion.div
              key={idx}
              className={`hidden md:block absolute ${idx === 0 ? 'left-8 top-6' : 'right-12 top-16'}`}
              initial={{ opacity: 0, x: idx === 0 ? -20 : 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + (idx * 0.15) }}
            >
              <div className="bg-white rounded-xl shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25)] px-4 py-3 flex items-center gap-3">
                {n.type === 'join' ? (
                  <img src={n.imageUrl} alt="Seller" className="w-9 h-9 rounded-lg object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--primary-light)]">
                    <ShoppingCart className="size-4" color="var(--primary)" />
                  </div>
                )}
                <div>
                  <div className="text-[#0f172a] text-[12px] font-semibold">{n.title}</div>
                  <div className="text-[#94a3b8] text-[11px] font-normal">{n.subtitle}</div>
                </div>
                {n.type === 'join' && <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
      
      {signupModalOpen && <SignupModal onClose={() => setSignupModalOpen(false)} />}
    </section >
  );
}