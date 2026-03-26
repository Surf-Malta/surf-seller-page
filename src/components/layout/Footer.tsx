"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Phone, Youtube, Globe } from "lucide-react";
import { Logo } from "../ui/Logo";
import { usePathname } from "next/navigation";

const iconMap: Record<string, any> = {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter: Globe,
};

export default function Footer({ content, isLayout }: { content?: any; isLayout?: boolean }) {
  const pathname = usePathname();
  
  // Hide layout footer on home page because it's rendered as a dynamic section
  if (isLayout && pathname === "/") {
    return null;
  }

  const data = content || {
    columns: [
      {
        title: "Get Started",
        links: [
          { label: "Register now", href: "/register" },
          { label: "Seller Login", href: "/login", external: true }
        ]
      },
      {
        title: "Platform",
        links: [
          { label: "Seller Guide", href: "https://www.youtube.com/@SurfSellerHub", external: true },
          { label: "Integrations", href: "/pricing" }
        ]
      },
      {
        title: "Legal",
        links: [
          { label: "Terms & Conditions", href: "/terms" },
          { label: "Acceptable Use Policy", href: "/acceptable-use" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "About Surf", href: "/about" },
          { label: "Blog", href: "https://surf.mt/blogs/", external: true },
          { label: "Contact Us", href: "/contact" }
        ]
      }
    ],
    socialLinks: [
      { platform: "Facebook", href: "https://www.facebook.com/surfmt.malta" },
      { platform: "Instagram", href: "https://www.instagram.com/surf.mt" },
      { platform: "Linkedin", href: "https://www.linkedin.com/company/surfmt" },
      { platform: "Youtube", href: "https://www.youtube.com/@SurfSellerHub" }
    ],
    contact: {
      email: "sell@surf.mt",
      phone: "+356 7741 3456"
    },
    copyright: "© 2026 Surf. All rights reserved."
  };

  return (
    <footer className="text-white bg-[linear-gradient(165deg,#1a0a2e_0%,#2d1052_50%,#130726_100%)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 pt-14 pb-8">

        {/* LINKS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 pb-10 border-b border-white/[0.06]">
          {data.columns.map((column: any, idx: number) => (
            <div key={idx}>
              <h4 className="text-[12px] text-white/40 mb-4 tracking-[0.1em] font-semibold uppercase">
                {column.title}
              </h4>

              <ul className="space-y-2.5">
                {(column.links || []).map((link: any, lIdx: number) => (
                  <li key={lIdx}>
                    {link.external || (link.href && link.href.startsWith("http")) ? (
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
                        href={link.href || "#"}
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

        {/* BOTTOM SECTION */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo + copyright */}
          <div className="flex items-center gap-2.5">
            <Logo size="xs" />
            <span className="text-white/30 text-xs items-center">
              {data.copyright}
            </span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            {(data.socialLinks || []).map((s: any, i: number) => {
              const Icon = iconMap[s.platform] || Globe;

              return (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-colors"
                  title={s.platform}
                >
                  <Icon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </a>
              );
            })}
          </div>

          {/* Contact */}
          <div className="flex items-center gap-4 text-white/35 text-[13px]">
            {data.contact?.email && (
              <a
                href={`mailto:${data.contact.email}`}
                className="hover:text-white/60 transition-colors flex items-center gap-1.5"
              >
                <Mail className="size-3.5" /> {data.contact.email}
              </a>
            )}

            {data.contact?.phone && (
              <a
                href={`tel:${data.contact.phone.replace(/\s+/g, "")}`}
                className="hover:text-white/60 transition-colors flex items-center gap-1.5"
              >
                <Phone className="size-3.5" /> {data.contact.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}