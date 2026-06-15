const sections = [
  {
    title: "1. Age Requirements",
    content: [
      "Training courses are available only to individuals aged 18 years or over.",
      "Nail services may be provided to clients under the age of 18 at the sole discretion of the Academy. Clients under 18 years of age must provide written consent from a parent or legal guardian before any service can be performed.",
      "The Academy reserves the right to refuse any service or booking where appropriate consent has not been provided or where the service is considered unsuitable.",
    ],
  },
  {
    title: "2. Bookings & Deposits",
    content: [
      "All appointments, training courses, workshops, and private training sessions require a deposit or booking fee to secure the booking.",
      "Bookings are not confirmed until the required deposit has been received.",
      "Deposits are non-refundable.",
      "The Academy reserves the right to refuse, cancel, or amend bookings where necessary.",
    ],
  },
  {
    title: "3. Appointment Cancellations & Rescheduling",
    content: [
      "Clients wishing to reschedule an appointment must provide a minimum of 48 hours' notice.",
      "Appointments cancelled with less than 48 hours' notice may result in the loss of the deposit.",
      "Failure to attend an appointment without notice ('No Show') will result in the loss of the deposit.",
      "Future appointments may require payment in full at the time of booking.",
    ],
  },
  {
    title: "4. Late Arrivals",
    content: [
      "Clients arriving more than 15 minutes late may have their appointment shortened, modified, or cancelled.",
      "The full appointment fee may still be charged.",
      "The Academy reserves the right to refuse services where insufficient time remains to complete the treatment safely and to the required standard.",
    ],
  },
  {
    title: "5. Payments",
    content: [
      "Full payment is required on completion of services unless otherwise agreed in writing.",
      "Outstanding balances must be settled before certificates, training materials, or future bookings are issued or accepted.",
    ],
  },
  {
    title: "6. Course Bookings",
    content: [
      "Course places are limited and are reserved exclusively for the enrolled student.",
      "A non-refundable deposit is required to secure a training place.",
      "The remaining balance must be paid before the course start date unless otherwise agreed in writing.",
      "Failure to pay the balance may result in cancellation of the booking and loss of the deposit.",
    ],
  },
  {
    title: "7. Student Cancellations & Non-Attendance",
    content: [
      "Course deposits are non-refundable and non-transferable.",
      "Students who cancel, fail to attend, withdraw, arrive excessively late, or leave a course before completion are not entitled to a refund, replacement day, private tuition, compensation, or transfer unless agreed at the sole discretion of the Academy.",
      "Any approved transfer remains entirely at the discretion of the Academy and is not guaranteed.",
    ],
  },
  {
    title: "8. Course Changes",
    content: [
      "The Academy reserves the right to amend course dates, venues, schedules, training methods, course content, trainers, or training arrangements where necessary.",
      "If a course is cancelled by the Academy, students will be offered either a transfer to an alternative date, or a refund of monies paid.",
      "The Academy shall not be responsible for travel expenses, accommodation costs, childcare expenses, loss of earnings, or any other indirect costs.",
    ],
  },
  {
    title: "9. Certification",
    content: [
      "Certificates are issued only when full attendance requirements have been met, all course requirements have been completed, and all fees have been paid in full.",
      "Completion of a training course does not guarantee employment, insurance approval, accreditation approval, business success, income generation, or certification by any third-party organisation.",
    ],
  },
  {
    title: "10. Health, Safety & Hygiene",
    content: [
      "Clients and students must disclose any relevant allergies, sensitivities, medical conditions, infections, injuries, medications, or circumstances that may affect the service or training.",
      "The Academy reserves the right to refuse, modify, postpone, or discontinue any service or training session where health, safety, hygiene, or professional standards may be compromised.",
      "No refunds will be issued where relevant information was withheld prior to the appointment or training.",
    ],
  },
  {
    title: "11. Foreign Work & Removals",
    content: [
      "The Academy cannot guarantee the quality, compatibility, condition, or durability of products or services performed by another technician.",
      "Removal of existing products may be required before a new service can be performed and may incur an additional charge.",
    ],
  },
  {
    title: "12. Repairs & Service Guarantee",
    content: [
      "Any concerns regarding a service must be reported within 72 hours of the original appointment.",
      "Where appropriate, a repair appointment may be offered.",
      "Complimentary repairs will not be provided where damage results from accidents, improper aftercare, nail biting or picking, work-related damage, misuse, third-party products or services, or repairs or alterations performed elsewhere.",
      "The Academy reserves the right to determine the cause of any damage.",
    ],
  },
  {
    title: "13. Student & Client Conduct",
    content: [
      "The Academy reserves the right to refuse service, refuse entry, or remove any client or student whose behaviour is considered abusive, threatening, aggressive, disruptive, discriminatory, inappropriate, intoxicated, or unsafe.",
      "No refunds will be issued in such circumstances.",
    ],
  },
  {
    title: "14. Intellectual Property",
    content: [
      "All course materials, manuals, training content, worksheets, templates, presentations, photographs, videos, educational resources, and training methods remain the intellectual property of Giorgiana T Master Nail Xpert Academy.",
      "Without prior written permission, clients and students may not copy, reproduce, record, share, sell, distribute, publish, teach from, or replicate for commercial training purposes any Academy materials or content.",
    ],
  },
  {
    title: "15. Photography & Marketing",
    content: [
      "Photographs and videos of nail work, training activities, completed results, and classroom environments may be used for portfolio, educational, website, social media, and marketing purposes.",
      "No personal information will be disclosed without consent.",
      "Clients and students who do not wish to appear in identifiable images must notify the Academy before the appointment or course begins.",
    ],
  },
  {
    title: "16. Privacy & Data Protection (GDPR)",
    content: [
      "Giorgiana T Master Nail Xpert Academy is committed to protecting personal data in accordance with the General Data Protection Regulation (GDPR) and applicable Irish data protection legislation.",
      "Personal information collected may include name, email address, telephone number, booking details, training records, payment records, photographs of nail work, and correspondence relating to services or training. This information is collected solely for business, administrative, educational, legal, insurance, and customer service purposes.",
      "Personal information will be stored securely and accessed only where necessary. The Academy does not sell personal data to third parties.",
      "Individuals have the right to request access to their personal information, request corrections, request deletion where applicable, restrict processing, and submit complaints to the Irish Data Protection Commission.",
    ],
  },
  {
    title: "17. Limitation of Liability",
    content: [
      "To the maximum extent permitted by Irish law, the Academy's liability shall be limited to the amount paid for the relevant service or training course.",
      "The Academy shall not be liable for indirect, incidental, consequential, financial, business, reputational, travel, accommodation, childcare, or loss-of-income related damages arising from the use of its services, training, educational materials, or website.",
      "Nothing within these Terms & Conditions excludes any rights afforded to consumers under applicable Irish law.",
    ],
  },
  {
    title: "18. Governing Law",
    content: [
      "These Terms & Conditions shall be governed by and interpreted in accordance with the laws of Ireland.",
      "Any dispute arising from the use of the website, services, or training courses shall be subject to the exclusive jurisdiction of the Irish Courts.",
    ],
  },
];

const TermsAndConditions = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 border-b border-border pb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
          Terms & Conditions
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Giorgiana T Nail Lab & Training Centre · Clane, Ireland
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Last updated: June 2026
        </p>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          By booking any nail service, training course, workshop, private
          tuition, consultation, or by using this website, you agree to the
          following Terms & Conditions.
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
            <div className="space-y-3">
              {section.content.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Business Name:</span>{" "}
          Giorgiana T Master Nail Educator Academy & Nail Services ·{" "}
          <span className="font-semibold text-foreground">Location:</span>{" "}
          Clane, Ireland
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          For questions about these Terms & Conditions, please contact us at{" "}
          <a
            href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
            className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
          >
            {import.meta.env.VITE_CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
