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
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../hooks/useToast";
import Toast from "../ui/Toast";

function PostItem({ post, onPostUpdated, onPostDeleted }) {
  const { user } = useAuthStore();
  const { toast, showSuccess, showError, hideToast } = useToast();
  
  // Parse post data from API response
  const authorEmail = post.author?.email || "";
  const authorName = post.author?.name || authorEmail;
  const postImages = post.images || [];
  const firstImageUrl = postImages.length > 0 ? postImages[0].url : "";
  const likedUserIds = post.likedUserIds || [];
  const currentUserId = user?.id; // Assuming user object has id field
  
  // Check if current user liked this post
  const [isLiked, setIsLiked] = useState(likedUserIds.includes(currentUserId));
  const [likeCount, setLikeCount] = useState(likedUserIds.length);
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(firstImageUrl);
  const [isUpdating, setIsUpdating] = useState(false);

  // Check if current user is the author
  const isAuthor = user?.email === authorEmail;

  useEffect(() => {
    // Update like state when post changes
    setIsLiked(likedUserIds.includes(currentUserId));
    setLikeCount(likedUserIds.length);
  }, [post.likedUserIds, currentUserId]);

  const handleLike = async () => {
    try {
      const response = await likePost(post.id);

      if (response.code === 1000) {
        // Toggle like state
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
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(post.content);
    setImagePreview(post.imageUrl || "");
    setImageFile(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(post.content);
    setImagePreview(post.imageUrl || "");
    setImageFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        showError("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showError("Image size should not exceed 5MB");
        return;
      }

      setImageFile(file);

      // Create preview
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
    if (!editContent.trim()) {
      showError("Post content cannot be empty");
      return;
    }

    setIsUpdating(true);

    try {
      // Update post content
      const updateData = {
        content: editContent.trim(),
      };

      const response = await updatePost(post.id, updateData);

      if (response.code === 1000) {
        // Upload new image if selected
        if (imageFile) {
          const formData = new FormData();
          formData.append("image", imageFile);

          try {
            await uploadPostImage(post.id, formData);
          } catch (imageError) {
            console.error("Error uploading image:", imageError);
            // Continue even if image upload fails
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
      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-all">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                {authorName?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  {authorName || "Unknown User"}
                </h3>
                <p className="text-slate-400 text-sm">{formatDate(post.createdAt)}</p>
              </div>
            </div>

            {isAuthor && (
              <div className="flex gap-2">
                <button
                  onClick={handleEdit}
                  className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded-lg transition-all"
                  title="Edit post"
                  disabled={isUpdating}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-all"
                  title="Delete post"
                  disabled={isUpdating}
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
          <div className="space-y-3 mb-4">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 outline-none resize-none transition-all"
              disabled={isUpdating}
            />

            <div className="space-y-2">
              <label className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-900 text-slate-300 rounded-lg border border-slate-700 border-dashed cursor-pointer hover:border-blue-500 hover:text-blue-400 transition-all">
                <FaUpload />
                <span className="font-medium">
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
                <div className="relative rounded-lg overflow-hidden border border-slate-700">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-64 object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all"
                    disabled={isUpdating}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                disabled={isUpdating || !editContent.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all"
              >
                {isUpdating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FaSave />
                    <span>Save</span>
                  </>
                )}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isUpdating}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white font-medium rounded-lg transition-all"
              >
                <FaTimes />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-slate-200 mb-4 whitespace-pre-wrap wrap-break-word leading-relaxed">
              {post.content}
            </p>

            {firstImageUrl && (
              <div className="mb-4 rounded-lg overflow-hidden border border-slate-700">
                <img
                  src={firstImageUrl}
                  alt="Post"
                  className="w-full max-h-96 object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
          <button
            onClick={handleLike}
            disabled={isUpdating}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
              isLiked
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-slate-700 hover:bg-slate-600 text-slate-300"
            }`}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            <span className="font-medium">{likeCount}</span>
          </button>

          <button
            onClick={handleToggleComments}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all transform hover:scale-105 active:scale-95"
          >
            <FaComment />
            <span className="font-medium">
              {showComments ? "Hide Comments" : "Comments"}
            </span>
          </button>
        </div>
      </div>

      {showComments && (
        <div className="px-6 pb-6 bg-slate-750 border-t border-slate-700">
          <CommentList postId={post.id} />
        </div>
      )}
    </div>
    </>
  );
}

export default PostItem;
