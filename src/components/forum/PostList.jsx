import { AlertCircle, RefreshCw, Ghost } from "lucide-react";
import PostItem from "./PostItem";

function PostList({
  posts = [],
  loading = false,
  error = null,
  onRetry,
  onPostUpdated,
  onPostDeleted,
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-slate-400 font-medium animate-pulse">
          Đang tải nội dung...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-8 text-center backdrop-blur-sm">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4 opacity-80" />
        <h3 className="text-lg font-semibold text-red-200 mb-2">
          Ôi! Có lỗi xảy ra
        </h3>
        <p className="text-red-300/80 mb-6 max-w-md mx-auto">{error}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-colors shadow-lg shadow-red-600/20 font-medium cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" /> Thử lại
        </button>
      </div>
    );
  }

  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="rounded-3xl bg-slate-900/50 border border-slate-700/50 p-16 text-center backdrop-blur-md">
        <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto flex items-center justify-center mb-6 shadow-inner ring-1 ring-slate-700">
          <Ghost className="w-12 h-12 text-slate-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-200 mb-2">
          Chưa có bài viết nào...
        </h3>
        <p className="text-slate-400 max-w-sm mx-auto">
          Không tìm thấy bài viết. Hãy là người đầu tiên bắt đầu cuộc trò chuyện!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onPostUpdated={onPostUpdated}
          onPostDeleted={onPostDeleted}
        />
      ))}
    </div>
  );
}

export default PostList;
