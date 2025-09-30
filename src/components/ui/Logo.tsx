import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
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
      <div className="w-[3px] h-6 bg-[#606060] mx-3 rounded-3xl"></div>
      {/* Seller Hub Text */}
      <span
        className="text-center italic font-semibold"
        style={{
          color: "#333",
          fontFamily: "Poppins, sans-serif",
          fontSize: "16px",
          fontWeight: "600",
          letterSpacing: "0.64px",
          fontStyle: "italic",
        }}
      >
        Seller Hub
      </span>
    </Link>
  );
}
