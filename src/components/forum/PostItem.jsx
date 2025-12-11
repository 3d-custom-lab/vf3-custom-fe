import { useState, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaCommentAlt,
  FaPen,
  FaTrashAlt,
  FaTimes,
  FaCamera,
  FaImage,
} from "react-icons/fa";
import CommentList from "./CommentList";
import {
  updatePost,
  deletePost,
  likePost,
  addPostImage,
  deletePostImage,
} from "../../services/postService";
import { getUserInfo } from "../../services/userService";
import { getCommentsByPostId } from "../../services/commentService";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";
import Toast from "../ui/Toast";
import { Modal } from "../ui/Modal";
import { getRelativeTime, formatDate } from "../../utils/dateUtils";
import ImageLightbox from "./ImageLightbox";

function PostItem({ post, onPostUpdated, onPostDeleted }) {
  const { user } = useAuth();
  const { toast, showSuccess, showError, hideToast } = useToast();

  const [userInfo, setUserInfo] = useState(null);

  const authorEmail = post.author?.email || "";
  const isAuthor = user?.email === authorEmail;

  // Prioritize fetched userInfo if it's the current user, otherwise use post.author
  const displayAuthor = isAuthor && userInfo ? userInfo : post.author;
  const authorName = displayAuthor?.name || displayAuthor?.email || "Người dùng ẩn danh";
  const authorAvatar = displayAuthor?.avatar;

  useEffect(() => {
    if (isAuthor) {
      const fetchUserInfo = async () => {
        try {
          const res = await getUserInfo();
          if (res.code === 1000) {
            setUserInfo(res.result);
          }
        } catch (error) {
          console.error("Failed to fetch user info for post:", error);
        }
      };
      fetchUserInfo();
    }
  }, [isAuthor]);

  const postImages = post.images || [];
  const likedUserIds = post.likedUserIds || [];
  const currentUserId = user?.id;

  const [isLiked, setIsLiked] = useState(likedUserIds.includes(currentUserId));
  const [likeCount, setLikeCount] = useState(likedUserIds.length);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title || "");
  const [editContent, setEditContent] = useState(post.content);

  // Image Management State for Edit
  const [existingImages, setExistingImages] = useState([]);
  const [deletedImageIds, setDeletedImageIds] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    setIsLiked(likedUserIds.includes(currentUserId));
    setLikeCount(likedUserIds.length);
  }, [post.likedUserIds, currentUserId]);

  // Reset edit state when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setEditTitle(post.title || "");
      setEditContent(post.content || "");
      setExistingImages(post.images || []);
      setDeletedImageIds([]);
      setNewImageFiles([]);
      setNewImagePreviews([]);
    }
  }, [isEditing, post]);

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
      showError(error.response?.data?.message || "Thích bài viết thất bại.");
    }
  };

  // Handle adding new images
  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = [];
    const newPreviews = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        showError(`Tệp ${file.name} không phải là hình ảnh`);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showError(`Tệp ${file.name} vượt quá 5MB`);
        return;
      }
      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    setNewImageFiles((prev) => [...prev, ...validFiles]);
    setNewImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove a new image from the list (before upload)
  const removeNewImage = (index) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => {
      const newPreviews = prev.filter((_, i) => i !== index);
      URL.revokeObjectURL(prev[index]);
      return newPreviews;
    });
  };

  // Mark an existing image for deletion
  const markImageForDeletion = (imageId) => {
    setDeletedImageIds((prev) => [...prev, imageId]);
  };

  // Undo deletion of an existing image
  const undoImageDeletion = (imageId) => {
    setDeletedImageIds((prev) => prev.filter((id) => id !== imageId));
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim() || !editContent.trim())
      return showError("Tiêu đề và nội dung là bắt buộc");

    setIsUpdating(true);
    try {
      // 1. Update Text Content
      await updatePost(post.id, {
        title: editTitle.trim(),
        content: editContent.trim(),
      });

      // 2. Delete marked images
      if (deletedImageIds.length > 0) {
        await Promise.all(
          deletedImageIds.map((imageId) => deletePostImage(post.id, imageId))
        );
      }

      // 3. Upload new images
      if (newImageFiles.length > 0) {
        // Upload sequentially to ensure order or avoid overwhelming server
        for (const file of newImageFiles) {
          await addPostImage(post.id, file);
        }
      }

      // Success
      setIsEditing(false);
      if (onPostUpdated) onPostUpdated();
      showSuccess("Cập nhật bài viết thành công!");

    } catch (error) {
      console.error("Update failed:", error);
      showError(error.response?.data?.message || "Cập nhật bài viết thất bại");
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
      }
    } catch (error) {
      showError("Xóa bài viết thất bại");
    } finally {
      setIsUpdating(false);
    }
  };

  const formatPostTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours < 24) return getRelativeTime(dateString);
      return formatDate(dateString, 'time');
    } catch (error) {
      return "N/A";
    }
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
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
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-slate-800 overflow-hidden">
                  {authorAvatar ? (
                    <img src={authorAvatar} alt={authorName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{authorName?.charAt(0).toUpperCase() || "U"}</span>
                  )}
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
                  className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
                  title="Sửa"
                >
                  <FaPen className="text-sm" />
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
                  title="Xóa"
                >
                  <FaTrashAlt className="text-sm" />
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          {isEditing ? (
            <div className="space-y-4 animate-fadeIn">
              {/* Title Input */}
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-slate-800/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:ring-2 focus:ring-blue-500/50 outline-none font-bold"
                placeholder="Tiêu đề"
                disabled={isUpdating}
              />

              {/* Content Input */}
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows="4"
                className="w-full bg-slate-800/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:ring-2 focus:ring-blue-500/50 outline-none resize-none"
                placeholder="Nội dung"
                disabled={isUpdating}
              />

              {/* Image Management Section */}
              <div className="space-y-3">
                <p className="text-sm text-slate-400 font-medium">Hình ảnh</p>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {/* Existing Images */}
                  {existingImages.map((img) => {
                    const isDeleted = deletedImageIds.includes(img.id);
                    return (
                      <div
                        key={img.id}
                        className={`relative aspect-square rounded-lg overflow-hidden border border-slate-700 group ${isDeleted ? 'opacity-40 grayscale' : ''}`}
                      >
                        <img src={img.path} alt="Existing" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          {isDeleted ? (
                            <button
                              type="button"
                              onClick={() => undoImageDeletion(img.id)}
                              className="px-2 py-1 bg-green-600 text-white text-xs rounded-full hover:bg-green-500 cursor-pointer"
                            >
                              Hoàn tác
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => markImageForDeletion(img.id)}
                              className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-500 cursor-pointer"
                            >
                              <FaTrashAlt size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* New Images Previews */}
                  {newImagePreviews.map((preview, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-blue-500/50 group">
                      <img src={preview} alt="New" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeNewImage(idx)}
                          className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-500 cursor-pointer"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-blue-600 text-white text-[10px] rounded-sm font-bold">
                        MỚI
                      </div>
                    </div>
                  ))}

                  {/* Add Image Button */}
                  <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-slate-700 rounded-lg cursor-pointer bg-slate-800/30 hover:bg-slate-800/60 hover:border-blue-500/50 transition-all">
                    <FaCamera className="text-slate-500 mb-1" />
                    <span className="text-[10px] text-slate-400">Thêm</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleNewImageChange}
                      className="hidden"
                      disabled={isUpdating}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg transition cursor-pointer"
                  disabled={isUpdating}
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={isUpdating}
                  className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium shadow-lg shadow-blue-600/20 transition flex items-center gap-2 cursor-pointer"
                >
                  {isUpdating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Đang lưu...
                    </>
                  ) : (
                    "Lưu thay đổi"
                  )}
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

              {/* Image Grid */}
              {postImages.length > 0 && (
                <div className="mt-3 rounded-xl overflow-hidden border border-slate-700/50 shadow-md">
                  {postImages.length === 1 && (
                    <img
                      src={postImages[0].path}
                      alt="Post"
                      className="w-full max-h-[500px] object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-500"
                      onClick={() => openLightbox(0)}
                    />
                  )}

                  {postImages.length === 2 && (
                    <div className="grid grid-cols-2 gap-1">
                      {postImages.map((img, idx) => (
                        <div
                          key={img.id}
                          className="aspect-square overflow-hidden cursor-pointer"
                          onClick={() => openLightbox(idx)}
                        >
                          <img
                            src={img.path}
                            alt={`Post ${idx}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {postImages.length === 3 && (
                    <div className="grid grid-cols-2 gap-1">
                      <div
                        className="col-span-2 aspect-[2/1] overflow-hidden cursor-pointer"
                        onClick={() => openLightbox(0)}
                      >
                        <img
                          src={postImages[0].path}
                          alt="Post 0"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {postImages.slice(1).map((img, idx) => (
                        <div
                          key={img.id}
                          className="aspect-square overflow-hidden cursor-pointer"
                          onClick={() => openLightbox(idx + 1)}
                        >
                          <img
                            src={img.path}
                            alt={`Post ${idx + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {postImages.length >= 4 && (
                    <div className="grid grid-cols-2 gap-1">
                      {postImages.slice(0, 4).map((img, idx) => (
                        <div
                          key={img.id}
                          className="relative aspect-square overflow-hidden cursor-pointer group"
                          onClick={() => openLightbox(idx)}
                        >
                          <img
                            src={img.path}
                            alt={`Post ${idx}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {idx === 3 && postImages.length > 4 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm group-hover:bg-black/50 transition-colors">
                              <span className="text-white text-2xl font-bold">
                                +{postImages.length - 4}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={handleLike}
              disabled={isUpdating}
              className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${isLiked
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
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${showComments
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

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={postImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Xóa bài viết"
      >
        <div className="p-1">
          <p className="text-slate-300 mb-6">
            Bạn có chắc chắn muốn xóa bài viết này vĩnh viễn không?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20 transition cursor-pointer"
            >
              Xóa
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PostItem;
