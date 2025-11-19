import PostItem from "./PostItem";

/**
 * Presentational list for posts. The parent (ForumPage) is responsible for
 * fetching posts and providing loading/error state. This component solely
 * renders posts and forwards update/delete callbacks.
 */
function PostList({ posts = [], loading = false, error = null, onRetry, onPostUpdated, onPostDeleted }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative animate-spin text-blue-400 text-6xl mb-4">🔄</div>
          </div>
          <p className="text-slate-300 text-lg font-semibold mt-4 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Loading posts...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-red-900/20 to-slate-900 rounded-3xl shadow-2xl border-2 border-red-700/50 p-16 text-center group">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl"></div>

        <div className="relative">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50"></div>
            <div className="relative text-red-400 text-6xl">⚠️</div>
          </div>
          <p className="text-red-300 text-xl font-bold mb-6">{error}</p>
          <button
            onClick={onRetry}
            className="relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-base rounded-xl transition-all duration-300 shadow-xl"
          >
            <span className="relative">🔄 Retry</span>
          </button>
        </div>
      </div>
    );
  }

  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 rounded-3xl shadow-2xl border-2 border-slate-700/50 p-20 text-center group">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="relative">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center border-4 border-slate-700/50 backdrop-blur-sm">
              <span className="text-6xl">✨</span>
            </div>
          </div>
          <p className="text-slate-300 text-2xl font-bold mb-3">
            <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              No posts yet
            </span>
          </p>
          <p className="text-slate-400 text-base">Be the first to share something amazing! ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post, index) => (
        <div key={post.id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
          <PostItem post={post} onPostUpdated={onPostUpdated} onPostDeleted={onPostDeleted} />
        </div>
      ))}
    </div>
  );
}

export default PostList;
