import Link from "next/link";
import { Container } from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const footerLinks = {
    Product: [
      { href: "/how-it-works", label: "How It Works" },
      { href: "/pricing", label: "Pricing" },
      { href: "/features", label: "Features" },
    ],
    Support: [
      { href: "/help", label: "Help Center" },
      { href: "/contact", label: "Contact Us" },
      { href: "/faq", label: "FAQ" },
    ],
    Company: [
      { href: "/about", label: "About Us" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
    ],
    Legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <Container>
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Logo variant="white" />
            <p className="text-gray-400 mt-4 max-w-md">
              Start your online business today with zero investment. Join
              thousands of successful sellers on our platform.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Surf Seller. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
