import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Palette } from "lucide-react";
import { SketchPicker } from "react-color";
import { PRESET_COLORS } from "../../utils/constants";

export const ColorPicker = ({ value, onChange }) => {
  const [showCustom, setShowCustom] = useState(false);
  const [showSketchPicker, setShowSketchPicker] = useState(false);

  const handleColorChange = (color) => {
    // react-color returns color object, we need hex value
    onChange(color.hex);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Chọn màu sơn
        </h3>
        <div
          className="w-8 h-8 rounded-lg border-2 border-slate-300 dark:border-slate-600"
          style={{ backgroundColor: value }}
        />
      </div>

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
            title={color.name}
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

      {/* Màu tùy chỉnh với react-color */}
      <div className="space-y-2">
        <button
          onClick={() => setShowSketchPicker(!showSketchPicker)}
          className="w-full px-4 py-3 bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Palette className="w-5 h-5" />
          {showSketchPicker ? "Đóng bảng màu nâng cao" : "Mở bảng màu nâng cao"}
        </button>

        <AnimatePresence>
          {showSketchPicker && (
            <motion.div
              initial={{ height: 0, opacity: 0, scale: 0.95 }}
              animate={{ height: "auto", opacity: 1, scale: 1 }}
              exit={{ height: 0, opacity: 0, scale: 0.95 }}
              className="overflow-hidden"
            >
              <div className="flex justify-center py-4">
                <SketchPicker
                  color={value}
                  onChange={handleColorChange}
                  disableAlpha={false}
                  presetColors={PRESET_COLORS.map(c => c.value)}
                  width="100%"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fallback color input */}
        <button
          onClick={() => setShowCustom(!showCustom)}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          {showCustom ? "Ẩn" : "Hoặc nhập mã màu hex"}
        </button>

        <AnimatePresence>
          {showCustom && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-16 h-12 rounded-lg cursor-pointer border-2 border-slate-300 dark:border-slate-600"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="#1E40AF"
                  className="flex-1 px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
