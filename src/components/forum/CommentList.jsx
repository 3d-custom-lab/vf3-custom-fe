import { useState, useEffect } from "react";
import { FaPaperPlane, FaComments } from "react-icons/fa";
import { getCommentsByPostId, createComment } from "../../services/commentService";
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
      
      // Notify parent about comment count change
      if (onCommentChange) {
        onCommentChange();
      }
    } catch (error) {
      console.error("Error loading comments:", error);
      // Don't show error toast on initial load, just show empty state
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
        parentId: null, // Top-level comment, no parent
      };

      const response = await createComment(commentData);

      if (response.code === 1000 || response.result) {
        setNewCommentContent("");
        showSuccess("Comment added successfully!");
        
        // Reload comments to get the new one
        await loadComments();
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create comment. Please try again.";
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplyCreated = () => {
    // Reload comments when a reply is created
    loadComments();
    
    // Notify parent about comment count change
    if (onCommentChange) {
      onCommentChange();
    }
  };

  return (
    <div className="space-y-4 mt-6 pt-6 border-t border-slate-700">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FaComments className="text-blue-400 text-xl" />
        <h3 className="text-white font-semibold text-lg">
          Comments {comments.length > 0 && <span className="text-slate-400 text-sm ml-1">({comments.length})</span>}
        </h3>
      </div>

      {/* New Comment Input */}
      <form onSubmit={handleCommentSubmit} className="flex gap-3 items-start">
        <div className="shrink-0">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-700 text-white text-sm rounded-full border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 outline-none transition-all placeholder-slate-400"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !newCommentContent.trim()}
            className="px-5 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-medium rounded-full transition-all transform hover:scale-105 active:scale-95 disabled:transform-none shadow-lg"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
            ) : (
              <FaPaperPlane />
            )}
          </button>
        </div>
      </form>

      {/* Comments List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm">Loading comments...</p>
          </div>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700 border-dashed">
          <FaComments className="text-slate-600 text-4xl mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No comments yet</p>
          <p className="text-slate-500 text-xs mt-1">Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-4">
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
