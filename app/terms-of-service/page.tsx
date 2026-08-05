import type { Metadata } from 'next';
import { PageHero } from '@/components/site/page-hero';
import { JsonLd, breadcrumbSchema } from '@/components/site/json-ld';

export const metadata: Metadata = {
  title: 'Terms of Service | Revnexa Google Play Review Service',
  description:
    'Read the terms and conditions governing the use of Revnexa website and Google Play review services. Understand your rights and responsibilities.',
  alternates: {
    canonical: 'https://revnexa.com/terms-of-service',
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Terms of Service', url: '/terms-of-service' },
      ])} />

      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms and conditions governing your use of our website and services."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-10">
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-3 text-muted-foreground">
              By accessing and using the Revnexa website (revnexa.com) and our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website or services. These terms constitute a legally binding agreement between you and Revnexa.
            </p>
            <p className="mt-3 text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes become effective immediately upon posting to this page. Your continued use of our website or services after any modifications indicates your acceptance of the updated terms. We recommend checking this page periodically for updates.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">2. Description of Service</h2>
            <p className="mt-3 text-muted-foreground">
              Revnexa provides Google Play Store review growth support services. Our services are designed to help Android app developers improve their app&apos;s visibility, credibility, and rating on the Google Play Store through authentic user engagement strategies. Our services include:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li>Google Play Store review growth strategies and implementation</li>
              <li>Rating improvement support through authentic user engagement</li>
              <li>Review management guidance and best practices</li>
              <li>App Store Optimization (ASO) consultation</li>
              <li>Ongoing support throughout and after service delivery</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              The specific scope, methodology, and pricing of services for each client are determined through direct communication and agreed upon before any work begins. We do not operate an automated self-service platform; all engagements are handled through personal consultation.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">3. Eligibility</h2>
            <p className="mt-3 text-muted-foreground">
              To use our services, you must be at least 18 years of age and possess the legal authority to enter into a binding agreement. You must be the owner of, or authorized representative for, the app you are seeking services for. By using our services, you represent and warrant that you meet these eligibility requirements.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">4. Client Responsibilities</h2>
            <p className="mt-3 text-muted-foreground">
              As a client of Revnexa, you are responsible for:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li>Providing accurate and complete information about your app, its current status, and your goals</li>
              <li>Responding promptly to our communications and providing necessary access or information</li>
              <li>Ensuring that your use of our services complies with Google Play Store policies and all applicable laws and regulations</li>
              <li>Maintaining the security of your own developer account and app credentials</li>
              <li>Making timely decisions and providing approvals when requested</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              You acknowledge that you retain full responsibility for your app, your developer account, and any decisions made regarding your app&apos;s presence on the Google Play Store. Revnexa acts as a service provider and consultant, not as the operator of your app or developer account.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">5. No Guarantees of Specific Results</h2>
            <p className="mt-3 text-muted-foreground">
              While we are committed to delivering high-quality service and have a strong track record, we do not guarantee specific outcomes. Results may vary based on numerous factors including but not limited to your app&apos;s current standing, category competitiveness, market conditions, Google Play algorithm changes, and the quality of your app itself.
            </p>
            <p className="mt-3 text-muted-foreground">
              We do not promise specific rating numbers, review counts, download increases, or ranking positions. Any discussions about expected outcomes are estimates based on our experience and are not binding guarantees. Past results for other clients do not guarantee similar outcomes for your app.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">6. Payment Terms</h2>
            <p className="mt-3 text-muted-foreground">
              Payment terms for our services are agreed upon individually with each client before work begins. Unless otherwise agreed in writing:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li>Payment is required before service delivery begins or according to an agreed-upon milestone schedule</li>
              <li>All fees are quoted in USD unless otherwise specified</li>
              <li>Refund policies are determined on a case-by-case basis and will be communicated before engagement begins</li>
              <li>Failure to make timely payments may result in suspension or termination of services</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">7. Confidentiality</h2>
            <p className="mt-3 text-muted-foreground">
              We take client confidentiality seriously. All information shared with us during our working relationship — including but not limited to app details, business strategies, technical information, and the nature of our engagement — is treated as confidential.
            </p>
            <p className="mt-3 text-muted-foreground">
              We will not disclose your confidential information to any third party without your prior written consent, except as required by law. This confidentiality obligation survives the termination of our working relationship. We implement reasonable security measures to protect your confidential information from unauthorized access or disclosure.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">8. Intellectual Property</h2>
            <p className="mt-3 text-muted-foreground">
              All content on the Revnexa website — including text, graphics, logos, icons, images, software, and design elements — is the property of Revnexa and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content from our website without our prior written permission.
            </p>
            <p className="mt-3 text-muted-foreground">
              Any strategies, methodologies, or processes developed specifically for your engagement remain proprietary to Revnexa. However, all work product delivered to you as part of our services may be used by you for its intended purpose as agreed upon in our engagement.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">9. Limitation of Liability</h2>
            <p className="mt-3 text-muted-foreground">
              To the maximum extent permitted by applicable law, Revnexa shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our website or services. This includes, but is not limited to, loss of profits, data, business opportunities, or goodwill, regardless of whether such damages were foreseeable.
            </p>
            <p className="mt-3 text-muted-foreground">
              Our total liability for any claims arising out of or related to these terms or our services shall not exceed the total amount paid by you to Revnexa for the specific service giving rise to the claim during the twelve (12) months preceding the claim.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">10. Indemnification</h2>
            <p className="mt-3 text-muted-foreground">
              You agree to indemnify, defend, and hold harmless Revnexa, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys&apos; fees) arising out of or related to:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li>Your use of our website or services</li>
              <li>Your violation of these Terms of Service</li>
              <li>Your violation of any applicable law or third-party rights</li>
              <li>Any content or information you provide to us</li>
              <li>Your app&apos;s compliance with Google Play Store policies</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">11. Termination</h2>
            <p className="mt-3 text-muted-foreground">
              Either party may terminate our working relationship at any time by providing written notice. Upon termination:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li>Any outstanding payments become due immediately</li>
              <li>We will cease all service delivery activities</li>
              <li>Confidentiality obligations remain in effect</li>
              <li>Any pre-paid fees for undelivered services will be refunded according to our refund policy</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">12. Force Majeure</h2>
            <p className="mt-3 text-muted-foreground">
              Neither party shall be liable for any failure or delay in performance due to circumstances beyond its reasonable control, including but not limited to acts of God, natural disasters, pandemics, government actions, changes in Google Play Store policies, internet outages, or other force majeure events. The affected party will notify the other party promptly and take reasonable steps to mitigate the impact.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">13. Governing Law and Dispute Resolution</h2>
            <p className="mt-3 text-muted-foreground">
              These Terms of Service are governed by and construed in accordance with the laws of the United States, without regard to its conflict of law principles. Any disputes arising out of or related to these terms shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration in accordance with applicable arbitration rules.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">14. Severability</h2>
            <p className="mt-3 text-muted-foreground">
              If any provision of these Terms of Service is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving its original intent.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">15. Entire Agreement</h2>
            <p className="mt-3 text-muted-foreground">
              These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and Revnexa regarding your use of our website and services. They supersede all prior and contemporaneous agreements, representations, and understandings, whether written or oral.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">16. Contact Information</h2>
            <p className="mt-3 text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us through our <a href="/contact" className="text-primary underline">contact page</a>. We are happy to clarify any aspect of these terms before you engage our services.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
