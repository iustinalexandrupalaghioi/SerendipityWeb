const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">
        Terms and Conditions for GT Master Nail Educator
      </h1>
      <p>
        <em>Last Updated: March 13, 2026</em>
      </p>

      <h2 className="text-xl font-semibold">1. Introduction</h2>
      <p>
        These Terms and Conditions govern the use of the website{" "}
        {import.meta.env.VITE_ROOT_URL} and the training services provided by GT
        Master Nail Educator.
      </p>
      <p>
        By accessing the website, enrolling in a course, or booking an
        appointment, you agree to be bound by these Terms and Conditions.
      </p>

      <h2 className="text-xl font-semibold">2. Services</h2>
      <p>
        GT Master Nail Educator provides professional nail education courses,
        workshops, and beauty training services. Course descriptions, schedules,
        pricing, and requirements are displayed on the website and may change
        when necessary.
      </p>

      <h2 className="text-xl font-semibold">3. Eligibility</h2>
      <p>
        Participants must be at least 16 years old to enroll in courses or book
        appointments, unless accompanied by a parent or legal guardian.
      </p>

      <h2 className="text-xl font-semibold">4. Course Enrollment</h2>
      <p>
        To enroll in a course, you must provide accurate personal information,
        including name, email, and date of birth. By enrolling, you confirm the
        information is complete and accurate.
      </p>

      <h2 className="text-xl font-semibold">
        5. Booking Appointments and Deposits
      </h2>
      <p>
        Appointments may require an advance payment (deposit) to confirm the
        reservation. Deposits secure your selected date and time and will be
        applied toward the total service cost.
      </p>
      <p>
        <strong>Deposit Policy:</strong>
      </p>
      <ul className="list-disc ml-6">
        <li>
          Deposits are non-refundable if the client cancels with insufficient
          notice.
        </li>
        <li>Deposits are non-refundable in case of no-shows.</li>
        <li>
          If GT Master Nail Educator cancels, you may reschedule or receive a
          full deposit refund.
        </li>
        <li>
          Late arrivals may result in a shortened service or forfeited deposit.
        </li>
      </ul>
      <p>
        Clients may request to reschedule appointments with at least 24 hours'
        notice. Deposits can be transferred to the new date in such cases.
      </p>

      <h2 className="text-xl font-semibold">6. Payments</h2>
      <p>
        Payments for courses and appointments are processed securely via Stripe.
        A booking is confirmed only once payment is successfully processed.
      </p>
      <p>
        Clients may choose to pay a deposit or the full amount, depending on the
        service. Deposit and payment policies are clearly stated for each
        service.
      </p>

      <h2 className="text-xl font-semibold">7. Cancellations and Refunds</h2>
      <p>
        Refunds for courses or appointments depend on deposit and scheduling.
        Deposits are generally non-refundable due to the nature of scheduled
        services.
      </p>
      <p>
        If a course or appointment is cancelled by GT Master Nail Educator, you
        may choose a reschedule or a full refund of the deposit.
      </p>

      <h2 className="text-xl font-semibold">
        8. 14-Day Withdrawal (EU Consumers)
      </h2>
      <p>
        Under EU law, customers normally have 14 days to withdraw from online
        purchases. However, by enrolling in a scheduled course or booking an
        appointment, you acknowledge that the service is scheduled for a
        specific date and you waive your 14-day withdrawal right where allowed
        by law.
      </p>

      <h2 className="text-xl font-semibold">9. User Responsibilities</h2>
      <p>
        Users must use the website and services responsibly and comply with
        applicable laws. Attempting to interfere with the operation or security
        of the website is prohibited.
      </p>

      <h2 className="text-xl font-semibold">10. Intellectual Property</h2>
      <p>
        All content on this website, including course materials, text, graphics,
        logos, and images, is the property of GT Master Nail Educator unless
        stated otherwise. Materials may not be copied or distributed without
        permission.
      </p>

      <h2 className="text-xl font-semibold">11. Limitation of Liability</h2>
      <p>
        GT Master Nail Educator is not liable for indirect, incidental, or
        consequential damages from using the website or participating in courses
        or appointments. Participation in practical training is at your own
        responsibility.
      </p>

      <h2 className="text-xl font-semibold">12. Privacy</h2>
      <p>
        Personal information is handled according to our Privacy Policy and
        applicable GDPR regulations.
      </p>

      <h2 className="text-xl font-semibold">13. Changes to These Terms</h2>
      <p>
        GT Master Nail Educator may update these Terms at any time. Changes will
        be posted on this page with an updated "Last Updated" date.
      </p>

      <h2 className="text-xl font-semibold">14. Governing Law</h2>
      <p>
        These Terms are governed by and interpreted according to the laws of
        Romania.
      </p>

      <h2 className="text-xl font-semibold">15. Contact Us</h2>
      <p>For questions about these Terms and Conditions, contact us:</p>
      <ul className="list-disc ml-6">
        <li>Email: {import.meta.env.VITE_CONTACT_EMAIL}</li>
        <li>Website: {import.meta.env.VITE_ROOT_URL}</li>
      </ul>
    </div>
  );
};

export default TermsAndConditions;
