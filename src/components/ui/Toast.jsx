import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

function Toast({ message, type = "info", onClose, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  // Handle entry animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Handle auto-close and progress bar
  useEffect(() => {
    if (duration > 0) {
      const startTime = Date.now();
      const endTime = startTime + duration;

      const progressInterval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, endTime - now);
        const percentage = (remaining / duration) * 100;

        setProgress(percentage);

        if (remaining <= 0) {
          handleClose();
        }
      }, 10);

      return () => clearInterval(progressInterval);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for exit animation
  };

  const styles = {
    success: {
      icon: <FaCheckCircle className="text-emerald-400 text-xl" />,
      container:
        "bg-emerald-950/80 border-emerald-500/30 shadow-emerald-900/20",
      progressBar: "bg-emerald-400",
      glow: "bg-emerald-500/20",
    },
    error: {
      icon: <FaExclamationCircle className="text-rose-400 text-xl" />,
      container: "bg-rose-950/80 border-rose-500/30 shadow-rose-900/20",
      progressBar: "bg-rose-400",
      glow: "bg-rose-500/20",
    },
    info: {
      icon: <FaInfoCircle className="text-blue-400 text-xl" />,
      container: "bg-blue-950/80 border-blue-500/30 shadow-blue-900/20",
      progressBar: "bg-blue-400",
      glow: "bg-blue-500/20",
    },
  };

  const currentStyle = styles[type] || styles.info;

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex flex-col overflow-hidden backdrop-blur-xl border rounded-xl shadow-2xl transition-all duration-300 ease-out transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
      } ${currentStyle.container} min-w-[320px] max-w-sm`}
    >
      <div className="flex items-center gap-4 px-5 py-4 relative">
        {/* Glow effect behind icon */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-16 ${currentStyle.glow} blur-xl opacity-50`}
        ></div>

        <div className="relative z-10 shrink-0">{currentStyle.icon}</div>

        <div className="flex-1 min-w-0 z-10">
          <p className="text-slate-100 font-medium text-sm leading-relaxed tracking-wide">
            {message}
          </p>
        </div>

        <button
          onClick={handleClose}
          className="relative z-10 p-1.5 -mr-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 shrink-0 cursor-pointer"
        >
          <FaTimes className="text-sm" />
        </button>
      </div>

      {/* Smooth Progress Bar */}
      {duration > 0 && (
        <div className="h-0.5 w-full bg-slate-800/50">
          <div
            className={`h-full ${currentStyle.progressBar} transition-all duration-75 ease-linear shadow-[0_0_10px_currentColor]`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default Toast;
