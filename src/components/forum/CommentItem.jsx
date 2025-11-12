import { useState } from "react";
import { FaReply, FaPaperPlane, FaTimes } from "react-icons/fa";
import {
  createComment,
  getRepliesByParentId,
} from "../../services/commentService";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../hooks/useToast";

function CommentItem({ comment, postId, onReplyCreated }) {
  const { user } = useAuthStore();
  const { showSuccess, showError } = useToast();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);

  const authorName =
    comment.author?.name || comment.author?.email || "Unknown User";
  const authorAvatar = comment.author?.avatar;
  const replyCount = comment.replies?.length || 0;

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    if (!replyContent.trim()) {
      showError("Please enter a reply");
      return;
    }

    setIsSubmittingReply(true);

    try {
      const replyData = {
        postId: postId,
        content: replyContent.trim(),
        parentId: comment.id,
      };

      const response = await createComment(replyData);

      if (response.code === 1000 || response.result) {
        setReplyContent("");
        setShowReplyInput(false);
        showSuccess("Reply added successfully!");

        await loadReplies();

        if (onReplyCreated) {
          onReplyCreated();
        }
      }
    } catch (error) {
      console.error("Error creating reply:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to add reply. Please try again.";
      showError(errorMessage);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const loadReplies = async () => {
    if (replyCount === 0) return;

    setIsLoadingReplies(true);
    try {
      const response = await getRepliesByParentId(comment.id);
      const repliesData = response.result || [];
      setReplies(repliesData);
      setShowReplies(true);
    } catch (error) {
      console.error("Error loading replies:", error);
      showError("Failed to load replies");
    } finally {
      setIsLoadingReplies(false);
    }
  };

  const toggleReplies = () => {
    if (!showReplies && replies.length === 0) {
      loadReplies();
    } else {
      setShowReplies(!showReplies);
    }
  };

  return (
    <div className="group animate-fadeIn">
      {/* Main Comment */}
      <div className="flex gap-4">
        {/* Avatar with glow effect */}
        <div className="shrink-0 relative">
          {authorAvatar ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <img
                src={authorAvatar}
                alt={authorName}
                className="relative w-10 h-10 rounded-full object-cover border-2 border-slate-600 shadow-lg"
              />
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold border-2 border-slate-600 shadow-lg">
                {authorName?.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-gradient-to-br from-slate-700 via-slate-750 to-slate-800 rounded-2xl px-5 py-3.5 inline-block max-w-full shadow-lg border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 hover:shadow-xl">
            <p className="font-bold text-white text-sm bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {authorName}
            </p>
            <p className="text-slate-100 text-sm mt-1 leading-relaxed wrap-break-word">
              {comment.content}
            </p>
          </div>

          {/* Actions with better styling */}
          <div className="flex items-center gap-5 mt-2 ml-3">
            <span className="text-xs text-slate-400 font-medium">
              {formatDate(comment.createdAt)}
            </span>
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="text-xs text-slate-300 hover:text-blue-400 font-bold transition-all duration-200 hover:scale-105 relative group/btn"
            >
              <span className="relative z-10">Reply</span>
              <span className="absolute inset-0 bg-blue-500/10 rounded-md blur-sm opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
            </button>
            {replyCount > 0 && (
              <button
                onClick={toggleReplies}
                disabled={isLoadingReplies}
                className="text-xs font-bold transition-all duration-200 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-400/30 hover:border-blue-400/50 hover:scale-105"
              >
                {isLoadingReplies ? (
                  <span className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <FaReply className="text-[10px] text-blue-400" />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {showReplies ? "Hide" : "View"} {replyCount}{" "}
                      {replyCount === 1 ? "reply" : "replies"}
                    </span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Reply Input with improved design */}
          {showReplyInput && (
            <form
              onSubmit={handleReplySubmit}
              className="mt-4 flex gap-2 animate-slideDown"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={`Reply to ${authorName}...`}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-800/80 backdrop-blur-sm text-white text-sm rounded-xl border-2 border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder-slate-400 shadow-inner"
                  disabled={isSubmittingReply}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={isSubmittingReply || !replyContent.trim()}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-md active:scale-95"
              >
                {isSubmittingReply ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                ) : (
                  <FaPaperPlane className="text-sm" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowReplyInput(false);
                  setReplyContent("");
                }}
                className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-md active:scale-95"
              >
                <FaTimes className="text-sm" />
              </button>
            </form>
          )}

          {/* Replies with enhanced visual */}
          {showReplies && replies.length > 0 && (
            <div className="mt-4 space-y-4 pl-4 border-l-2 border-gradient-to-b from-blue-500/50 to-purple-500/50 animate-slideDown">
              {replies.map((reply) => (
                <div key={reply.id} className="flex gap-3 animate-fadeIn">
                  {/* Reply Avatar */}
                  <div className="shrink-0 relative">
                    {reply.author?.avatar ? (
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm opacity-40"></div>
                        <img
                          src={reply.author.avatar}
                          alt={reply.author.name}
                          className="relative w-8 h-8 rounded-full object-cover border-2 border-slate-600 shadow-md"
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm opacity-40"></div>
                        <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xs font-bold border-2 border-slate-600 shadow-md">
                          {reply.author?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Reply Content */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-gradient-to-br from-slate-700/80 via-slate-750/80 to-slate-800/80 backdrop-blur-sm rounded-xl px-4 py-2.5 inline-block max-w-full shadow-md border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300">
                      <p className="font-semibold text-white text-xs bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {reply.author?.name ||
                          reply.author?.email ||
                          "Unknown User"}
                      </p>
                      <p className="text-slate-200 text-xs mt-1 leading-relaxed wrap-break-word">
                        {reply.content}
                      </p>
                    </div>
                    <div className="ml-3 mt-1.5">
                      <span className="text-[11px] text-slate-400 font-medium">
                        {formatDate(reply.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
