import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/store/provider";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BrevoChat from "@/components/ui/BrevoChat";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Surf Seller - Start Your Online Business Today",
  description:
    "Join thousands of sellers on Surf platform. Sell online with zero investment, manage inventory, and grow your business with our comprehensive seller tools.",
  keywords: [
    "online selling",
    "ecommerce",
    "seller platform",
    "business",
    "marketplace",
  ],
  authors: [{ name: "Surf Seller Team" }],
  openGraph: {
    title: "Surf Seller - Start Your Online Business Today",
    description: "Join thousands of sellers on Surf platform",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Brevo Chat Widget Styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Brevo Chat Widget Global Styles */
            #brevo-conversations,
            [id*="brevo-conversations"],
            .brevo-conversations {
              position: fixed !important;
              bottom: 20px !important;
              right: 20px !important;
              z-index: 9999 !important;
              pointer-events: auto !important;
            }

            /* Brevo chat button styles */
            .brevo-chat-button,
            [class*="brevo-chat-button"],
            [id*="brevo-button"] {
              position: fixed !important;
              bottom: 20px !important;
              right: 20px !important;
              z-index: 9999 !important;
              pointer-events: auto !important;
              cursor: pointer !important;
            }

            /* Mobile responsive positioning */
            @media (max-width: 768px) {
              #brevo-conversations,
              [id*="brevo-conversations"],
              .brevo-conversations,
              .brevo-chat-button,
              [class*="brevo-chat-button"],
              [id*="brevo-button"] {
                bottom: 15px !important;
                right: 15px !important;
              }
            }

            /* Ensure widget is always visible */
            #brevo-conversations * {
              box-sizing: border-box;
            }

            /* Override any conflicting styles */
            #brevo-conversations,
            #brevo-conversations iframe,
            #brevo-conversations div {
              max-width: none !important;
              max-height: none !important;
            }
          `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        <ReduxProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            {/* Brevo Chat Widget Component */}
            <BrevoChat />
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
