const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">
        Privacy Policy for GT Master Nail Educator
      </h1>
      <p>
        <em>Last Updated: March 13, 2026</em>
      </p>

      <h2 className="text-xl font-semibold">1. Introduction</h2>
      <p>
        GT Master Nail Educator ("we", "our", or "us") operates the website{" "}
        {import.meta.env.VITE_ROOT_URL} (the "Service").
      </p>
      <p>
        This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you visit our Service or use our
        services.
      </p>
      <p>
        We are committed to protecting your personal data and complying with
        applicable data protection laws including the General Data Protection
        Regulation (GDPR).
      </p>
      <p>
        If you do not agree with the terms of this Privacy Policy, please do not
        access the Service.
      </p>

      <h2 className="text-xl font-semibold">2. Data Controller</h2>
      <p>The data controller responsible for your personal information is:</p>
      <p>
        <strong>GT Master Nail Educator</strong>
        <br />
        Ireland
        <br />
        Email: {import.meta.env.VITE_CONTACT_EMAIL}
      </p>

      <h2 className="text-xl font-semibold">3. Information We Collect</h2>

      <h3 className="font-semibold">Information You Provide</h3>
      <ul className="list-disc ml-6">
        <li>Full name</li>
        <li>Email address</li>
        <li>Date of birth (for course enrollments)</li>
        <li>Information submitted through forms</li>
      </ul>

      <h3 className="font-semibold">Automatically Collected Information</h3>
      <ul className="list-disc ml-6">
        <li>IP address</li>
        <li>Device type and browser information</li>
        <li>Location data (approximate location based on IP)</li>
        <li>Usage data and interaction with the Service</li>
      </ul>

      <h3 className="font-semibold">Information From Third-Party Login</h3>
      <p>
        If you log in using a social provider such as Google, we may receive:
      </p>
      <ul className="list-disc ml-6">
        <li>Name</li>
        <li>Email address</li>
        <li>Profile image</li>
      </ul>

      <h2 className="text-xl font-semibold">4. How We Use Your Information</h2>
      <ul className="list-disc ml-6">
        <li>To provide and maintain our Service</li>
        <li>To process course enrollments</li>
        <li>To process payments</li>
        <li>To communicate with you regarding your bookings or account</li>
        <li>To improve our services and website functionality</li>
        <li>To prevent fraud and unauthorized activity</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2 className="text-xl font-semibold">
        5. Legal Basis for Processing (GDPR)
      </h2>
      <p>
        Under the General Data Protection Regulation, we rely on the following
        legal bases:
      </p>
      <ul className="list-disc ml-6">
        <li>
          <strong>Contractual necessity</strong> – processing necessary to
          provide services such as course enrollments.
        </li>
        <li>
          <strong>Consent</strong> – when you voluntarily provide information or
          sign in using social login.
        </li>
        <li>
          <strong>Legitimate interest</strong> – to improve our services and
          prevent fraud.
        </li>
        <li>
          <strong>Legal obligation</strong> – when required by applicable law.
        </li>
      </ul>

      <h2 className="text-xl font-semibold">6. Payments</h2>
      <p>
        Payments on our website are processed securely by Stripe. We do not
        store full payment card details on our servers. Payment information is
        processed directly by Stripe according to their security and privacy
        standards.
      </p>

      <h2 className="text-xl font-semibold">7. Third-Party Services</h2>
      <p>
        We may use trusted third-party services to operate our platform,
        including payment processing providers, authentication providers such as
        Google, and hosting providers. These providers only receive the data
        necessary to perform their services.
      </p>

      <h2 className="text-xl font-semibold">
        8. Cookies and Tracking Technologies
      </h2>
      <p>
        Our Service may use cookies and similar tracking technologies to provide
        essential website functionality, maintain login sessions, and improve
        user experience.
      </p>
      <p>
        Cookies are small data files stored on your device. You can control or
        disable cookies through your browser settings.
      </p>

      <h2 className="text-xl font-semibold">9. Data Retention</h2>
      <p>
        We retain your personal information only for as long as necessary to
        provide our services, maintain legal records, resolve disputes, and
        enforce our agreements.
      </p>

      <h2 className="text-xl font-semibold">
        10. International Data Transfers
      </h2>
      <p>
        Some third-party providers may process data outside the European
        Economic Area. When this occurs, we ensure appropriate safeguards are in
        place in accordance with GDPR.
      </p>

      <h2 className="text-xl font-semibold">11. Data Security</h2>
      <p>
        We implement reasonable technical and organizational measures designed
        to protect your personal data. However, no method of transmission over
        the Internet is completely secure.
      </p>

      <h2 className="text-xl font-semibold">12. Your Data Protection Rights</h2>
      <ul className="list-disc ml-6">
        <li>Right to Access</li>
        <li>Right to Rectification</li>
        <li>Right to Erasure</li>
        <li>Right to Restrict Processing</li>
        <li>Right to Data Portability</li>
        <li>Right to Object</li>
      </ul>

      <p>
        To exercise any of these rights, please contact us at{" "}
        {import.meta.env.VITE_CONTACT_EMAIL}. We will respond within 30 days.
      </p>

      <h2 className="text-xl font-semibold">13. Children's Privacy</h2>
      <p>
        Our Service is not intended for individuals under the age of 18 without
        parental consent.
      </p>

      <h2 className="text-xl font-semibold">
        14. Changes to This Privacy Policy
      </h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we will
        update the "Last Updated" date at the top of this page.
      </p>

      <h2 className="text-xl font-semibold">15. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us:
      </p>
      <ul className="list-disc ml-6">
        <li>Email: {import.meta.env.VITE_CONTACT_EMAIL}</li>
        <li>Website: {import.meta.env.VITE_ROOT_URL}</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
