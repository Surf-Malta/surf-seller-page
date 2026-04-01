// src/components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { RootState } from "@/store";
import { toggleMobileMenu } from "@/store/slices/navigationSlice";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SignupModal from "../registration/SignupModal";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const { isMobileMenuOpen } = useSelector(
    (state: RootState) => state.navigation
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href: string, key: string) => {
    setLoadingStates((prev) => ({ ...prev, [key]: true }));

    // Simulate loading for external links
    if (href.startsWith("http")) {
      setTimeout(() => {
        window.open(href, "_blank", "noopener,noreferrer");
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
      }, 500);
    } else {
      router.push(href);
      // Reset loading state after navigation
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
      }, 1000);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-[var(--border-muted)]"
            : "bg-white/80 backdrop-blur-lg"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 h-[60px] flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Logo size="xs" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {["How it Works", "Features", "Testimonials", "FAQ"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  handleNavigation(
                    `#${item.toLowerCase().replace(/\s+/g, "-")}`,
                    item
                  )
                }
                className="text-[13px] transition-colors"
                style={{ fontWeight: 500, color: "var(--text-muted)" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--primary)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={() =>
                handleNavigation(
                  "https://surf.mt/vendor.php?dispatch=auth.login_form&return_url=vendor.php",
                  "vendor-login"
                )
              }
              className="text-[13px] px-4 py-2 rounded-lg transition-colors"
              style={{
                fontWeight: 500,
                color: "var(--primary)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primary-light)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              Sign In
            </button>

            <button
              // onClick={() => handleNavigation("/register", "register")}
                    onClick={() => setSignupModalOpen(true)}

              className="text-white text-[13px] px-5 py-2 rounded-[10px] transition-colors"
              style={{
                fontWeight: 600,
                backgroundColor: "var(--primary)",
              }}
              onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--primary-hover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primary)")
              }
            >
              Start Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
              style={{ color: "var(--primary)" }}
            >
              <AnimatePresence mode="wait" initial={false}>

                {!isMobileMenuOpen ? (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="size-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="size-5" />
                  </motion.div>
                )}
              </AnimatePresence>

            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>

          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:hidden bg-white border-t border-[var(--border-muted)]">
              <div className="px-5 pt-2 pb-5 flex flex-col">
                {["How it Works", "Features", "Testimonials", "FAQ"].map(
                  (item, i) => (
                    <motion.button
                      key={item}
                      onClick={() => {
                        handleNavigation(
                          `#${item.toLowerCase().replace(/\s+/g, "-")}`,
                          item
                        );
                        dispatch(toggleMobileMenu());
                      }}
                      className="text-left text-[15px] py-3 px-3 rounded-lg transition-colors"
                      style={{ fontWeight: 500, color: "#374151" }}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.05 + i * 0.04 }}
                    >
                      {item}
                    </motion.button>
                  )
                )}

                {/* Divider */}
                <motion.div initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  style={{ transformOrigin: "left" }}
                  className="h-px bg-black/[0.06] my-3 mx-3" />

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.25 }}
                  className="flex gap-2.5 px-3">
                  <button
                    onClick={() =>
                      handleNavigation(
                        "https://surf.mt/vendor.php?dispatch=auth.login_form&return_url=vendor.php",
                        "mobile-login"
                      )
                    }
                    className="flex-1 text-[14px] py-2.5 border rounded-xl"
                  >
                    Sign In
                  </button>

                  <button
                    // onClick={() => handleNavigation("/register", "mobile-register")}
                    onClick={() => setSignupModalOpen(true)}
                    className="flex-1 text-white text-[14px] py-2.5 rounded-xl"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    Start Free
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header >
        {signupModalOpen && <SignupModal onClose={() => setSignupModalOpen(false)} />}

      {/* Keep existing MobileMenu if needed */}
      {/* <MobileMenu /> */}
    </>
  );
}
