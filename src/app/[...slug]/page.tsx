"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ContentHeading {
  id: string;
  title: string;
  order: number;
  content: string;
  isVisible: boolean;
  type: "text" | "hero" | "feature" | "pricing" | "testimonial" | "faq";
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  price?: string;
  features?: string[];
}

interface PageContent {
  headings: ContentHeading[];
}

interface NavItemContent {
  [navItemId: string]: PageContent;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  description: string;
  order: number;
}

export default function DynamicPage() {
  const params = useParams();
  const [pageContent, setPageContent] = useState<ContentHeading[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageExists, setPageExists] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  // Construct the current path from params
  const currentPath = Array.isArray(params.slug)
    ? `/${params.slug.join("/")}`
    : `/${params.slug}`;

  useEffect(() => {
    if (!realtimeDb) {
      setLoading(false);
      return;
    }

    try {
      // Fetch navigation items to check if this route exists
      const navItemsRef = ref(realtimeDb, "navigation_items");
      const navUnsubscribe = onValue(navItemsRef, (snapshot) => {
        if (snapshot.exists()) {
          const navData = snapshot.val();
          const navItems: NavigationItem[] = Object.keys(navData)
            .map((key) => ({
              id: key,
              ...navData[key],
            }))
            .sort((a, b) => a.order - b.order);

          // Check if current path matches any navigation item
          const currentPage = navItems.find(
            (item) => item.href === currentPath
          );

          if (currentPage) {
            setPageExists(true);
            setPageTitle(currentPage.label);

            // Fetch content for this specific page
            const contentRef = ref(realtimeDb, "nav_items_content");
            const contentUnsubscribe = onValue(
              contentRef,
              (contentSnapshot) => {
                if (contentSnapshot.exists()) {
                  const contentData: NavItemContent = contentSnapshot.val();
                  const pageContentData = contentData[currentPage.id];

                  if (pageContentData && pageContentData.headings) {
                    const visibleContent = pageContentData.headings
                      .filter((heading) => heading.isVisible)
                      .sort((a, b) => a.order - b.order);
                    setPageContent(visibleContent);
                  }
                }
                setLoading(false);
              }
            );

            return () => contentUnsubscribe();
          } else {
            // Page doesn't exist in Firebase navigation
            setPageExists(false);
            setLoading(false);
          }
        } else {
          setPageExists(false);
          setLoading(false);
        }
      });

      return () => navUnsubscribe();
    } catch (error) {
      console.error("Error fetching page content:", error);
      setPageExists(false);
      setLoading(false);
    }
  }, [currentPath]);

  // Show 404 if page doesn't exist and we're done loading
  if (!loading && !pageExists) {
    notFound();
  }

  const renderContentSection = (content: ContentHeading) => {
    switch (content.type) {
      case "hero":
        return (
          <section
            key={content.id}
            className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50"
          >
            <Container>
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  {content.title}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 mb-8">
                  {content.content}
                </p>
                {content.buttonText && (
                  <Link href={content.buttonLink || "#"}>
                    <Button size="lg" className="px-8 py-4 text-lg">
                      {content.buttonText}
                    </Button>
                  </Link>
                )}
              </div>
              {content.imageUrl && (
                <div className="mt-12 text-center">
                  <img
                    src={content.imageUrl}
                    alt={content.title}
                    className="mx-auto rounded-lg shadow-lg max-w-4xl w-full"
                  />
                </div>
              )}
            </Container>
          </section>
        );

      case "feature":
        return (
          <section key={content.id} className="py-20 bg-white">
            <Container>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    {content.title}
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    {content.content}
                  </p>
                  {content.features && content.features.length > 0 && (
                    <ul className="space-y-3 mb-8">
                      {content.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            className="w-5 h-5 text-green-500 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  {content.buttonText && (
                    <Link href={content.buttonLink || "#"}>
                      <Button size="lg">{content.buttonText}</Button>
                    </Link>
                  )}
                </div>
                {content.imageUrl && (
                  <div>
                    <img
                      src={content.imageUrl}
                      alt={content.title}
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>
                )}
              </div>
            </Container>
          </section>
        );

      case "pricing":
        return (
          <section key={content.id} className="py-20 bg-gray-50">
            <Container>
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {content.title}
                </h2>
                <p className="text-xl text-gray-600">{content.content}</p>
              </div>
              <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
                {content.price && (
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    {content.price}
                  </div>
                )}
                {content.features && content.features.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {content.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-center"
                      >
                        <svg
                          className="w-5 h-5 text-green-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                {content.buttonText && (
                  <Link href={content.buttonLink || "#"}>
                    <Button size="lg" className="w-full">
                      {content.buttonText}
                    </Button>
                  </Link>
                )}
              </div>
            </Container>
          </section>
        );

      case "testimonial":
        return (
          <section key={content.id} className="py-20 bg-blue-50">
            <Container>
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {content.title}
                </h2>
                <blockquote className="text-xl lg:text-2xl text-gray-600 italic mb-8">
                  "{content.content}"
                </blockquote>
                {content.imageUrl && (
                  <img
                    src={content.imageUrl}
                    alt="Testimonial"
                    className="w-16 h-16 rounded-full mx-auto"
                  />
                )}
              </div>
            </Container>
          </section>
        );

      case "faq":
        return (
          <section key={content.id} className="py-20 bg-white">
            <Container>
              <div className="max-w-3xl mx-auto">
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {content.title}
                  </h3>
                  <p className="text-gray-600">{content.content}</p>
                </div>
              </div>
            </Container>
          </section>
        );

      case "text":
      default:
        return (
          <section key={content.id} className="py-20 bg-white">
            <Container>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {content.title}
                </h2>
                <div className="text-xl text-gray-600 leading-relaxed">
                  {content.content.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-20">
        <Container>
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded mb-6 max-w-2xl mx-auto"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 rounded max-w-4xl mx-auto"></div>
              <div className="h-6 bg-gray-300 rounded max-w-3xl mx-auto"></div>
              <div className="h-6 bg-gray-300 rounded max-w-2xl mx-auto"></div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // If no content but page exists, show default content
  if (pageContent.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {pageTitle}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              This page is under construction. Content will be available soon!
            </p>
            <Link href="/">
              <Button size="lg">Go Back Home</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen">{pageContent.map(renderContentSection)}</div>
  );
}
