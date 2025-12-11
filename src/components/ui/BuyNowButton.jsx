import { motion } from "framer-motion";
import { ShoppingCart, ExternalLink, AlertCircle } from "lucide-react";

export const BuyNowButton = ({ affiliateLink, itemName, isVisible = true }) => {
  if (!isVisible) return null;

  const handleBuyClick = () => {
    if (affiliateLink && affiliateLink.trim() !== "") {
      // Mở link affiliate trong tab mới
      window.open(affiliateLink, "_blank", "noopener,noreferrer");
    } else {
      // Thông báo nếu chưa có link
      alert("Link mua hàng sẽ được cập nhật sớm!");
    }
  };

  const hasLink = affiliateLink && affiliateLink.trim() !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="mt-6 space-y-3"
    >
      {/* Divider */}
      <div className="border-t border-slate-200 dark:border-slate-700"></div>

      {/* Buy Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-xl border-2 border-green-200 dark:border-green-800">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-green-500 text-white p-2 rounded-lg">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-800 dark:text-white mb-1">
              Bạn thích {itemName}?
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Mua ngay để nâng cấp xe của bạn!
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: hasLink ? 1.02 : 1 }}
          whileTap={{ scale: hasLink ? 0.98 : 1 }}
          onClick={handleBuyClick}
          disabled={!hasLink}
          className={`cursor-pointer w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
            hasLink
              ? "cursor-pointer from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl"
              : "cursor-not-allowed bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400"
          }`}
        >
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
          <span>{hasLink ? "Mua ngay" : "Sắp có hàng"}</span>
          {hasLink && <ExternalLink className="w-4 h-4 cursor-pointer" />}
        </motion.button>

        {/* Info Message */}
        {!hasLink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Link mua hàng sẽ được cập nhật sớm</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
