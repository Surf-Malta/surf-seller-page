"use client";

import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { setActiveItem } from "@/store/slices/navigationSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function Navigation() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();
  // const { activeItem } = useSelector((state: RootState) => state.navigation);
  const dispatch = useDispatch();

  const handleItemClick = (itemId: string) => {
    dispatch(setActiveItem(itemId));
  };

  const isActiveItem = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="flex items-center space-x-1">
      {NAVIGATION_ITEMS.map((item) => (
        <div
          key={item.id}
          className="relative"
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Link
            href={item.href}
            onClick={() => handleItemClick(item.id)}
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative",
              isActiveItem(item.href)
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            )}
          >
            {item.label}

            {/* Active indicator */}
            {isActiveItem(item.href) && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
            )}
          </Link>

          {/* Hover tooltip */}
          {hoveredItem === item.id && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="text-sm font-medium text-gray-900 mb-1">
                {item.label}
              </div>
              <div className="text-xs text-gray-600">{item.description}</div>

              {/* Arrow */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-l border-t border-gray-200 rotate-45" />
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
