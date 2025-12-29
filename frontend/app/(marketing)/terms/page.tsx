export default function TermsPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-600 mb-12">Last updated: December 24, 2024</p>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing and using DotHack, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">2. Description of Service</h2>
            <p className="text-slate-600 leading-relaxed">
              DotHack is a comprehensive hackathon management platform that enables organizers to manage events, participants, teams, projects, submissions, judging, and leaderboards. The platform provides both web interface and API access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">3. User Accounts</h2>
            <div className="space-y-3 text-slate-600">
              <p className="leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information during registration</li>
                <li>Keep your account information up to date</li>
                <li>Not share your API keys or account credentials with others</li>
                <li>Notify us immediately of any unauthorized access to your account</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">4. API Usage</h2>
            <div className="space-y-3 text-slate-600">
              <p className="leading-relaxed">
                When using our API, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the API only for lawful purposes</li>
                <li>Not exceed reasonable rate limits</li>
                <li>Not attempt to circumvent security measures</li>
                <li>Protect your API keys and not share them publicly</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">5. Prohibited Activities</h2>
            <div className="space-y-3 text-slate-600">
              <p className="leading-relaxed">
                You may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the platform for any illegal or unauthorized purpose</li>
                <li>Attempt to interfere with the proper functioning of the platform</li>
                <li>Upload malicious code or content</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Impersonate others or misrepresent your affiliation</li>
                <li>Scrape or harvest data without permission</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">6. Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed">
              All content, features, and functionality of DotHack are owned by us and are protected by copyright, trademark, and other intellectual property laws. You retain all rights to content you submit through the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">7. Data and Privacy</h2>
            <p className="text-slate-600 leading-relaxed">
              Your use of the platform is also governed by our Privacy Policy. We collect and process data as described in our Privacy Policy to provide and improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">8. Service Modifications</h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any part of our service at any time with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">9. Disclaimer of Warranties</h2>
            <p className="text-slate-600 leading-relaxed">
              The platform is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">10. Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">11. Termination</h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to terminate or suspend your account and access to the platform at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">12. Changes to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update these Terms from time to time. We will notify you of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the platform after such changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">13. Governing Law</h2>
            <p className="text-slate-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">14. Contact Information</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about these Terms, please contact us at legal@dothack.io
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
