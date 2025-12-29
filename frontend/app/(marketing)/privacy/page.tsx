export default function PrivacyPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-600 mb-12">Last updated: December 24, 2024</p>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              DotHack ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our hackathon management platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800">Personal Information</h3>
                <p className="text-slate-600 leading-relaxed">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600 mt-2">
                  <li>Name and email address</li>
                  <li>Organization or company name</li>
                  <li>Account credentials</li>
                  <li>Profile information</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800">Hackathon Data</h3>
                <p className="text-slate-600 leading-relaxed">
                  When you use our platform, we collect:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600 mt-2">
                  <li>Hackathon details and configurations</li>
                  <li>Participant information</li>
                  <li>Team compositions and project details</li>
                  <li>Submissions and related artifacts</li>
                  <li>Scores and feedback from judges</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800">Usage Information</h3>
                <p className="text-slate-600 leading-relaxed">
                  We automatically collect certain information about your device and how you interact with our platform:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600 mt-2">
                  <li>IP address and device identifiers</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and features used</li>
                  <li>Time and date of access</li>
                  <li>API usage and request logs</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">3. How We Use Your Information</h2>
            <div className="space-y-3 text-slate-600">
              <p className="leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and facilitate hackathon operations</li>
                <li>Communicate with you about your account and our services</li>
                <li>Send administrative and promotional messages</li>
                <li>Analyze usage patterns and optimize performance</li>
                <li>Detect, prevent, and address security issues</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">4. Information Sharing and Disclosure</h2>
            <div className="space-y-3 text-slate-600">
              <p className="leading-relaxed">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
                <li><strong>Within hackathon context:</strong> Information is shared with other participants, organizers, and judges as necessary for hackathon operations</li>
                <li><strong>Service providers:</strong> With vendors who help us operate our platform</li>
                <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">5. Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">6. Data Retention</h2>
            <p className="text-slate-600 leading-relaxed">
              We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Hackathon data may be retained for historical and analytical purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">7. Your Rights and Choices</h2>
            <div className="space-y-3 text-slate-600">
              <p className="leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of promotional communications</li>
                <li>Object to processing of your information</li>
                <li>Request a copy of your data</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">8. Cookies and Tracking Technologies</h2>
            <p className="text-slate-600 leading-relaxed">
              We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings, though some features of our platform may not function properly without them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">9. Third-Party Services</h2>
            <p className="text-slate-600 leading-relaxed">
              Our platform may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">10. Children's Privacy</h2>
            <p className="text-slate-600 leading-relaxed">
              Our platform is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">11. International Data Transfers</h2>
            <p className="text-slate-600 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We take appropriate safeguards to ensure your information receives adequate protection in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">12. Changes to This Privacy Policy</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">13. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please contact us at privacy@dothack.io
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
