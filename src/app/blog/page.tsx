// src/app/blog/page.tsx
"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { useState } from "react";

export default function BlogPage() {
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const blogPosts = [
    {
      id: 1,
      title: "The Story Behind 36Oils: Plant-Powered Healing from Malta",
      excerpt:
        "At the heart of every bottle from 36Oils is a story - one that began with a personal search for honest skincare and blossomed into a brand built on love, intention, and plant-powered healing.",
      fullContent:
        "At the heart of every bottle from 36Oils is a story - one that began with a personal search for honest skincare and blossomed into a brand built on love, intention, and plant-powered healing. 36Oils was born from a very personal journey. Like many of us, its founders Gilbert and Jessica were looking for skincare that truly worked — something pure, effective, and honest. Their search led them to discover the incredible healing power of plant-based ingredients, and from there, 36Oils was born. What started as a personal quest has now become a beloved Malta-based brand that combines traditional knowledge with modern innovation, creating products that not only care for your skin but also support local community values.",
      category: "Local Business",
      readTime: "5 min read",
      date: "March 2025",
      icon: "🌿",
      featured: true,
    },
    {
      id: 2,
      title: "5 Reasons Why Buying Local in Malta Makes a Difference",
      excerpt:
        "Supporting local businesses is more than just a trend—it's a meaningful way to strengthen Malta's economy, preserve traditions, and promote sustainability.",
      fullContent:
        "Supporting local businesses is more than just a trend—it's a meaningful way to strengthen Malta's economy, preserve traditions, and promote sustainability. By buying local, you contribute to a thriving community while enjoying unique, high-quality products. Here are five reasons why buying directly from local sellers in Malta makes a difference: 1) Economic Impact - Every euro spent locally generates more economic activity in Malta. 2) Unique Products - Local sellers offer distinctive items you won't find elsewhere. 3) Environmental Benefits - Shorter supply chains mean lower carbon footprint. 4) Community Building - Supporting locals strengthens neighborhood bonds. 5) Cultural Preservation - Local businesses often carry forward Malta's rich traditions and craftsmanship.",
      category: "Community",
      readTime: "4 min read",
      date: "March 2025",
      icon: "🏘️",
    },
    {
      id: 3,
      title: "How Malta Can Ensure Local Businesses Thrive in a Global Economy",
      excerpt:
        "In a small and vibrant country like Malta, local businesses form the beating heart of the economy. They're more than just places to shop or dine—they are the threads that weave our communities together.",
      fullContent:
        "In a small and vibrant country like Malta, local businesses form the beating heart of the economy. They're more than just places to shop or dine—they are the threads that weave our communities together, preserving traditions and creating opportunities. As globalization continues to reshape how we live and work, the question arises: How can Malta ensure its local businesses not only survive but thrive? The answer lies in embracing digital transformation while maintaining our unique Maltese character. Local businesses need to adapt to changing consumer behaviors, leverage technology for efficiency, and collaborate with platforms like Surf to reach wider audiences while staying true to their roots.",
      category: "Economy",
      readTime: "6 min read",
      date: "February 2025",
      icon: "📈",
    },
    {
      id: 4,
      title: "Debunking Common Myths About Selling Online in Malta",
      excerpt:
        "Online selling in Malta is growing at an impressive pace, yet myths and misconceptions often hold entrepreneurs back. Let's address common myths with facts backed by data.",
      fullContent:
        "Online selling in Malta is growing at an impressive pace, yet myths and misconceptions often hold entrepreneurs back. Whether you're a first-time seller or a seasoned business owner, it's easy to get caught up in these misconceptions. In this blog, we'll address common myths about selling online in Malta, provide facts backed by data, and show you why now is the perfect time to start your e-commerce journey. Myth 1: 'Malta is too small for e-commerce' - Reality: Malta's compact size is actually an advantage for quick delivery and customer service. Myth 2: 'Online selling is too expensive' - Reality: Platforms like Surf offer low-cost entry points. Myth 3: 'Maltese customers prefer physical stores' - Reality: Data shows increasing online shopping adoption, especially post-2020.",
      category: "Business Tips",
      readTime: "7 min read",
      date: "February 2025",
      icon: "💡",
    },
    {
      id: 5,
      title: "E-commerce in Malta: Opportunities and Growth in 2025",
      excerpt:
        "E-commerce in Malta is no longer just an option—it's a necessity. As Malta steps into 2025, e-commerce is poised for further growth, creating exciting opportunities for businesses of all sizes.",
      fullContent:
        "E-commerce in Malta is no longer just an option—it's a necessity. The global shift toward digital platforms, accelerated by changing consumer habits and technological advancements, is transforming the local economy. As Malta steps into 2025, e-commerce is poised for further growth, creating exciting opportunities for businesses of all sizes. The statistics are compelling: online shopping in Malta has grown by over 200% in the past three years, with more consumers preferring the convenience of home delivery. Local businesses that embrace e-commerce are seeing average revenue increases of 40-60%. The opportunities span across all sectors - from traditional crafts to modern services, from food delivery to fashion retail.",
      category: "Industry Insights",
      readTime: "8 min read",
      date: "January 2025",
      icon: "🔍",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <Container>
        <div className="max-w-7xl mx-auto py-8 lg:py-12 px-4">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-full px-4 lg:px-6 py-2 lg:py-3 shadow-lg mb-4 lg:mb-6">
              <span className="text-orange-600 font-semibold text-sm">
                📝 Surf Malta Blog
              </span>
            </div>
            <h1 className="text-4xl lg:text-7xl font-bold mb-6 lg:mb-8">
              <span className="bg-gradient-to-r from-[#FF6900] to-[#FB2C36] bg-clip-text text-transparent">
                Tips, News & Insights
              </span>
              <br />
              <span className="text-gray-800">for Local Shoppers</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Stay updated with the latest trends, tips, and stories from
              Malta's thriving e-commerce community
            </p>
          </div>

          {/* Category Filter - REMOVED */}

          {/* Featured Post */}
          {blogPosts
            .filter((post) => post.featured)
            .map((post) => (
              <div
                key={post.id}
                className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-3xl p-8 lg:p-12 mb-12"
              >
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      ⭐ Featured Post
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-orange-600 mb-4">
                      <span className="bg-orange-100 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                      <span>{post.date}</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                      {post.title}
                    </h2>

                    {/* Expandable content for featured post */}
                    <div className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {expandedPost === post.id ? (
                        <div>
                          <p className="mb-4">{post.fullContent}</p>
                          <button
                            onClick={() => setExpandedPost(null)}
                            className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                          >
                            Show Less
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p className="mb-4">{post.excerpt}</p>
                          <button
                            onClick={() => setExpandedPost(post.id)}
                            className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                          >
                            Read More
                          </button>
                        </div>
                      )}
                    </div>

                    <a
                      href="https://surf.mt/blogs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-[#FF6900] to-[#FB2C36] text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg inline-flex items-center"
                    >
                      Read on Surf.mt
                      <svg
                        className="w-4 h-4 ml-2"
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
                    </a>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-orange-200 to-red-200 rounded-2xl h-80 lg:h-96 flex items-center justify-center">
                      <div className="text-6xl">{post.icon}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <article
                  key={post.id}
                  className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center">
                    <div className="text-4xl">{post.icon}</div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
                      <span className="bg-gray-100 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-orange-600 transition-colors">
                      {post.title}
                    </h3>

                    {/* Expandable content */}
                    <div className="text-gray-600 mb-4 leading-relaxed">
                      {expandedPost === post.id ? (
                        <div>
                          <p className="mb-3">{post.fullContent}</p>
                          <button
                            onClick={() => setExpandedPost(null)}
                            className="text-orange-600 font-semibold hover:text-orange-700 transition-colors text-sm"
                          >
                            Show Less
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p className="mb-3 line-clamp-3">{post.excerpt}</p>
                          <button
                            onClick={() => setExpandedPost(post.id)}
                            className="text-orange-600 font-semibold hover:text-orange-700 transition-colors flex items-center text-sm"
                          >
                            Read More
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Link to original blog */}
                    <div className="pt-3 border-t border-gray-100">
                      <a
                        href="https://surf.mt/blogs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center text-sm"
                      >
                        View on Surf.mt
                        <svg
                          className="w-3 h-3 ml-1"
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
                      </a>
                    </div>
                  </div>
                </article>
              ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-3xl p-8 lg:p-12 text-center mb-12">
            <div className="max-w-3xl mx-auto">
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Stay Updated
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Get the latest insights about Malta's e-commerce scene, business
                tips, and local success stories delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="bg-gradient-to-r from-[#FF6900] to-[#FB2C36] text-white px-8 py-4 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Join 2,000+ Malta business owners getting weekly insights
              </p>
            </div>
          </div>

          {/* Topics & Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-blue-800 mb-2">Local Business</h3>
              <p className="text-blue-600 text-sm">
                Success stories from Malta
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-green-800 mb-2">Community</h3>
              <p className="text-green-600 text-sm">Building together</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
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
              <h3 className="font-bold text-purple-800 mb-2">Business Tips</h3>
              <p className="text-purple-600 text-sm">Practical advice</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-orange-800 mb-2">
                Industry Insights
              </h3>
              <p className="text-orange-600 text-sm">Market trends</p>
            </div>
          </div>

          {/* Load More & Archive */}
          <div className="text-center">
            <div className="space-y-6">
              <a
                href="https://surf.mt/blogs/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#FF6900] to-[#FB2C36] text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg inline-flex items-center"
              >
                View All Posts on Surf.mt
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
              </a>

              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                <a
                  href="https://surf.mt/blogs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-orange-600 transition-colors flex items-center justify-center"
                >
                  Malta Business Stories
                  <svg
                    className="w-3 h-3 ml-1"
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
                </a>
                <span className="hidden sm:inline text-gray-400">•</span>
                <a
                  href="https://surf.mt/blogs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-orange-600 transition-colors flex items-center justify-center"
                >
                  E-commerce Tips
                  <svg
                    className="w-3 h-3 ml-1"
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
                </a>
                <span className="hidden sm:inline text-gray-400">•</span>
                <a
                  href="https://surf.mt/blogs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-orange-600 transition-colors flex items-center justify-center"
                >
                  Latest Updates
                  <svg
                    className="w-3 h-3 ml-1"
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
                </a>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join Malta's most innovative e-commerce platform and become part
              of the success stories we write about.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <button className="bg-gradient-to-r from-[#9101CF] to-[#5D0196] text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-[#8001BF] hover:to-[#4D0186] transition-all duration-300 shadow-xl">
                  Start Selling Today
                </button>
              </Link>
              <Link href="/about">
                <button className="bg-white text-blue-600 border-2 border-blue-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300">
                  Learn More About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
