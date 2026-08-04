'use client';

import { PageHero } from '@/components/site/page-hero';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we handle your information when you use our website and services."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="rounded-xl border border-amber/30 bg-amber/5 p-4 text-sm text-foreground">
            <strong>Note:</strong> This privacy policy is provided as a starting
            point. Please have it reviewed by a legal professional before
            launch to ensure compliance with your specific jurisdiction and
            business requirements.
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">1. Information We Collect</h2>
            <p className="mt-3 text-muted-foreground">
              When you contact us through our website, we collect the information
              you provide: your name, email address, app name (if provided), and
              your message. We also collect basic analytics data such as page
              views, referrer, device type, and approximate country based on
              IP address.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">2. How We Use Your Information</h2>
            <p className="mt-3 text-muted-foreground">
              We use your information to respond to your inquiry, provide our
              services, communicate with you about your project, and improve our
              website and services. We do not sell or rent your personal
              information to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">3. Data Storage</h2>
            <p className="mt-3 text-muted-foreground">
              Your information is stored securely in our database. We use
              industry-standard security measures to protect your data. Access
              to your personal information is restricted to authorized team
              members only.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">4. Cookies</h2>
            <p className="mt-3 text-muted-foreground">
              Our website uses minimal cookies for basic functionality. We do
              not use third-party tracking cookies or advertising networks.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">5. Third-Party Services</h2>
            <p className="mt-3 text-muted-foreground">
              When you contact us via WhatsApp, Telegram, or email, your message
              is processed by those respective platforms. We are not responsible
              for how third-party platforms handle your data. Please review
              their privacy policies.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">6. Data Retention</h2>
            <p className="mt-3 text-muted-foreground">
              We retain your inquiry information for as long as necessary to
              provide our services and respond to your requests. You may request
              deletion of your data at any time by contacting us.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">7. Your Rights</h2>
            <p className="mt-3 text-muted-foreground">
              Depending on your jurisdiction, you may have the right to access,
              correct, or delete your personal information. To exercise these
              rights, contact us using the information provided on our contact
              page.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">8. Changes to This Policy</h2>
            <p className="mt-3 text-muted-foreground">
              We may update this privacy policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">9. Contact Us</h2>
            <p className="mt-3 text-muted-foreground">
              If you have questions about this privacy policy or how we handle
              your data, please contact us through our contact page.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </section>
    </>
  );
}
