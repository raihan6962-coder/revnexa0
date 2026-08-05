import type { Metadata } from 'next';
import { PageHero } from '@/components/site/page-hero';
import { JsonLd, breadcrumbSchema } from '@/components/site/json-ld';

export const metadata: Metadata = {
  title: 'Privacy Policy | Revnexa Google Play Review Service',
  description:
    'Learn how Revnexa collects, uses, and protects your personal information. Our privacy policy explains our data practices for website visitors and service clients.',
  alternates: {
    canonical: 'https://revnexa.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Privacy Policy', url: '/privacy-policy' },
      ])} />

      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Your privacy matters to us. This policy explains how we handle your data."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-10">
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">1. Introduction</h2>
            <p className="mt-3 text-muted-foreground">
              Welcome to Revnexa (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate the website revnexa.com and provide Google Play Store review growth support services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. By accessing or using our website, you agree to the collection and use of information in accordance with this policy.
            </p>
            <p className="mt-3 text-muted-foreground">
              We are committed to protecting your privacy and ensuring transparency in our data practices. This policy applies to all visitors, users, and clients of our website and services. We encourage you to read this document carefully and reach out if you have any questions.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">2. Information We Collect</h2>
            <p className="mt-3 text-muted-foreground">
              We collect various types of information to provide and improve our services. The information we collect falls into two categories: personal information and non-personal information.
            </p>
            <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">Personal Information</h3>
            <p className="mt-2 text-muted-foreground">
              When you contact us through our website, chat widget, contact form, WhatsApp, Telegram, or email, we may collect the following personal information:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li>Your full name</li>
              <li>Email address</li>
              <li>App name and package details (if provided)</li>
              <li>Any information you include in your messages</li>
              <li>Communication preferences</li>
            </ul>
            <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">Non-Personal Information</h3>
            <p className="mt-2 text-muted-foreground">
              When you visit our website, we automatically collect certain non-personal information including:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on each page</li>
              <li>Referring website or source</li>
              <li>Approximate geographic location (based on IP address)</li>
              <li>Device type (desktop, mobile, tablet)</li>
              <li>Session identifiers for analytics purposes</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">3. How We Use Your Information</h2>
            <p className="mt-3 text-muted-foreground">
              We use the information we collect for the following purposes:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li>To respond to your inquiries and provide customer support</li>
              <li>To deliver our Google Play Store review growth services</li>
              <li>To communicate with you about your projects, updates, and service changes</li>
              <li>To improve our website, services, and user experience</li>
              <li>To analyze website traffic and usage patterns for optimization</li>
              <li>To send occasional service-related notifications (not marketing emails unless you opt in)</li>
              <li>To comply with legal obligations and enforce our terms</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              We process your information based on legitimate business interests, contractual necessity, and your consent where applicable. We do not use your personal information for automated decision-making or profiling.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">4. How We Share Your Information</h2>
            <p className="mt-3 text-muted-foreground">
              We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following limited circumstances:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and delivering our services (e.g., hosting providers, analytics tools). These providers are bound by contractual obligations to protect your data.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, regulation, legal process, or governmental request.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction, subject to the same privacy protections.</li>
              <li><strong>With Your Consent:</strong> We may share your information for any other purpose with your explicit consent.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">5. Data Storage and Security</h2>
            <p className="mt-3 text-muted-foreground">
              Your information is stored securely using industry-standard security measures. We implement technical and organizational safeguards to protect your data against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li>Encrypted data transmission (SSL/TLS)</li>
              <li>Secure database storage with access controls</li>
              <li>Regular security reviews and updates</li>
              <li>Limited access to personal information on a need-to-know basis</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              While we take reasonable precautions, no method of electronic storage or transmission over the internet is 100% secure. We cannot guarantee absolute security but are committed to protecting your data using the best practices available to us.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">6. Cookies and Tracking Technologies</h2>
            <p className="mt-3 text-muted-foreground">
              Our website uses minimal cookies and local storage technologies essential for basic functionality. These include:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>Session Storage:</strong> Used to maintain your admin login session and chat state within your browser.</li>
              <li><strong>IndexedDB:</strong> Used by our chat widget to store messages locally for real-time chat functionality.</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              We do not use third-party advertising cookies, social media tracking pixels, or cross-site tracking technologies. Our website does not serve targeted advertisements. If we add analytics tools in the future, we will update this policy accordingly.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">7. Third-Party Services</h2>
            <p className="mt-3 text-muted-foreground">
              Our website integrates with third-party communication platforms. When you choose to contact us through these platforms, your data is also subject to their respective privacy policies:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>WhatsApp:</strong> When you message us on WhatsApp, your communication is governed by the <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline">WhatsApp Privacy Policy</a>.</li>
              <li><strong>Telegram:</strong> When you message us on Telegram, your communication is subject to the <a href="https://telegram.org/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Telegram Privacy Policy</a>.</li>
              <li><strong>Email:</strong> When you email us, your message is handled by your email provider and our internal systems.</li>
              <li><strong>Vercel:</strong> Our website is hosted on Vercel, which may collect basic server logs as described in the <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Vercel Privacy Policy</a>.</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              We encourage you to review the privacy policies of these third-party services. We are not responsible for the privacy practices of external platforms.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">8. Data Retention</h2>
            <p className="mt-3 text-muted-foreground">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Specifically:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li>Inquiry and chat data is retained for up to 12 months after the last interaction.</li>
              <li>Analytics data is retained in aggregated, anonymized form indefinitely.</li>
              <li>Service-related data is retained for the duration of the client relationship and for 3 years afterward for record-keeping purposes.</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              When your data is no longer needed, it is securely deleted or anonymized so that it can no longer be linked to you.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">9. Your Rights</h2>
            <p className="mt-3 text-muted-foreground">
              Depending on your jurisdiction, you may have the following rights regarding your personal information:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>Right to Access:</strong> You can request a copy of the personal information we hold about you.</li>
              <li><strong>Right to Rectification:</strong> You can request that we correct any inaccurate or incomplete information.</li>
              <li><strong>Right to Deletion:</strong> You can request that we delete your personal information, subject to certain legal exceptions.</li>
              <li><strong>Right to Restrict Processing:</strong> You can request that we limit how we use your data.</li>
              <li><strong>Right to Data Portability:</strong> You can request a copy of your data in a structured, commonly used format.</li>
              <li><strong>Right to Object:</strong> You can object to certain types of processing of your personal information.</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              To exercise any of these rights, please contact us through our contact page. We will respond to your request within 30 days. We may need to verify your identity before processing your request.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">10. International Data Transfers</h2>
            <p className="mt-3 text-muted-foreground">
              Our website is operated from the United States. If you are accessing our website from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States or other countries where our service providers operate. By using our website, you consent to the transfer of your information to these locations, which may have different data protection laws than your jurisdiction.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">11. Children&apos;s Privacy</h2>
            <p className="mt-3 text-muted-foreground">
              Our website and services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete that information promptly.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">12. Changes to This Privacy Policy</h2>
            <p className="mt-3 text-muted-foreground">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will update the &quot;Last Updated&quot; date at the top of this page. We encourage you to review this policy periodically. Your continued use of our website after any changes constitutes your acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">13. Contact Us</h2>
            <p className="mt-3 text-muted-foreground">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to us through our <a href="/contact" className="text-primary underline">contact page</a>. We are committed to working with you to resolve any privacy-related concerns promptly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
