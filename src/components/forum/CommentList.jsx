import { useState, useEffect } from "react";
import { FaPaperPlane, FaComments } from "react-icons/fa";
import {
  getCommentsByPostId,
  createComment,
} from "../../services/commentService";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";
import CommentItem from "./CommentItem";

function CommentList({ postId, onCommentChange }) {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Load comments for the post
   */
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

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

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
    <div className="space-y-6 mt-8 pt-8 border-t border-slate-700/50">
      <div className="flex items-center gap-3 mb-4">
        <FaComments className="text-slate-300 text-xl" />
        <h3 className="text-white font-semibold text-lg">Comments</h3>
        {comments.length > 0 && (
          <span className="ml-2 px-2 py-0.5 bg-slate-800 text-slate-200 text-sm rounded-full border border-slate-700">
            {comments.length}
          </span>
        )}
      </div>

      {/* New Comment Input with enhanced design */}
      <form onSubmit={handleCommentSubmit} className="flex gap-4 items-start">
        <div className="shrink-0">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold cursor-default">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
        <div className="flex-1 flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !newCommentContent.trim()}
            className="px-4 py-3 bg-blue-600 text-white rounded-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer hover:bg-blue-700 transition"
          >
            {isSubmitting ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span> : <FaPaperPlane />}
          </button>
        </div>
      </form>

      {/* Comments List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-slate-700 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-300 text-sm font-medium">Loading comments...</p>
          </div>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-10 bg-slate-900 rounded-md border border-slate-700">
          <FaComments className="text-slate-500 text-4xl mx-auto mb-3" />
          <p className="text-slate-300 text-base font-semibold mb-1">No comments yet</p>
          <p className="text-slate-400 text-sm">Be the first to comment!</p>
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
