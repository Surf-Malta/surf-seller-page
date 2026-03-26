"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Zap, CheckCircle2, ChevronRight } from "lucide-react";

interface Block {
  id: string;
  type: "heading" | "text" | "image" | "button" | "spacer" | "card" | "notification" | "revenue" | "divider" | "social" | "badge" | "progress" | "step";
  text?: string;
  subtitle?: string;
  imageUrl?: string;
  url?: string;
  style?: string;
  amount?: string;
  trend?: string;
  percentage?: number;
  x: number; // %
  y: number; // px
  w: number; // px
  h?: number; // px
  zIndex: number;
  align?: "left" | "center" | "right";
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  borderRadius?: number;
}

interface SectionSettings {
  padding: "none" | "small" | "medium" | "large";
  theme: "light" | "dark" | "glass";
  canvasHeight?: number;
}

interface CustomLayoutProps {
  content?: {
    blocks?: Block[];
    settings?: SectionSettings;
  };
}

export default function CustomLayoutSection({ content }: CustomLayoutProps) {
  const [containerWidth, setContainerWidth] = React.useState(1280);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const blocks = content?.blocks || [];
  const settings = content?.settings || { padding: "medium", theme: "light", canvasHeight: 800 };

  React.useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const scale = Math.min(1, containerWidth / 1280);

  const getThemeStyles = () => {
    switch (settings.theme) {
      case "dark": return "bg-gray-900 text-white";
      case "glass": return "bg-white/5 backdrop-blur-[120px] border-y border-white/10 text-white";
      default: return "bg-white text-gray-900";
    }
  };

  return (
    <section className={`relative overflow-hidden transition-all duration-1000 ${getThemeStyles()}`}>
      {/* Cinematic Dynamic Gradients */}
      {settings.theme !== "light" && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[250px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[250px]" />
        </div>
      )}

      {/* The Artistic Canvas Container */}
      <div 
        ref={containerRef}
        className="relative mx-auto w-full max-w-7xl px-6 md:px-12 overflow-hidden"
        style={{ 
           height: `${(settings.canvasHeight || 800) * scale}px`,
           padding: settings.padding === "large" ? "80px" : settings.padding === "medium" ? "40px" : settings.padding === "small" ? "20px" : "0"
        }}
      >
        <div 
           className="relative origin-top-left"
           style={{ 
              width: "1280px", 
              height: `${settings.canvasHeight || 800}px`,
              transform: `scale(${scale})`
           }}
        >
          {blocks.map((block, index) => {
            const isDark = settings.theme !== "light";
            const alignmentClass = block.align === "center" ? "text-center" : block.align === "right" ? "text-right" : "";

            const style: React.CSSProperties = {
              position: "absolute",
              left: `${block.x}%`,
              top: `${block.y}px`,
              width: `${block.w}px`,
              height: block.h ? `${block.h}px` : "auto",
              zIndex: block.zIndex,
              fontSize: block.fontSize ? `${block.fontSize}px` : undefined,
              fontWeight: block.fontWeight || undefined,
              color: block.color || undefined,
              borderRadius: block.borderRadius !== undefined ? `${block.borderRadius}px` : "24px",
            };

            switch (block.type) {
              case "heading":
                return (
                  <motion.h2
                    key={block.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={style}
                    className={`font-black leading-tight ${alignmentClass}`}
                  >
                    {block.text}
                  </motion.h2>
                );

              case "text":
                return (
                  <motion.p
                    key={block.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    style={style}
                    className={`leading-relaxed ${alignmentClass} ${isDark ? "opacity-60" : "opacity-70"}`}
                  >
                    {block.text}
                  </motion.p>
                );

              case "image":
                return (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={style}
                    className="relative overflow-hidden shadow-2xl border-4 border-white/5"
                  >
                    {block.imageUrl && (
                      <Image src={block.imageUrl} alt="Canvas Asset" fill className="object-cover" />
                    )}
                  </motion.div>
                );

              case "button":
                return (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    style={style}
                    className={`flex ${block.align === "center" ? "justify-center" : block.align === "right" ? "justify-end" : "justify-start"}`}
                  >
                    <Link
                      href={block.url || "#"}
                      style={{ 
                         fontSize: block.fontSize ? `${block.fontSize}px` : undefined, 
                         fontWeight: block.fontWeight || "900", 
                         backgroundColor: block.color || "#2563EB",
                         borderRadius: style.borderRadius 
                      }}
                      className="w-full h-full text-white hover:brightness-110 transition-all shadow-2xl active:scale-95 flex items-center justify-center group uppercase tracking-widest"
                    >
                      {block.text || "Explore Experience"}
                      <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                );

              case "revenue":
                return (
                  <motion.div
                    key={block.id}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    style={style}
                    className={`p-10 shadow-2xl border flex flex-col items-center justify-center ${alignmentClass} ${
                      isDark ? "bg-white/5 border-white/5" : "bg-white border-gray-50 text-black"
                    }`}
                  >
                    <div className="text-[10px] font-black opacity-30 mb-2 uppercase tracking-widest">{block.text}</div>
                    <div style={{ fontSize: block.fontSize ? `${block.fontSize}px` : undefined, fontWeight: block.fontWeight || "900", color: block.color || "inherit" }} className="text-4xl font-black">{block.amount}</div>
                  </motion.div>
                );

              case "notification":
                return (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    style={style}
                    className={`flex items-center gap-6 p-7 shadow-2xl border ${
                      isDark ? "bg-white/5 border-white/5" : "bg-white border-gray-50 text-black"
                    }`}
                  >
                    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500"><Bell className="w-8 h-8" /></div>
                    <div style={{ fontSize: block.fontSize ? `${block.fontSize}px` : undefined, fontWeight: block.fontWeight || "900", color: block.color || "inherit" }} className="text-xl font-black">{block.text}</div>
                  </motion.div>
                );

              case "card":
                return (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    style={style}
                    className={`p-12 border shadow-2xl flex flex-col items-center text-center gap-6 rounded-[3rem] justify-center ${
                      isDark ? "bg-white/5 border-white/5" : "bg-white border-gray-100"
                    }`}
                  >
                    <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                       <Zap className="w-8 h-8 fill-current" />
                    </div>
                    <h3 style={{ fontSize: `${block.fontSize}px`, fontWeight: block.fontWeight, color: block.color || "inherit" }} className="text-2xl font-black">{block.text}</h3>
                  </motion.div>
                );

              case "step":
                return (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    style={style}
                    className="flex items-start gap-8"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex flex-shrink-0 items-center justify-center font-black text-2xl shadow-2xl ${
                      isDark ? "bg-white text-gray-900" : "bg-gray-900 text-white"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="pt-1">
                      <div className="text-2xl font-bold mb-2">{block.text}</div>
                      {block.subtitle && <div className={`${isDark ? "text-gray-400" : "text-gray-500"} leading-relaxed text-lg`}>{block.subtitle}</div>}
                    </div>
                  </motion.div>
                );

              case "progress":
                return (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    style={style}
                    className="px-2"
                  >
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-xs font-black uppercase tracking-widest opacity-40">{block.text}</span>
                      <span className="text-2xl font-black text-blue-500">{block.percentage}%</span>
                    </div>
                    <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${block.percentage}%` }} className="h-full bg-blue-600" />
                    </div>
                  </motion.div>
                );

              default:
                return null;
            }
          })}
        </div>
      </div>
    </section>
  );
}
