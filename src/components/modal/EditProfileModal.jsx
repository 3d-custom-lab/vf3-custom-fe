import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Save, Loader2, Upload } from "lucide-react";
import useToast from "../../hooks/useToast";
import { uploadFile } from "../../services/fileService";

export default function EditProfileModal({ isOpen, onClose, userInfo, onSave }) {
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    gender: "MALE",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen && userInfo) {
      setFormData({
        name: userInfo.name || "",
        gender: userInfo.gender || "MALE",
        avatar: null,
      });
      setAvatarPreview(userInfo.avatar || "");
      setErrors({});
    }
  }, [isOpen, userInfo]);

  // Control body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, avatar: "Please select an image file" }));
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, avatar: "Image size must be less than 5MB" }));
      return;
    }

    setFormData((prev) => ({ ...prev, avatar: file }));
    setAvatarPreview(URL.createObjectURL(file));

    if (errors.avatar) {
      setErrors((prev) => ({ ...prev, avatar: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      let avatarUrl = userInfo.avatar;

      // Step 1: Upload avatar if user selected a new file
      if (formData.avatar instanceof File) {
        const uploadResponse = await uploadFile(
          formData.avatar,
          "USER",
          userInfo.id.toString(),
          userInfo.id.toString()
        );

        if (uploadResponse.code === 1000 && uploadResponse.result?.url) {
          avatarUrl = uploadResponse.result.url;
        } else {
          throw new Error("Failed to upload avatar image");
        }
      }

      // Step 2: Update user profile with new data
      const updateData = {
        name: formData.name.trim(),
        gender: formData.gender,
        avatar: avatarUrl,
      };

      await onSave(updateData);
      onClose();

    } catch (error) {
      console.error("Update profile error:", error);
      showError(
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-800"
            >
              {/* Header with Gradient */}
              <div className="relative bg-indigo-600 p-6">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Edit Profile
                      </h2>
                      <p className="text-white/70 text-sm">
                        Update your personal information
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    disabled={loading}
                    className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 text-white disabled:opacity-50 cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200
                        bg-slate-800/50 text-slate-100 placeholder:text-slate-500
                        focus:outline-none focus:bg-slate-800
                        ${errors.name
                          ? "border-red-500 focus:border-red-400"
                          : "border-slate-700 focus:border-indigo-500"
                        }`}
                      disabled={loading}
                    />
                  </div>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-400 flex items-center gap-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Gender Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-3">
                    Gender
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["MALE", "FEMALE", "OTHER"].map((gender) => (
                      <button
                        key={gender}
                        type="button"
                        onClick={() => handleChange("gender", gender)}
                        disabled={loading}
                        className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 border-2
                          ${formData.gender === gender
                            ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                            : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                          }
                          disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                      >
                        {gender.charAt(0) + gender.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Avatar Upload Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Avatar Image{" "}
                    <span className="text-slate-500 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative group cursor-pointer">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-800 flex items-center justify-center">
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt="Avatar preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <User className="w-8 h-8 text-slate-500" />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="w-6 h-6 text-white" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={loading}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full text-sm text-slate-400
                            file:mr-4 file:py-2.5 file:px-4
                            file:rounded-xl file:border-0
                            file:text-sm file:font-semibold
                            file:bg-slate-800 file:text-indigo-400
                            hover:file:bg-slate-700
                            cursor-pointer"
                          disabled={loading}
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Recommended: Square image, max 5MB. Supported: JPG, PNG, WEBP.
                      </p>
                    </div>
                  </div>
                  {errors.avatar && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-400"
                    >
                      {errors.avatar}
                    </motion.p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 py-3.5 px-6 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition-all duration-200 border-2 border-slate-700 hover:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3.5 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
