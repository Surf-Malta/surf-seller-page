// src/app/acceptable-use/page.tsx
"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";

export default function AcceptableUsePage() {
  return (
    <div className="min-h-screen bg-white pt-28 sm:pt-34 lg:pt-24">
      <Container>
        <div className="max-w-4xl mx-auto py-8 lg:py-12 px-4">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-[#FF6900] to-[#FB2C36] text-white px-4 lg:px-6 py-2 lg:py-3 shadow-lg mb-4 lg:mb-6 rounded-full">
              <span className="font-semibold text-sm">⚠️ Usage Guidelines</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] bg-clip-text text-transparent">
                Seller Acceptable Use Policy
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Rules and restrictions for all sellers using the Surf platform
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border border-amber-200 rounded-2xl p-6 lg:p-8 mb-8">
            <div className="flex items-start">
              <svg
                className="w-6 h-6 text-amber-600 mt-1 mr-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-amber-800 mb-2">
                  Important Notice
                </h3>
                <p className="text-amber-700 leading-relaxed">
                  This Acceptable Use Policy sets forth the rules and
                  restrictions applicable to all sellers who use the Surf
                  platform, operated by Surf Creative Solutions Ltd. By listing
                  products or services on Surf, you agree to comply with this
                  Policy. Failure to adhere may result in removal of listings,
                  suspension or termination of accounts, and/or legal action.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 space-y-10">
            {/* Section 1: Prohibited Products */}
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                1. Prohibited Products and Services
              </h2>

              {/* 1.1 Illegal Items */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 text-red-600 text-sm font-bold">
                    1.1
                  </span>
                  Illegal Items
                </h3>
                <div className="bg-gradient-to-br from-red-50 via-red-25 to-red-50 border border-red-200 rounded-xl p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3 mt-1">❌</span>
                      <span>
                        Counterfeit, replica, or unlicensed branded goods
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3 mt-1">❌</span>
                      <span>
                        Stolen merchandise or items procured through illegal
                        means
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3 mt-1">❌</span>
                      <span>
                        Narcotics, controlled substances, or related
                        paraphernalia
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3 mt-1">❌</span>
                      <span>
                        Firearms, explosives, ammunition, or weapons of any kind
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 1.2 Restricted Items */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-orange-700 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 text-orange-600 text-sm font-bold">
                    1.2
                  </span>
                  Restricted Items
                </h3>
                <div className="bg-gradient-to-br from-orange-50 via-yellow-25 to-orange-50 border border-orange-200 rounded-xl p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 mt-1">⚠️</span>
                      <span>
                        Alcohol, tobacco, or e-cigarette products without
                        appropriate licensing
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 mt-1">⚠️</span>
                      <span>
                        Prescription drugs or medical devices lacking regulatory
                        approval
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 mt-1">⚠️</span>
                      <span>
                        Health or dietary supplements with unsubstantiated or
                        misleading claims
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 mt-1">⚠️</span>
                      <span>
                        Adult content or products not compliant with Maltese or
                        EU regulations
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 1.3 Prohibited Services */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-purple-700 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-purple-600 text-sm font-bold">
                    1.3
                  </span>
                  Prohibited Services
                </h3>
                <div className="bg-gradient-to-br from-purple-50 via-pink-25 to-purple-50 border border-purple-200 rounded-xl p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-3 mt-1">🚫</span>
                      <span>Gambling, betting, or lottery services</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-3 mt-1">🚫</span>
                      <span>
                        Multi-level marketing (MLM), pyramid schemes, or
                        fraudulent investment offerings
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-3 mt-1">🚫</span>
                      <span>
                        Unregulated financial services, money laundering, or
                        currency exchanges
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-3 mt-1">🚫</span>
                      <span>
                        Malware, hacking tools, or software designed to
                        facilitate fraud or unauthorized access
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 1.4 Other Unacceptable Content */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 text-gray-600 text-sm font-bold">
                    1.4
                  </span>
                  Other Unacceptable Content
                </h3>
                <div className="bg-gradient-to-br from-gray-50 via-slate-25 to-gray-50 border border-gray-200 rounded-xl p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-3 mt-1">⛔</span>
                      <span>
                        Products or content that promote hate speech, violence,
                        or discrimination
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-3 mt-1">⛔</span>
                      <span>
                        Listings that infringe intellectual property or
                        proprietary rights
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-3 mt-1">⛔</span>
                      <span>
                        False, deceptive, or intentionally misleading product
                        descriptions or promotions
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2: Seller Conduct */}
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                2. Seller Conduct
              </h2>
              <div className="bg-gradient-to-br from-green-50 via-emerald-25 to-green-50 border border-green-200 rounded-xl p-6 lg:p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  All Sellers are expected to act in good faith and adhere to
                  the following behavioural standards:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Provide accurate and truthful information about your
                      business and products
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Do not manipulate customer reviews, ratings, or feedback
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Avoid any form of abusive, threatening, or fraudulent
                      activity
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Do not attempt to bypass Surf's fee structure or payment
                      systems
                    </span>
                  </div>
                  <div className="flex items-start space-x-3 md:col-span-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Maintain transparency in pricing, discounts, and
                      promotional offers
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Platform Oversight */}
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                3. Platform Oversight and Enforcement
              </h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 via-cyan-25 to-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">
                    Compliance Monitoring
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Surf Creative Solutions Ltd employs a combination of
                    automated and manual tools to ensure compliance with this
                    Policy, including but not limited to:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="text-gray-700">Keyword monitoring</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="text-gray-700">
                        Manual listing reviews
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="text-gray-700">
                        Buyer and community reports
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="text-gray-700">
                        Routine listing audits
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 via-orange-25 to-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                    Progressive Enforcement Model
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        1
                      </div>
                      <div>
                        <div className="font-semibold text-yellow-800">
                          First Offense
                        </div>
                        <div className="text-gray-700">
                          Formal warning and immediate removal of non-compliant
                          content
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        2
                      </div>
                      <div>
                        <div className="font-semibold text-orange-800">
                          Second Offense
                        </div>
                        <div className="text-gray-700">
                          Temporary suspension of your seller account
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        3
                      </div>
                      <div>
                        <div className="font-semibold text-red-800">
                          Severe or Repeated Offense
                        </div>
                        <div className="text-gray-700">
                          Permanent account termination and possible referral to
                          legal or financial authorities
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Reporting */}
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                4. Reporting Misuse
              </h2>
              <div className="bg-gradient-to-br from-purple-50 via-pink-25 to-purple-50 border border-purple-200 rounded-xl p-6 lg:p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">
                      Report Policy Violations
                    </h3>
                    <p className="text-gray-700 mb-4">
                      If you encounter content or behaviour that violates this
                      Policy, please report it to our compliance team.
                    </p>
                    <a
                      href="mailto:gdpr@surf.mt"
                      className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      gdpr@surf.mt
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Modifications */}
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                5. Modifications to This Policy
              </h2>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to update or amend this Policy at any
                  time. Continued use of the Surf platform following any changes
                  constitutes your acceptance of the revised terms.
                </p>
              </div>
            </section>

            {/* Version Info */}
            <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl p-6">
              <div className="text-center">
                <div className="text-sm opacity-80 mb-2">
                  <span className="font-semibold">Version:</span> 1.0 |
                  <span className="font-semibold ml-2">Effective Date:</span>{" "}
                  11/04/2025
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/terms">
                <button className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#8001BF] hover:to-[#4D0186] transition-all duration-300">
                  View Terms & Conditions
                </button>
              </Link>
              <Link href="/register">
                <button className="bg-white text-purple-600 border-2 border-purple-200 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300">
                  Start Selling
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
