import { useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";
import { createPost, uploadPostImage } from "../../services/postService";
import { useToast } from "../../hooks/useToast";
import Toast from "../ui/Toast";

function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
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

      // Kiểm tra response structure: { code: 1000, result: {...} }
      const postId = response?.result?.id || response?.data?.result?.id || response?.id;
      
      if (!postId) {
        console.error("No post ID in response:", response);
        throw new Error("Post created but no ID returned");
      }

      // Upload image nếu có
      if (imageFile && postId) {
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
          await uploadPostImage(postId, formData);
        } catch (imageError) {
          console.error("Error uploading image:", imageError);
          showError("Post created but image upload failed");
        }
      }

      // Reset form
      setTitle("");
      setContent("");
      setImageFile(null);
      setImagePreview("");
      setShowImageInput(false);

      // Gọi callback để refresh danh sách posts
      if (onPostCreated) {
        onPostCreated();
      }

      showSuccess("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      console.error("Error response:", error.response);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create post. Please try again.";
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
      <div className="relative bg-slate-900 rounded-2xl shadow-md p-6 border border-slate-700/50 transition-all duration-200">
        <form onSubmit={handleSubmit} className="relative space-y-6">
          {/* Title input with gradient border */}
          <div>
            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
              disabled={isSubmitting}
            />
          </div>

          {/* Content textarea with gradient border */}
          <div>
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
              className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed placeholder-slate-500"
              disabled={isSubmitting}
            />
          </div>

          {/* Image input section */}
          {showImageInput && (
            <div className="space-y-3">
              <label className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-slate-800 text-slate-300 rounded-lg border-2 border-dashed border-slate-700 cursor-pointer">
                <FaUpload className="text-base" />
                <span className="font-medium text-sm">
                  {imageFile ? "Change image" : "Choose an image"}
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
                <div className="relative rounded-md overflow-hidden border border-slate-700">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-72 object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-md"
                    disabled={isSubmitting}
                  >
                    <FaTimes className="text-sm" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowImageInput(!showImageInput)}
              className={`px-4 py-2 rounded-md text-sm font-medium border border-slate-700 ${
                showImageInput
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 bg-transparent"
              } cursor-pointer hover:bg-slate-700 transition`}
              disabled={isSubmitting}
            >
              {showImageInput ? "Hide image" : "Add image"}
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
