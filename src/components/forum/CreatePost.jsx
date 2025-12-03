import { useState } from "react";
import { FaTimes, FaImage, FaPaperPlane } from "react-icons/fa";
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

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setShowImageInput(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return showError("Please enter post title");
    if (!content.trim()) return showError("Please enter post content");

    setIsSubmitting(true);
    try {
      const postData = { title: title.trim(), content: content.trim() };
      const response = await createPost(postData);
      const postId =
        response?.result?.id || response?.data?.result?.id || response?.id;

      if (!postId) throw new Error("Post created but no ID returned");

      if (imageFile && postId) {
        const formData = new FormData();
        formData.append("image", imageFile);
        await uploadPostImage(postId, formData);
      }

      setTitle("");
      setContent("");
      setImageFile(null);
      setImagePreview("");
      setShowImageInput(false);
      if (onPostCreated) onPostCreated();
      showSuccess("Post published successfully!");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Failed to create post.";
      showError(msg);
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

      <div className="group relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-1 border border-slate-700/50 shadow-xl transition-all hover:border-blue-500/30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <form
          onSubmit={handleSubmit}
          className="relative bg-slate-900 rounded-xl p-5 space-y-4"
        >
          <input
            type="text"
            placeholder="Give your topic a catchy title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-lg font-bold text-white placeholder-slate-500 border-none focus:ring-0 px-0 py-1"
            disabled={isSubmitting}
          />

          <div className="w-full h-px bg-slate-800"></div>

          <textarea
            placeholder="What's happening? Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
            className="w-full bg-transparent text-slate-300 placeholder-slate-500 border-none focus:ring-0 px-0 py-2 resize-none leading-relaxed text-base min-h-[100px]"
            disabled={isSubmitting}
          />

          {showImageInput && (
            <div className="relative mt-4 animate-fadeIn">
              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden group/image border border-slate-700/50">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-2 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-transform hover:scale-110"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer bg-slate-800/30 hover:bg-slate-800/60 hover:border-blue-500/50 transition-all group/upload">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaImage className="w-8 h-8 text-slate-500 group-hover/upload:text-blue-400 mb-2 transition-colors" />
                    <p className="text-sm text-slate-400">
                      Click to upload image
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setShowImageInput(!showImageInput)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                showImageInput
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
              disabled={isSubmitting}
            >
              <FaImage />
              <span>{showImageInput ? "Hide Media" : "Add Media"}</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:translate-y-[-1px] active:translate-y-[1px]"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Post</span>
                  <FaPaperPlane className="text-xs" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
