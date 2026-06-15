import { Button } from "@/components/ui/button";
import { Award, Check, Clock, Sparkles, Users } from "lucide-react";
import { Link } from "react-router";
import PurpleNailArtClose from "@/assets/course-presentation/PurpleNailArtClose.webp";
import NailArtWithModel from "@/assets/course-presentation/NailArtWithModel.webp";
import Students from "@/assets/course-presentation/Students.webp";
import BrownNailArt from "@/assets/course-presentation/BrownNailArt.webp";

const courseFeatures = [
  "Comprehensive hands-on training",
  "All materials and tools included",
  "Small group or 1-to-1 sessions",
  "Certificate upon completion",
  "Ongoing support after course",
  "Access to exclusive techniques",
];

const courseHighlights = [
  {
    icon: Clock,
    title: "Flexible schedule",
    description: "Choose dates that work for you",
  },
  {
    icon: Users,
    title: "Small groups",
    description: "Maximum 4 students per class",
  },
  {
    icon: Award,
    title: "Certification",
    description: "Recognized professional certificate",
  },
  {
    icon: Sparkles,
    title: "Premium quality",
    description: "Learn with luxury products",
  },
];

export function CourseDetailSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
        {/* Left Content */}
        <div className="order-2 lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Professional Training
          </p>
          <h2 className="mt-3  font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Transform your passion into a career
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
            Join our exclusive nail art courses and learn the techniques that
            set professionals apart. From basic extensions to advanced 3D
            sculptures, our comprehensive training will elevate your skills to
            the next level.
          </p>

          {/* Features List */}
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {courseFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20">
                  <Check className="h-3.5 w-3.5 text-gold-dark" />
                </div>
                <span className="text-sm text-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
            >
              <Link to="/courses"> Enroll now</Link>
            </Button>
          </div>
        </div>

        {/* Right Image Grid */}

        <div className="grid grid-cols-2 gap-4 order-1 lg:order-2">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl bg-muted">
              <img
                src={BrownNailArt}
                alt="Artistic nail design showcase"
                className="h-72 w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-2xl bg-muted">
              <img
                src={NailArtWithModel}
                alt="Students with certificates"
                className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="overflow-hidden rounded-2xl bg-muted">
              <img
                src={Students}
                alt="Professional nail art demonstration"
                className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-2xl bg-muted">
              <img
                src={PurpleNailArtClose}
                alt="Intricate nail sculpture"
                className="h-72 w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course Highlights */}
      <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {courseHighlights.map((highlight, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 transition-all duration-300 group-hover:bg-accent/30">
              <highlight.icon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground font-serif">
              {highlight.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground font-sans">
              {highlight.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
