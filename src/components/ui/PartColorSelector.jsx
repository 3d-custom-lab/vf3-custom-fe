import { motion } from "framer-motion";
import { useCustomizationStore } from "../../store/customizationStore";
import { COLORABLE_PARTS } from "../../utils/constants";
import { Car, Eye, Chrome, Sparkles, CarFront, Box } from "lucide-react";

const PART_ICONS = {
  body: Car,
  roof: CarFront,
  "body-plastic": Box,
  mirrors: Eye,
  "front-chrome": Chrome,
  "rear-chrome": Chrome,
};

const PART_LABELS = {
  body: "Thân xe",
  roof: "Nóc xe",
  "body-plastic": "Nhựa thân",
  mirrors: "Gương",
  "front-chrome": "Crom trước",
  "rear-chrome": "Crom sau",
};

export const PartColorSelector = () => {
  const { selectedColorPart, partColors, setSelectedColorPart } = useCustomizationStore();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Chọn bộ phận để tô màu
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {COLORABLE_PARTS.map((part) => {
          const Icon = PART_ICONS[part];
          const isSelected = selectedColorPart === part;
          const currentColor = partColors[part];

          return (
            <motion.button
              key={part}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedColorPart(part)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-200
                ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
                    : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-blue-400 hover:shadow-md"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md border-2 border-white dark:border-slate-700"
                  style={{ backgroundColor: currentColor }}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      // Chọn màu icon dựa trên độ sáng của background
                      currentColor === "#FFFFFF" || currentColor === "#ECC94B" || currentColor === "#9AE6B4" || currentColor === "#FBB6CE"
                        ? "text-slate-700"
                        : "text-white"
                    }`}
                    strokeWidth={2}
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {PART_LABELS[part]}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {currentColor}
                  </p>
                </div>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="selected-part"
                  className="absolute inset-0 border-2 border-blue-500 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {selectedColorPart && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Đang chọn: <span className="font-semibold">{PART_LABELS[selectedColorPart]}</span>
          </p>
        </div>
      )}
    </div>
  );
};
