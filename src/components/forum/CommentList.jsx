import { useState, useEffect } from "react";
import { FaPaperPlane, FaComments } from "react-icons/fa";
import {
  getCommentsByPostId,
  createComment,
} from "../../services/commentService";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../hooks/useToast";
import CommentItem from "./CommentItem";

function CommentList({ postId, onCommentChange }) {
  const { user } = useAuthStore();
  const { showSuccess, showError } = useToast();
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const response = await getCommentsByPostId(postId);
      const commentsData = response.result || [];
      setComments(commentsData);

      if (onCommentChange) {
        onCommentChange();
      }
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newCommentContent.trim()) {
      showError("Please enter a comment");
      return;
    }

    setIsSubmitting(true);

    try {
      const commentData = {
        postId: postId,
        content: newCommentContent.trim(),
        parentId: null,
      };

      const response = await createComment(commentData);

      if (response.code === 1000 || response.result) {
        setNewCommentContent("");
        showSuccess("Comment added successfully!");

        await loadComments();
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create comment. Please try again.";
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplyCreated = () => {
    loadComments();

    if (onCommentChange) {
      onCommentChange();
    }
  };

  return (
    <div className="space-y-6 mt-8 pt-8 border-t-2 border-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30">
      {/* Header with gradient text */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-50"></div>
          <FaComments className="relative text-blue-400 text-2xl" />
        </div>
        <h3 className="text-white font-bold text-xl">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Comments
          </span>
          {comments.length > 0 && (
            <span className="ml-2 px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-slate-300 text-sm rounded-full border border-blue-400/30 font-semibold">
              {comments.length}
            </span>
          )}
        </h3>
      </div>

      {/* New Comment Input with enhanced design */}
      <form onSubmit={handleCommentSubmit} className="flex gap-4 items-start">
        <div className="shrink-0 relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-base shadow-xl border-2 border-slate-600">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
        <div className="flex-1 flex gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm"></div>
            <input
              type="text"
              placeholder="Write a comment..."
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              className="relative w-full px-5 py-4 bg-slate-700/80 backdrop-blur-sm text-white text-sm rounded-2xl border-2 border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder-slate-400 shadow-lg hover:shadow-xl"
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !newCommentContent.trim()}
            className="relative px-6 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:transform-none shadow-xl hover:shadow-2xl group overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            {isSubmitting ? (
              <span className="relative w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
            ) : (
              <FaPaperPlane className="relative" />
            )}
          </button>
        </div>
      </form>

      {/* Comments List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
              <div className="relative w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-300 text-base font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Loading comments...
            </p>
          </div>
        </div>
      ) : comments.length === 0 ? (
        <div className="relative overflow-hidden text-center py-16 bg-gradient-to-br from-slate-800/50 via-slate-750/50 to-slate-800/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-slate-600 rounded-full blur-xl opacity-50"></div>
              <FaComments className="relative text-slate-500 text-5xl mx-auto mb-4" />
            </div>
            <p className="text-slate-300 text-base font-semibold mb-2">
              No comments yet
            </p>
            <p className="text-slate-400 text-sm">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
                Be the first to comment!
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              onReplyCreated={handleReplyCreated}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentList;
