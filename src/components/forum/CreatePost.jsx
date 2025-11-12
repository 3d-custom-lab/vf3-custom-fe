import { useState } from "react";
import { FaImage, FaTimes, FaUpload, FaFeatherAlt } from "react-icons/fa";
import { createPost, uploadPostImage } from "../../services/postService";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../hooks/useToast";
import Toast from "../ui/Toast";

function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const { user } = useAuthStore();
  const { toast, showSuccess, showError, hideToast } = useToast();

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
    setShowImageInput(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      showError("Please enter post title");
      return;
    }

    if (!content.trim()) {
      showError("Please enter post content");
      return;
    }

    setIsSubmitting(true);

    try {
      const postData = {
        title: title.trim(),
        content: content.trim(),
      };

      const response = await createPost(postData);

      if (imageFile && response.result?.id) {
        const formData = new FormData();
        formData.append("image", imageFile);
        
        try {
          await uploadPostImage(response.result.id, formData);
        } catch (imageError) {
          console.error("Error uploading image:", imageError);
        }
      }

      setTitle("");
      setContent("");
      setImageFile(null);
      setImagePreview("");
      setShowImageInput(false);

      if (onPostCreated) {
        onPostCreated();
      }

      showSuccess("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create post. Please try again.";
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
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
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 rounded-3xl shadow-2xl p-8 border-2 border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <form onSubmit={handleSubmit} className="relative space-y-6">
          {/* User info header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative group/avatar">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-50 group-hover/avatar:opacity-75 transition-opacity"></div>
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-xl border-2 border-slate-600">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-base">
                {user?.email || "User"}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <FaFeatherAlt className="text-blue-400 text-xs" />
                <p className="text-slate-400 text-sm font-medium">Share your thoughts...</p>
              </div>
            </div>
          </div>

          {/* Title input with gradient border */}
          <div className="relative group/input">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-focus-within/input:opacity-20 blur transition-opacity"></div>
            <input
              type="text"
              placeholder="✨ Post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="relative w-full px-6 py-4 bg-slate-900/80 backdrop-blur-sm text-white text-base font-semibold rounded-2xl border-2 border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder-slate-500 shadow-lg hover:shadow-xl"
              disabled={isSubmitting}
            />
          </div>

          {/* Content textarea with gradient border */}
          <div className="relative group/textarea">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl opacity-0 group-focus-within/textarea:opacity-20 blur transition-opacity"></div>
            <textarea
              placeholder="💭 What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
              className="relative w-full px-6 py-4 bg-slate-900/80 backdrop-blur-sm text-white text-base rounded-2xl border-2 border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 outline-none resize-none transition-all placeholder-slate-500 shadow-lg hover:shadow-xl leading-relaxed"
              disabled={isSubmitting}
            />
          </div>

          {/* Image input section */}
          {showImageInput && (
            <div className="space-y-4 animate-slideDown">
              <label className="relative flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm text-slate-300 rounded-2xl border-2 border-dashed border-slate-600 cursor-pointer hover:border-blue-500 hover:text-blue-400 transition-all duration-300 group/upload overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover/upload:opacity-100 transition-opacity"></div>
                <FaUpload className="relative text-lg group-hover/upload:scale-110 transition-transform" />
                <span className="relative font-bold text-base">
                  {imageFile ? "🔄 Change Image" : "📷 Choose Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isSubmitting}
                />
              </label>

              {imagePreview && (
                <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl group/preview">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity"></div>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-80 object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-4 right-4 p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
                    disabled={isSubmitting}
                  >
                    <FaTimes className="text-base" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={() => setShowImageInput(!showImageInput)}
              className={`relative flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 font-bold text-base transform hover:scale-105 active:scale-95 shadow-lg overflow-hidden group/btn ${
                showImageInput
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/50"
                  : "text-blue-400 hover:text-blue-300 bg-slate-700/50 hover:bg-slate-700"
              }`}
              disabled={isSubmitting}
            >
              <div className="absolute inset-0 bg-white/10 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></div>
              <FaImage className="relative text-lg" />
              <span className="relative">{showImageInput ? "Hide Image" : "Add Image"}</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="relative px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold text-base rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:transform-none shadow-xl hover:shadow-2xl disabled:shadow-none overflow-hidden group/submit"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/submit:translate-y-0 transition-transform duration-300"></div>
              {isSubmitting ? (
                <span className="relative flex items-center gap-3">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Posting...
                </span>
              ) : (
                <span className="relative flex items-center gap-2">
                  ✨ Post
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePost;