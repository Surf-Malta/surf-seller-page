"use client";

import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { fade, stagger } from "@/utils/animations";
import { motion } from "motion/react";
import { steps } from "@/app/page";

interface HowItWorksSectionProps {
    steps: steps[]
}

export function HowItWorksSection({ steps }: HowItWorksSectionProps) {
    return (
        <section id="how-it-works" className="py-8 sm:py-12 lg:py-15.5">
            <div className="max-w-6xl mx-auto px-4">

                <SectionHeader
                    badge="How it Works"
                    title="Up and running in four steps"
                    subtitle="From registration to your first sale — it's faster than you think."
                />

                <motion.div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger}
                >
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.num}
                            variants={fade}
                            custom={i}
                            className="group relative rounded-2xl p-7 transition-all border border-transparent hover:border-black/[0.04] hover:bg-[#fafafa]"
                        >
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[13px] text-white mb-5 bg-[var(--primary)] font-[800]">
                                {step.num}
                            </div>

                            <h3 className="text-[var(--heading-color)] text-[16px] font-bold">
                                {step.title}
                            </h3>

                            <p className="mt-2 text-[var(--text-secondary)] text-[14px] leading-relaxed font-normal">
                                {step.desc}
                            </p>

                            {i < steps.length - 1 && (
                                <div className="hidden lg:flex absolute top-12 -right-2 text-[var(--border-muted)]">
                                    <ArrowRight className="size-4" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section >
    );
}