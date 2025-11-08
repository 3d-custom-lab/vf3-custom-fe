import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { PRESET_COLORS } from "../../utils/constants";

export const ColorPicker = ({ value, onChange }) => {
  const [showCustom, setShowCustom] = useState(false);

  return (
    <div className="space-y-4">
      {/* Các màu preset */}
      <div className="grid grid-cols-4 gap-3">
        {PRESET_COLORS.map((color) => (
          <motion.button
            key={color.value}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(color.value)}
            className="relative aspect-square rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            style={{ backgroundColor: color.value }}
          >
            <AnimatePresence>
              {value === color.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-5 h-5 text-slate-800" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Màu tùy chỉnh */}
      <div>
        <button
          onClick={() => setShowCustom(!showCustom)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showCustom ? "Ẩn" : "Chọn màu tùy chỉnh"}
        </button>

        <AnimatePresence>
          {showCustom && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-2"
            >
              <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-12 rounded-xl cursor-pointer"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
