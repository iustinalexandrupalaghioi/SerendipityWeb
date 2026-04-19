import Logo from "@/assets/logo/logo.png";
import { AuthButton } from "@/components/authentication/AuthButton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import UserMenu from "../user/general/UserMenu";

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
        {/* Mobile Toggle */}

        <div className="flex items-center gap-2">
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
          <a href="/" className="flex items-center gap-2">
            <img
              src={Logo}
              className="h-20 md:h-24 -my-18 md:-my-20 object-cover"
              alt="GTA Nail Salon & Training Centre Logo"
            />
          </a>
        </div>
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
        <div className="hidden items-center gap-3 md:flex">
          {user ? <UserMenu /> : <AuthButton />}
          <Link to="/services">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Book Now
            </Button>
          </Link>
        </div>
        <div className="md:hidden">{user ? <UserMenu /> : <AuthButton />}</div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden">
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

          <Link to="/services" onClick={() => setMobileOpen(false)}>
            <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Book Now
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
