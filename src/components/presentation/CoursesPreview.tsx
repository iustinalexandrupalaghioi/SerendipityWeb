import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import CoursesCarousel from "./CoursesCarousel";

const CoursesPreview = () => {
  return (
    <section className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Popular Courses
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-secondary-foreground md:text-4xl text-balance">
              Discover training programs
            </h2>
          </div>
          <Link to="/courses">
            <Button
              variant="link"
              className="w-fit text-primary hover:text-gold group p-0"
            >
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <CoursesCarousel />
      </div>
    </section>
  );
};

export default CoursesPreview;
