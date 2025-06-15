import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function DynamicNotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Container>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-gray-200">404</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist in our navigation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="px-8">
                  Go Home
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg" className="px-8">
                  Start Selling
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
