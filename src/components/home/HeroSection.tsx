"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, CheckCircle2, Package, Play, ShoppingCart, Sparkles, TrendingUp } from "lucide-react";
import { fade, stagger } from "@/utils/animations";
import { motion } from "motion/react";
import SignupModal from "../registration/SignupModal";
import { useState } from "react";

export function HeroSection() {
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(165deg,var(--hero-bg-1)_0%,var(--hero-bg-2)_35%,var(--hero-bg-3)_65%,var(--hero-bg-4)_100%)] text-white pt-24 pb-16">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/30 blur-[120px] opacity-40"></div>
      </div>

      <Container className="relative z-10">
        <motion.div initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center max-w-3xl mx-auto">

          {/* Badge */}
          <motion.div
            variants={fade}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-7 border border-white/10 bg-white/[0.06]"
          >
            <Sparkles className="size-3.5 text-amber-400" />
            <span className="text-white/70 text-xs tracking-wide" style={{ fontWeight: 600 }}>
              Malta's #1 Seller Platform
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fade} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em]">
            Sell online in Malta,
            <br />
            <span className="text-[var(--secondary-light)]">
              without the hassle
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fade} className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed max-w-[520px] mx-auto "
            style={{ fontWeight: 400 }}
          >
            Join hundreds of local businesses already growing on Surf.
            Set up in minutes, reach thousands of customers, pay nothing upfront.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fade} className="mt-8 flex flex-row flex-wrap justify-center gap-3">
            {/* <Link href="/register"> */}
            <button
              onClick={() => setSignupModalOpen(true)}
              className="text-[15px] group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl 
bg-[var(--primary)] hover:bg-[var(--primary-hover)]  
transition font-semibold text-white
shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_4px_20px_rgba(var(--primary-rgb),0.3)]
hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_30px_rgba(var(--primary-rgb),0.4)]">
              Start Selling Free
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            {/* </Link> */}

            <button className="inline-flex items-center gap-2 text-white/80 hover:text-white text-[15px] px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.06] transition-all">
              <Play className="size-3.5" />
              How it works
            </button>
          </motion.div>

          {/* Features */}
          <motion.div variants={fade} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 justify-center text-white/40 text-[13px]" style={{ fontWeight: 400 }}>
            {["Free to start", "No setup fees", "Go live in minutes"].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Cards */}
        <motion.div
          className="pb-0 relative mt-16 md:mx-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {/* Main large card — seller working */}
            <div className="col-span-12 md:col-span-7 relative rounded-2xl overflow-hidden h-[280px] md:h-[340px]">
              <img
                src="https://images.unsplash.com/photo-1687422808248-f807f4ea2a2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGJ1c2luZXNzJTIwb3duZXIlMjBtYW4lMjBwYWNraW5nJTIwb3JkZXJzJTIwc21pbGV8ZW58MXx8fHwxNzcyNzE2NTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Seller packing orders"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/15 backdrop-blur-md">
                    <Package className="size-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white text-[14px]" style={{ fontWeight: 600 }}>Manage & Ship</div>
                    <div className="text-white/60 text-[12px]" style={{ fontWeight: 400 }}>Handle orders with integrated logistics</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column — stacked */}
            <div className="col-span-12 md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
              {/* Stats overlay card */}
              <div className="relative rounded-2xl md:rounded-tr-2xl overflow-hidden h-[160px] md:h-[160px]" style={{ background: "linear-gradient(135deg, #2d1052 0%, #4c1d95 50%, #581c87 100%)" }}>
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-[12px]" style={{ fontWeight: 500 }}>Monthly Revenue</span>
                    <div className="flex items-center gap-1 text-emerald-400 text-[12px]" style={{ fontWeight: 600 }}>
                      <TrendingUp className="size-3.5" />
                      +32%
                    </div>
                  </div>
                  <div>
                    <div className="text-white text-[32px] tracking-tight" style={{ fontWeight: 800 }}>€12,450</div>
                    <div className="flex gap-4 mt-2">
                      {[{ l: "Orders", v: "148" }, { l: "Customers", v: "89" }].map((s) => (
                        <div key={s.l}>
                          <div className="text-white/40 text-[11px]" style={{ fontWeight: 500 }}>{s.l}</div>
                          <div className="text-white text-[15px]" style={{ fontWeight: 700 }}>{s.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Malta scenery card */}
              <div className="relative rounded-2xl overflow-hidden h-[160px] md:h-[164px]">
                <img
                  src="https://images.unsplash.com/photo-1675773680276-7e544248a111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWx0YSUyMFZhbGxldHRhJTIwY29sb3JmdWwlMjBidWlsZGluZ3MlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc3MjcxNjU0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Malta Valletta"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="text-white text-[13px]" style={{ fontWeight: 600 }}>Built for Malta</div>
                  <div className="text-white/60 text-[11px]" style={{ fontWeight: 400 }}>Local commerce, local solutions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating notification cards on top of grid */}
          {/* new seller joined */}
          <motion.div
            className="hidden md:block absolute left-8 top-6"
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div className="bg-white rounded-xl shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25)] px-4 py-3 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573495628363-7114730a4a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGVudHJlcHJlbmV1ciUyMHdvbWFuJTIwdGFibGV0JTIwc3RvcmUlMjBpbnZlbnRvcnl8ZW58MXx8fHwxNzcyNzE2NTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Seller"
                className="w-9 h-9 rounded-lg object-cover"
              />
              <div>
                <div className="text-[#0f172a] text-[12px]" style={{ fontWeight: 600 }}>New seller joined!</div>
                <div className="text-[#94a3b8] text-[11px]" style={{ fontWeight: 400 }}>Valletta Crafts · just now</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </div>
          </motion.div>


          {/* new order received */}
          <motion.div
            className="hidden md:block absolute right-12 top-16"
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 1.05 }}
          >
            <div className="bg-white rounded-xl shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25)] px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--primary-light)]">
                <ShoppingCart className="size-4" color="var(--primary)" />
              </div>
              <div>
                <div className="text-[#0f172a] text-xs" style={{ fontWeight: 600 }}>New order received</div>
                <div className="text-[#94a3b8] text-[11px]" style={{ fontWeight: 400 }}>€47.50 · Sliema delivery</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
      <div>

        {signupModalOpen && <SignupModal onClose={() => setSignupModalOpen(false)} />}
      </div>
    </section >
  );
}