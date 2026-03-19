"use client";

import { fade, stagger } from "@/utils/animations";
import { motion } from "motion/react";

export function SectionHeader({
    badge,
    title,
    subtitle,
}: {
    badge: string;
    title: string;
    subtitle: string;
}) {
    return (
        <motion.div
            className="text-center max-w-[560px] mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={stagger}
        >
            <motion.div
                variants={fade}
                className="inline-block text-[12px] tracking-[0.12em] px-4 py-1.5 rounded-full mb-4 font-bold 
                text-[var(--primary)] bg-[var(--primary-light)]"
            >
                {badge.toUpperCase()}
            </motion.div>

            <motion.h2
                variants={fade}
                className="text-[28px] md:text-[36px] leading-[1.15] tracking-tight font-extrabold 
                text-[var(--heading-color)]"
            >
                {title}
            </motion.h2>

            <motion.p
                variants={fade}
                className="mt-3 text-[16px] leading-relaxed font-normal 
                text-[var(--text-muted)]"
            >
                {subtitle}
            </motion.p>
        </motion.div>
    );
}