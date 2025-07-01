import Link from "next/link";
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
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L2 21m5-8v8a2 2 0 002 2h6a2 2 0 002-2v-8"
            />
          </svg>
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
