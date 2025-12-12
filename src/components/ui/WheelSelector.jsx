import { motion } from "framer-motion";
import { Check, ShoppingCart, ExternalLink } from "lucide-react";
import { useState } from "react";

/**
 * Component để hiển thị danh sách vành xe với thumbnail preview và nút mua hàng
 * @param {array} parts - Danh sách các vành xe
 * @param {string} selectedId - ID của vành đang được chọn
 * @param {function} onSelect - Callback khi chọn vành
 * @param {function} showToast - Function để hiển thị toast notification
 */
export const WheelSelector = ({ parts, selectedId, onSelect, showToast }) => {
  const [imageLoadErrors, setImageLoadErrors] = useState({});

  const handleImageError = (partId) => {
    setImageLoadErrors((prev) => ({ ...prev, [partId]: true }));
  };

  const handleBuyClick = (e, affiliateLink, itemName) => {
    e.stopPropagation(); // Ngăn không chọn item khi click nút mua

    if (affiliateLink && affiliateLink.trim() !== "") {
      window.open(affiliateLink, "_blank", "noopener,noreferrer");
    } else {
      // Hiển thị toast thay vì alert
      if (showToast) {
        showToast(`Link mua hàng cho ${itemName} sẽ được cập nhật sớm!`, 4000);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3">
      {parts.map((part) => {
        const isSelected = selectedId === part.id;
        const hasError = imageLoadErrors[part.id];
        const hasImage =
          part.thumbnail && part.thumbnail.endsWith(".png") && !hasError;
        const hasLink = part.affiliateLink && part.affiliateLink.trim() !== "";
        const isDefaultOption =
          part.id.includes("default") ||
          part.id.includes("standard") ||
          part.id.includes("none");

        return (
          <motion.div
            key={part.id}
            whileHover={{ y: -4 }}
            className={`relative rounded-xl overflow-hidden transition-all duration-300 ${isSelected
              ? "ring-4 ring-blue-500 ring-offset-2 shadow-2xl"
              : "ring-2 ring-slate-200 dark:ring-slate-700 hover:ring-blue-300 dark:hover:ring-blue-600 shadow-md hover:shadow-xl"
              }`}
          >
            {/* Thumbnail Image - Clickable */}
            <button
              onClick={() => onSelect(part.id)}
              className="w-full cursor-pointer"
            >
              <div
                className={`aspect-square bg-gradient-to-br ${isSelected
                  ? "from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800"
                  : "from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700"
                  } flex items-center justify-center p-3 relative`}
              >
                {hasImage ? (
                  <img
                    src={part.thumbnail}
                    alt={part.name}
                    onError={() => handleImageError(part.id)}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-slate-400 dark:text-slate-500 text-4xl font-bold">
                    {part.name.substring(0, 2)}
                  </div>
                )}

                {/* Selected Badge */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1.5 shadow-lg"
                  >
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </motion.div>
                )}
              </div>
            </button>

            {/* Info Section - Clickable */}
            <button
              onClick={() => onSelect(part.id)}
              className={`w-full p-3 text-left cursor-pointer ${isSelected
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                }`}
            >
              <div className="font-bold text-sm mb-1 truncate">{part.name}</div>
              <div
                className={`text-xs truncate ${isSelected
                  ? "text-blue-100"
                  : "text-slate-500 dark:text-slate-400"
                  }`}
              >
                {part.description}
              </div>
            </button>

            {/* Buy Button - Chỉ hiện khi không phải option mặc định */}
            {!isDefaultOption && (
              <button
                onClick={(e) =>
                  handleBuyClick(e, part.affiliateLink, part.name)
                }
                className={`cursor-pointer w-full py-2.5 px-3 font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${hasLink
                  ? "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-md hover:shadow-lg"
                  : "bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400"
                  }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{hasLink ? "Mua ngay" : "Sắp có"}</span>
                {hasLink && <ExternalLink className="w-3 h-3" />}
              </button>
            )}

            {/* Hover Overlay */}
            {!isSelected && (
              <div className="absolute inset-0 bg-blue-600 opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
