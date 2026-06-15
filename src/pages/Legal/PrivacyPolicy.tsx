const sections = [
  {
    title: "1. Introduction",
    content: [
      'Giorgiana T Nail Lab & Training Centre ("we", "our", or "us") operates the website ' +
        import.meta.env.VITE_ROOT_URL +
        ' (the "Service").',
      "This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Service or use our services.",
      "We are committed to protecting your personal data and complying with applicable data protection laws including the General Data Protection Regulation (GDPR).",
      "If you do not agree with the terms of this Privacy Policy, please do not access the Service.",
    ],
  },
  {
    title: "2. Data Controller",
    content: [
      "The data controller responsible for your personal information is Giorgiana T Nail Lab & Training Centre, Clane, Ireland.",
    ],
    contact: true,
  },
  {
    title: "3. Information We Collect",
    subsections: [
      {
        heading: "Information You Provide",
        items: [
          "Full name",
          "Email address",
          "Date of birth (for course enrolments)",
          "Information submitted through forms",
        ],
      },
      {
        heading: "Automatically Collected Information",
        items: [
          "IP address",
          "Device type and browser information",
          "Location data (approximate, based on IP)",
          "Usage data and interaction with the Service",
        ],
      },
      {
        heading: "Information From Third-Party Login",
        intro:
          "If you log in using a social provider such as Google, we may receive:",
        items: ["Name", "Email address", "Profile image"],
      },
    ],
  },
  {
    title: "4. How We Use Your Information",
    items: [
      "To provide and maintain our Service",
      "To process course enrolments",
      "To process payments",
      "To communicate with you regarding your bookings or account",
      "To improve our services and website functionality",
      "To prevent fraud and unauthorised activity",
      "To comply with legal obligations",
    ],
  },
  {
    title: "5. Legal Basis for Processing (GDPR)",
    content: [
      "Under the General Data Protection Regulation, we rely on the following legal bases:",
    ],
    items: [
      "Contractual necessity – processing necessary to provide services such as course enrolments.",
      "Consent – when you voluntarily provide information or sign in using social login.",
      "Legitimate interest – to improve our services and prevent fraud.",
      "Legal obligation – when required by applicable law.",
    ],
  },
  {
    title: "6. Payments",
    content: [
      "Payments on our website are processed securely by Stripe. We do not store full payment card details on our servers. Payment information is processed directly by Stripe according to their security and privacy standards.",
    ],
  },
  {
    title: "7. Third-Party Services",
    content: [
      "We may use trusted third-party services to operate our platform, including payment processing providers, authentication providers such as Google, and hosting providers. These providers only receive the data necessary to perform their services.",
    ],
  },
  {
    title: "8. Cookies and Tracking Technologies",
    content: [
      "Our Service may use cookies and similar tracking technologies to provide essential website functionality, maintain login sessions, and improve user experience.",
      "Cookies are small data files stored on your device. You can control or disable cookies through your browser settings.",
    ],
  },
  {
    title: "9. Data Retention",
    content: [
      "We retain your personal information only for as long as necessary to provide our services, maintain legal records, resolve disputes, and enforce our agreements.",
    ],
  },
  {
    title: "10. International Data Transfers",
    content: [
      "Some third-party providers may process data outside the European Economic Area. When this occurs, we ensure appropriate safeguards are in place in accordance with GDPR.",
    ],
  },
  {
    title: "11. Data Security",
    content: [
      "We implement reasonable technical and organisational measures designed to protect your personal data. However, no method of transmission over the Internet is completely secure.",
    ],
  },
  {
    title: "12. Your Data Protection Rights",
    content: [
      "Under GDPR you have the following rights regarding your personal data:",
    ],
    items: [
      "Right to Access",
      "Right to Rectification",
      "Right to Erasure",
      "Right to Restrict Processing",
      "Right to Data Portability",
      "Right to Object",
    ],
    rights: true,
  },
  {
    title: "13. Children's Privacy",
    content: [
      "Our Service is not intended for individuals under the age of 18 without parental consent.",
    ],
  },
  {
    title: "14. Changes to This Privacy Policy",
    content: [
      'We may update this Privacy Policy from time to time. When we do, we will update the "Last Updated" date at the top of this page.',
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 border-b border-border pb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Giorgiana T Nail Lab & Training Centre · Clane, Ireland
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Last updated: June 2026
        </p>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          This Privacy Policy explains how we collect, use, and protect your
          personal information when you use our website or services.
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

            {/* Plain paragraphs */}
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

            {/* Contact block */}
            {section.contact && (
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Email:{" "}
                <a
                  href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
                  className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
                >
                  {import.meta.env.VITE_CONTACT_EMAIL}
                </a>
              </p>
            )}

            {/* Subsections (section 3) */}
            {section.subsections && (
              <div className="space-y-5 mt-2">
                {section.subsections.map((sub) => (
                  <div key={sub.heading}>
                    <p className="text-sm font-semibold text-foreground mb-2">
                      {sub.heading}
                    </p>
                    {sub.intro && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {sub.intro}
                      </p>
                    )}
                    <ul className="space-y-1">
                      {sub.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Simple bullet list */}
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

            {/* Rights — with contact note */}
            {section.rights && (
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                To exercise any of these rights, please contact us at{" "}
                <a
                  href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
                  className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
                >
                  {import.meta.env.VITE_CONTACT_EMAIL}
                </a>
                . We will respond within 30 days.
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          For questions about this Privacy Policy, contact us at{" "}
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

export default PrivacyPolicy;
