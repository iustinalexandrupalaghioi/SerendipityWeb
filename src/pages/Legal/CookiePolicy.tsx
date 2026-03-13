const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">
        Cookie Policy for GT Master Nail Educator
      </h1>
      <p>
        <em>Last Updated: March 13, 2026</em>
      </p>

      <h2 className="text-xl font-semibold">1. What Are Cookies</h2>
      <p>
        Cookies are small text files stored on your device when you visit a
        website. They help websites function properly and improve the user
        experience.
      </p>
      <p>
        GT Master Nail Educator uses cookies on {import.meta.env.VITE_ROOT_URL}{" "}
        to ensure the website functions correctly.
      </p>

      <h2 className="text-xl font-semibold">2. Cookies We Use</h2>
      <p>
        Our website only uses <strong>essential cookies</strong> that are
        necessary for the operation of the Service.
      </p>
      <p>These cookies may include:</p>

      <h3 className="font-semibold">Authentication Cookies</h3>
      <p>
        These cookies allow users to securely log in and maintain their session
        while using the Service.
      </p>

      <h3 className="font-semibold">Security Cookies</h3>
      <p>
        These cookies help protect the website and its users from fraudulent or
        unauthorized activity.
      </p>

      <h3 className="font-semibold">Payment Session Cookies</h3>
      <p>
        When making payments, cookies may be used by our payment provider Stripe
        to securely process transactions.
      </p>

      <p>
        These cookies are strictly necessary and therefore do not require user
        consent under applicable European regulations.
      </p>

      <h2 className="text-xl font-semibold">3. Third-Party Cookies</h2>
      <p>
        Some cookies may be set by third-party services that are necessary to
        operate our Service.
      </p>

      <p>These include:</p>
      <ul className="list-disc ml-6">
        <li>Stripe – used for secure payment processing</li>
        <li>
          Google authentication services – when users sign in using Google
        </li>
      </ul>

      <p>
        These services may set cookies in accordance with their own privacy
        policies.
      </p>

      <h2 className="text-xl font-semibold">4. Managing Cookies</h2>
      <p>
        Most web browsers allow you to control cookies through browser settings.
      </p>

      <p>You can:</p>
      <ul className="list-disc ml-6">
        <li>View stored cookies</li>
        <li>Delete cookies</li>
        <li>Block cookies entirely</li>
      </ul>

      <p>
        Please note that disabling essential cookies may prevent parts of the
        website from functioning correctly.
      </p>

      <h2 className="text-xl font-semibold">
        5. Changes to This Cookie Policy
      </h2>
      <p>
        We may update this Cookie Policy from time to time. Any changes will be
        posted on this page with an updated "Last Updated" date.
      </p>

      <h2 className="text-xl font-semibold">6. Contact Us</h2>
      <p>
        If you have any questions about this Cookie Policy, please contact us:
      </p>

      <ul className="list-disc ml-6">
        <li>Email: {import.meta.env.VITE_CONTACT_EMAIL}</li>
        <li>Website: {import.meta.env.VITE_ROOT_URL}</li>
      </ul>
    </div>
  );
};

export default CookiePolicy;
