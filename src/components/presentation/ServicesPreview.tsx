import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import ServicesCarousel from "./ServicesCarousel";

const ServicesPreview = () => {
  return (
    <section className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Popular services
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-secondary-foreground md:text-4xl text-balance">
              Discover luxury nail services
            </h2>
          </div>
          <Link to="/services">
            <Button
              variant="ghost"
              className="text-primary hover:text-primary/80 font-semibold hover:bg-transaprent"
            >
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <ServicesCarousel />
      </div>
    </section>
  );
};

export default ServicesPreview;
