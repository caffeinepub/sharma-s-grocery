import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Phone, ShoppingBasket, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const PHONE = "426536735";

const navLinks = [
  { to: "/", label: "Home", ocid: "nav.home.link" },
  { to: "/products", label: "Products", ocid: "nav.products.link" },
  { to: "/about", label: "About Us", ocid: "nav.about.link" },
  { to: "/contact", label: "Contact", ocid: "nav.contact.link" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-md">
              <ShoppingBasket className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-green-700 group-hover:text-green-600 transition-colors">
              Sharma -Grocery
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={link.ocid}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-primary bg-green-50"
                    : "text-foreground/70 hover:text-primary hover:bg-green-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${PHONE}`}
              className="ml-3 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-foreground hover:bg-green-50"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-border bg-white"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    data-ocid={link.ocid}
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? "text-primary bg-green-50"
                        : "text-foreground/70 hover:text-primary hover:bg-green-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href={`tel:${PHONE}`}
                  className="mt-2 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-full text-sm font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  Call: {PHONE}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-green-800 text-primary-foreground py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <ShoppingBasket className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl">
                  Sharma -Grocery
                </span>
              </div>
              <p className="text-white/70 text-sm">
                Fresh Groceries Delivered to Your Doorstep
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact Us</h4>
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-2 text-white/90 hover:text-white text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
              <p className="text-white/70 text-sm mt-2">
                Available 7 days a week, 8am – 9pm
              </p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/50">
            <span>
              © {new Date().getFullYear()} Sharma -Grocery. All rights reserved.
            </span>
            <span>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-white/80"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* Sticky Call Now button */}
      <motion.a
        href={`tel:${PHONE}`}
        data-ocid="sticky.call_button"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-2xl font-semibold text-sm hover:bg-green-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Phone className="w-4 h-4 animate-pulse" />
        Call Now
      </motion.a>
    </div>
  );
}
