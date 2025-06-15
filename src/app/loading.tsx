export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center pt-20 lg:pt-24">
      <div className="text-center">
        {/* Animated loading spinner */}
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-200"></div>
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
        </div>

        {/* Loading text */}
        <div className="animate-pulse">
          <h2 className="text-2xl font-bold gradient-text mb-4">Loading...</h2>
          <p className="text-gray-600">
            Please wait while we prepare your content
          </p>
        </div>

        {/* Loading dots animation */}
        <div className="flex justify-center mt-8 space-x-2">
          <div
            className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
