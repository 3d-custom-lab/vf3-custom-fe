import { motion } from "framer-motion";

/**
 * Loading Spinner Component
 * Có thể tùy chỉnh kích thước và màu sắc
 * 
 * @param {Object} props
 * @param {string} props.size - Kích thước: "sm", "md", "lg" (default: "md")
 * @param {string} props.color - Màu sắc: "cyan", "blue", "purple" (default: "cyan")
 * @param {boolean} props.fullScreen - Hiển thị full screen (default: false)
 * @param {string} props.message - Thông báo loading (optional)
 */
export default function LoadingSpinner({ 
  size = "md", 
  color = "cyan", 
  fullScreen = false,
  message = "" 
}) {
  const sizes = {
    sm: "w-8 h-8 border-2",
    md: "w-16 h-16 border-4",
    lg: "w-24 h-24 border-4"
  };

  const colors = {
    cyan: "border-cyan-500 border-t-transparent",
    blue: "border-blue-500 border-t-transparent",
    purple: "border-purple-500 border-t-transparent"
  };

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizes[size]} ${colors[color]} rounded-full`}
      />
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-sm"
        >
          {message}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}
