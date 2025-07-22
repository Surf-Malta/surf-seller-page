"use client";

import { useEffect } from "react";
import MicrosoftClarity from "./MicrosoftClarity";
import GoogleTagManager from "./GoogleTagManager";

interface AnalyticsProps {
  clarityProjectId?: string;
  gtmId?: string;
  enableClarity?: boolean;
  enableGTM?: boolean;
}

export default function Analytics({
  clarityProjectId = "righ75m2x4",
  gtmId = "GTM-W9QLNPQC",
  enableClarity = true,
  enableGTM = true,
}: AnalyticsProps) {
  useEffect(() => {
    // Initialize dataLayer for GTM if not exists
    if (enableGTM && typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];

      // Push initial page view
      window.dataLayer.push({
        event: "page_view",
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [enableGTM]);

  return (
    <>
      {enableClarity && <MicrosoftClarity projectId={clarityProjectId} />}
      {enableGTM && <GoogleTagManager gtmId={gtmId} />}
    </>
  );
}

// Helper functions for tracking events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
    console.log("📊 GTM Event tracked:", eventName, parameters);
  }
};

export const trackPageView = (pageTitle: string, pageLocation: string) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "page_view",
      page_title: pageTitle,
      page_location: pageLocation,
    });
    console.log("📊 Page view tracked:", pageTitle, pageLocation);
  }
};

// Clarity specific tracking
export const trackClarityEvent = (eventName: string, details?: any) => {
  if (typeof window !== "undefined" && window.clarity) {
    window.clarity("event", eventName);
    if (details) {
      window.clarity("set", details);
    }
    console.log("🔍 Clarity event tracked:", eventName, details);
  }
};

// Type declarations for global objects
declare global {
  interface Window {
    dataLayer: any[];
    clarity: any;
    gtag: (...args: any[]) => void;
  }
}
