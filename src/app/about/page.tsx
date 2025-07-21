// src/app/about/page.tsx
"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24 sm:pt-28 lg:pt-24">
      <Container>
        <div className="max-w-6xl mx-auto py-8 lg:py-12 px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-full px-4 lg:px-6 py-2 lg:py-3 shadow-lg mb-4 lg:mb-6">
              <span className="text-blue-600 font-semibold text-sm">
                🌟 About Surf Malta
              </span>
            </div>
            <h1 className="text-4xl lg:text-7xl font-bold mb-6 lg:mb-8">
              <span className="bg-gradient-to-r from-[#0066CC] to-[#0052A3] bg-clip-text text-transparent">
                Building Malta's
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] bg-clip-text text-transparent">
                Local Commerce Network
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Surf's platform shapes the digital ecosystem of the Maltese
              economy, bringing together businesses, organizations, suppliers
              and customers in a single digital environment.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-2 border-blue-200 rounded-3xl p-8 lg:p-12 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
                <strong>
                  Introducing an e-commerce revolution to Malta is our
                  objective.
                </strong>
              </p>
              <p className="text-lg lg:text-xl text-gray-600 mt-4 leading-relaxed">
                Our mission is simple: to empower local businesses and create
                economic opportunities for everyone in Malta. We believe in a
                level playing field where entrepreneurs, small businesses, and
                individuals can thrive in the world of e-commerce.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Customer-Centric */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8">
              <div className="w-12 h-12 bg-green-500 rounded-xl mb-6 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Customer-Centric Approach
              </h3>
              <p className="text-green-700 leading-relaxed">
                We offer customer-centric policies to ensure a smooth digital
                experience for both buyers and sellers on our platform.
              </p>
            </div>

            {/* Innovation */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8">
              <div className="w-12 h-12 bg-purple-500 rounded-xl mb-6 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">
                Innovation & Technology
              </h3>
              <p className="text-purple-700 leading-relaxed">
                We are a diverse team of technology experts. Our job is to
                innovate by combining cutting-edge technology with creativity in
                business, to offer valuable services.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 rounded-3xl p-8 lg:p-12 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Team
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We are a diverse team of technology experts committed to
                building a local commerce network that is sophisticated in
                structure, yet simple and intuitive, so you can benefit from the
                potential of e-commerce.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  T
                </div>
                <h4 className="font-semibold text-gray-900">Technology</h4>
                <p className="text-gray-600 text-sm">Cutting-edge solutions</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  I
                </div>
                <h4 className="font-semibold text-gray-900">Innovation</h4>
                <p className="text-gray-600 text-sm">Creative business ideas</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  D
                </div>
                <h4 className="font-semibold text-gray-900">Diversity</h4>
                <p className="text-gray-600 text-sm">Inclusive team culture</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  E
                </div>
                <h4 className="font-semibold text-gray-900">Excellence</h4>
                <p className="text-gray-600 text-sm">
                  Ultimate digital experience
                </p>
              </div>
            </div>
          </div>

          {/* Shark Tank Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 lg:p-12 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Shark Tank Malta Feature
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                We had a fantastic pitch of Surf to the sharks during our recent
                appearance on Shark Tank Malta. Here's a peek of what happened.
              </p>
              <a
                href="https://youtu.be/FFaJCEufuX0?si=cVogPEdt0wYpEGwZ"
                target="_blank"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center justify-center"
                rel="noopener noreferrer"
              >
                <button>Watch Our Pitch</button>
              </a>
            </div>
          </div>

          {/* Call to Action for Content Creators */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-3xl p-8 lg:p-12 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-yellow-800 mb-6">
                Join Our Community
              </h2>
              <p className="text-lg lg:text-xl text-yellow-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                Are you a local content creator or influencer with a passion for
                e-commerce and digital innovation? We want you on our platform!
                Join us in shaping the future of online shopping and connect
                with a vibrant community that's changing the game.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* <Link href="/register">
                  <button className="bg-yellow-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-600 transition-all duration-300 shadow-lg">
                    Become a Creator
                  </button>
                </Link> */}
                <a
                  href="https://wa.me/35677215267"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-white text-yellow-600 border-2 border-yellow-300 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-50 transition-all duration-300 flex items-center justify-center">
                    Contact Us
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Platform Benefits */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Why Choose Surf Malta?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Ready to dive in? Whether you're hunting for unique finds or
              looking to reach Malta's shoppers, Surf is your go-to platform.
              Join us today and discover the convenience, diversity, and
              excitement of our online marketplace.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Convenience
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Easy-to-use platform designed for Malta's unique market needs
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Diversity
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Wide range of local products and services from Maltese
                  businesses
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V9a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Excitement
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Dynamic marketplace with new opportunities and discoveries
                  every day
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              We can't wait to see how you can contribute to our exciting
              mission! Join Malta's most innovative e-commerce platform today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <button className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-[#8001BF] hover:to-[#4D0186] transition-all duration-300 shadow-xl">
                  Start Selling Today
                </button>
              </Link>
              <a
                href="https://wa.me/35677215267"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
                  Contact Our Team
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
