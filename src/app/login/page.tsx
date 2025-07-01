"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create a form that will be submitted to CS-Cart
      const form = document.createElement("form");
      form.method = "POST";
      form.action =
        "https://surf.mt/vendor.php?dispatch=auth.login_form&return_url=vendor.php";
      form.target = "_self"; // Open in same window

      // Add username field
      const usernameField = document.createElement("input");
      usernameField.type = "hidden";
      usernameField.name = "user_login"; // CS-Cart uses 'user_login' for username
      usernameField.value = formData.username;
      form.appendChild(usernameField);

      // Add password field
      const passwordField = document.createElement("input");
      passwordField.type = "hidden";
      passwordField.name = "password"; // CS-Cart uses 'password' for password
      passwordField.value = formData.password;
      form.appendChild(passwordField);

      // Add security hash if needed (you might need to get this from CS-Cart)
      // const securityHashField = document.createElement('input');
      // securityHashField.type = 'hidden';
      // securityHashField.name = 'security_hash';
      // securityHashField.value = 'your_security_hash_here';
      // form.appendChild(securityHashField);

      // Add dispatch field
      const dispatchField = document.createElement("input");
      dispatchField.type = "hidden";
      dispatchField.name = "dispatch";
      dispatchField.value = "auth.login";
      form.appendChild(dispatchField);

      // Add remember me if checked
      if (formData.rememberMe) {
        const rememberField = document.createElement("input");
        rememberField.type = "hidden";
        rememberField.name = "remember_me";
        rememberField.value = "Y";
        form.appendChild(rememberField);
      }

      // Append form to body and submit
      document.body.appendChild(form);
      form.submit();

      // Clean up
      document.body.removeChild(form);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 lg:pt-24">
      <Container>
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)]">
          <div className="w-full max-w-md">
            <div className="elevated-card p-10 animate-scale-in">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold gradient-text mb-4">
                  Welcome Back
                </h1>
                <p className="text-gray-600">Sign in to your vendor account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="mr-2 rounded"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="btn-primary-enhanced w-full"
                  isLoading={isLoading}
                  disabled={
                    isLoading || !formData.username || !formData.password
                  }
                >
                  {isLoading ? "Signing In..." : "Sign In to Vendor Panel"}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>

              {/* Information about the redirect */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-0.5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-blue-800 font-medium">
                      Vendor Panel Access
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      You will be redirected to the CS-Cart vendor panel to
                      manage your store.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
