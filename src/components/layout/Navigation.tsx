"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { setActiveItem } from "@/store/slices/navigationSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";
import { NAVIGATION_ITEMS } from "@/constants/navigation";

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  description: string;
  order: number;
}

export function Navigation() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!realtimeDb) {
      // If Firebase is not available, use the static navigation items
      const staticNavItems = NAVIGATION_ITEMS.map((item, index) => ({
        id: item.id,
        label: item.label,
        href: item.href,
        description: item.description,
        order: index + 1,
      }));
      setNavigationItems(staticNavItems);
      setLoading(false);
      return;
    }

    try {
      const navItemsRef = ref(realtimeDb, "navigation_items");
      const unsubscribe = onValue(navItemsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const navItems: NavigationItem[] = Object.keys(data)
            .map((key) => ({
              id: key,
              ...data[key],
            }))
            .sort((a, b) => a.order - b.order);
          setNavigationItems(navItems);
        } else {
          // If no Firebase data, use static navigation items as fallback
          const staticNavItems = NAVIGATION_ITEMS.map((item, index) => ({
            id: item.id,
            label: item.label,
            href: item.href,
            description: item.description,
            order: index + 1,
          }));
          setNavigationItems(staticNavItems);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching navigation items:", error);
      // Fallback to static navigation items
      const staticNavItems = NAVIGATION_ITEMS.map((item, index) => ({
        id: item.id,
        label: item.label,
        href: item.href,
        description: item.description,
        order: index + 1,
      }));
      setNavigationItems(staticNavItems);
      setLoading(false);
    }
  }, []);

  const handleItemClick = (itemId: string) => {
    dispatch(setActiveItem(itemId));
  };

  const isActiveItem = (href: string) => {
    return pathname === href;
  };

  // Show loading skeleton
  if (loading) {
    return (
      <nav className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded px-3 py-2 w-20"></div>
          </div>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-1">
      {navigationItems.map((item) => (
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
          {hoveredItem === item.id && item.description && (
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
