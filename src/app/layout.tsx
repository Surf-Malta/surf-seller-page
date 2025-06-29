import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/store/provider";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
      <body className={`${inter.className} bg-gray-50`}>
        <ReduxProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
