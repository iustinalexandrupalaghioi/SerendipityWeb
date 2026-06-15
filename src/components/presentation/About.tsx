import { ArrowRight, Award, Heart, Sparkles, Users } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import Me from "@/assets/Me.webp";

const stats = [
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Award, value: "50+", label: "Certifications" },
  { icon: Heart, value: "5+", label: "Years Experience" },
  { icon: Sparkles, value: "30+", label: "Students Trained" },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className=" overflow-hidden bg-primary px-6 py-24 text-center">
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            About
          </p>
          <h1 className="mt-3 text-4xl font-bold text-primary-foreground md:text-5xl text-balance max-w-3xl mx-auto">
            The Story Behind Serendipity Nail Lab & Training Centre
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/70 text-pretty">
            The perfect blend of luxury, expertise, and innovation in nail care
            and education.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <div className="relative w-fit mx-auto lg:mx-0">
            <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border-2 border-accent/20 shadow shadow-accent/10">
              <img
                src={Me}
                alt="Studio owner and lead nail technician"
                className="w-auto max-h-[600px] object-cover object-top"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Meet the Founder
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl text-balance">
              A Passion Born from Creativity
            </h2>

            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
              <p>
                I am{" "}
                <span className="text-primary font-semibold">
                  Giorgiana Talpan Agafitei
                </span>
                , founder of Serendipity Nail Lab & Training Centre in Clane,
                Co. Kildare.
              </p>
              <p>
                My path into nails was driven by pure passion — not for beauty
                in general, but for the precision and artistry of nail design.
                Over the years, I have built solid expertise and refined my
                skills through countless hours of practice and a wide portfolio
                of professional courses, both online and in person, with some of
                Europe's top trainers.
              </p>
              <p>
                The moment I realized my role as an educator was when colleagues
                began to seek my guidance and looked at me not only as a peer
                but as a mentor. That's when I chose to take the next step —
                sharing my knowledge and techniques with others.
              </p>
              <p>
                At Serendipity, I bring together Russian manicure techniques,
                advanced nail architecture, and modern salon trends. I offer
                training in small groups and private 1-to-1, ensuring each
                student gets the attention they deserve.
              </p>
              <p>
                My professional journey never stops — I believe in continuous
                growth, and I pass this philosophy to everyone who learns with
                me. Today, I am proud to launch the Fantasy Nails Course — a
                premiere in Ireland — alongside a full range of programs
                designed to empower technicians and raise industry standards.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/services">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                  Book a session
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline">
                  View courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden py-20">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group text-center rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 transition-all duration-300 group-hover:bg-accent/30">
                  <stat.icon className="h-7 w-7 text-accent" />
                </div>
                <p className="mt-4 text-4xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
