import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <Link href="/" className={cn("flex items-center group", className)}>
      {/* Logo Icon */}
      <div className="relative mr-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <Image
            src="/mainIcon.png"
            alt="Surf Seller Logo"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </div>
        {/* Floating dot indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <div className={cn("font-bold", sizes[size])}>
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Surf
          </span>
          <span className="text-gray-900 ml-1">Seller</span>
        </div>
        <div className="text-xs text-gray-500 font-medium -mt-1">
          E-commerce Platform
        </div>
      </div>
    </Link>
  );
}
