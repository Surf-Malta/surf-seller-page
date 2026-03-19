import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail, Phone, Youtube } from "lucide-react";
import { Logo } from "../ui/Logo";

export default function Footer() {
  const footerLinks = {
    "Get Started": [
      { href: "/register", label: "Register now" },
      { href: "/login", label: "Seller Login", external: true },
    ],
    "Platform": [{
      href: "https://www.youtube.com/@SurfSellerHub",
      label: "Seller Guide",
      external: true,
      directLink: true,
    }, { href: "/pricing", label: "Integrations" }],
    "Legal": [
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/acceptable-use", label: "Acceptable Use Policy" },
    ],
    "Company": [
      { href: "/about", label: "About Surf" },
      {
        href: "https://surf.mt/blogs/",
        label: "Blog",
        external: true,
        directLink: true,
      },
      { href: "/contact", label: "Contact Us" },
    ],
    // "Support & Resources": [
    //   {
    //     href: "https://wa.me/35677215267",
    //     label: "Contact Support",
    //     external: true,
    //     directLink: true,
    //   },
    //   {
    //     href: "https://www.youtube.com/@SurfSellerHub",
    //     label: "Seller Guide",
    //     external: true,
    //     directLink: true,
    //   },
    // ],
    // Support: [
    //   { href: "/contact", label: "Contact Us" },
    //   {
    //     href: "mailto:sell@surf.mt",
    //     label: "Email Support",
    //     external: true,
    //     directLink: true,
    //   },
    // ],
  };

  const socialLinks = [
    {
      href: "https://www.facebook.com/surfmt.malta",
      icon: Facebook,
    },
    {
      href: "https://www.instagram.com/surf.mt",
      icon: Instagram,
    },
    {
      href: "https://www.linkedin.com/company/surfmt",
      icon: Linkedin,
    },
    {
      href: "https://www.youtube.com/@SurfSellerHub",
      icon: Youtube,
    },
  ];

  return (
    <footer className="text-white bg-[linear-gradient(165deg,#1a0a2e_0%,#2d1052_50%,#130726_100%)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 pt-14 pb-8">

        {/* 🔥 LINKS GRID (Same as first UI) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 pb-10 border-b border-white/[0.06]">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[12px] text-white/40 mb-4 tracking-[0.1em] font-semibold">
                {title.toUpperCase()}
              </h4>

              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    {link.external || link.directLink ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 text-[14px] hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-white/60 text-[14px] hover:text-white transition-colors"
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

        {/* 🔥 BOTTOM SECTION (Same as first UI) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo + copyright */}
          <div className="flex items-center gap-2.5">
            <Logo size="xs" />
            <span className="text-white/30 text-xs items-center">
              © 2026 Surf. All rights reserved.
            </span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            {socialLinks.map((s, i) => {
              const Icon = s.icon;

              return (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-white/40" />
                </a>
              );
            })}
          </div>

          {/* Contact */}
          <div className="flex items-center gap-4 text-white/35 text-[13px]">
            <a
              href="mailto:sell@surf.mt"
              className="hover:text-white/60 transition-colors flex items-center gap-1.5"
            >
              <Mail className="size-3.5" /> sell@surf.mt
            </a>

            <a
              href="tel:+35677413456"
              className="hover:text-white/60 transition-colors flex items-center gap-1.5"
            >
              <Phone className="size-3.5" /> +356 7741 3456
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}