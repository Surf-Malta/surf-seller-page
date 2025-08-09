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
      { href: "/how-it-works", label: "How it Works" },
      { href: "/shipping-returns", label: "Shipping" },
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
  };

  const socialLinks = [
    { href: "#", icon: "facebook", label: "Facebook" },
    { href: "#", icon: "reddit", label: "Reddit" },
    { href: "#", icon: "linkedin", label: "LinkedIn" },
    { href: "#", icon: "youtube", label: "YouTube" },
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
      reddit: (
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
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
                    <Link
                      key={social.icon}
                      href={social.href}
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
                      aria-label={social.label}
                    >
                      {getSocialIcon(social.icon)}
                    </Link>
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
