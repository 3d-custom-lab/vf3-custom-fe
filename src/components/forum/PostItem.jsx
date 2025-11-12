import { useState, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaUpload,
} from "react-icons/fa";
import CommentList from "./CommentList";
import {
  updatePost,
  deletePost,
  likePost,
  uploadPostImage,
} from "../../services/postService";
import { getCommentsByPostId } from "../../services/commentService";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../hooks/useToast";
import Toast from "../ui/Toast";

function PostItem({ post, onPostUpdated, onPostDeleted }) {
  const { user } = useAuthStore();
  const { toast, showSuccess, showError, hideToast } = useToast();
  
  const authorEmail = post.author?.email || "";
  const authorName = post.author?.name || authorEmail;
  const postImages = post.images || [];
  const firstImageUrl = postImages.length > 0 ? postImages[0].url : "";
  const likedUserIds = post.likedUserIds || [];
  const currentUserId = user?.id;
  
  const [isLiked, setIsLiked] = useState(likedUserIds.includes(currentUserId));
  const [likeCount, setLikeCount] = useState(likedUserIds.length);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title || "");
  const [editContent, setEditContent] = useState(post.content);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(firstImageUrl);
  const [isUpdating, setIsUpdating] = useState(false);

  const isAuthor = user?.email === authorEmail;

  useEffect(() => {
    setIsLiked(likedUserIds.includes(currentUserId));
    setLikeCount(likedUserIds.length);
  }, [post.likedUserIds, currentUserId]);

  useEffect(() => {
    loadCommentCount();
  }, [post.id]);

  const loadCommentCount = async () => {
    try {
      const response = await getCommentsByPostId(post.id);
      const comments = response.result || [];
      
      let totalCount = comments.length;

      comments.forEach(comment => {
        if (comment.replies && Array.isArray(comment.replies)) {
          totalCount += comment.replies.length;
        }
      });

      setCommentCount(totalCount);
    } catch (error) {
      console.error("Error loading comment count:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await likePost(post.id);

      if (response.code === 1000) {
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);
        setLikeCount((prev) => (newLikedState ? prev + 1 : Math.max(0, prev - 1)));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update like. Please try again.";
      showError(errorMessage);
    }
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
    if (!showComments) {
      loadCommentCount();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(post.title || "");
    setEditContent(post.content);
    setImagePreview(post.imageUrl || "");
    setImageFile(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(post.title || "");
    setEditContent(post.content);
    setImagePreview(post.imageUrl || "");
    setImageFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showError("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showError("Image size should not exceed 5MB");
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      showError("Post title cannot be empty");
      return;
    }

    if (!editContent.trim()) {
      showError("Post content cannot be empty");
      return;
    }

    setIsUpdating(true);

    try {
      const updateData = {
        title: editTitle.trim(),
        content: editContent.trim(),
      };

      const response = await updatePost(post.id, updateData);

      if (response.code === 1000) {
        if (imageFile) {
          const formData = new FormData();
          formData.append("image", imageFile);

          try {
            await uploadPostImage(post.id, formData);
          } catch (imageError) {
            console.error("Error uploading image:", imageError);
          }
        }

        setIsEditing(false);
        setImageFile(null);

        if (onPostUpdated) {
          onPostUpdated();
        }

        showSuccess("Post updated successfully!");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update post. Please try again.";
      showError(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const response = await deletePost(post.id);

      if (response.code === 1000) {
        if (onPostDeleted) {
          onPostDeleted(post.id);
        }
        showSuccess("Post deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to delete post. Please try again.";
      showError(errorMessage);
    }
  };

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

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
          duration={toast.duration}
        />
      )}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 rounded-3xl shadow-2xl border-2 border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group/post animate-fadeIn">
        {/* Glow effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover/post:bg-blue-500/20 transition-all duration-500"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl group-hover/post:bg-purple-500/20 transition-all duration-500"></div>
        
        <div className="relative p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative group/avatar">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-50 group-hover/avatar:opacity-75 transition-opacity"></div>
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-xl border-2 border-slate-600">
                  {authorName?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">
                  {authorName || "Unknown User"}
                </h3>
                <p className="text-slate-400 text-sm font-medium mt-0.5">{formatDate(post.createdAt)}</p>
              </div>
            </div>

            {isAuthor && (
              <div className="flex gap-2">
                <button
                  onClick={handleEdit}
                  className="relative p-3 text-slate-400 hover:text-blue-400 bg-slate-700/50 hover:bg-blue-500/20 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg group/edit overflow-hidden"
                  title="Edit post"
                  disabled={isUpdating}
                >
                  <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover/edit:translate-y-0 transition-transform duration-200"></div>
                  <FaEdit className="relative" />
                </button>
                <button
                  onClick={handleDelete}
                  className="relative p-3 text-slate-400 hover:text-red-400 bg-slate-700/50 hover:bg-red-500/20 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg group/delete overflow-hidden"
                  title="Delete post"
                  disabled={isUpdating}
                >
                  <div className="absolute inset-0 bg-red-500/10 translate-y-full group-hover/delete:translate-y-0 transition-transform duration-200"></div>
                  <FaTrash className="relative" />
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
          <div className="space-y-4 mb-6">
            <div className="relative group/input">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-focus-within/input:opacity-20 blur transition-opacity"></div>
              <input
                type="text"
                placeholder="Post title..."
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="relative w-full px-5 py-3 bg-slate-900/80 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all shadow-lg"
                disabled={isUpdating}
              />
            </div>
            <div className="relative group/textarea">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl opacity-0 group-focus-within/textarea:opacity-20 blur transition-opacity"></div>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows="5"
                className="relative w-full px-5 py-3 bg-slate-900/80 backdrop-blur-sm text-white rounded-xl border-2 border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 outline-none resize-none transition-all shadow-lg leading-relaxed"
                disabled={isUpdating}
              />
            </div>

            <div className="space-y-3">
              <label className="relative flex items-center justify-center gap-3 w-full px-5 py-3 bg-slate-900/50 text-slate-300 rounded-xl border-2 border-dashed border-slate-600 cursor-pointer hover:border-blue-500 hover:text-blue-400 transition-all group/upload overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover/upload:opacity-100 transition-opacity"></div>
                <FaUpload className="relative" />
                <span className="relative font-bold">
                  {imageFile ? "Change Image" : "Upload New Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isUpdating}
                />
              </label>

              {imagePreview && (
                <div className="relative rounded-xl overflow-hidden border-2 border-slate-700 shadow-xl group/preview">
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/preview:opacity-100 transition-opacity"></div>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-72 object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-3 right-3 p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all hover:scale-110 active:scale-95 shadow-lg"
                    disabled={isUpdating}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSaveEdit}
                disabled={isUpdating || !editTitle.trim() || !editContent.trim()}
                className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg overflow-hidden group/save"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover/save:translate-x-0 transition-transform duration-300"></div>
                {isUpdating ? (
                  <>
                    <span className="relative w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span className="relative">Saving...</span>
                  </>
                ) : (
                  <>
                    <FaSave className="relative" />
                    <span className="relative">Save</span>
                  </>
                )}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isUpdating}
                className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white font-bold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              >
                <FaTimes />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {post.title && (
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
                {post.title}
              </h2>
            )}
            <p className="text-slate-200 text-base mb-6 whitespace-pre-wrap wrap-break-word leading-relaxed">
              {post.content}
            </p>

            {firstImageUrl && (
              <div className="mb-6 rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-xl group/image">
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity"></div>
                  <img
                    src={firstImageUrl}
                    alt="Post"
                    className="w-full max-h-[500px] object-cover transform group-hover/image:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* Action buttons with enhanced design */}
        <div className="flex items-center gap-3 pt-6 border-t-2 border-slate-700/50">
          <button
            onClick={handleLike}
            disabled={isUpdating}
            className={`cursor-pointer relative flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-lg overflow-hidden group/like ${
              isLiked
                ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-red-500/50"
                : "bg-slate-700/80 hover:bg-slate-700 text-slate-300 hover:text-white"
            }`}
          >
            <div className="absolute inset-0 bg-white/10 translate-x-full group-hover/like:translate-x-0 transition-transform duration-300"></div>
            {isLiked ? <FaHeart className="relative text-lg animate-pulse" /> : <FaRegHeart className="relative text-lg" />}
            <span className="relative text-base">{likeCount}</span>
          </button>

          <button
            onClick={handleToggleComments}
            className="cursor-pointer relative flex items-center gap-3 px-6 py-3 bg-slate-700/80 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 text-slate-300 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-bold shadow-lg overflow-hidden group/comment"
          >
            <FaComment className="relative text-lg" />
            <span className="relative text-base">
              {showComments ? "Hide Comments" : "Comments"}
            </span>
            {commentCount > 0 && (
              <span className="relative px-2.5 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-lg">
                {commentCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {showComments && (
        <div className="relative px-8 pb-8 bg-gradient-to-b from-slate-850 to-slate-900 rounded-b-3xl border-x-2 border-b-2 border-slate-700/50 -mt-6 pt-4 animate-slideDown">
          <CommentList postId={post.id} onCommentChange={loadCommentCount} />
        </div>
      )}
    </div>
    </>
  );
}

export default PostItem;