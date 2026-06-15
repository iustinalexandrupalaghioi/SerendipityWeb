import Logo from "@/assets/logo/logo.png";
import DarkLogo from "@/assets/logo/logo-dark.png";

import { AuthButton } from "@/components/authentication/AuthButton";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import UserMenu from "../user/general/UserMenu";
import { ThemeSwitcher } from "@/components/partials/ThemeSwitcher";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src={Logo}
            className="h-20 md:h-24 -my-18 md:-my-20 object-cover dark:hidden"
            alt="GTA Nail Salon & Training Centre Logo"
          />
          <img
            src={DarkLogo}
            className="h-20 md:h-24 -my-18 md:-my-20 object-cover hidden dark:block"
            alt="GTA Nail Salon & Training Centre Logo"
          />
        </a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={cn(
                  "font-medium tracking-wide transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? <UserMenu /> : <AuthButton />}
          <ThemeSwitcher />
        </div>

        {/* Mobile Right — Auth + Menu Toggle grouped together */}
        <div className="flex items-center gap-2 md:hidden">
          {user ? <UserMenu /> : <AuthButton />}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden space-y-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block text-sm font-medium tracking-wide transition-colors",
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeSwitcher />
        </div>
      )}
    </header>
  );
}
