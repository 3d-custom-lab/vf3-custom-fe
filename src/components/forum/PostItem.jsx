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
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";
import Toast from "../ui/Toast";
import { Modal } from "../ui/Modal";

function PostItem({ post, onPostUpdated, onPostDeleted }) {
  const { user } = useAuth();
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isAuthor = user?.email === authorEmail;

  useEffect(() => {
    setIsLiked(likedUserIds.includes(currentUserId));
    setLikeCount(likedUserIds.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.likedUserIds, currentUserId]);

  /**
   * Load comment count for the post
   */
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
      console.error("Error loading comments count:", error);
    }
  };

  useEffect(() => {
    loadCommentCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id]);

  /**
   * Handle like toggle
   */
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

  const handleDelete = () => {
    // open modal to confirm deletion
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    setIsUpdating(true);
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
    } finally {
      setIsUpdating(false);
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
      <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-700/50 transition-all duration-200 group/post">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold text-lg border border-slate-600">
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
                <button onClick={handleEdit} className="p-2 text-slate-300 bg-slate-800 rounded-md hover:bg-slate-700 cursor-pointer transition" title="Edit post" disabled={isUpdating}>
                  <FaEdit />
                </button>
                  <button onClick={handleDelete} className="p-2 text-slate-300 bg-slate-800 rounded-md hover:bg-slate-700 cursor-pointer transition" title="Delete post" disabled={isUpdating}>
                    <FaTrash />
                  </button>
              </div>
            )}
          </div>

          {isEditing ? (
          <div className="space-y-3 mb-6">
            <input
              type="text"
              placeholder="Post title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 text-white rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isUpdating}
            />

            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows="5"
              className="w-full px-4 py-2 bg-slate-800 text-white rounded-md border border-slate-700 resize-none"
              disabled={isUpdating}
            />

            <div>
              <label className="flex items-center gap-3 px-3 py-2 bg-slate-800 text-slate-300 rounded-md border border-dashed border-slate-700 cursor-pointer hover:bg-slate-700 transition">
                <FaUpload />
                <span className="font-medium text-sm">{imageFile ? "Change image" : "Upload image"}</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isUpdating} />
              </label>

              {imagePreview && (
                <div className="mt-3 relative rounded-md overflow-hidden border border-slate-700">
                  <img src={imagePreview} alt="Preview" className="w-full max-h-72 object-cover" />
                  <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-md" disabled={isUpdating}><FaTimes /></button>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2 justify-end">
              <button onClick={handleSaveEdit} disabled={isUpdating || !editTitle.trim() || !editContent.trim()} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                {isUpdating ? "Saving..." : "Save"}
              </button>
              <button onClick={handleCancelEdit} disabled={isUpdating} className="px-4 py-2 bg-slate-700 text-slate-200 rounded-md">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            {post.title && (<h2 className="text-2xl font-bold mb-3">{post.title}</h2>)}
            <p className="text-slate-200 text-base mb-4 whitespace-pre-wrap leading-relaxed">{post.content}</p>

            {firstImageUrl && (
              <div className="mb-4 rounded-md overflow-hidden border border-slate-700">
                <img src={firstImageUrl} alt="Post" className="w-full max-h-[500px] object-cover" onError={(e) => { e.target.style.display = "none"; }} />
              </div>
            )}
          </>
        )}

        {/* Action buttons with enhanced design */}
            <div className="flex items-center gap-3 pt-6 border-t border-slate-700/50">
          <button onClick={handleLike} disabled={isUpdating} className={`flex items-center gap-2 px-3 py-2 rounded-md font-semibold ${isLiked ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'} cursor-pointer transition`}>
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            <span>{likeCount}</span>
          </button>

          <button onClick={handleToggleComments} className="flex items-center gap-2 px-3 py-2 bg-slate-800 text-slate-200 rounded-md cursor-pointer hover:bg-slate-700 transition">
            <FaComment />
            <span>{showComments ? 'Hide Comments' : 'Comments'}</span>
            {commentCount > 0 && <span className="ml-2 px-2 py-0.5 bg-slate-700 text-slate-200 text-xs rounded-full border border-slate-600">{commentCount}</span>}
          </button>
        </div>
      </div>

      {showComments && (
        <div className="px-6 pb-6 bg-slate-900 rounded-b-2xl border-x border-b border-slate-700/50 -mt-4 pt-4">
          <CommentList postId={post.id} onCommentChange={loadCommentCount} />
        </div>
      )}
    </div>

    {/* Delete confirmation modal */}
    <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Confirm delete">
      <div className="space-y-4">
        <p className="text-slate-700 dark:text-slate-200">Are you sure you want to delete this post? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 rounded-md bg-slate-200 text-slate-800 hover:bg-slate-300 transition">Cancel</button>
          <button onClick={confirmDelete} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition">Delete</button>
        </div>
      </div>
    </Modal>
  </>
  );
}

export default PostItem;