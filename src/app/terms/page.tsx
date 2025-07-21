// src/app/terms/page.tsx
"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-white pt-28 sm:pt-34 lg:pt-24">
      <Container>
        <div className="max-w-4xl mx-auto py-8 lg:py-12 px-4">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-full px-4 lg:px-6 py-2 lg:py-3 shadow-lg mb-4 lg:mb-6">
              <span className="text-purple-600 font-semibold text-sm">
                📋 Legal Terms
              </span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] bg-clip-text text-transparent">
                Seller Terms & Conditions
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Important legal terms governing your relationship with Surf as a
              seller
            </p>
          </div>

          {/* Navigation */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-bold text-purple-900 mb-4">
              Quick Navigation
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              <a
                href="#definitions"
                className="text-purple-700 hover:text-purple-900 hover:underline"
              >
                1. Definitions
              </a>
              <a
                href="#eligibility"
                className="text-purple-700 hover:text-purple-900 hover:underline"
              >
                2. Seller Eligibility
              </a>
              <a
                href="#obligations"
                className="text-purple-700 hover:text-purple-900 hover:underline"
              >
                3. Seller Obligations
              </a>
              <a
                href="#fees"
                className="text-purple-700 hover:text-purple-900 hover:underline"
              >
                4. Platform Fees
              </a>
              <a
                href="#fulfillment"
                className="text-purple-700 hover:text-purple-900 hover:underline"
              >
                5. Order Fulfillment
              </a>
              <a
                href="#returns"
                className="text-purple-700 hover:text-purple-900 hover:underline"
              >
                6. Returns & Refunds
              </a>
              <a
                href="#prohibited"
                className="text-purple-700 hover:text-purple-900 hover:underline"
              >
                7. Prohibited Products
              </a>
              <a
                href="#termination"
                className="text-purple-700 hover:text-purple-900 hover:underline"
              >
                8. Termination
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 space-y-8">
            {/* 1.1 Definitions */}
            <section id="definitions">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                1.1 Definitions
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>For the purposes of this Agreement:</p>
                <ul className="space-y-3 ml-4">
                  <li>
                    <strong>"Platform"</strong> refers to Surf Creative
                    Solutions Ltd, also called "Surf", a digital marketplace
                    operating in Malta that facilitates transactions between
                    sellers and buyers.
                  </li>
                  <li>
                    <strong>"Seller"</strong> refers to any individual or entity
                    registering on the Platform to offer goods or services for
                    sale.
                  </li>
                  <li>
                    <strong>"Buyer"</strong> refers to individuals or entities
                    purchasing goods or services from Sellers through the
                    Platform.
                  </li>
                  <li>
                    <strong>"Platform Fee"</strong> refers to the fee charged by
                    the Platform for the use of its services, including but not
                    limited to listing, transaction processing, and other
                    administrative costs.
                  </li>
                  <li>
                    <strong>"Account"</strong> refers to the registered profile
                    created by a Seller or Buyer on the Platform.
                  </li>
                  <li>
                    <strong>"Listing"</strong> refers to the description,
                    pricing, and other details of a product or service that a
                    Seller offers on the Platform.
                  </li>
                  <li>
                    <strong>"Order"</strong> refers to a confirmed purchase
                    request made by a Buyer for a product or service listed by a
                    Seller.
                  </li>
                  <li>
                    <strong>"Malta Laws"</strong> refers to the applicable laws
                    and regulations governing e-commerce, consumer rights, and
                    business operations in Malta.
                  </li>
                </ul>
              </div>
            </section>

            {/* 1.2 Scope */}
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                1.2 Scope
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <ul className="space-y-3 ml-4">
                  <li>
                    <strong>Agreement Applicability:</strong> These Terms and
                    Conditions govern the relationship between Surf and all
                    Sellers who register to offer goods or services on the
                    Platform. By registering as a Seller, you agree to comply
                    with these Terms in full.
                  </li>
                  <li>
                    <strong>Platform Role:</strong> Surf acts solely as an
                    intermediary, providing the technology and infrastructure
                    necessary for Sellers to list, market, and sell their
                    products or services to Buyers. Surf does not take ownership
                    of goods, nor is it a party to the transactions between
                    Sellers and Buyers.
                  </li>
                  <li>
                    <strong>Seller Obligations:</strong> This Agreement applies
                    to all Sellers who use the Platform. Sellers must ensure
                    compliance with Maltese laws, including but not limited to
                    consumer protection, data privacy, and tax regulations.
                  </li>
                  <li>
                    <strong>Platform Fee:</strong> Sellers acknowledge and agree
                    that Surf charges a Platform Fee for services rendered, as
                    detailed in this Agreement.
                  </li>
                  <li>
                    <strong>Modifications:</strong> Surf reserves the right to
                    modify these Terms and Conditions at any time. Sellers will
                    be notified of any significant changes, and continued use of
                    the Platform constitutes acceptance of the updated terms.
                  </li>
                </ul>
              </div>
            </section>

            {/* 1.3 Seller Eligibility */}
            <section id="eligibility">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                1.3 Seller Eligibility and Registration
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-900">
                  Eligibility Criteria
                </h3>
                <p>To register as a seller on Surf, you must:</p>
                <ul className="space-y-2 ml-4">
                  <li>
                    • Be a legally registered business or individual authorized
                    to sell goods or services in Malta
                  </li>
                  <li>
                    • Comply with all applicable local laws and regulations
                  </li>
                  <li>
                    • Provide accurate and verifiable business information,
                    including VAT registration, registered business name and
                    address
                  </li>
                  <li>
                    • Complete the online registration form on the Platform
                  </li>
                </ul>
                <p>
                  Surf reserves the right to request any additional
                  documentation for verification. Registration approval is
                  subject to Surf's discretion and may be denied or revoked if
                  the seller fails to meet the eligibility requirements.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6">
                  Seller Account Responsibilities
                </h3>
                <ul className="space-y-2 ml-4">
                  <li>
                    • Sellers must ensure that their account information is
                    accurate and up to date
                  </li>
                  <li>
                    • The account credentials must be kept confidential, and any
                    unauthorized access must be reported immediately to Surf
                  </li>
                  <li>
                    • Sellers are responsible for all transactions and
                    activities conducted through their accounts
                  </li>
                </ul>
              </div>
            </section>

            {/* 1.4 Seller Obligations */}
            <section id="obligations">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                1.4 Seller Obligations
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <ul className="space-y-3 ml-4">
                  <li>
                    <strong>Compliance with Laws:</strong> Sellers must adhere
                    to all applicable Maltese and European Union laws,
                    regulations, and industry standards related to the sale of
                    goods and services, including but not limited to the Unfair
                    Commercial Practices Directive (Directive 2005/29/EC).
                  </li>
                  <li>
                    <strong>Accurate Listings:</strong> Sellers are required to
                    provide truthful, accurate, and up-to-date descriptions,
                    prices, and availability details for all products and
                    services listed on the Platform. Misleading or false
                    information is strictly prohibited.
                  </li>
                  <li>
                    <strong>Order Fulfillment:</strong> Sellers must process and
                    fulfill orders promptly. Any delays, cancellations, or
                    issues should be immediately communicated to Surf.
                  </li>
                  <li>
                    <strong>Quality and Warranty:</strong> Sellers must ensure
                    that their products or services meet the described quality
                    and specifications. Any offered warranties or guarantees
                    must be honored.
                  </li>
                  <li>
                    <strong>Platform Fee:</strong> Sellers agree to pay the
                    applicable Platform Fee, as outlined in the fee schedule,
                    for using Surf's marketplace services.
                  </li>
                  <li>
                    <strong>Prohibited Items:</strong> Sellers are prohibited
                    from listing or selling items that are illegal, counterfeit,
                    or restricted under Maltese law or Surf's policies.
                  </li>
                  <li>
                    <strong>Customer Service:</strong> Sellers must provide
                    reasonable customer support, including handling inquiries,
                    returns, and disputes in accordance with Surf's policies.
                  </li>
                  <li>
                    <strong>No Direct Transactions:</strong> Sellers agree not
                    to engage in direct transactions with Buyers.
                  </li>
                </ul>
              </div>
            </section>

            {/* 1.5 Platform Fees */}
            <section id="fees">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                1.5 Platform Fees and Payment Terms
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    Platform Fee Structure
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="font-semibold text-blue-800">
                        €0 - €15
                      </div>
                      <div className="text-blue-600">→ €2.99</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="font-semibold text-blue-800">
                        €16 - €30
                      </div>
                      <div className="text-blue-600">→ €3.99</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="font-semibold text-blue-800">
                        €31 - €50
                      </div>
                      <div className="text-blue-600">→ €4.99</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="font-semibold text-blue-800">
                        €51 and above
                      </div>
                      <div className="text-blue-600">→ €5.99</div>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 ml-4">
                  <li>
                    <strong>Payment Processing:</strong> All payments from
                    Buyers are securely processed through Stripe, Surf's
                    designated payment gateway. Sellers must ensure they have a
                    valid Stripe account linked to the Platform to receive
                    payouts.
                  </li>
                  <li>
                    <strong>Payout Schedule:</strong> Seller earnings, minus the
                    platform fee and any applicable charges, will be disbursed
                    every 7 days through Stripe. The funds will be transferred
                    directly to the Seller's registered bank account.
                  </li>
                  <li>
                    <strong>Taxes and Deductions:</strong> Sellers are
                    responsible for any applicable taxes, VAT, or other
                    deductions as required by Maltese law. Surf does not
                    withhold taxes on behalf of Sellers.
                  </li>
                </ul>
              </div>
            </section>

            {/* Continue with remaining sections... */}

            {/* Children's Policy */}
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                1.13 Children's Policy and Surf's Role in Transactions
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-900">
                  Children's Policy
                </h3>
                <ul className="space-y-2 ml-4">
                  <li>
                    • Surf's platform is intended for use by individuals who are
                    18 years or older
                  </li>
                  <li>
                    • Products intended for children may be listed, but
                    purchases must be made by an adult
                  </li>
                  <li>
                    • If a user is under 18, they may only use Surf's services
                    under the supervision and involvement of a parent or legal
                    guardian
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-6">
                  Surf's Role in Transactions
                </h3>
                <ul className="space-y-2 ml-4">
                  <li>
                    • Surf functions as an e-commerce marketplace that
                    facilitates transactions between buyers and sellers
                  </li>
                  <li>
                    • Surf is not a party to the sales contract between the
                    Seller and the Buyer
                  </li>
                  <li>
                    • Sellers are solely responsible for fulfilling orders,
                    ensuring product quality, and handling any disputes related
                    to their sales
                  </li>
                  <li>
                    • Surf does not assume liability for any issues arising from
                    the sale, fulfillment, or delivery of products
                  </li>
                </ul>
              </div>
            </section>

            {/* Agreement Footer */}
            <section className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                By registering as a seller on the Platform, you confirm that you
                have read, understood, and agree to abide by these Terms and
                Conditions.
              </p>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Version:</strong> 1.1
                </p>
                <p>
                  <strong>Effective Date:</strong> 31/03/2025
                </p>
              </div>
            </section>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/acceptable-use">
                <button className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#8001BF] hover:to-[#4D0186] transition-all duration-300">
                  View Acceptable Use Policy
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
