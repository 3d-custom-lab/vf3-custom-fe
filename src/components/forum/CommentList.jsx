import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

function CommentList({ postId }) {
  const [newCommentContent, setNewCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Note: Comment API is not available yet
  // This is a placeholder UI for future implementation

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newCommentContent.trim()) {
      alert("Please enter a comment");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement comment API when available
      // await createComment(postId, { content: newCommentContent.trim() });
      
      alert("Comment feature is coming soon!");
      setNewCommentContent("");
    } catch (error) {
      console.error("Error creating comment:", error);
      alert("Failed to create comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <form onSubmit={handleCommentSubmit} className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            className="flex-1 px-4 py-2 bg-slate-700 text-white text-sm rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-slate-400"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !newCommentContent.trim()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <FaPaperPlane />
            )}
          </button>
        </div>
      </form>

      <div className="text-center py-8">
        <p className="text-slate-400 text-sm">
          💬 Comment feature is coming soon!
        </p>
      </div>
    </div>
  );
}

export default CommentList;
