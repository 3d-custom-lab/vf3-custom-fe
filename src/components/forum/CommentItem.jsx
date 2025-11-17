import { useState } from "react";
import { FaReply, FaPaperPlane, FaTimes } from "react-icons/fa";
import {
  createComment,
  getRepliesByParentId,
} from "../../services/commentService";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";

function CommentItem({ comment, postId, onReplyCreated }) {
  const { user } = useAuth();
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
    <div className="py-2">
      <div className="flex gap-3">
        <div className="shrink-0">
          {authorAvatar ? (
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-10 h-10 rounded-full object-cover border border-slate-700"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold border border-slate-700">
              {authorName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-slate-800 rounded-lg px-4 py-3 inline-block max-w-full border border-slate-700">
            <p className="font-semibold text-white text-sm">{authorName}</p>
            <p className="text-slate-200 text-sm mt-1 leading-relaxed">{comment.content}</p>
          </div>

          <div className="flex items-center gap-4 mt-2 ml-2 text-sm text-slate-400">
            <span>{formatDate(comment.createdAt)}</span>
            <button onClick={() => setShowReplyInput(!showReplyInput)} className="text-slate-300 hover:text-blue-400 cursor-pointer transition">Reply</button>
            {replyCount > 0 && (
              <button onClick={toggleReplies} disabled={isLoadingReplies} className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700 cursor-pointer hover:bg-slate-700 transition">
                {isLoadingReplies ? (
                  <span className="w-3 h-3 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FaReply className="text-xs text-slate-300" />
                    <span>{showReplies ? "Hide" : "View"} {replyCount}</span>
                  </>
                )}
              </button>
            )}
          </div>

          {showReplyInput && (
            <form onSubmit={handleReplySubmit} className="mt-3 flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={`Reply to ${authorName}...`}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 text-white rounded-md border border-slate-700 placeholder-slate-400"
                  disabled={isSubmittingReply}
                  autoFocus
                />
              </div>
              <button type="submit" disabled={isSubmittingReply || !replyContent.trim()} className="px-3 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition">
                {isSubmittingReply ? <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" /> : <FaPaperPlane />}
              </button>
              <button type="button" onClick={() => { setShowReplyInput(false); setReplyContent(""); }} className="px-3 py-2 bg-slate-700 text-slate-200 rounded-md cursor-pointer hover:bg-slate-700 transition">
                <FaTimes />
              </button>
            </form>
          )}

          {showReplies && replies.length > 0 && (
            <div className="mt-3 space-y-3 pl-4 border-l border-slate-700">
              {replies.map((reply) => (
                <div key={reply.id} className="flex gap-3">
                  <div className="shrink-0">
                    {reply.author?.avatar ? (
                      <img src={reply.author.avatar} alt={reply.author.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-semibold border border-slate-700">{reply.author?.name?.charAt(0).toUpperCase() || "U"}</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="bg-slate-800 rounded-md px-3 py-2 border border-slate-700">
                      <p className="font-medium text-white text-xs">{reply.author?.name || reply.author?.email || "Unknown User"}</p>
                      <p className="text-slate-200 text-xs mt-1">{reply.content}</p>
                    </div>
                    <div className="mt-1">
                      <span className="text-xs text-slate-400">{formatDate(reply.createdAt)}</span>
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
