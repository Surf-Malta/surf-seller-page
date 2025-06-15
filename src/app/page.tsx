import { HeroSection } from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Add proper spacing from header */}
      <div className="pt-20">
        <HeroSection
          hero={{
            id: "home-hero",
            title: "Start Your Online Business Today",
            content:
              "Join thousands of sellers on Surf platform. Sell online with zero investment, manage inventory, and grow your business with our comprehensive seller tools.",
            buttonText: "Start Selling Now",
            buttonLink: "/register",
          }}
        />
        <FeaturesSection />
        <CTASection />
      </div>
    </div>
  );
}
