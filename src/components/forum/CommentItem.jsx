import { useState } from "react";
import { FaReply, FaPaperPlane, FaTimes } from "react-icons/fa";
import { createComment, getRepliesByParentId } from "../../services/commentService";
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

  const authorName = comment.author?.name || comment.author?.email || "Unknown User";
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

        // Reload replies
        await loadReplies();

        if (onReplyCreated) {
          onReplyCreated();
        }
      }
    } catch (error) {
      console.error("Error creating reply:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to add reply. Please try again.";
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
    <div className="group">
      {/* Main Comment */}
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="shrink-0">
          {authorAvatar ? (
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-8 h-8 rounded-full object-cover border-2 border-slate-600"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold border-2 border-slate-600">
              {authorName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-slate-700 rounded-2xl px-4 py-2.5 inline-block max-w-full">
            <p className="font-semibold text-white text-sm">{authorName}</p>
            <p className="text-slate-200 text-sm mt-0.5 wrap-break-word">{comment.content}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-1.5 ml-2">
            <span className="text-xs text-slate-400">{formatDate(comment.createdAt)}</span>
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="text-xs text-slate-400 hover:text-blue-400 font-semibold transition-colors"
            >
              Reply
            </button>
            {replyCount > 0 && (
              <button
                onClick={toggleReplies}
                disabled={isLoadingReplies}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center gap-1"
              >
                {isLoadingReplies ? (
                  <span className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <FaReply className="text-[10px]" />
                    <span>
                      {showReplies ? "Hide" : "View"} {replyCount} {replyCount === 1 ? "reply" : "replies"}
                    </span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Reply Input */}
          {showReplyInput && (
            <form onSubmit={handleReplySubmit} className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder={`Reply to ${authorName}...`}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-800 text-white text-sm rounded-full border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-slate-400"
                disabled={isSubmittingReply}
                autoFocus
              />
              <button
                type="submit"
                disabled={isSubmittingReply || !replyContent.trim()}
                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-full transition-all"
              >
                {isSubmittingReply ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                ) : (
                  <FaPaperPlane className="text-xs" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowReplyInput(false);
                  setReplyContent("");
                }}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-full transition-all"
              >
                <FaTimes className="text-xs" />
              </button>
            </form>
          )}

          {/* Replies */}
          {showReplies && replies.length > 0 && (
            <div className="mt-3 space-y-3 pl-2 border-l-2 border-slate-600">
              {replies.map((reply) => (
                <div key={reply.id} className="flex gap-2">
                  {/* Reply Avatar */}
                  <div className="shrink-0">
                    {reply.author?.avatar ? (
                      <img
                        src={reply.author.avatar}
                        alt={reply.author.name}
                        className="w-7 h-7 rounded-full object-cover border-2 border-slate-600"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold border-2 border-slate-600">
                        {reply.author?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </div>

                  {/* Reply Content */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-slate-700 rounded-2xl px-3 py-2 inline-block max-w-full">
                      <p className="font-semibold text-white text-xs">
                        {reply.author?.name || reply.author?.email || "Unknown User"}
                      </p>
                      <p className="text-slate-200 text-xs mt-0.5 wrap-break-word">{reply.content}</p>
                    </div>
                    <div className="ml-2 mt-1">
                      <span className="text-[11px] text-slate-400">{formatDate(reply.createdAt)}</span>
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
