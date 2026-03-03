import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleScroll = (id: string) => {
  const services = document.getElementById(id);
  if (services) {
    services.scrollIntoView({ behavior: "smooth" });
  }
};

export const scrollToTop = () => scrollTo(0, 0);
