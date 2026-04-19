import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NailArt from "@/assets/NailArt.webp";
import { Link } from "react-router";

export function CallToActionSection() {
  return (
    <section className="bg-secondary px-6 py-24">
      <div className="relative mx-auto max-w-7xl  overflow-hidden rounded-2xl">
        <div className="absolute inset-0">
          <img
            src={NailArt}
            alt="Artistic nail design"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>

        <div className="relative flex flex-col items-center px-8 py-20 text-center lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Start Your Journey
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-primary-foreground md:text-4xl text-balance">
            Master the art of nail design
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 text-pretty">
            Transform your passion into a career with exclusive training.
            Courses are designed with luxury standards, taught in small groups
            or private 1-to-1 sessions, with all materials included.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/courses">
              <Button variant="gold">
                Courses
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground px-8"
              >
                About me
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
