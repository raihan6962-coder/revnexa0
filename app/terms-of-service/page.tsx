'use client';

import { PageHero } from '@/components/site/page-hero';

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms under which you may use our website and services."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="rounded-xl border border-amber/30 bg-amber/5 p-4 text-sm text-foreground">
            <strong>Note:</strong> These terms are provided as a starting point.
            Please have them reviewed by a legal professional before launch to
            ensure they are appropriate for your specific business and
            jurisdiction.
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-3 text-muted-foreground">
              By accessing and using this website, you accept and agree to be
              bound by these Terms of Service. If you do not agree with any part
              of these terms, you should not use our website or services.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">2. Description of Service</h2>
            <p className="mt-3 text-muted-foreground">
              Revnexa provides Google Play Store review growth support services.
              Our services include authentic user engagement strategies, rating
              improvement support, and review management guidance. The specific
              scope of services for each client is determined through direct
              communication.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">3. Client Responsibilities</h2>
            <p className="mt-3 text-muted-foreground">
              Clients are responsible for providing accurate information about
              their app and its current standing. Clients must not use our
              services in ways that violate Google Play Store policies or
              applicable laws. Clients retain full responsibility for their
              own app and developer account.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">4. No Guarantees</h2>
            <p className="mt-3 text-muted-foreground">
              While we strive to deliver high-quality service, we cannot
              guarantee specific outcomes. Results may vary based on your app,
              its current standing, market conditions, and platform algorithm
              changes. We do not promise specific rating numbers or review
              counts.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">5. Confidentiality</h2>
            <p className="mt-3 text-muted-foreground">
              We treat all client information with strict confidentiality. We
              do not share client details, app information, or the nature of
              our working relationship with any third party.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">6. Intellectual Property</h2>
            <p className="mt-3 text-muted-foreground">
              All content on this website, including text, graphics, logos, and
              design elements, is the property of Revnexa and is protected by
              intellectual property laws. You may not reproduce or distribute
              our content without permission.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">7. Limitation of Liability</h2>
            <p className="mt-3 text-muted-foreground">
              Revnexa is not liable for any indirect, incidental, or
              consequential damages arising from the use of our website or
              services. Our total liability is limited to the amount paid for
              the specific service giving rise to the claim.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">8. Indemnification</h2>
            <p className="mt-3 text-muted-foreground">
              You agree to indemnify and hold Revnexa harmless from any claims,
              damages, or expenses arising from your use of our services or your
              violation of these terms.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">9. Changes to Terms</h2>
            <p className="mt-3 text-muted-foreground">
              We may update these Terms of Service from time to time. Changes
              will be posted on this page with an updated revision date.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">10. Contact</h2>
            <p className="mt-3 text-muted-foreground">
              If you have questions about these Terms of Service, please contact
              us through our contact page.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </section>
    </>
  );
}
