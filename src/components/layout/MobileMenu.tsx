"use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { RootState } from "@/store";
import { closeMobileMenu, setActiveItem } from "@/store/slices/navigationSlice";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const pathname = usePathname();
  const { isMobileMenuOpen } = useSelector(
    (state: RootState) => state.navigation
  );
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const handleItemClick = (itemId: string) => {
    dispatch(setActiveItem(itemId));
    dispatch(closeMobileMenu());
  };

  const isActiveItem = (href: string) => {
    return pathname === href;
  };

  if (!isMobileMenuOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={() => dispatch(closeMobileMenu())}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={() => dispatch(closeMobileMenu())}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 px-4 py-6 space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  "flex flex-col p-3 rounded-lg transition-colors",
                  isActiveItem(item.href)
                    ? "bg-blue-50 border border-blue-200"
                    : "hover:bg-gray-50"
                )}
              >
                <span
                  className={cn(
                    "font-medium",
                    isActiveItem(item.href) ? "text-blue-600" : "text-gray-900"
                  )}
                >
                  {item.label}
                </span>
                <span className="text-sm text-gray-600 mt-1">
                  {item.description}
                </span>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="p-4 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  Welcome,{" "}
                  <span className="font-medium text-gray-900">
                    {user?.name}
                  </span>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => dispatch(closeMobileMenu())}
                >
                  <Button variant="primary" className="w-full">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // Add logout logic here
                    dispatch(closeMobileMenu());
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link href="/login" onClick={() => dispatch(closeMobileMenu())}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link
                  href="/register"
                  onClick={() => dispatch(closeMobileMenu())}
                >
                  <Button variant="primary" className="w-full">
                    Start Selling
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
