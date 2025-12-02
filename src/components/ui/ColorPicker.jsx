import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Palette } from "lucide-react";
import { SketchPicker } from "react-color";
import { PRESET_COLORS } from "../../utils/constants";

export const ColorPicker = ({ value, onChange, partName = "bộ phận" }) => {
  const [showSketchPicker, setShowSketchPicker] = useState(false);
  const [showHexInput, setShowHexInput] = useState(false);

  const handleColorChange = (color) => {
    onChange(color.hex);
  };

  return (
    <div className="space-y-4">
      {/* Hiển thị màu hiện tại */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Màu {partName}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {value}
          </p>
        </div>
        <div
          className="w-12 h-12 rounded-xl border-2 border-slate-300 dark:border-slate-600 shadow-md"
          style={{ backgroundColor: value }}
        />
      </div>

      {/* Các màu cơ bản */}
      <div>
        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
          Màu cơ bản
        </p>
        <div className="grid grid-cols-3 gap-3">
          {PRESET_COLORS.map((color) => (
            <motion.button
              key={color.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(color.value)}
              className="relative aspect-square rounded-xl shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {/* Border cho màu trắng để dễ nhìn */}
              {color.value === "#FFFFFF" && (
                <div className="absolute inset-0 rounded-xl border-2 border-slate-200 dark:border-slate-700" />
              )}
              
              {/* Checkmark khi được chọn */}
              <AnimatePresence>
                {value === color.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-7 h-7 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4 text-blue-600" strokeWidth={3} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tên màu */}
              <div className="absolute bottom-1 left-0 right-0 text-center">
                <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded-full">
                  {color.name}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bảng màu nâng cao */}
      <div className="space-y-2">
        <button
          onClick={() => setShowSketchPicker(!showSketchPicker)}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
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

        {/* Input màu hex */}
        <button
          onClick={() => setShowHexInput(!showHexInput)}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          {showHexInput ? "Ẩn" : "Hoặc nhập mã màu hex"}
        </button>

        <AnimatePresence>
          {showHexInput && (
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
                  placeholder="#FFFFFF"
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
