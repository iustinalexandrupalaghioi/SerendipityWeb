import { CheckCircle, Diamond, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Expert care",
    description:
      "Vast experience and continuous professional training with leading European educators.",
  },
  {
    icon: Diamond,
    title: "Premium products",
    description:
      "Finest EU-compliant, TPO-free products and tools for safety, durability & beauty.",
  },
  {
    icon: Heart,
    title: "Personalized attention",
    description:
      "Every client and student receives one-to-one guidance and bespoke treatments.",
  },
  {
    icon: CheckCircle,
    title: "Clean & safe environment",
    description:
      " Strict sanitation & sterilization standards for a luxury experience you can trust.",
  },
];

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-start md:text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Why choose Serendipity Nail Lab?
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
          Crafted with passion & precision
        </h2>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-gold/20 group-hover:text-gold-dark">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
