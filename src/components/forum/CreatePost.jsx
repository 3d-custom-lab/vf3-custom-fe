import { useState } from "react";
import { FaImage, FaTimes, FaUpload } from "react-icons/fa";
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
      // Create post first
      const postData = {
        title: title.trim(),
        content: content.trim(),
      };

      const response = await createPost(postData);

      // If there's an image and we got a post ID, upload the image
      if (imageFile && response.result?.id) {
        const formData = new FormData();
        formData.append("image", imageFile);
        
        try {
          await uploadPostImage(response.result.id, formData);
        } catch (imageError) {
          console.error("Error uploading image:", imageError);
          // Continue even if image upload fails
        }
      }

      // Reset form
      setTitle("");
      setContent("");
      setImageFile(null);
      setImagePreview("");
      setShowImageInput(false);

      // Notify parent component
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
      <div className="bg-slate-800 rounded-xl shadow-xl p-6 border border-slate-700">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                {user?.email || "User"}
              </p>
              <p className="text-slate-400 text-xs">Share your thoughts...</p>
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 outline-none transition-all placeholder-slate-500 mb-3"
              disabled={isSubmitting}
            />
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 outline-none resize-none transition-all placeholder-slate-500"
              disabled={isSubmitting}
            />
          </div>

          {showImageInput && (
            <div className="space-y-3">
              <label className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-900 text-slate-300 rounded-lg border border-slate-700 border-dashed cursor-pointer hover:border-blue-500 hover:text-blue-400 transition-all">
                <FaUpload />
                <span className="font-medium">
                  {imageFile ? "Change Image" : "Choose Image"}
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
                    disabled={isSubmitting}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowImageInput(!showImageInput)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                showImageInput
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "text-blue-400 hover:text-blue-300 hover:bg-slate-700"
              }`}
              disabled={isSubmitting}
            >
              <FaImage />
              <span>{showImageInput ? "Hide Image" : "Add Image"}</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Posting...
                </span>
              ) : (
                "Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
