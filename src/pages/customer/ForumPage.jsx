import { useState, useEffect } from "react";
import CreatePost from "../../components/forum/CreatePost";
import PostList from "../../components/forum/PostList";
import Header from "../../components/layout/Header";
import { useAuthStore } from "../../store/authStore";

function ForumPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { isAuthenticated, user, token, checkAuth } = useAuthStore();

  useEffect(() => {
    // Check authentication when component mounts
    checkAuth();
  }, [checkAuth]);

  const handlePostCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Debug: Log auth state
  useEffect(() => {
    console.log("Forum Auth State:", {
      isAuthenticated,
      user,
      hasToken: !!token,
    });
  }, [isAuthenticated, user, token]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20">
        <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {isAuthenticated ? (
            <>
              {/* Debug info - can be removed in production */}
              {import.meta.env.DEV && (
                <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-3 text-sm text-blue-200">
                  <strong>Debug:</strong> Logged in as{" "}
                  {user?.email || "Unknown"} | Token: {token ? "✓" : "✗"}
                </div>
              )}

              <CreatePost onPostCreated={handlePostCreated} />
              <PostList refreshTrigger={refreshTrigger} />
            </>
          ) : (
            <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-12 text-center">
              <div className="mb-4">
                <svg
                  className="mx-auto h-16 w-16 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Authentication Required
              </h2>
              <p className="text-slate-300 text-lg mb-6">
                Please login to view and create posts
              </p>
              <a
                href="/auth"
                className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Login Now
              </a>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default ForumPage;
