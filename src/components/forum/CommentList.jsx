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

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const response = await getCommentsByPostId(postId);
      setComments(response.result || []);
      if (onCommentChange) onCommentChange();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newCommentContent.trim()) return showError("Please enter a comment");

    setIsSubmitting(true);
    try {
      const response = await createComment({
        postId,
        content: newCommentContent.trim(),
        parentId: null,
      });
      if (response.code === 1000 || response.result) {
        setNewCommentContent("");
        showSuccess("Comment added");
        await loadComments();
      }
    } catch (error) {
      showError(error.response?.data?.message || "Failed to comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-2">
        <h3 className="text-slate-200 font-bold text-sm uppercase tracking-wider">
          Discussion
        </h3>
        <div className="h-px flex-1 bg-slate-800"></div>
      </div>

      <form
        onSubmit={handleCommentSubmit}
        className="relative flex gap-4 items-start group"
      >
        <div className="shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold text-sm">
          {user?.email?.charAt(0).toUpperCase() || "ME"}
        </div>
        <div className="flex-1 relative">
          <textarea
            placeholder="Add to the discussion..."
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            rows="1"
            style={{ minHeight: "44px" }}
            className="w-full px-4 py-2.5 bg-slate-900 text-slate-200 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500 text-sm resize-none overflow-hidden transition-all"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !newCommentContent.trim()}
            className="absolute right-2 bottom-1.5 p-1.5 text-blue-500 hover:bg-blue-500/10 rounded-lg disabled:opacity-0 transition-all"
          >
            {isSubmitting ? (
              <span className="block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <FaPaperPlane />
            )}
          </button>
        </div>
      </form>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 opacity-60">
          <p className="text-slate-500 text-sm">
            No comments yet. Start the conversation!
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              onReplyCreated={() => {
                loadComments();
                if (onCommentChange) onCommentChange();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentList;
