import Footer from "@/components/navigation/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50/30 font-work-sans">
      <div className="bg-primary-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center pt-32">
        <h1 className="text-4xl md:text-5xl font-bold montserrat mb-4 text-primary">
          Privacy Policy
        </h1>
        <p className="text-lg text-grey-11 font-medium">
          Effective Date: 11th March, 2026.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-white shadow-xl -mt-8 rounded-2xl mb-16 border border-gray-100">
        <div className="prose prose-lg prose-blue max-w-none text-gray-700 space-y-8">
          <p className="text-xl font-medium leading-relaxed text-gray-800">
            This Privacy Policy applies to EduAI Pro Limited (&quot;EduAI
            Pro&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or
            &quot;us&quot;) and governs the personal data we process when you
            access or use the EduAI Pro platform including our website,
            applications, AI tools, and related services (the
            &quot;Services&quot;). By using the Services, you agree to the
            practices described here.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              1. OUR PRIVACY PRINCIPLE
            </h2>
            <p className="leading-relaxed mb-4">
              Our guiding principle is data minimisation. In practice, that
              means:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                We collect only the information we genuinely need to provide the
                Services.
              </li>
              <li>We do not sell your personal data to third parties. Ever.</li>
              <li>
                We do not use your email domain, institution name, or any
                personal information in marketing materials without your
                explicit permission.
              </li>
              <li>
                We do not engage in profiling or automated decision-making that
                could have a legal or similarly significant effect on you.
              </li>
              <li>
                Where we give you the option to delete content, that content is
                removed from our active database, not archived indefinitely.
              </li>
            </ul>
            <p className="leading-relaxed">
              These are not aspirations, they are operating commitments. The
              sections below explain how each of them is implemented.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              2. ABOUT EDUAI PRO
            </h2>
            <p className="leading-relaxed mb-4">
              EduAI Pro is an AI-powered platform designed to help educators
              with instructional planning, teaching support, and professional
              development. Because our platform is used by educators and
              institutions, and indirectly touches the educational environments
              of students, we apply heightened care to how we handle data.
            </p>
            <p className="leading-relaxed">
              Our Services may include AI teaching assistants, lesson planning
              tools, professional development programmes, educator resource
              libraries, institutional dashboards, and analytics. Each of these
              is described further in our Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              3. INFORMATION WE COLLECT
            </h2>
            <p className="leading-relaxed mb-4">
              We collect information in three ways: directly from you,
              automatically when you use the platform, and through your use of
              AI tools. Here is what each of those means in practice.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3.1 Information You Provide Directly
                </h3>
                <p className="leading-relaxed mb-4">
                  When you create an account or interact with the platform, you
                  may provide:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong>Name and email address:</strong> used to
                    authenticate your account and send essential communications.
                  </li>
                  <li>
                    <strong>Login credentials:</strong> stored securely and
                    never visible to our team in plain text.
                  </li>
                  <li>
                    <strong>
                      Professional role and institution affiliation:
                    </strong>{" "}
                    used to tailor the platform to your context.
                  </li>
                  <li>
                    <strong>Profile information:</strong> you choose to add.
                  </li>
                  <li>
                    <strong>Payment and billing information:</strong> for paid
                    subscriptions see Section 3.4 for how this is handled.
                  </li>
                </ul>
                <p className="leading-relaxed">
                  You may also provide information when using AI tools,
                  uploading educational content, or contacting customer support.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3.2 Platform Usage Information
                </h3>
                <p className="leading-relaxed mb-4">
                  When you use the platform, we automatically collect technical
                  data to maintain security and improve functionality. This
                  includes device type and browser information, IP address,
                  platform usage activity, feature usage statistics, performance
                  diagnostics, and course completion and training progress.
                </p>
                <p className="leading-relaxed">
                  Analytics data is used for platform improvement and is not
                  linked to you personally in any way that affects your account
                  or experience. Where required by law, we obtain your consent
                  before using non-essential cookies or similar tracking
                  technologies.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3.3 AI Interaction Data
                </h3>
                <p className="leading-relaxed mb-4">
                  When you use our AI-powered features, the platform processes
                  the prompts and inputs you enter, the contextual information
                  used to generate outputs, and the content generated in
                  response to your requests.
                </p>
                <p className="leading-relaxed">
                  This data is processed to generate responses, maintain system
                  reliability, and detect misuse. EduAI Pro does not
                  intentionally use personally identifiable prompts to train
                  publicly available AI models without your consent. Section 7
                  covers our specific AI providers and how they handle this
                  data.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3.4 Payment and Billing Information
                </h3>
                <p className="leading-relaxed mb-4">
                  If you subscribe to a paid plan, your payment information is
                  handled through our payment processors (Paystack and Stripe).
                  Your card details are submitted directly to the payment
                  processor — they do not pass through or get stored on EduAI
                  Pro&apos;s servers.
                </p>
                <p className="leading-relaxed">
                  Our payment processors provide us with limited non-personal
                  transaction metadata (date, amount, product). They do not
                  supply us with your card number, full billing address, or any
                  other payment detail beyond what is needed for our records.
                  Any questions about how they handle your payment data should
                  be directed to them directly.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3.5 Voluntary Correspondence
                </h3>
                <p className="leading-relaxed">
                  When you contact us by email or through our support channels,
                  we retain that correspondence — including your email address —
                  to maintain a history of past interactions and provide better
                  support. If you agree to participate in a customer interview,
                  we will ask for your explicit consent before recording the
                  conversation.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              4. INFORMATION FROM INSTITUTIONS
            </h2>
            <p className="leading-relaxed mb-4">
              If you access EduAI Pro through a school, university, or
              organisation, your institution may provide us with information
              including educator names, email addresses, role assignments, and
              training participation data. This is used to set up and manage
              your institutional account.
            </p>
            <p className="leading-relaxed">
              Institutions may access aggregated analytics about training
              participation. They do not have access to your individual content,
              AI interactions, or personal communications with EduAI Pro and
              they cannot access personal user data beyond what is authorised by
              applicable data protection law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              5. HOW WE USE YOUR INFORMATION
            </h2>
            <p className="leading-relaxed mb-6">
              We use the information we collect for the following purposes only.
              We do not use your data for purposes beyond what is described here
              without notifying you first.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Service Operation
                </h3>
                <p className="leading-relaxed">
                  To create and manage your account, authenticate your identity,
                  and provide access to platform features. This is the core
                  purpose for which your data is collected and is necessary to
                  fulfil our contract with you.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  AI Tool Functionality
                </h3>
                <p className="leading-relaxed">
                  To process your prompts and generate instructional content in
                  response. Your inputs are used only to produce the outputs you
                  request and to maintain system reliability. They are not
                  retained indefinitely or used to build user profiles.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Professional Development
                </h3>
                <p className="leading-relaxed">
                  To track your course progress, record completion, and issue
                  CPD certifications where applicable.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Platform Security
                </h3>
                <p className="leading-relaxed">
                  To detect fraud, abuse, and unauthorised access. Security
                  monitoring is conducted on aggregated and anonymised data
                  wherever possible. Section 14 explains specifically when human
                  access to your data may occur.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Product Improvement
                </h3>
                <p className="leading-relaxed">
                  To analyse anonymised usage patterns and improve platform
                  reliability. This analytics data is not tied to individual
                  user accounts in ways that affect your experience or rights.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Customer Support
                </h3>
                <p className="leading-relaxed">
                  To respond to your enquiries and resolve technical issues.
                  Where support requires access to your content or account data,
                  we will ask for your consent before accessing it, unless the
                  access is necessary to fulfil a request you have already made.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Communications
                </h3>
                <p className="leading-relaxed">
                  To send important service updates, account notifications, and
                  authentication emails. We may also send optional surveys to
                  help us improve our Services. You can opt out of non-essential
                  emails at any time by clicking the Unsubscribe link in any
                  such message.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              6. THIRD-PARTY SUBPROCESSORS
            </h2>
            <p className="leading-relaxed mb-4">
              EduAI Pro relies on trusted third-party providers to operate the
              platform. These subprocessors access only the data they need to
              perform their specific function. All are required to implement
              appropriate technical and organisational safeguards to protect
              user data.
            </p>
            <p className="leading-relaxed">
              This list is reviewed and updated as our platform evolves. If we
              add a subprocessor that materially affects how your data is
              handled, we will notify you before the change takes effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              7. AI PROVIDER TRANSPARENCY
            </h2>
            <p className="leading-relaxed mb-6">
              Because AI data handling is a significant concern for educators
              and institutions, we want to be as specific as possible about how
              our AI providers operate.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  7.1 Google AI (Gemini)
                </h3>
                <p className="leading-relaxed mb-4">
                  EduAI Pro currently uses Google AI (Gemini) as its primary AI
                  model provider. When you interact with our AI features, your
                  prompts are processed by Gemini&apos;s infrastructure. Google
                  may retain request data for abuse and misuse monitoring for a
                  limited period, after which it is deleted. EduAI Pro has
                  configured our use of Google AI to disable model training
                  using your data. We do not share personally identifiable
                  information with Google AI beyond what is contained in the
                  prompts you submit.
                </p>
                <p className="leading-relaxed">
                  We encourage you to review Google&apos;s API Privacy Policy to
                  understand how they handle API usage data. EduAI Pro does not
                  control Google&apos;s practices; questions about their data
                  handling should be directed to Google directly.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  7.2 Future AI Providers
                </h3>
                <p className="leading-relaxed">
                  If EduAI Pro adopts additional AI model providers in future,
                  we will update this section and notify users. We apply the
                  same data minimisation and model training opt-out requirements
                  to any new AI provider we onboard.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              8. STUDENT DATA
            </h2>
            <p className="leading-relaxed mb-4">
              EduAI Pro is designed for educators and institutional users. It is
              not designed for, directed at, or intended for use by anyone under
              the age of 18. Using EduAI Pro as a minor is a violation of our
              Terms of Service.
            </p>
            <p className="leading-relaxed mb-4">
              We do not require, request, or encourage users to enter student
              personally identifiable information when using EduAI Pro. If you
              accidentally submit student personal data through any feature on
              our platform, contact us immediately at{" "}
              <a
                href="mailto:contact@eduaipro.ng"
                className="text-primary-600 hover:underline"
              >
                contact@eduaipro.ng
              </a>{" "}
              and we will take appropriate steps to remove it.
            </p>
            <p className="leading-relaxed mb-4">
              Educators must not upload sensitive student personal data to the
              platform unless:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>They are authorised to do so by their institution, and</li>
              <li>
                Such upload is explicitly permitted by applicable student data
                protection laws.
              </li>
            </ul>
            <p className="leading-relaxed">
              If in doubt about whether a particular use case involves student
              data, the safer approach is not to upload it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              9. COOKIES AND TRACKING TECHNOLOGIES
            </h2>
            <p className="leading-relaxed mb-4">
              EduAI Pro uses cookies and similar technologies for three
              purposes: maintaining secure sessions, remembering your
              preferences, and analysing platform performance.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Session cookies</strong> keep you authenticated between
                pages without requiring you to log in repeatedly.
              </li>
              <li>
                <strong>Preference cookies</strong> remember your platform
                settings between sessions.
              </li>
              <li>
                <strong>Analytics data</strong> helps us understand which
                features are working well and which need improvement. This data
                is anonymised and not linked to your individual account.
              </li>
            </ul>
            <p className="leading-relaxed">
              Where required by law, we obtain consent before using
              non-essential cookies. You can control cookie settings through
              your browser. Disabling certain cookies may affect some platform
              features but will not prevent access to core Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              10. HOW WE SHARE YOUR INFORMATION
            </h2>
            <p className="leading-relaxed mb-6">
              EduAI Pro does not sell personal data. We do not share your
              information for advertising purposes. Information is disclosed
              only in the specific circumstances described below.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Service Providers and Subprocessors
                </h3>
                <p className="leading-relaxed">
                  Trusted third-party providers who support our platform
                  infrastructure, as listed in Section 6. These providers access
                  only the data necessary to perform their specific function.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Institutional Administrators
                </h3>
                <p className="leading-relaxed">
                  Where your account is managed by a school or organisation,
                  that institution&apos;s administrators may access aggregated
                  participation analytics. They cannot access your individual AI
                  interactions, personal content, or communications with EduAI
                  Pro.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Legal Compliance and Government Requests
                </h3>
                <p className="leading-relaxed">
                  Our policy is not to respond to government or law enforcement
                  requests for user data unless we are compelled by legal
                  process. If a law enforcement authority presents a valid
                  warrant, criminal subpoena, or court order requiring us to
                  disclose data, we must comply. We will notify affected users
                  of such requests wherever we are legally permitted to do so.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Business Transfers
                </h3>
                <p className="leading-relaxed">
                  If EduAI Pro is involved in a merger, acquisition,
                  restructuring, or sale of assets, we don&apos;t anticipate
                  this, but if it happens, your personal information may be
                  transferred as part of that transaction. We will notify users
                  before any such transfer takes effect and explain your
                  options.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Links to Other Websites
                </h3>
                <p className="leading-relaxed">
                  Our platform may link to third-party websites or services that
                  EduAI Pro does not operate. This Privacy Policy does not cover
                  those sites. We encourage you to review the privacy policy of
                  any third-party site you visit.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              11. DATA RETENTION
            </h2>
            <p className="leading-relaxed mb-4">
              We keep your data only for as long as necessary to provide the
              Services and meet our legal obligations. The table below sets out
              our retention approach by data category.
            </p>
            <p className="leading-relaxed">
              When you delete content within your EduAI Pro account, it is
              removed from our active database. Non-identifying references may
              persist briefly in operational logs before being purged. When you
              close your account entirely, personal data is removed subject to
              the retention windows above and any legal obligations requiring us
              to hold certain records.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              12. DATA SECURITY
            </h2>
            <p className="leading-relaxed mb-4">
              Keeping your data secure is one of our most serious
              responsibilities. We implement the following technical and
              organisational safeguards:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                All data in transit between your browser and our servers is
                encrypted using TLS/SSL.
              </li>
              <li>
                Data at rest in our database is encrypted using LUKS (Linux
                Unified Key Setup).
              </li>
              <li>
                Access to user data is restricted to authorised personnel on a
                strict need-to-know basis.
              </li>
              <li>
                We maintain monitoring and threat detection systems to identify
                and respond to security events.
              </li>
              <li>
                Our infrastructure is hosted on secure cloud providers with
                independent security certifications.
              </li>
            </ul>
            <p className="leading-relaxed">
              No internet-based service can guarantee absolute security. There
              are edge cases where data may pass through our internal network
              without encryption, though we minimise these wherever technically
              possible. We continually review and improve our security
              practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              13. SECURITY INCIDENT RESPONSE
            </h2>
            <p className="leading-relaxed mb-4">
              EduAI Pro follows a structured incident response process aligned
              with the NIST Computer Security Incident Handling Guide (SP 800-61
              Rev. 2). If a security incident affects personal data, our
              response proceeds through the following steps:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Detection and Analysis:</strong> Our security team
                monitors continuously for signs of incidents. On detection, we
                initiate an investigation — collecting evidence, establishing
                timelines, and assessing who is affected.
              </li>
              <li>
                <strong>Containment and Eradication:</strong> We act promptly to
                contain the incident and remove its cause, including revoking
                access or isolating affected systems where necessary.
              </li>
              <li>
                <strong>Recovery:</strong> Affected systems are returned to
                normal operation and monitored closely for any follow-on
                activity.
              </li>
              <li>
                <strong>Notification:</strong> If your data is affected, we will
                notify you, your institution (where applicable), and relevant
                regulatory authorities within 72 hours of confirming the
                incident — not merely where required by law, but as a standing
                company commitment.
              </li>
              <li>
                <strong>Post-Incident Review:</strong> We conduct a
                lessons-learned review after each incident to improve our
                processes and prevent recurrence.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              14. WHEN OUR TEAM ACCESSES YOUR DATA
            </h2>
            <p className="leading-relaxed mb-4">
              We want to be honest about when EduAI Pro employees may access
              your account data. Access is restricted to authorised personnel
              and occurs only in these four situations:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>To help with a support request you have made.</strong>{" "}
                Where support requires access to your content, we will ask for
                your consent before proceeding.
              </li>
              <li>
                <strong>
                  Where required by applicable law or compelled by legal
                  process,
                </strong>{" "}
                as described in Section 10.
              </li>
              <li>
                <strong>
                  To protect EduAI Pro from abuse, fraud, or security threats.
                </strong>
              </li>
              <li>
                <strong>
                  On rare occasions when a technical error stops an automated
                  process partway through
                </strong>{" "}
                and human intervention is needed to complete it.
              </li>
            </ul>
            <p className="leading-relaxed">
              We do not browse your content for any other purpose. Internal
              access is logged and reviewed as part of our security practice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              15. INTERNATIONAL DATA TRANSFERS
            </h2>
            <p className="leading-relaxed mb-4">
              EduAI Pro is operated primarily from Nigeria, and our platform
              infrastructure may involve servers in other jurisdictions. If you
              access our Services from the European Union, European Economic
              Area, or United Kingdom, your data may be transferred to and
              processed on servers outside your country of residence.
            </p>
            <p className="leading-relaxed">
              Where international transfers occur, we implement appropriate
              safeguards consistent with applicable data protection laws. For
              transfers from the EU, EEA, or UK, we rely on recognised transfer
              mechanisms including adequacy decisions and, where required, the
              European Commission&apos;s Standard Contractual Clauses (SCCs) and
              the UK International Data Transfer Addendum.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              16. YOUR PRIVACY RIGHTS
            </h2>
            <p className="leading-relaxed mb-4">
              We apply the same data rights to all users, regardless of their
              location. Depending on applicable law, you have the following
              rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Right to Know:</strong> You have the right to know what
                personal information we hold, how we use it, and who we share it
                with. This Privacy Policy is our fulfilment of that right.
              </li>
              <li>
                <strong>Right of Access:</strong> You have the right to access
                the personal information we hold about you and to receive
                details about how it is stored, shared, and processed.
              </li>
              <li>
                <strong>Right to Correction:</strong> You have the right to
                request correction of inaccurate or incomplete personal
                information.
              </li>
              <li>
                <strong>Right to Erasure:</strong> You have the right to request
                deletion of your personal data. Please be aware that fulfilling
                some deletion requests may require us to close your account,
                where your data is integral to providing the Services.
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> You have the
                right to request that we limit how and why your personal
                information is used.
              </li>
              <li>
                <strong>Right to Object:</strong> You have the right to object
                to certain types of processing, including processing based on
                our legitimate interests.
              </li>
              <li>
                <strong>Right to Portability:</strong> You have the right to
                receive your personal data in a structured, machine-readable
                format. Contact us to request a data export.
              </li>
              <li>
                <strong>Right to Non-Discrimination:</strong> We will not charge
                you more, offer reduced service, or treat you differently
                because you have exercised any data privacy right. Note that
                exercising certain rights, such as deletion, may by their nature
                prevent you from using the Services.
              </li>
              <li>
                <strong>Right to Appeal:</strong> If we deny a privacy request,
                we will explain why and provide information on how to appeal
                that decision.
              </li>
            </ul>
            <p className="leading-relaxed">
              Many of these rights can be exercised directly through your
              account settings. For requests requiring our involvement, contact
              us at{" "}
              <a
                href="mailto:contact@eduaipro.ng"
                className="text-primary-600 hover:underline"
              >
                contact@eduaipro.ng
              </a>
              . We may need to verify your identity before processing a request,
              typically by confirming your name and the email address associated
              with your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              17. CHILDREN&apos;S PRIVACY
            </h2>
            <p className="leading-relaxed mb-4">
              EduAI Pro is a teacher-facing Service. It is not designed for, or
              directed at, individuals under 18. Using EduAI Pro as a minor is a
              violation of our Terms of Service, and we reserve the right to
              terminate any account in accordance with those Terms.
            </p>
            <p className="leading-relaxed">
              We do not knowingly collect personal data from children under the
              age of 13. If we discover that a child has submitted personal
              information to our platform, we will remove it promptly and take
              appropriate action. If you believe a child has submitted data to
              EduAI Pro, please contact us immediately at{" "}
              <a
                href="mailto:contact@eduaipro.ng"
                className="text-primary-600 hover:underline"
              >
                contact@eduaipro.ng
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              18. SUPPLEMENTAL STATEMENT FOR EU, EEA, AND UK USERS
            </h2>
            <p className="leading-relaxed mb-6">
              If you are accessing EduAI Pro from the European Union, European
              Economic Area, United Kingdom, or Switzerland, this supplemental
              section applies to you in addition to the rest of this policy.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  18.1 Data Controller
                </h3>
                <p className="leading-relaxed">
                  For the purposes of the GDPR and UK GDPR, EduAI Pro Limited is
                  the data controller of your personal information.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  18.2 EU and UK Data Protection Representative
                </h3>
                <p className="leading-relaxed mb-4">
                  EduAI Pro has appointed a representative for EU/EEA and UK
                  data protection matters. For privacy enquiries intended for
                  our representative, please direct correspondence accordingly:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong>EU / EEA / Switzerland representative:</strong> [EU
                    Representative Name, Address, and Contact Email]
                  </li>
                  <li>
                    <strong>UK representative:</strong> [UK Representative Name,
                    Address, and Contact Email]
                  </li>
                </ul>
                <p className="leading-relaxed">
                  For general product or support questions, contact{" "}
                  <a
                    href="mailto:support@eduaipro.ng"
                    className="text-primary-600 hover:underline"
                  >
                    support@eduaipro.ng
                  </a>
                  .
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  18.3 Legal Bases for Processing
                </h3>
                <p className="leading-relaxed">
                  We process your personal data under one or more of the
                  following legal bases, depending on the purpose.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  18.4 International Transfers from the EU/UK
                </h3>
                <p className="leading-relaxed">
                  When we transfer personal data outside the EU/EEA or UK, we
                  use recognised transfer mechanisms. Depending on the transfer,
                  this may include adequacy decisions and contractual safeguards
                  such as the European Commission&apos;s Standard Contractual
                  Clauses (SCCs) and the UK International Data Transfer
                  Addendum. We use Article 49 derogations only in limited
                  situations where no other mechanism is available.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  18.5 Right to Lodge a Complaint
                </h3>
                <p className="leading-relaxed">
                  If you are in the EU or UK, you have the right to lodge a
                  complaint with your local data protection authority. We would
                  appreciate the opportunity to address any concern directly
                  first please contact us at{" "}
                  <a
                    href="mailto:contact@eduaipro.ng"
                    className="text-primary-600 hover:underline"
                  >
                    contact@eduaipro.ng
                  </a>{" "}
                  but you are always free to contact your supervisory authority
                  directly.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              19. NIGERIA DATA PROTECTION ACT (NDPA) 2023
            </h2>
            <p className="leading-relaxed mb-4">
              EduAI Pro is incorporated in Nigeria and operates in compliance
              with the Nigeria Data Protection Act (NDPA) 2023 as our primary
              governing data protection law. As a data controller under the
              NDPA, we maintain records of our data processing activities and
              implement appropriate technical and organisational measures to
              protect personal data in our care.
            </p>
            <p className="leading-relaxed">
              Where our users are located in jurisdictions with their own data
              protection laws, we apply the higher standard where requirements
              differ. Our compliance with the NDPA operates alongside, not
              instead of, our obligations under other applicable international
              privacy frameworks.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              20. PROFILING AND AUTOMATED DECISION-MAKING
            </h2>
            <p className="leading-relaxed">
              EduAI Pro does not engage in profiling or automated
              decision-making that could have a legal or similarly significant
              effect on you. Our AI tools are designed to assist educators in
              generating instructional content. They produce suggestions for
              your professional review. All substantive decisions about how
              AI-generated content is used remain entirely with you, as the
              qualified educator.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              21. CHANGES TO THIS PRIVACY POLICY
            </h2>
            <p className="leading-relaxed mb-4">
              We may update this Privacy Policy as our platform evolves or as
              legal requirements change. When we do, we will revise the
              effective date at the top of this page. For significant changes,
              particularly those that affect how we use your data or your
              privacy rights, we will notify you directly by email and through a
              notice on the platform, giving you time to review the changes
              before they take effect.
            </p>
            <p className="leading-relaxed">
              Continued use of the Services after an update constitutes your
              acceptance of the revised policy. If you do not agree with a
              change, you may close your account before it takes effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              22. CONTACT INFORMATION
            </h2>
            <p className="leading-relaxed mb-4">
              We genuinely welcome privacy questions, data access requests, and
              feedback. Please use the contact route that matches your purpose:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                General privacy enquiries &amp; data rights requests:{" "}
                <a
                  href="mailto:contact@eduaipro.ng"
                  className="text-primary-600 hover:underline"
                >
                  contact@eduaipro.ng
                </a>
              </li>
              <li>
                Support issues:{" "}
                <a
                  href="mailto:support@eduaipro.ng"
                  className="text-primary-600 hover:underline"
                >
                  support@eduaipro.ng
                </a>
              </li>
            </ul>
            <p className="text-lg font-medium text-center italic text-gray-700 bg-gray-50 py-6 rounded-lg border">
              Thank you for trusting EduAI Pro. We take that trust seriously,
              and this policy is our commitment to you in writing.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
