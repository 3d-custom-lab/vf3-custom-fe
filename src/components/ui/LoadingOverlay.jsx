import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Car } from "lucide-react";

/**
 * LoadingOverlay - Hiển thị loading state khi đang tải 3D model lần đầu
 * @param {boolean} isLoading - Trạng thái loading
 */
export const LoadingOverlay = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-blue-100/95 dark:bg-slate-900/95 backdrop-blur-sm"
        >
          <div className="text-center space-y-6">
            {/* Animated Car Icon */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative mx-auto w-24 h-24"
            >
              <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-xl" />
              <div className="relative bg-white dark:bg-slate-800 rounded-full p-5 shadow-2xl">
                <Car className="w-14 h-14 text-blue-600 dark:text-blue-400" />
              </div>
            </motion.div>

            {/* Loading Spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="mx-auto"
            >
              <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </motion.div>

            {/* Loading Text */}
            <div className="space-y-3">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-blue-600"
              >
                Đang tải mô hình 3D...
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-slate-600 dark:text-slate-400"
              >
                Vui lòng chờ trong giây lát...
              </motion.p>
            </div>

            {/* Animated Dots */}
            <div className="flex gap-2 justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
