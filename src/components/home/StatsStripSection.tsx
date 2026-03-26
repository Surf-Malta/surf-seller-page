"use client";

import { fade, stagger } from "@/utils/animations";
import { Users, Package, Star, Shield } from "lucide-react";
import { motion } from "motion/react";

const stats = [
    { icon: Users, value: "500+", label: "Active Sellers" },
    { icon: Package, value: "50K+", label: "Products Listed" },
    { icon: Star, value: "98%", label: "Satisfaction" },
    { icon: Shield, value: "24/7", label: "Support" },
];

export default function StatsStrip({ content }: { content?: any }) {
    const iconMap: { [key: string]: any } = {
        Users,
        Package,
        Star,
        Shield
    };

    const data = content || {
        stats: [
            { iconName: "Users", value: "500+", label: "Active Sellers" },
            { iconName: "Package", value: "50K+", label: "Products Listed" },
            { iconName: "Star", value: "98%", label: "Satisfaction" },
            { iconName: "Shield", value: "24/7", label: "Support" },
        ]
    };

    return (
        <section className="border-y border-black/[0.05]">
            <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-10">

                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={stagger}
                >
                    {data.stats.map((s: any) => {
                        const Icon = iconMap[s.iconName] || Users;
                        return (
                            <motion.div key={s.label} variants={fade}
                                className="flex items-center gap-4"
                            >

                                {/* Icon Box */}
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: "var(--primary-light)" }}
                                >
                                    <Icon
                                        className="size-5"
                                        style={{ color: "var(--primary)" }}
                                    />
                                </div>

                                {/* Text */}
                                <div>
                                    <div
                                        className="text-[22px] leading-none"
                                        style={{
                                            color: "var(--heading-color)",
                                            fontWeight: 800,
                                        }}
                                    >
                                        {s.value}
                                    </div>

                                    <div
                                        className="text-[13px] mt-0.5"
                                        style={{
                                            color: "var(--text-secondary)",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {s.label}
                                    </div>
                                </div>

                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}