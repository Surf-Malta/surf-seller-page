// src/components/layout/Footer.tsx - UPDATED VERSION
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { Logo } from "../ui/Logo";

export default function Footer() {
  const footerLinks = {
    "Get Started": [
      { href: "/register", label: "Register now" },
      { href: "/login", label: "Seller Login", external: true },
    ],
    Platform: [
      { href: "/pricing", label: "Pricing & Plans" },
      // { href: "/how-it-works", label: "How it Works" },
      // { href: "/shipping-returns", label: "Shipping" },
    ],
    "Seller Links": [
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/acceptable-use", label: "Acceptable Use Policy" },
    ],
    "Company Links": [
      { href: "/about", label: "About Surf" },
      {
        href: "https://surf.mt/blogs/",
        label: "Blogs",
        external: true,
        directLink: true,
      },
    ],
    "Support & Resources": [
      {
        href: "https://wa.me/35677215267",
        label: "Contact Support",
        external: true,
        directLink: true,
      },
      {
        href: "https://www.youtube.com/@SurfSellerHub",
        label: "Seller Guide",
        external: true,
        directLink: true,
      },
    ],
    Support: [
      { href: "/contact", label: "Contact Us" },
      {
        href: "mailto:sell@surf.mt",
        label: "Email Support",
        external: true,
        directLink: true,
      },
    ],
  };

  const socialLinks = [
    {
      href: "https://www.facebook.com/surfmt.malta",
      icon: "facebook",
      label: "Facebook",
    },
    {
      href: "https://www.instagram.com/surf.mt",
      icon: "instagram",
      label: "Instagram",
    },
    {
      href: "https://www.linkedin.com/company/surfmt",
      icon: "linkedin",
      label: "LinkedIn",
    },
    {
      href: "https://www.youtube.com/@SurfSellerHub",
      icon: "youtube",
      label: "YouTube",
    },
  ];

  const getSocialIcon = (icon: string) => {
    const icons = {
      facebook: (
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      instagram: (
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      linkedin: (
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      youtube: (
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    };
    return icons[icon as keyof typeof icons] || null;
  };

  return (
    <footer className="bg-white relative overflow-hidden border-t border-gray-100">
      <Container className="relative z-10">
        {/* Main footer content */}
        <div className="py-8 sm:py-12 lg:py-16">
          {/* Top section with logo and CTA - Mobile optimized */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="mb-6 sm:mb-8">
              {/* Logo */}
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <Logo />
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 px-2">
              Ready to Start Your E-commerce Journey?
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Sellers across Malta are embracing the future of commerce with
              Surf, where going online is simple and rewarding
            </p>

            {/* Fixed button container with proper sizing for full text */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 justify-center max-w-sm sm:max-w-xl mx-auto px-4">
              <Link href="/register" className="flex-1">
                <button className="w-full bg-gradient-to-r from-[#A600F7] to-[#9101CF] text-white py-2.5 sm:py-3 px-2 sm:px-2 lg:px-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-xs lg:text-sm hover:from-purple-700 hover:to-purple-800 transform hover:-translate-y-1 transition-all duration-300 shadow-lg whitespace-nowrap">
                  <span className="hidden sm:inline">
                    🚀 Start Selling FREE
                  </span>
                  <span className="sm:hidden">🚀 Start FREE</span>
                </button>
              </Link>
              <Link href="/pricing" className="flex-1">
                <button className="w-full bg-purple-100 text-purple-700 py-2.5 sm:py-3 px-2 sm:px-2 lg:px-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-xs lg:text-sm hover:bg-purple-200 transform hover:-translate-y-1 transition-all duration-300 whitespace-nowrap flex items-center justify-center">
                  💎 View Pricing
                </button>
              </Link>
            </div>
          </div>

          {/* Links grid - Single column on mobile, multiple on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12 max-w-6xl mx-auto px-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-bold text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 lg:mb-6 text-gray-900">
                  {category}
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      {link.external || link.directLink ? (
                        <a
                          href={
                            link.directLink
                              ? link.href
                              : "https://surf.mt/vendor.php?dispatch=auth.login_form&return_url=vendor.php"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors flex items-center leading-relaxed"
                        >
                          {link.label}
                          <svg
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors block leading-relaxed"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social links and contact section - Mobile optimized */}
          <div className="border-t border-gray-200 pt-6 sm:pt-8 px-4">
            <div className="flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
              <div className="text-center sm:text-left">
                <p className="text-sm sm:text-base text-gray-600 mb-3 font-medium">
                  Connect with us
                </p>
                <div className="flex justify-center sm:justify-start space-x-2 sm:space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.icon}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
                      aria-label={social.label}
                    >
                      {getSocialIcon(social.icon)}
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-center sm:text-right">
                <p className="text-sm sm:text-base text-gray-600 mb-3 font-medium">
                  Need help? We're here 24/7
                </p>
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:gap-4">
                  <a
                    href="mailto:sell@surf.mt"
                    className="text-orange-500 hover:text-orange-600 transition-colors flex items-center justify-center sm:justify-start text-sm sm:text-base"
                  >
                    📧 sell@surf.mt
                  </a>
                  <a
                    href="tel:+35677413456"
                    className="text-orange-500 hover:text-orange-600 transition-colors flex items-center justify-center sm:justify-start text-sm sm:text-base"
                  >
                    📞 +356 7741 3456
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar - Mobile optimized */}
        <div className="border-t border-gray-200 py-4 sm:py-6 text-center text-gray-500 px-4">
          <p className="text-xs sm:text-sm">
            © 2025 Surf Creative Solutions. All rights reserved.{" "}
            <span className="block sm:inline mt-1 sm:mt-0">
              Made with ❤️ in Malta.
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
