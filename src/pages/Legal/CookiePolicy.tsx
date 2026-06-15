const sections = [
  {
    title: "1. What Are Cookies",
    content: [
      "Cookies are small text files stored on your device when you visit a website. They help websites function properly and improve the user experience.",
      `Giorgiana T Nail Lab & Training Centre uses cookies on ${import.meta.env.VITE_ROOT_URL} to ensure the website functions correctly.`,
    ],
  },
  {
    title: "2. Cookies We Use",
    intro:
      "Our website only uses essential cookies that are strictly necessary for the operation of the Service.",
    subsections: [
      {
        heading: "Authentication Cookies",
        text: "These cookies allow users to securely log in and maintain their session while using the Service.",
      },
      {
        heading: "Security Cookies",
        text: "These cookies help protect the website and its users from fraudulent or unauthorised activity.",
      },
      {
        heading: "Payment Session Cookies",
        text: "When making payments, cookies may be used by our payment provider Stripe to securely process transactions.",
      },
    ],
    footer:
      "These cookies are strictly necessary and therefore do not require user consent under applicable European regulations.",
  },
  {
    title: "3. Third-Party Cookies",
    content: [
      "Some cookies may be set by third-party services that are necessary to operate our Service.",
    ],
    items: [
      "Stripe – used for secure payment processing",
      "Google authentication services – when users sign in using Google",
    ],
    footer:
      "These services may set cookies in accordance with their own privacy policies.",
  },
  {
    title: "4. Managing Cookies",
    content: [
      "Most web browsers allow you to control cookies through browser settings.",
    ],
    items: ["View stored cookies", "Delete cookies", "Block cookies entirely"],
    footer:
      "Please note that disabling essential cookies may prevent parts of the website from functioning correctly.",
  },
  {
    title: "5. Changes to This Cookie Policy",
    content: [
      'We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.',
    ],
  },
];

const CookiePolicy = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 border-b border-border pb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
          Cookie Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Giorgiana T Nail Lab & Training Centre · Clane, Ireland
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Last updated: June 2026
        </p>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          This Cookie Policy explains what cookies are, which ones we use, and
          how you can manage them.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl border border-border bg-card p-6 md:p-8"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {section.title}
            </h2>

            {section.intro && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {section.intro}
              </p>
            )}

            {section.content && (
              <div className="space-y-3">
                {section.content.map((p, i) => (
                  <p
                    key={i}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}

            {section.subsections && (
              <div className="mt-2 space-y-4">
                {section.subsections.map((sub) => (
                  <div key={sub.heading}>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {sub.heading}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {sub.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {section.items && (
              <ul className="mt-3 space-y-1">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {section.footer && (
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {section.footer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          For questions about this Cookie Policy, contact us at{" "}
          <a
            href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
            className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
          >
            {import.meta.env.VITE_CONTACT_EMAIL}
          </a>{" "}
          or visit{" "}
          <a
            href={import.meta.env.VITE_ROOT_URL}
            className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
          >
            {import.meta.env.VITE_ROOT_URL}
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default CookiePolicy;
