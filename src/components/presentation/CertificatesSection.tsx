import { useCertificates } from "@/hooks/useCertificates";
import { Award } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const CertificatesSection = () => {
  const { pathname } = useLocation();

  const { data, error, isLoading } = useCertificates({
    is_featured: pathname === "/" ? true : false,
  });

  if (!isLoading && error) {
    return <Navigate to="/error" />;
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Credentials
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Certified Excellence
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
            With many professional courses at my active portfolio — both online
            and in person — my formation is constantly evolving.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {data &&
            data.map((cert) => (
              <div
                key={cert.id}
                className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-lg"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={cert.image_public_url}
                    alt={cert.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <Award className="h-10 w-10 text-accent" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-sm font-semibold text-card-foreground leading-snug">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {cert.issuing_authority}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-secondary-foreground md:text-4xl text-balance">
            Ready to Experience the Difference?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            Whether you want stunning nails or to learn the craft yourself, I am
            here for you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/services">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
              >
                Book an Appointment
              </Button>
            </Link>
            <Link to="/courses">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-8"
              >
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CertificatesSection;
