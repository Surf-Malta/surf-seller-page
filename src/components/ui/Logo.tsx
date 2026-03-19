import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  textColor?: string
}

export function Logo({ className, size = "md", textColor = "var(--text-black)",
}: LogoProps) {
  const sizes = {
    xs: "h-7",
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  };

  return (
    <Link href="https://surf.mt" className={cn("flex items-center", className)}>
      <Image
        src="/mainSurf.png"
        alt="Surf Logo"
        width={160}
        height={40}
        className={cn("w-auto", sizes[size])}
      />
      {/* Divider */}
      <div className="w-[1px] h-4 bg-[#606060] mx-2.5 rounded-3xl"></div>
      {/* Seller Hub Text */}
      <span
        className="text-center italic font-semibold"
        style={{
          color: textColor,
          fontFamily: "Poppins, sans-serif",
          fontSize: "13px",
          fontWeight: "700",
          letterSpacing: "0.64px",
          fontStyle: "italic",
        }}
      >
        Seller Hub
      </span>
    </Link>
  );
}
