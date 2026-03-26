"use client";

import { testimonials } from "@/app/page";
import { SectionHeader } from "./SectionHeader"
import { motion } from "motion/react";
import { fade, stagger } from "@/utils/animations";
import { Star } from "lucide-react";

interface TestimonialsProps {
    testimonials: testimonials[]
}

const Testimonials = ({ content, testimonials: legacyTestimonials }: { content?: any, testimonials: testimonials[] }) => {
    const data = content || {
        badge: "Testimonials",
        title: "What our sellers are saying",
        subtitle: "Hear from businesses that have thrived with Surf.",
        testimonials: legacyTestimonials || []
    };

    return (
        <section id="testimonials" className="py-8 sm:py-12 lg:py-14 bg-[var(--bg-light)] relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <SectionHeader
                    badge={data.badge}
                    title={data.title}
                    subtitle={data.subtitle}
                />

                {/* Testimonials Grid */}
                <motion.div
                    className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:mx-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={stagger}
                >
                    {data.testimonials.map((t: any, i: number) => (
                        <motion.div
                            key={t.name}
                            variants={fade}
                            custom={i}
                            className="bg-white border border-black/[0.04] rounded-2xl p-6 hover:shadow-[0_4px_24px_-6px_rgba(0,0,0,0.06)] transition-all"
                        >
                            {/* Stars */}
                            <div className="flex gap-0.5 mb-4">
                                {Array.from({ length: t.stars }).map((_, s) => (
                                    <Star key={s} className="size-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-[#374151] text-[14px] leading-relaxed" style={{ fontWeight: 400 }}>
                                "{t.quote}"
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center gap-3 mt-5 pt-5 border-t border-black/[0.04]">
                                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="text-[#0f172a] text-[14px]" style={{ fontWeight: 600 }}>{t.name}</div>
                                    <div className="text-[#94a3b8] text-[12px]" style={{ fontWeight: 400 }}>{t.title}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
export default Testimonials