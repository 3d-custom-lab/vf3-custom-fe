import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

/**
 * Loading Component
 * Unified loading component with multiple variants
 * 
 * @param {string} variant - Type of loading: "spinner" | "dots" | "pulse" | "bars"
 * @param {string} size - Size: "xs" | "sm" | "md" | "lg" | "xl"
 * @param {string} color - Color: "cyan" | "blue" | "purple" | "green" | "red"
 * @param {boolean} fullScreen - Show as fullscreen overlay
 * @param {string} text - Loading text message
 * @param {boolean} overlay - Show with dark overlay (not fullscreen)
 * @param {string} className - Additional CSS classes
 */
export default function Loading({
  variant = "spinner",
  size = "md",
  color = "cyan",
  fullScreen = false,
  text = "",
  overlay = false,
  className = "",
}) {
  // Size mappings
  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const borderSizes = {
    xs: "border-2",
    sm: "border-2",
    md: "border-3",
    lg: "border-4",
    xl: "border-4",
  };

  const textSizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  // Color mappings
  const colorClasses = {
    spinner: {
      cyan: "border-cyan-500 border-t-transparent",
      blue: "border-blue-500 border-t-transparent",
      purple: "border-purple-500 border-t-transparent",
      green: "border-green-500 border-t-transparent",
      red: "border-red-500 border-t-transparent",
    },
    text: {
      cyan: "text-cyan-400",
      blue: "text-blue-400",
      purple: "text-purple-400",
      green: "text-green-400",
      red: "text-red-400",
    },
    dots: {
      cyan: "bg-cyan-500",
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      green: "bg-green-500",
      red: "bg-red-500",
    },
  };

  // Spinner variant (rotating circle)
  const SpinnerVariant = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizeClasses[size]} ${borderSizes[size]} ${colorClasses.spinner[color]} rounded-full`}
    />
  );

  // Lucide icon spinner
  const IconSpinnerVariant = () => (
    <Loader2
      className={`${sizeClasses[size]} ${colorClasses.text[color]} animate-spin`}
    />
  );

  // Dots variant (bouncing dots)
  const DotsVariant = () => {
    const dotSize = {
      xs: "w-1.5 h-1.5",
      sm: "w-2 h-2",
      md: "w-3 h-3",
      lg: "w-4 h-4",
      xl: "w-5 h-5",
    };

    return (
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{
              y: ["0%", "-50%", "0%"],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: index * 0.15,
              ease: "easeInOut",
            }}
            className={`${dotSize[size]} ${colorClasses.dots[color]} rounded-full`}
          />
        ))}
      </div>
    );
  };

  // Pulse variant (growing/shrinking circle)
  const PulseVariant = () => (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.5, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`${sizeClasses[size]} ${colorClasses.dots[color]} rounded-full`}
    />
  );

  // Bars variant (audio bars animation)
  const BarsVariant = () => {
    const barHeights = {
      xs: "h-4",
      sm: "h-6",
      md: "h-8",
      lg: "h-12",
      xl: "h-16",
    };

    const barWidths = {
      xs: "w-1",
      sm: "w-1.5",
      md: "w-2",
      lg: "w-3",
      xl: "w-4",
    };

    return (
      <div className="flex items-end gap-1.5">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            animate={{
              scaleY: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: index * 0.15,
              ease: "easeInOut",
            }}
            className={`${barWidths[size]} ${barHeights[size]} ${colorClasses.dots[color]} rounded-full origin-bottom`}
          />
        ))}
      </div>
    );
  };

  // Select variant
  const renderVariant = () => {
    switch (variant) {
      case "dots":
        return <DotsVariant />;
      case "pulse":
        return <PulseVariant />;
      case "bars":
        return <BarsVariant />;
      case "icon":
        return <IconSpinnerVariant />;
      case "spinner":
      default:
        return <SpinnerVariant />;
    }
  };

  // Loading content
  const loadingContent = (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {renderVariant()}
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${colorClasses.text[color]} ${textSizes[size]} font-medium`}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  // Fullscreen mode
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center z-50">
        {loadingContent}
      </div>
    );
  }

  // Overlay mode (not fullscreen, just a semi-transparent overlay)
  if (overlay) {
    return (
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-40 rounded-lg">
        {loadingContent}
      </div>
    );
  }

  // Inline mode
  return loadingContent;
}
