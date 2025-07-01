import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "../ui/Logo";

export default function Footer() {
  const footerLinks = {
    "Get Started": [
      { href: "/register", label: "Start Selling Free", highlight: true },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/pricing", label: "Pricing & Commission" },
      { href: "/login", label: "Vendor Login" },
    ],
    "Selling Tools": [
      { href: "/features", label: "Store Builder" },
      { href: "/inventory", label: "Inventory Management" },
      { href: "/analytics", label: "Sales Analytics" },
      { href: "/marketing", label: "Marketing Tools" },
    ],
    "Support & Resources": [
      { href: "/help", label: "Help Center" },
      { href: "/contact", label: "Contact Support" },
      { href: "/seller-guide", label: "Seller Guide" },
      { href: "/success-stories", label: "Success Stories" },
    ],
    Company: [
      { href: "/about", label: "About Us" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Seller Blog" },
      { href: "/press", label: "Press & Media" },
    ],
    Legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/seller-agreement", label: "Seller Agreement" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  };

  const socialLinks = [
    { href: "#", icon: "facebook", label: "Facebook" },
    { href: "#", icon: "twitter", label: "Twitter" },
    { href: "#", icon: "instagram", label: "Instagram" },
    { href: "#", icon: "linkedin", label: "LinkedIn" },
    { href: "#", icon: "youtube", label: "YouTube" },
  ];

  const getSocialIcon = (icon: string) => {
    const icons = {
      facebook: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      twitter: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      instagram: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.333-1.297C3.678 14.394 3.678 12.017 5.116 10.579c1.438-1.438 3.815-1.438 5.253 0 .72.72 1.081 1.666 1.081 2.612s-.361 1.891-1.081 2.612c-.885.807-2.036 1.297-3.333 1.297v-.002zm7.072 0c-1.297 0-2.448-.49-3.333-1.297-1.438-1.438-1.438-3.815 0-5.253 1.438-1.438 3.815-1.438 5.253 0 .72.72 1.081 1.666 1.081 2.612s-.361 1.891-1.081 2.612c-.885.807-2.036 1.297-3.333 1.297v-.002z" />
        </svg>
      ),
      linkedin: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      youtube: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    };
    return icons[icon as keyof typeof icons] || null;
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white rounded-full"></div>
      </div>

      <Container className="relative z-10">
        {/* Main footer content */}
        <div className="py-16">
          {/* Top section with logo and CTA */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <Logo size="lg" className="justify-center" />
            </div>
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your E-commerce Journey?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful sellers who've transformed their
              lives through online selling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-300 shadow-xl">
                  🚀 Start Selling FREE
                </button>
              </Link>
              <Link href="/how-it-works">
                <button className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300">
                  Learn How It Works
                </button>
              </Link>
            </div>
          </div>

          {/* Links grid */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-8 mb-12">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-bold text-lg mb-6 text-blue-400">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`transition-colors hover:text-blue-400 ${
                          link.highlight
                            ? "text-yellow-400 font-semibold hover:text-yellow-300"
                            : "text-gray-300"
                        }`}
                      >
                        {link.highlight && "🚀 "}
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Success metrics */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12">
            <h4 className="text-center text-xl font-bold mb-8 text-blue-400">
              Our E-commerce Success Story
            </h4>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  50K+
                </div>
                <div className="text-gray-300">Active Sellers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  ₹100Cr+
                </div>
                <div className="text-gray-300">Revenue Generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">2M+</div>
                <div className="text-gray-300">Products Sold</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  99.9%
                </div>
                <div className="text-gray-300">Uptime</div>
              </div>
            </div>
          </div>

          {/* Social links and contact */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-8">
            <div className="mb-6 md:mb-0">
              <p className="text-gray-300 mb-2">Connect with us</p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.icon}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    {getSocialIcon(social.icon)}
                  </Link>
                ))}
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-300 mb-2">Need help? We're here 24/7</p>
              <div className="flex flex-col md:flex-row gap-4">
                <a
                  href="mailto:support@surfseller.com"
                  className="text-blue-400 hover:text-blue-300"
                >
                  📧 support@surfseller.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="text-blue-400 hover:text-blue-300"
                >
                  📞 +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 py-6 text-center text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>
              &copy; 2024 Surf Seller. All rights reserved. Made with ❤️ for
              entrepreneurs.
            </p>
            <p className="mt-2 md:mt-0">
              <span className="text-green-400">🟢 All systems operational</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
