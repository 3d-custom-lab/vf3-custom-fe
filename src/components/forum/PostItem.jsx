import { useState, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaCommentAlt,
  FaPen,
  FaTrashAlt,
  FaTimes,
  FaCamera,
} from "react-icons/fa";
import CommentList from "./CommentList";
import {
  updatePost,
  deletePost,
  likePost,
} from "../../services/postService";
import { uploadFile } from "../../services/fileService";
import { getCommentsByPostId } from "../../services/commentService";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";
import Toast from "../ui/Toast";
import { Modal } from "../ui/Modal";
import { getRelativeTime, formatDate } from "../../utils/dateUtils";

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
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  const isAuthor = user?.email === authorEmail;

  useEffect(() => {
    setIsLiked(likedUserIds.includes(currentUserId));
    setLikeCount(likedUserIds.length);
  }, [post.likedUserIds, currentUserId]);

  const loadCommentCount = async () => {
    try {
      const response = await getCommentsByPostId(post.id);
      const comments = response.result || [];
      let totalCount = comments.length;
      comments.forEach((c) => {
        if (c.replies && Array.isArray(c.replies))
          totalCount += c.replies.length;
      });
      setCommentCount(totalCount);
    } catch (error) {
      console.error("Error loading comments count:", error);
    }
  };

  useEffect(() => {
    loadCommentCount();
  }, [post.id]);

  const handleLike = async () => {
    setIsLikeAnimating(true);
    setTimeout(() => setIsLikeAnimating(false), 300);
    try {
      const response = await likePost(post.id);
      if (response.code === 1000) {
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);
        setLikeCount((prev) =>
          newLikedState ? prev + 1 : Math.max(0, prev - 1)
        );
      }
    } catch (error) {
      showError(error.response?.data?.message || "Failed to like post.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/"))
        return showError("Please select an image file");
      if (file.size > 5 * 1024 * 1024)
        return showError("Image size should not exceed 5MB");
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim() || !editContent.trim())
      return showError("Title and content required");
    setIsUpdating(true);
    try {
      let imageUrl = firstImageUrl;

      if (imageFile) {
        const uploadResponse = await uploadFile(
          imageFile,
          "POST",
          post.id.toString(),
          user.id.toString()
        );
        if (uploadResponse.code === 0 && uploadResponse.result) {
          imageUrl = uploadResponse.result.url;
        } else {
          throw new Error("Failed to upload image");
        }
      }

      const response = await updatePost(post.id, {
        title: editTitle.trim(),
        content: editContent.trim(),
        image: imageUrl
      });

      if (response.code === 1000) {
        setIsEditing(false);
        setImageFile(null);
        if (onPostUpdated) onPostUpdated();
        showSuccess("Post updated successfully!");
      }
    } catch (error) {
      showError(error.response?.data?.message || "Failed to update post");
    } finally {
      setIsUpdating(false);
    }
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    setIsUpdating(true);
    try {
      const response = await deletePost(post.id);
      if (response.code === 1000) {
        if (onPostDeleted) onPostDeleted(post.id);
        // showSuccess("Post deleted"); // Handled by parent
      }
    } catch (error) {
      showError("Failed to delete post");
    } finally {
      setIsUpdating(false);
    }
  };

  // Hàm hiển thị thời gian: relative nếu < 24h, ngược lại hiển thị ngày tháng cụ thể
  const formatPostTime = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

      // Nếu < 24 giờ → hiển thị relative time
      if (diffHours < 24) {
        return getRelativeTime(dateString);
      }

      // Nếu >= 24 giờ → hiển thị ngày tháng cụ thể
      return formatDate(dateString, 'time'); // Format: 24/11/2025 15:58
    } catch (error) {
      return "N/A";
    }
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

      <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-lg overflow-hidden transition-all hover:border-slate-600 hover:shadow-2xl hover:shadow-blue-900/10">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-slate-800">
                  {authorName?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-white text-base hover:text-blue-400 cursor-pointer transition-colors">
                  {authorName || "Unknown User"}
                </h3>
                <p className="text-slate-400 text-xs font-medium tracking-wide">
                  {formatPostTime(post.createdAt)}
                </p>
              </div>
            </div>

            {isAuthor && !isEditing && (
              <div className="flex gap-1">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-all"
                  title="Edit"
                >
                  <FaPen className="text-sm" />
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-all"
                  title="Delete"
                >
                  <FaTrashAlt className="text-sm" />
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          {isEditing ? (
            <div className="space-y-4 animate-fadeIn">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-slate-800/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:ring-2 focus:ring-blue-500/50 outline-none font-bold"
                placeholder="Title"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows="4"
                className="w-full bg-slate-800/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:ring-2 focus:ring-blue-500/50 outline-none resize-none"
                placeholder="Content"
              />
              <div className="relative group">
                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden max-h-60">
                    <img
                      src={imagePreview}
                      className="w-full object-cover"
                      alt="Preview"
                    />
                    <button
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full shadow-lg"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center gap-2 text-sm text-blue-400 cursor-pointer hover:underline p-2">
                    <FaCamera /> Upload Image{" "}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={isUpdating}
                  className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium shadow-lg shadow-blue-600/20 transition"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white mb-3 leading-snug">
                {post.title}
              </h2>
              <p className="text-slate-300 text-[15px] leading-relaxed whitespace-pre-wrap mb-4">
                {post.content}
              </p>

              {firstImageUrl && (
                <div className="rounded-xl overflow-hidden border border-slate-700/50 shadow-md">
                  <img
                    src={firstImageUrl}
                    alt="Post Attachment"
                    className="w-full max-h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={handleLike}
              disabled={isUpdating}
              className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isLiked
                ? "bg-red-500/10 text-red-500"
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-red-400"
                }`}
            >
              <div
                className={`transition-transform duration-300 ${isLikeAnimating ? "scale-150" : "scale-100"
                  }`}
              >
                {isLiked ? <FaHeart /> : <FaRegHeart />}
              </div>
              <span className="font-semibold text-sm">{likeCount}</span>
            </button>

            <button
              onClick={() => {
                setShowComments(!showComments);
                if (!showComments) loadCommentCount();
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${showComments
                ? "bg-blue-500/10 text-blue-400"
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-blue-400"
                }`}
            >
              <FaCommentAlt className="text-sm" />
              <span className="font-semibold text-sm">{commentCount}</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="bg-slate-950/30 border-t border-slate-800 p-6 animate-slideDown">
            <CommentList postId={post.id} onCommentChange={loadCommentCount} />
          </div>
        )}
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Post"
      >
        <div className="p-1">
          <p className="text-slate-300 mb-6">
            Are you sure you want to remove this post permanently?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PostItem;
