import { useState, useEffect } from "react";
import { FaReply, FaTimes, FaPaperPlane } from "react-icons/fa";
import { supabase } from "../lib/supabase";

function CommentItem({ comment, postId, onCommentAdded }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyUsername, setReplyUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replies, setReplies] = useState([]);
  const [loadingReplies, setLoadingReplies] = useState(false);

  useEffect(() => {
    loadReplies();
  }, [comment.id]);

  const loadReplies = async () => {
    setLoadingReplies(true);
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("parent_id", comment.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setReplies(data || []);
    } catch (error) {
      console.error("Error loading replies:", error);
    } finally {
      setLoadingReplies(false);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    if (!replyContent.trim() || !replyUsername.trim()) {
      alert("Please enter both username and reply content");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("comments")
        .insert([
          {
            post_id: postId,
            parent_id: comment.id,
            content: replyContent.trim(),
            username: replyUsername.trim(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setReplyContent("");
      setReplyUsername("");
      setShowReplyForm(false);

      setReplies([...replies, data]);

      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      console.error("Error creating reply:", error);
      alert("Failed to create reply. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
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

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
            {comment.username.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-white text-sm">
                {comment.username}
              </span>
              <span className="text-slate-400 text-xs">
                {formatDate(comment.created_at)}
              </span>
            </div>
            <p className="text-slate-200 text-sm break-words">
              {comment.content}
            </p>
          </div>

          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium mt-2 transition-colors"
          >
            <FaReply className="text-xs" />
            <span>Reply</span>
          </button>

          {showReplyForm && (
            <form onSubmit={handleReplySubmit} className="mt-3 space-y-2">
              <input
                type="text"
                placeholder="Your name..."
                value={replyUsername}
                onChange={(e) => setReplyUsername(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 text-white text-sm rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                disabled={isSubmitting}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !replyContent.trim() ||
                    !replyUsername.trim()
                  }
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:text-slate-400 text-white rounded-lg transition-all"
                >
                  <FaPaperPlane className="text-sm" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowReplyForm(false)}
                  className="px-3 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-all"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            </form>
          )}

          {replies.length > 0 && (
            <div className="mt-3 ml-4 space-y-3 border-l-2 border-slate-600 pl-3">
              {replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  onCommentAdded={onCommentAdded}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CommentList({ postId, comments, onCommentAdded }) {
  const [newCommentContent, setNewCommentContent] = useState("");
  const [newCommentUsername, setNewCommentUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newCommentContent.trim() || !newCommentUsername.trim()) {
      alert("Please enter both username and comment content");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("comments").insert([
        {
          post_id: postId,
          content: newCommentContent.trim(),
          username: newCommentUsername.trim(),
          parent_id: null,
        },
      ]);

      if (error) throw error;

      setNewCommentContent("");
      setNewCommentUsername("");

      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      alert("Failed to create comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const topLevelComments = comments.filter((c) => !c.parent_id);

  return (
    <div className="space-y-4">
      <form onSubmit={handleCommentSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Your name..."
          value={newCommentUsername}
          onChange={(e) => setNewCommentUsername(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 text-white text-sm rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
          disabled={isSubmitting}
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            className="flex-1 px-4 py-2 bg-slate-700 text-white text-sm rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={
              isSubmitting ||
              !newCommentContent.trim() ||
              !newCommentUsername.trim()
            }
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-all"
          >
            {isSubmitting ? "Posting..." : "Comment"}
          </button>
        </div>
      </form>

      {topLevelComments.length > 0 && (
        <div className="space-y-4 mt-4">
          {topLevelComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              onCommentAdded={onCommentAdded}
            />
          ))}
        </div>
      )}

      {topLevelComments.length === 0 && (
        <p className="text-slate-400 text-sm text-center py-4">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
}

export default CommentList;
