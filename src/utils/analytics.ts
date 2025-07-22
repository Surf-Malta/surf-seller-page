// src/utils/analytics.ts
"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";
import React from "react";

export const AnalyticsUtils = {
  // General event tracking
  trackEvent: (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      // GTM tracking
      if (window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          ...parameters,
        });
      }

      // Clarity tracking
      if (window.clarity) {
        window.clarity("event", eventName);
        if (parameters) {
          window.clarity("set", parameters);
        }
      }
    }
  },

  // E-commerce specific events
  trackPurchaseIntent: (productId?: string, productName?: string) => {
    AnalyticsUtils.trackEvent("purchase_intent", {
      product_id: productId,
      product_name: productName,
      timestamp: new Date().toISOString(),
    });
  },

  trackSellerRegistration: (step: string, completed: boolean = false) => {
    AnalyticsUtils.trackEvent("seller_registration", {
      registration_step: step,
      completed: completed,
      timestamp: new Date().toISOString(),
    });
  },

  trackFeatureUsage: (featureName: string, context?: string) => {
    AnalyticsUtils.trackEvent("feature_usage", {
      feature_name: featureName,
      feature_context: context,
      timestamp: new Date().toISOString(),
    });
  },

  // User engagement
  trackTimeOnPage: (timeSpent: number, pagePath: string) => {
    AnalyticsUtils.trackEvent("time_on_page", {
      time_spent_seconds: timeSpent,
      page_path: pagePath,
      timestamp: new Date().toISOString(),
    });
  },

  trackScrollDepth: (scrollPercentage: number, pagePath: string) => {
    AnalyticsUtils.trackEvent("scroll_depth", {
      scroll_percentage: scrollPercentage,
      page_path: pagePath,
      timestamp: new Date().toISOString(),
    });
  },

  // Lead generation
  trackLeadGeneration: (leadSource: string, leadType: string) => {
    AnalyticsUtils.trackEvent("lead_generation", {
      lead_source: leadSource,
      lead_type: leadType,
      timestamp: new Date().toISOString(),
    });
  },

  // Custom conversion events
  trackConversion: (conversionType: string, conversionValue?: number) => {
    AnalyticsUtils.trackEvent("conversion", {
      conversion_type: conversionType,
      conversion_value: conversionValue,
      timestamp: new Date().toISOString(),
    });
  },
};

// Higher-order component for automatic analytics tracking - FIXED VERSION
export function withAnalytics<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
): React.ComponentType<P> {
  const AnalyticsWrappedComponent = (props: P) => {
    const { trackEvent } = useAnalytics();

    useEffect(() => {
      trackEvent("component_mount", {
        component_name: componentName,
        timestamp: new Date().toISOString(),
      });
    }, [trackEvent]);

    return <WrappedComponent {...props} />;
  };

  // Set display name for better debugging
  AnalyticsWrappedComponent.displayName = `withAnalytics(${componentName})`;

  return AnalyticsWrappedComponent;
}

// Alternative HOC with more flexible typing
export function withAnalyticsTracking<P extends object>(componentName: string) {
  return function <T extends React.ComponentType<P>>(WrappedComponent: T): T {
    const TrackedComponent = (props: P) => {
      const { trackEvent } = useAnalytics();

      useEffect(() => {
        trackEvent("component_mount", {
          component_name: componentName,
          timestamp: new Date().toISOString(),
        });
      }, [trackEvent]);

      return React.createElement(WrappedComponent, props);
    };

    TrackedComponent.displayName = `withAnalyticsTracking(${componentName})`;

    return TrackedComponent as T;
  };
}

// Declare global types for clarity and GTM
declare global {
  interface Window {
    dataLayer: any[];
    clarity: any;
    gtag: (...args: any[]) => void;
  }
}
