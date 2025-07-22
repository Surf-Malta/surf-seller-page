"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Helper functions for tracking
export const useAnalytics = () => {
  const pathname = usePathname();

  // Track page views automatically
  useEffect(() => {
    const handlePageView = () => {
      if (typeof window !== "undefined") {
        // Google Tag Manager page view
        if (window.dataLayer) {
          window.dataLayer.push({
            event: "page_view",
            page_title: document.title,
            page_location: window.location.href,
            page_path: pathname,
          });
        }

        // Microsoft Clarity page view (automatic but we can add custom data)
        if (window.clarity) {
          window.clarity("set", {
            page_path: pathname,
            page_title: document.title,
          });
        }
      }
    };

    // Small delay to ensure page is fully loaded
    const timer = setTimeout(handlePageView, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Event tracking functions
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      // Google Tag Manager
      if (window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          ...parameters,
        });
      }

      // Microsoft Clarity
      if (window.clarity) {
        window.clarity("event", eventName);
        if (parameters) {
          window.clarity("set", parameters);
        }
      }

      console.log("📊 Analytics event tracked:", eventName, parameters);
    }
  };

  const trackButtonClick = (buttonName: string, location?: string) => {
    trackEvent("button_click", {
      button_name: buttonName,
      click_location: location || pathname,
      timestamp: new Date().toISOString(),
    });
  };

  const trackFormSubmission = (formName: string, success: boolean = true) => {
    trackEvent("form_submit", {
      form_name: formName,
      form_success: success,
      page_path: pathname,
      timestamp: new Date().toISOString(),
    });
  };

  const trackRegistrationStep = (step: number, stepName: string) => {
    trackEvent("registration_step", {
      step_number: step,
      step_name: stepName,
      page_path: pathname,
      timestamp: new Date().toISOString(),
    });
  };

  const trackChatInteraction = (action: string) => {
    trackEvent("chat_interaction", {
      chat_action: action,
      page_path: pathname,
      timestamp: new Date().toISOString(),
    });
  };

  const trackNavigation = (destination: string, source?: string) => {
    trackEvent("navigation", {
      destination_page: destination,
      source_page: source || pathname,
      timestamp: new Date().toISOString(),
    });
  };

  const trackError = (
    errorType: string,
    errorMessage: string,
    context?: any
  ) => {
    trackEvent("error", {
      error_type: errorType,
      error_message: errorMessage,
      error_context: context,
      page_path: pathname,
      timestamp: new Date().toISOString(),
    });
  };

  const trackSearch = (searchQuery: string, resultsCount?: number) => {
    trackEvent("search", {
      search_query: searchQuery,
      results_count: resultsCount,
      page_path: pathname,
      timestamp: new Date().toISOString(),
    });
  };

  return {
    trackEvent,
    trackButtonClick,
    trackFormSubmission,
    trackRegistrationStep,
    trackChatInteraction,
    trackNavigation,
    trackError,
    trackSearch,
  };
};
