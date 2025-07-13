// src/components/ui/Button.tsx
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "premium"
    | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      loadingText,
      children,
      disabled,
      icon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group";

    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300",
      outline:
        "border-2 border-gray-300 bg-transparent hover:bg-gray-50 hover:border-gray-400",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      danger:
        "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
      premium:
        "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl hover:-translate-y-1",
      gradient:
        "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl hover:-translate-y-1",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 py-3",
      lg: "h-13 px-8 py-4 text-lg",
      xl: "h-16 px-10 py-5 text-xl",
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Shine effect for premium variants */}
        {(variant === "premium" || variant === "gradient") && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        )}

        <span className="relative z-10 flex items-center">
          {/* Loading spinner */}
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {loadingText || "Loading..."}
            </>
          ) : (
            <>
              {icon && <span className="mr-2">{icon}</span>}
              {children}
              {rightIcon && (
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  {rightIcon}
                </span>
              )}
            </>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
