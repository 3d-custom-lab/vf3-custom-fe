import { useState } from "react";
import { FaTimes, FaImage, FaPaperPlane, FaPen } from "react-icons/fa";
import { createPost, updatePost } from "../../services/postService";
import { uploadFile } from "../../services/fileService";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";
import Toast from "../ui/Toast";

function CreatePost({ onPostCreated }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast, showSuccess, showError, hideToast } = useToast();

  const handleImageChange = (e) => {
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

    setImageFiles((prev) => [...prev, ...validFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      const newPreviews = prev.filter((_, i) => i !== index);
      // Revoke the URL to avoid memory leaks
      URL.revokeObjectURL(prev[index]);
      return newPreviews;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return showError("Vui lòng nhập tiêu đề bài viết");
    if (!content.trim()) return showError("Vui lòng nhập nội dung bài viết");

    setIsSubmitting(true);
    try {
      const response = await createPost(title.trim(), content.trim(), imageFiles);

      if (response.code === 1000) {
        setTitle("");
        setContent("");
        setImageFiles([]);
        setImagePreviews([]);
        setShowImageInput(false);
        setIsExpanded(false);
        if (onPostCreated) onPostCreated();
        showSuccess("Đăng bài thành công!");
      } else {
        throw new Error(response.message || "Đăng bài thất bại");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Đăng bài thất bại.";
      showError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setTitle("");
    setContent("");
    setImageFiles([]);
    setImagePreviews([]);
    setShowImageInput(false);
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
        <div className="absolute inset-0 bg-blue-500/5 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="relative w-full bg-slate-900 rounded-xl p-6 text-left hover:bg-slate-800/80 transition-all group/button cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover/button:shadow-blue-500/40 transition-all group-hover/button:scale-110">
                <FaPen className="text-white text-lg" />
              </div>
              <div className="flex-1">
                <p className="text-slate-400 group-hover/button:text-slate-300 transition-colors text-base font-medium">
                  Chia sẻ suy nghĩ của bạn...
                </p>
                <p className="text-slate-600 text-sm mt-1">
                  Tạo bài viết mới để thảo luận
                </p>
              </div>
              <div className="text-slate-500 group-hover/button:text-blue-400 transition-colors">
                <FaPaperPlane className="text-xl" />
              </div>
            </div>
          </button>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative bg-slate-900 rounded-xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FaPen className="text-blue-400" />
                Tạo bài viết mới
              </h3>
              <button
                type="button"
                onClick={handleCancel}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white cursor-pointer"
                disabled={isSubmitting}
              >
                <FaTimes />
              </button>
            </div>

            <input
              type="text"
              placeholder="Đặt tiêu đề cho bài viết..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-lg font-bold text-white placeholder-slate-500 border-none focus:ring-0 px-0 py-1"
              disabled={isSubmitting}
              autoFocus
            />

            <div className="w-full h-px bg-slate-800"></div>

            <textarea
              placeholder="Bạn đang nghĩ gì? Chia sẻ ngay..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="3"
              className="w-full bg-transparent text-slate-300 placeholder-slate-500 border-none focus:ring-0 px-0 py-2 resize-none leading-relaxed text-base min-h-[100px]"
              disabled={isSubmitting}
            />

            {showImageInput && (
              <div className="relative mt-4 animate-fadeIn">
                {imagePreviews.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative rounded-xl overflow-hidden group/image border border-slate-700/50 aspect-square"
                      >
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="p-2 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-transform hover:scale-110 cursor-pointer"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-slate-700 rounded-xl cursor-pointer bg-slate-800/30 hover:bg-slate-800/60 hover:border-blue-500/50 transition-all group/upload">
                      <FaImage className="w-6 h-6 text-slate-500 group-hover/upload:text-blue-400 mb-2 transition-colors" />
                      <span className="text-xs text-slate-400">Thêm ảnh</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer bg-slate-800/30 hover:bg-slate-800/60 hover:border-blue-500/50 transition-all group/upload">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaImage className="w-8 h-8 text-slate-500 group-hover/upload:text-blue-400 mb-2 transition-colors" />
                      <p className="text-sm text-slate-400">
                        Nhấn để tải ảnh lên
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
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
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${showImageInput
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                disabled={isSubmitting}
              >
                <FaImage />
                <span>{showImageInput ? "Ẩn ảnh" : "Thêm ảnh"}</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !title.trim() || !content.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-px active:translate-y-px cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Đăng</span>
                    <FaPaperPlane className="text-xs" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default CreatePost;
