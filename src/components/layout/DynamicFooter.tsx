// src/components/layout/DynamicFooter.tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "../ui/Logo";

interface FooterContent {
  companyInfo: {
    name: string;
    description: string;
    tagline: string;
  };
  ctaSection: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  };
  linkSections: {
    [sectionName: string]: Array<{
      label: string;
      href: string;
      highlight?: boolean;
      external?: boolean;
    }>;
  };
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
  contactInfo: {
    email: string;
    phone: string;
  };
  successMetrics: {
    title: string;
    metrics: Array<{
      label: string;
      value: string;
    }>;
  };
  copyright: string;
}

interface DynamicFooterProps {
  footerContent: FooterContent;
}

export default function DynamicFooter({ footerContent }: DynamicFooterProps) {
  const getSocialIcon = (platform: string) => {
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
    return icons[platform.toLowerCase() as keyof typeof icons] || null;
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
              <div className="flex items-center justify-center">
                <div className="flex items-center mr-3">
                  <div className="relative mr-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L2 21m5-8v8a2 2 0 002 2h6a2 2 0 002-2v-8"
                        />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {footerContent.companyInfo.name}
                      </span>
                    </div>
                    <div className="text-xs text-gray-300 font-medium -mt-1">
                      {footerContent.companyInfo.tagline}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4">
              {footerContent.ctaSection.title}
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {footerContent.ctaSection.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={footerContent.ctaSection.primaryButton.link}>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-300 shadow-xl">
                  {footerContent.ctaSection.primaryButton.text}
                </button>
              </Link>
              <Link href={footerContent.ctaSection.secondaryButton.link}>
                <button className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300">
                  {footerContent.ctaSection.secondaryButton.text}
                </button>
              </Link>
            </div>
          </div>

          {/* Links grid */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-8 mb-12">
            {Object.entries(footerContent.linkSections).map(
              ([category, links]) => (
                <div key={category}>
                  <h4 className="font-bold text-lg mb-6 text-blue-400">
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link, index) => (
                      <li key={index}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transition-colors hover:text-blue-400 ${
                              link.highlight
                                ? "text-yellow-400 font-semibold hover:text-yellow-300"
                                : "text-gray-300"
                            }`}
                          >
                            {link.highlight && "🚀 "}
                            {link.label}
                            <svg
                              className="w-3 h-3 inline ml-1"
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
                            className={`transition-colors hover:text-blue-400 ${
                              link.highlight
                                ? "text-yellow-400 font-semibold hover:text-yellow-300"
                                : "text-gray-300"
                            }`}
                          >
                            {link.highlight && "🚀 "}
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>

          {/* Success metrics */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12">
            <h4 className="text-center text-xl font-bold mb-8 text-blue-400">
              {footerContent.successMetrics.title}
            </h4>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {footerContent.successMetrics.metrics.map((metric, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {metric.value}
                  </div>
                  <div className="text-gray-300">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Social links and contact */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-8">
            <div className="mb-6 md:mb-0">
              <p className="text-gray-300 mb-2">Connect with us</p>
              <div className="flex space-x-4">
                {footerContent.socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                    aria-label={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </Link>
                ))}
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-300 mb-2">Need help? We're here 24/7</p>
              <div className="flex flex-col md:flex-row gap-4">
                <a
                  href={`mailto:${footerContent.contactInfo.email}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  📧 {footerContent.contactInfo.email}
                </a>
                <a
                  href={`tel:${footerContent.contactInfo.phone}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  📞 {footerContent.contactInfo.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 py-6 text-center text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>{footerContent.copyright}</p>
            <p className="mt-2 md:mt-0">
              <span className="text-green-400">🟢 All systems operational</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
