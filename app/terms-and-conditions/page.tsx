import Footer from "@/components/navigation/Footer";
import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50/30 font-work-sans">
      <div className="bg-primary-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center pt-32">
        <h1 className="text-4xl md:text-5xl font-bold montserrat mb-4 text-primary">
          EduAI Pro Terms of Service
        </h1>
        <p className="text-lg text-grey-11 font-medium">
          Effective Date: 11th March, 2026.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-white shadow-xl -mt-8 rounded-2xl mb-16 border border-gray-100">
        <div className="prose prose-lg prose-blue max-w-none text-gray-700 space-y-8">
          <p className="text-xl font-medium leading-relaxed text-gray-800">
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of the EduAI Pro platform including our website, applications,
            AI tools, educational services, and related products (together, the
            &quot;Services&quot;).
          </p>

          <p className="leading-relaxed">
            Throughout these Terms:
            <br />
            <strong>
              &quot;EduAI Pro&quot;, &quot;Company&quot;, &quot;we&quot;,
              &quot;our&quot;, or &quot;us&quot;
            </strong>{" "}
            means EduAI Pro Limited.
            <br />
            <strong>&quot;You&quot; or &quot;your&quot;</strong> means any
            educator, institution, organisation, or individual accessing or
            using the Services.
          </p>

          <p className="leading-relaxed">
            By using the Services, you agree to these Terms. If you don&apos;t
            agree, please discontinue use. We may update these Terms from time
            to time. When we make significant changes, we&apos;ll update the
            effective date at the top of this page and notify you through the
            platform, by email, or via our website. Continued use after an
            update means you accept the revised Terms.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              1. DEFINITIONS
            </h2>
            <p className="leading-relaxed">
              To keep things consistent throughout this document, here&apos;s
              what we mean when we use these terms:
            </p>
            {/* Add definitions here if provided later */}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              2. WHAT WE OFFER
            </h2>
            <p className="leading-relaxed mb-4">
              EduAI Pro provides digital tools designed to support educators
              with instructional planning, teaching, and professional
              development. Our Services currently include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>AI-powered lesson planning and content generation tools</li>
              <li>Teacher professional development courses</li>
              <li>Continuing Professional Development (CPD) certifications</li>
              <li>Educational templates and resources</li>
              <li>Educator collaboration features</li>
              <li>Institutional dashboards and analytics</li>
            </ul>
            <p className="bg-blue-50/50 p-4 rounded-lg border-l-4 border-primary-500 italic text-sm">
              One thing worth being clear about: EduAI Pro provides technology
              tools for educators. We are not an accreditation body, a
              university, or a government teacher licensing authority. Our
              platform is designed to support great teaching, not to replace the
              professional structures that recognise it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              3. ELIGIBILITY
            </h2>
            <p className="leading-relaxed mb-4">
              To use EduAI Pro&apos;s Services, you must:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                be at least 18 years old, or be authorised to use the Services
                by an institution on your behalf.
              </li>
            </ul>
            <p className="leading-relaxed">
              Accounts created using bots or other automated methods are not
              permitted. By signing up, you confirm that you have the legal
              capacity to enter into these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              4. YOUR ACCOUNT
            </h2>
            <p className="leading-relaxed mb-4">
              To access most features, you&apos;ll need to create an account.
              When you do, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Provide accurate registration information</li>
              <li>Keep your login credentials confidential</li>
              <li>
                Let us know immediately if you suspect unauthorised access to
                your account
              </li>
            </ul>
            <p className="leading-relaxed">
              You are responsible for everything that happens under your
              account. If we detect fraudulent activity, misuse, or a violation
              of these Terms, we may suspend or terminate your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              5. ACCEPTABLE USE
            </h2>
            <p className="leading-relaxed mb-4">
              We built EduAI Pro for educators and institutions doing
              legitimate, valuable work. To keep it that way for everyone, you
              agree to use the Services only for lawful and authorised purposes.
            </p>
            <p className="font-semibold mb-2">
              You may not, and may not allow others to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Violate any applicable laws or regulations</li>
              <li>
                Upload or distribute content that infringes third-party
                intellectual property or privacy rights
              </li>
              <li>
                Attempt to gain unauthorised access to accounts, systems, or
                data
              </li>
              <li>Introduce malware, malicious code, or harmful software</li>
              <li>
                Interfere with, disrupt, or degrade the Services, including
                through abusive automation, scraping, or denial-of-service
                behaviour
              </li>
              <li>
                Reverse engineer, decompile, or attempt to discover the source
                code or underlying models of our platform (except where
                expressly permitted by law)
              </li>
              <li>
                Bypass product limits, safety controls, or access restrictions
              </li>
              <li>Impersonate other users, institutions, or EduAI Pro staff</li>
              <li>
                Share login credentials or use another user&apos;s account
                without authorisation
              </li>
            </ul>
            <p className="leading-relaxed">
              We may remove content or restrict access to accounts that violate
              these rules.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              6. FAIR USE & SYSTEM PROTECTION
            </h2>
            <p className="leading-relaxed mb-4">
              We want EduAI Pro to perform reliably for every user, and that
              means protecting the platform from usage patterns that could drag
              it down for everyone else.
            </p>
            <p className="leading-relaxed">
              If your usage of AI tools or platform resources significantly
              exceeds normal patterns and starts to affect performance for other
              users, we reserve the right to temporarily limit access or ask you
              to adjust your usage. We&apos;ll always reach out before taking
              action, except in rare situations where we need to act immediately
              to protect the system.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              7. AI TOOLS — WHAT THEY DO AND DON&apos;T DO
            </h2>
            <p className="leading-relaxed mb-6">
              Our AI tools are designed to make your instructional planning
              faster and more effective. They suggest evidence-based practices,
              generate content, and help you think through teaching challenges.
              But they work with you, not instead of you. Here&apos;s what that
              means in practice:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Human Oversight
                </h3>
                <p className="leading-relaxed">
                  EduAI Pro is not a substitute for the expertise and contextual
                  judgement of skilled educators. You should always review and
                  adapt AI-generated outputs to fit your students&apos; specific
                  needs, your school&apos;s standards, and your professional
                  context. Final decisions in instructional design always belong
                  to you.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Accuracy</h3>
                <p className="leading-relaxed">
                  Our AI suggestions are based on pattern recognition across
                  large amounts of data. They&apos;re helpful, but not
                  infallible. AI outputs may contain inaccuracies or be
                  unsuitable for certain contexts. Please verify information and
                  make the adjustments that you, as the qualified educator, know
                  are right.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Your Responsibility
                </h3>
                <p className="leading-relaxed">
                  You are responsible for reviewing, editing, and approving any
                  AI-generated content before using it with students or sharing
                  it in any instructional setting. You&apos;re also responsible
                  for making sure your use of AI outputs complies with
                  applicable laws, your school or district&apos;s policies, and
                  your professional obligations.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Educational Context
                </h3>
                <p className="leading-relaxed">
                  AI outputs should be adapted to align with your
                  institution&apos;s educational standards, curriculum
                  requirements, and classroom realities. What works in one
                  setting may not work in another.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              8. HOW WE HANDLE YOUR DATA WITH AI
            </h2>
            <p className="leading-relaxed mb-4">
              When you use our AI tools, the prompts and inputs you provide are
              processed by EduAI Pro&apos;s systems to generate responses. We
              may also analyse aggregated interaction data to improve platform
              performance and reliability.
            </p>
            <p className="font-semibold text-gray-900 mb-6 bg-green-50/50 p-4 rounded-lg border-l-4 border-green-500">
              We will not use personally identifiable information from your
              prompts to train publicly accessible AI models without your
              explicit consent.
            </p>
            <p className="font-medium mb-2">
              Here&apos;s an honest account of when our team may access your
              data directly:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>To help with support requests you make to us</li>
              <li>Where required by applicable law</li>
              <li>To protect EduAI Pro from abuse or security threats</li>
              <li>
                On rare occasions when a technical error stops an automated
                process partway through
              </li>
            </ul>
            <p className="leading-relaxed">
              We don&apos;t browse your data for fun, and we don&apos;t sell it.
              All data processing activities are governed by our Privacy Policy,
              which forms part of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              9. PROFESSIONAL DEVELOPMENT & CERTIFICATIONS
            </h2>
            <p className="leading-relaxed mb-4">
              EduAI Pro offers professional development courses and digital CPD
              certifications. Our certifications are UK-accredited through the
              CPD standards office, a recognised accreditation that carries
              formal standing in the United Kingdom and is acknowledged by many
              international institutions and employers. Here’s what that means
              for you:
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex gap-3">
                <span className="font-bold shrink-0">UK Accreditation.</span>
                <span className="leading-relaxed">
                  Our certificates are accredited by CPD standards office, a
                  UK-recognised body. This accreditation confirms that our
                  courses meet defined quality and content standards, it is not
                  a self-issued badge.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold shrink-0">What they confirm.</span>
                <span className="leading-relaxed">
                  Our certificates confirm successful completion of a course or
                  training module on our platform, verified under the standards
                  of our accrediting body.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold shrink-0">What they are not.</span>
                <span className="leading-relaxed">
                  Our certificates are not government-issued teaching licences,
                  and they do not guarantee employment, promotion, or mandatory
                  recognition by any specific institution or jurisdiction.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold shrink-0">
                  International recognition.
                </span>
                <span className="leading-relaxed">
                  While UK accreditation is widely respected, recognition
                  outside the United Kingdom varies by employer, institution,
                  and jurisdiction. If formal recognition matters for your
                  specific role or country, we’d encourage you to verify with
                  your employer or relevant licensing body before enrolling.
                </span>
              </li>
            </ul>
            <p className="leading-relaxed">
              If you have questions about the scope of our accreditation or what
              our certifications mean for your context, contact us at{" "}
              <a
                href="mailto:support@eduaipro.ng"
                className="text-primary-600 hover:text-primary-800 underline transition-colors"
              >
                support@eduaipro.ng
              </a>{" "}
              and we’ll give you a straight answer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              10. PAYMENTS & SUBSCRIPTIONS
            </h2>
            <p className="leading-relaxed mb-4">
              Some of our Services are free. Others require a paid subscription.
              If you&apos;re on a free plan, we won&apos;t ask for your payment
              details. For paid Services:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                If a free trial is available, we&apos;ll tell you its length
                when you sign up. After the trial ends, payment is required to
                continue using premium features.
              </li>
              <li>
                If you don&apos;t pay, we&apos;ll freeze access to premium
                features until payment is made.
              </li>
              <li>
                Subscriptions renew automatically unless you cancel before the
                renewal date.
              </li>
              <li>
                Prices are presented as tax-inclusive where required by law.
              </li>
              <li>
                You are responsible for providing valid payment information and
                keeping it up to date.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              11. REFUND POLICY
            </h2>
            <p className="leading-relaxed mb-4">
              Here are examples of situations where we&apos;ll issue a full
              refund without hesitation:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                You tried EduAI Pro and it simply wasn&apos;t the right fit for
                you
              </li>
              <li>You experienced a billing error on our end</li>
              <li>
                The platform had extended downtime that prevented you from using
                what you paid for
              </li>
              <li>
                You contacted our support team and it took us several days to
                respond
              </li>
            </ul>
            <p className="leading-relaxed">
              For anything that doesn&apos;t clearly fall into these categories,
              we&apos;ll still evaluate your request fairly and on a
              case-by-case basis. Refund requests can be sent to{" "}
              <a
                href="mailto:support@eduaipro.ng"
                className="text-primary-600 hover:underline"
              >
                support@eduaipro.ng
              </a>
              . Nearly everything on the edges comes down to a case-by-case
              basis, send us a note and we&apos;ll work with you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              12. INSTITUTIONAL ACCOUNTS
            </h2>
            <p className="leading-relaxed mb-4">
              Schools, universities, and organisations can create institutional
              accounts to manage educator access across their teams.
              Institutional account holders may:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Manage educator access and permissions</li>
              <li>
                Track participation in professional development programmes
              </li>
              <li>Access aggregated platform analytics</li>
            </ul>
            <p className="leading-relaxed">
              Institutions may not access individual user data beyond what is
              permitted by applicable data protection laws. Institutional use of
              EduAI Pro must comply with all applicable privacy regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              13. STUDENT DATA
            </h2>
            <p className="leading-relaxed mb-4">
              EduAI Pro is a platform for educators, not a student data system.
              As such:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                You must not upload sensitive student personal data to the
                platform unless authorised by your institution and expressly
                permitted by applicable law.
              </li>
              <li>
                Educators remain responsible for ensuring that their use of the
                Services complies with their school&apos;s data policies and any
                applicable student data protection regulations.
              </li>
            </ul>
            <p className="leading-relaxed font-medium">
              If you&apos;re unsure whether something qualifies as sensitive
              student data, the safer choice is not to upload it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              14. CONTENT MODERATION
            </h2>
            <p className="leading-relaxed">
              We pre-screen inputs to check for content that falls outside
              educational use, and we reserve the right to review, remove, or
              restrict content that violates these Terms, applicable laws, or
              our platform&apos;s safety standards. Accounts that repeatedly
              submit harmful or inappropriate content may be suspended.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              15. INTELLECTUAL PROPERTY
            </h2>
            <p className="leading-relaxed mb-4">
              All rights, title, and interest in the EduAI Pro platform and
              Services remain the property of EduAI Pro Limited or its
              licensors. This includes our software, platform design, AI models
              and algorithms, and branding.
            </p>
            <p className="leading-relaxed mb-4">
              Your content is yours. Any materials you upload or create on the
              platform remain your property. By using the Services, you grant
              EduAI Pro a limited licence to host, process, and display your
              content solely to provide the Services to you. We claim no
              ownership over what you create.
            </p>
            <p className="leading-relaxed font-medium">
              You may not duplicate, copy, resell, or exploit any part of the
              platform; including its HTML, design elements, or AI systems,
              without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              16. COPYRIGHT COMPLAINTS
            </h2>
            <p className="leading-relaxed mb-4">
              If you believe that content on EduAI Pro infringes your copyright,
              you may submit a notice to our designated copyright contact at{" "}
              <a
                href="mailto:copyright@eduaipro.ng"
                className="text-primary-600 hover:underline"
              >
                copyright@eduaipro.ng
              </a>
              .
            </p>
            <p className="font-semibold mb-2">Your notice should include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                Sufficient detail to identify the copyrighted work you believe
                has been infringed
              </li>
              <li>
                Identification of the specific material on our platform you
                believe is infringing
              </li>
              <li>Your contact information so we can follow up with you</li>
            </ul>
            <p className="leading-relaxed">
              On receipt of a valid notice, we may remove or disable access to
              the allegedly infringing material. We may also terminate accounts
              of users who repeatedly infringe third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              17. THIRD-PARTY SERVICES
            </h2>
            <p className="leading-relaxed">
              EduAI Pro relies on third-party providers for hosting, cloud
              infrastructure, payment processing, and AI technologies. We work
              hard to choose reliable partners, but we cannot be responsible for
              service interruptions or performance issues that originate with
              them. Where third-party services affect your experience,
              we&apos;ll communicate transparently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              18. SERVICE AVAILABILITY
            </h2>
            <p className="leading-relaxed mb-4">
              Your use of EduAI Pro is at your own risk. We provide the Services
              on an &quot;as is&quot; and &quot;as available&quot; basis. We
              design our platform carefully and test features before releasing
              them, but like any software, things sometimes go wrong.
            </p>
            <p className="leading-relaxed mb-4">
              Temporary interruptions can occur due to maintenance, upgrades,
              infrastructure issues, or external disruptions. We don&apos;t
              guarantee completely error-free or uninterrupted access, but we
              track reported issues and work through them systematically,
              prioritising anything affecting security or privacy.
            </p>
            <p className="leading-relaxed font-medium">
              We make a commitment to our users: as long as EduAI Pro continues
              to operate, we will maintain our core Services, including
              security, privacy, and customer support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              19. CHANGES TO THE SERVICES & PRICING
            </h2>
            <p className="leading-relaxed">
              We&apos;re always working to improve EduAI Pro. Sometimes that
              means modifying features, redesigning parts of the platform, or in
              rare cases, closing down a particular feature or product line. We
              reserve the right to modify or discontinue any part of the
              Services, temporarily or permanently, with or without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              20. PRIVACY & DATA PROTECTION
            </h2>
            <p className="leading-relaxed mb-4">
              EduAI Pro processes personal data in accordance with applicable
              laws, including the Nigeria Data Protection Act (NDPA) 2023. Our
              full data practices are set out in our Privacy Policy, which forms
              part of these Terms.
            </p>
            <p className="leading-relaxed">
              We take strong measures to protect and secure your data, including
              backups, redundancy, and encryption for data in transit from the
              public internet. There are edge cases where data may pass through
              our internal network without encryption, but we minimise these
              wherever possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              21. FEATURES & KNOWN LIMITATIONS
            </h2>
            <p className="leading-relaxed mb-4">
              We design EduAI Pro&apos;s features with care, based on our own
              experience and the feedback of educators who take the time to
              share it. But no platform pleases everyone, and we make no
              guarantees that the Services will meet every specific requirement
              or expectation you might have.
            </p>
            <p className="leading-relaxed">
              We test all features thoroughly before release. Some bugs will
              still get through, that&apos;s the nature of software. We track
              and prioritise the ones reported to us, particularly any related
              to security or privacy. Not every bug will be fixed immediately,
              and we can&apos;t promise a completely error-free experience. What
              we can promise is that we take these things seriously.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              22. LIMITATION OF LIABILITY
            </h2>
            <p className="leading-relaxed mb-4">
              To the fullest extent permitted by law, and without limiting
              liability that cannot be excluded under applicable law, EduAI Pro
              shall not be liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Educational outcomes arising from use of the Services</li>
              <li>Inaccuracies in AI-generated outputs</li>
              <li>Decisions made by users based on platform content</li>
              <li>
                Indirect, incidental, special, consequential, or punitive
                damages, including loss of profits, data, or business
                opportunity, even if we&apos;ve been advised of the possibility
                of such loss
              </li>
            </ul>
            <p className="leading-relaxed mb-4">
              We implement commercially reasonable safeguards and reliability
              practices. No online service can guarantee absolute security or
              uninterrupted availability, and these Terms reflect that honestly.
            </p>
            <p className="leading-relaxed font-semibold">
              Any claim arising out of or relating to these Terms or the
              Services must be brought within one (1) year after the event
              giving rise to the claim, unless a longer period is required by
              applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              23. INDEMNIFICATION
            </h2>
            <p className="leading-relaxed mb-4">
              To the maximum extent permitted by law, you agree to defend,
              indemnify, and hold harmless EduAI Pro Limited, its affiliates,
              officers, directors, employees, and agents from and against any
              claims, liabilities, damages, losses, and expenses (including
              reasonable legal fees) arising out of or related to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your content</li>
              <li>Your use of the Services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of applicable law</li>
              <li>
                Your infringement or misappropriation of a third party&apos;s
                intellectual property or privacy rights
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              24. CANCELLATION & TERMINATION
            </h2>
            <p className="leading-relaxed mb-4">
              You can cancel your account at any time, you&apos;re in control of
              that. If you cancel before the end of a paid billing period, your
              cancellation takes effect immediately and you won&apos;t be
              charged again. We don&apos;t automatically prorate unused time in
              the final billing cycle.
            </p>
            <p className="leading-relaxed mb-4">
              EduAI Pro may suspend or terminate accounts that violate these
              Terms, present security risks, or engage in abusive behaviour,
              including verbal, written, or other abuse directed at our team. We
              also reserve the right to refuse use of the Services to anyone, at
              any time, for any reason. We include this clause because, across a
              large user base, there will occasionally be someone misusing the
              platform, and we need to be able to act quickly when that happens.
            </p>
            <p className="leading-relaxed font-medium">
              Suspension means you and any other users on the account will lose
              access. Termination additionally results in deletion of the
              account and its content. We take these steps seriously and
              won&apos;t use them lightly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              25. FORCE MAJEURE
            </h2>
            <p className="leading-relaxed">
              EduAI Pro is not liable for delays or failure to perform
              obligations caused by events beyond our reasonable control,
              including natural disasters, internet or infrastructure failures,
              cyber incidents, acts of government, or labour disputes.
              We&apos;ll communicate transparently if such an event affects the
              Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              26. GENERAL LEGAL TERMS
            </h2>
            <p className="leading-relaxed mb-4">
              A few standard provisions that complete this agreement:
            </p>
            <ul className="space-y-4">
              <li className="flex gap-2">
                <strong className="shrink-0">Entire Agreement.</strong>
                <span>
                  These Terms, together with our Privacy Policy and any
                  additional terms incorporated by reference, constitute the
                  entire agreement between you and EduAI Pro regarding the
                  Services.
                </span>
              </li>
              <li className="flex gap-2">
                <strong className="shrink-0">Severability.</strong>
                <span>
                  If any provision of these Terms is found to be unenforceable,
                  the remaining provisions stay fully in effect.
                </span>
              </li>
              <li className="flex gap-2">
                <strong className="shrink-0">No Waiver.</strong>
                <span>
                  Our failure to enforce any provision is not a waiver of our
                  right to enforce it later.
                </span>
              </li>
              <li className="flex gap-2">
                <strong className="shrink-0">Assignment.</strong>
                <span>
                  You may not assign these Terms without our prior written
                  consent. We may assign these Terms in connection with a
                  merger, acquisition, restructuring, or sale of assets.
                </span>
              </li>
              <li className="flex gap-2">
                <strong className="shrink-0">Survival.</strong>
                <span>
                  Sections relating to intellectual property, limitation of
                  liability, indemnification, dispute resolution, and these
                  general terms survive termination of your account.
                </span>
              </li>
              <li className="flex gap-2">
                <strong className="shrink-0">Notices.</strong>
                <span>
                  We may provide notices to you by email, in-platform
                  notification, or by posting updates on our website.
                  You&apos;re responsible for keeping your contact information
                  accurate. Legal notices to us should be sent to{" "}
                  <a
                    href="mailto:legal@eduaipro.ng"
                    className="text-primary-600 hover:underline"
                  >
                    legal@eduaipro.ng
                  </a>
                  .
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              27. GOVERNING LAW & DISPUTES
            </h2>
            <p className="leading-relaxed">
              These Terms are governed by the laws of the Federal Republic of
              Nigeria. Any disputes arising out of or relating to these Terms or
              the Services shall be resolved exclusively in the competent courts
              of Nigeria. Both parties consent to the jurisdiction of those
              courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 montserrat border-b pb-2">
              28. CONTACT US
            </h2>
            <p className="leading-relaxed mb-6">
              We genuinely welcome questions, concerns, and feedback. If
              anything in these Terms is unclear, or if you need help with your
              account, please reach out.
            </p>
            <p className="text-lg font-medium text-center italic text-gray-700 bg-gray-50 py-6 rounded-lg border">
              Thank you for trusting EduAI Pro. We take that trust seriously,
              and we&apos;ll keep working to deserve it.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
