import { useState, useEffect, useCallback } from "react";
import { Sparkles, Rocket, Search, Filter, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import CreatePost from "../../components/forum/CreatePost";
import PostList from "../../components/forum/PostList";
import Header from "../../components/layout/Header";
import { useAuth } from "../../contexts/AuthContext";
import { getAllPosts } from "../../services/postService";
import { useToast } from "../../hooks/useToast";
import Toast from "../../components/ui/Toast";

function ForumPage() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { isAuthenticated, checkAuth } = useAuth();
  const { toast, showSuccess, hideToast } = useToast();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handlePostCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const t = setTimeout(() => setDebouncedKeyword(keyword.trim()), 400);
    return () => clearTimeout(t);
  }, [keyword]);

  const fetchPosts = useCallback(
    async (opts) => {
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
    },
    [isAuthenticated]
  );

  useEffect(() => {
    if (!isAuthenticated) {
      setPosts([]);
      setLoading(false);
      setError(null);
      return;
    }
    fetchPosts({ keyword: debouncedKeyword, page, size });
  }, [
    debouncedKeyword,
    page,
    size,
    refreshTrigger,
    isAuthenticated,
    fetchPosts,
  ]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#030814] relative overflow-x-hidden font-sans text-slate-200 selection:bg-blue-500/30">
        {/* Ambient Background Lights */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[80px] animate-pulse delay-2000"></div>

          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <main className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20 space-y-10">
          {isAuthenticated ? (
            <>
              {/* Hero Section */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-violet-600/20 backdrop-blur-md border border-white/10 p-8 sm:p-10 shadow-2xl ring-1 ring-white/5">
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2 drop-shadow-lg">
                      Community Forum
                    </h1>
                    <p className="text-blue-200/80 text-lg font-medium flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      Join the conversation, share your world.
                    </p>
                  </div>
                </div>
              </div>

              {/* Create Post Section */}
              <CreatePost onPostCreated={handlePostCreated} />

              {/* Search & Filter Bar - Sticky */}
              <div className="sticky top-20 z-40 -mx-2 px-2 py-4">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-lg p-3 flex flex-col sm:flex-row gap-3 items-center justify-between transition-all hover:border-slate-600/50">
                  <div className="relative w-full sm:flex-1 group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl leading-5 text-slate-200 placeholder-slate-500 focus:outline-none focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 sm:text-sm transition-all shadow-inner"
                      placeholder="Search discussions..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* Size Selector */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors group/size">
                      <Filter className="w-4 h-4 text-slate-400 group-hover/size:text-blue-400 transition-colors" />
                      <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                        Size
                      </span>
                      <select
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        className="bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer [&>option]:bg-slate-900 [&>option]:text-slate-200"
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                    </div>

                    {/* Page Selector */}
                    <div className="flex items-center gap-1 px-2 py-1.5 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                      <button
                        onClick={() => setPage(Math.max(0, page - 1))}
                        disabled={page === 0}
                        className="p-1 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 px-1 border-x border-slate-700/50 mx-1">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider hidden sm:inline-block">Page</span>
                        <input
                          type="number"
                          min={1}
                          value={page + 1}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val) && val > 0) setPage(val - 1);
                          }}
                          className="w-8 bg-transparent text-center text-sm font-bold text-white focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </div>

                      <button
                        onClick={() => setPage(page + 1)}
                        className="p-1 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <PostList
                posts={posts}
                loading={loading}
                error={error}
                onRetry={() =>
                  fetchPosts({ keyword: debouncedKeyword, page, size })
                }
                onPostUpdated={() =>
                  fetchPosts({ keyword: debouncedKeyword, page, size })
                }
                onPostDeleted={(id) => {
                  setPosts((prev) => prev.filter((p) => p.id !== id));
                  showSuccess("Post deleted successfully!");
                }}
              />
            </>
          ) : (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="relative w-full max-w-lg overflow-hidden bg-slate-900/60 backdrop-blur-2xl rounded-[2rem] border border-slate-700/50 p-12 text-center shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                <div className="mb-8 relative inline-flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                  <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 shadow-xl transform rotate-3">
                    <Rocket className="w-10 h-10 text-blue-400" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
                  Access Restricted
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  Join our vibrant community to read stories, share moments, and
                  connect with like-minded people.
                </p>

                <a
                  href="/auth"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-blue-600/25 w-full"
                >
                  Sign In to Continue
                </a>
              </div>
            </div>
          )}
        </main>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
            duration={toast.duration}
          />
        )}
      </div>
    </>
  );
}

export default ForumPage;
