import { useState, useEffect, useCallback } from "react";
import CreatePost from "../../components/forum/CreatePost";
import PostList from "../../components/forum/PostList";
import Header from "../../components/layout/Header";
import { useAuth } from "../../contexts/AuthContext";
import { getAllPosts } from "../../services/postService";

function ForumPage() {
  // controls for fetching posts
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // trigger refresh when new post created
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handlePostCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // debounce keyword input to avoid multiple calls while typing
  useEffect(() => {
    const t = setTimeout(() => setDebouncedKeyword(keyword.trim()), 400);
    return () => clearTimeout(t);
  }, [keyword]);

  // central fetch function - only one API call per change
  const fetchPosts = useCallback(async (opts) => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const params = {
        keyword: opts.keyword || "",
        page: Number.isInteger(opts.page) ? opts.page : 0,
        size: opts.size || 20,
      };

      const res = await getAllPosts(params);

      // normalize response
      const postsData = Array.isArray(res?.result?.content)
        ? res.result.content
        : Array.isArray(res?.result)
        ? res.result
        : [];

      setPosts(postsData);
    } catch (err) {
      setPosts([]);
      if (err.response?.data?.message) setError(err.response.data.message);
      else setError("Failed to load posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // fetch when relevant inputs change (debounced keyword, page, size, refresh)
  useEffect(() => {
    if (!isAuthenticated) {
      setPosts([]);
      setLoading(false);
      setError(null);
      return;
    }

    fetchPosts({ keyword: debouncedKeyword, page, size });
  }, [debouncedKeyword, page, size, refreshTrigger, isAuthenticated, fetchPosts]);

  // Handlers for UI controls
  const handleSearchChange = (e) => setKeyword(e.target.value);
  const handlePageChange = (value) => setPage(Math.max(0, value));
  const handleSizeChange = (value) => setSize(Math.max(1, Number(value) || 20));

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Animated background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Grid pattern overlay */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>

        <main className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 space-y-8">
          {isAuthenticated ? (
            <>
              {/* Welcome banner */}
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/80 via-slate-850/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-700/50 shadow-2xl group animate-fadeIn">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all duration-500"></div>
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all duration-500"></div>

                <div className="relative">
                  <h1 className="text-4xl md:text-5xl font-black mb-3">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Welcome to Car Forum!
                    </span>
                  </h1>
                  <p className="text-slate-300 text-lg font-medium">
                    Share your thoughts and connect with the community ✨
                  </p>
                </div>
              </div>

              <CreatePost onPostCreated={handlePostCreated} />

              {/* Controls: search / page / size */}
              <div className="mt-6 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-1/2">
                  <input
                    aria-label="Search posts"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-200"
                    placeholder="Search posts..."
                    value={keyword}
                    onChange={handleSearchChange}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-sm text-slate-300">Page</label>
                  <input
                    type="number"
                    min={0}
                    value={page}
                    onChange={(e) => handlePageChange(Number(e.target.value))}
                    className="w-20 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-200"
                  />

                  <label className="text-sm text-slate-300">Size</label>
                  <input
                    type="number"
                    min={1}
                    value={size}
                    onChange={(e) => handleSizeChange(Number(e.target.value))}
                    className="w-20 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-200"
                  />
                </div>
              </div>

              <PostList
                posts={posts}
                loading={loading}
                error={error}
                onRetry={() => fetchPosts({ keyword: debouncedKeyword, page, size })}
                onPostUpdated={() => fetchPosts({ keyword: debouncedKeyword, page, size })}
                onPostDeleted={(id) => setPosts((prev) => prev.filter((p) => p.id !== id))}
              />
            </>
          ) : (
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 rounded-3xl shadow-2xl border-2 border-slate-700/50 p-16 text-center animate-fadeIn">
              {/* Glow effects */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>

              <div className="relative">
                {/* Lock icon with glow */}
                <div className="mb-8 relative inline-block">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                  <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-slate-700/50 shadow-xl">
                    <svg
                      className="w-12 h-12 text-slate-400"
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
                </div>

                <h2 className="text-3xl md:text-4xl font-black mb-4">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Authentication Required
                  </span>
                </h2>
                <p className="text-slate-300 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                  Join our community to share your thoughts and engage with
                  others
                </p>

                <a
                  href="/auth"
                  className="relative inline-block px-10 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-3xl overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    🚀 Login Now
                  </span>
                </a>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default ForumPage;
