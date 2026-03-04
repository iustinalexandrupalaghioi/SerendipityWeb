import Logo from "@/assets/logo.png";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { BusinessHour } from "@/types/BusinessHour";
const Footer = () => {
  const { data, error, isLoading } = useQuery<BusinessHour[]>({
    queryKey: ["business-hours"],
    queryFn: async () => {
      const { data, error } =
        await supabase.functions.invoke<BusinessHour[]>("get-business-hours");

      if (error) throw error;

      if (!data || data.length === 0)
        throw new Error("No business hours returned");

      return data;
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/" className="flex items-center gap-2">
              <img
                src={Logo}
                className="h-20 md:h-24  -my-6 object-cover"
                alt="GTA Nail Salon & Training Centre Logo"
              />
            </a>

            <p className="mt-4 text-sm leading-relaxed text-foreground/70">
              Experience luxury nail care and professional training at
              Serendipity Nail Lab & Training Center — where passion meets
              expertise in creating beauty and building careers.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="text-foreground/60 transition-colors hover:text-accent"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-foreground/60 transition-colors hover:text-accent"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/courses", label: "Courses" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm text-foreground/70">
                <a href="tel:+353892396046" className="flex gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  +353 (0)892396046
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground/70">
                <a
                  href="mailto:info@serendipitynailab.ie"
                  className="flex gap-2"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  info@serendipitynailab.ie
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground/70">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                Clane, Co. Kildare
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              Business hours
            </h3>
            <div className="space-y-2 text-sm text-foreground/70">
              {data?.map((item) => (
                <div key={item.days} className="flex gap-2">
                  <span className="text-wrap">{item.days}</span>
                  <span className="text-nowrap">{item.interval}</span>
                </div>
              ))}
              {isLoading && !error && (
                <div>
                  <svg
                    width="24"
                    height="26"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-spin"
                  >
                    <circle
                      cx="10"
                      cy="10.5"
                      r="8.5"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                    />
                    <mask id="path-2-inside-1_2527_20905" fill="white">
                      <path d="M18.5172 10.5C19.3361 10.5 20.0113 9.83252 19.8903 9.02257C19.6474 7.39692 19.0062 5.84812 18.014 4.51868C16.7246 2.79109 14.9114 1.52642 12.8448 0.913166C10.7781 0.299916 8.5686 0.370921 6.54558 1.1156C4.9888 1.68865 3.60659 2.63704 2.51635 3.86711C1.97316 4.47997 2.17495 5.40767 2.86134 5.85436C3.54773 6.30104 4.45707 6.09214 5.03749 5.51442C5.75143 4.8038 6.61392 4.2506 7.57003 3.89866C8.9931 3.37482 10.5473 3.32488 12.0011 3.75626C13.4549 4.18764 14.7303 5.07726 15.6373 6.29251C16.2467 7.109 16.6679 8.0431 16.8787 9.02811C17.05 9.82892 17.6983 10.5 18.5172 10.5Z" />
                    </mask>
                    <path
                      d="M18.5172 10.5C19.3361 10.5 20.0113 9.83252 19.8903 9.02257C19.6474 7.39692 19.0062 5.84812 18.014 4.51868C16.7246 2.79109 14.9114 1.52642 12.8448 0.913166C10.7781 0.299916 8.5686 0.370921 6.54558 1.1156C4.9888 1.68865 3.60659 2.63704 2.51635 3.86711C1.97316 4.47997 2.17495 5.40767 2.86134 5.85436C3.54773 6.30104 4.45707 6.09214 5.03749 5.51442C5.75143 4.8038 6.61392 4.2506 7.57003 3.89866C8.9931 3.37482 10.5473 3.32488 12.0011 3.75626C13.4549 4.18764 14.7303 5.07726 15.6373 6.29251C16.2467 7.109 16.6679 8.0431 16.8787 9.02811C17.05 9.82892 17.6983 10.5 18.5172 10.5Z"
                      stroke="#5b21b6"
                      strokeWidth="6"
                      mask="url(#path-2-inside-1_2527_20905)"
                    />
                  </svg>
                </div>
              )}
              {error && !isLoading && (
                <>
                  <div className="flex justify-between">
                    <span>Booking is unavailable at this time.</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <Link to="/services">
            <Button
              title="Book an appointment"
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 mt-4 w-full"
            >
              Book now
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center">
        <p className="text-xs text-foreground/50">
          © {new Date().getFullYear()} GT Nail Lab & Training Centre. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
