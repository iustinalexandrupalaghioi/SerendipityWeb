import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react"; // Lucide icons
import { Link } from "react-router";
import NailArt from "@/assets/NailArt.webp";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={NailArt}
          alt="Beautiful nail art showcase"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-32 text-center lg:py-44">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Premium Nail Studio
        </p>
        <h1 className="max-w-4xl font-serif text-4xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl text-balance">
          Professional nail care & <br /> Training excellence
        </h1>
        <p className="mt-6 max-w-2xl leading-relaxed text-primary-foreground/80 text-pretty">
          Indulge in luxury nail treatments executed with Russian manicure
          precision — or elevate your career by mastering the art of nail
          design.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link to="/services">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8"
            >
              Book an appointment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/courses">
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground px-8"
            >
              Explore courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
