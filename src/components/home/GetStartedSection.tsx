"use client";

import { ArrowRight } from "lucide-react";
import { Logo } from "../ui/Logo";
import { fade, stagger } from "@/utils/animations";
import Link from "next/link";
import { motion } from "motion/react";

function GetStarted({ content }: { content?: any }) {
    const data = content || {
        title: "Start your e-commerce journey",
        subtitle: "Sellers across Malta are embracing the future of commerce with Surf — where going online is simple and rewarding.",
        primaryCta: "Start Selling Free",
        footerNote: "No credit card required · Set up in under 5 minutes"
    };

    return (
        <section
            id="get-started"
            className="bg-[var(--bg-white-light)] py-[52px]"
        >
            <div className="max-w-[1200px] mx-auto px-5 md:px-10">
                <motion.div
                    className="text-center max-w-[480px] mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={stagger}
                >
                    {/* Top badge */}
                    <motion.div variants={fade} className="flex items-center justify-center gap-2.5 mb-6">
                        <Logo size="xs" />
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        variants={fade}
                        className="text-[var(--heading-color)] text-[28px] md:text-[36px] leading-[1.15] tracking-tight font-extrabold"
                    >
                        {data.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={fade}
                        className="mt-3 text-[var(--text-muted)] text-[16px] leading-relaxed"
                    >
                        {data.subtitle}
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        variants={fade}
                        className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
                    >

                        <Link
                            href="/register"
                            className="group inline-flex items-center justify-center gap-2.5 text-white text-[15px] px-8 py-3.5 rounded-xl transition-all shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] font-semibold"
                        >
                            {data.primaryCta}
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </motion.div>

                    {/* Footer note */}
                    <motion.p                      
                      variants={fade}
                        className="mt-4 text-[var(--text-secondary)] text-[13px]"
                    >
                        {data.footerNote}
                    </motion.p>
                </motion.div>
            </div>
        </section >
    );
}

export default GetStarted;