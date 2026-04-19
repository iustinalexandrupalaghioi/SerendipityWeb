import { Award, Check } from "lucide-react";
import Certificate from "@/assets/course-presentation/Certificate.webp";
import Students from "@/assets/course-presentation/Students.webp";

const certificationBenefits = [
  "Internationally recognized certification",
  "Proof of professional training completion",
  "Adds credibility to your portfolio",
  "Required by many salons and employers",
];

export function CertificateSection() {
  return (
    <section className="">
      <div className=" mx-auto max-w-7xl px-6 py-24  grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Certificate Image */}
        <div className="relative  w-fit">
          <div className="absolute -inset-4 rounded-3xl  bg-gold/10 blur-2xl" />
          <div className="relative  w-fit overflow-hidden rounded-2xl border-2 border-gold/30 shadow shadow-gold/20">
            <img
              src={Certificate}
              alt="GT Master Nail Xpert Professional Certificate"
              className="w-auto max-h-80  md:max-h-[550px] rounded-2xl object cover lg:object-contain"
            />
          </div>
          {/* Decorative badge */}
          <div className="absolute -left-4 -top-4 flex h-20 w-20 items-center justify-center rounded-full bg-gold shadow-lg">
            <Award className="h-10 w-10 text-gold-dark" />
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Professional Certification
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-secondary-foreground md:text-4xl text-balance">
            Earn Your Official Certificate
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
            Upon successful completion of your training, you will receive an
            official GT Master Nail Xpert certificate. This professionally
            designed certificate validates your skills and demonstrates your
            commitment to excellence in nail artistry.
          </p>

          {/* Benefits */}
          <ul className="mt-8 space-y-4">
            {certificationBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20">
                  <Check className="h-3.5 w-3.5 text-gold-dark" />
                </div>
                <span className="text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Graduate testimonial card */}
          <div className="mt-10 rounded-2xl border border-border bg-card/50 p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-gold/50">
                <img
                  src={Students}
                  alt="Course graduates"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-foreground">30+ Graduates</p>
                <p className="text-sm text-muted-foreground">
                  Successfully certified professionals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
