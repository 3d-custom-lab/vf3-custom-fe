import { motion } from "framer-motion";
import { Check } from "lucide-react";

/**
 * Component để hiển thị danh sách các bộ phận có thể chọn
 * @param {array} parts - Danh sách các bộ phận
 * @param {string} selectedId - ID của bộ phận đang được chọn
 * @param {function} onSelect - Callback khi chọn bộ phận
 */
export const PartSelector = ({ parts, selectedId, onSelect }) => {
  return (
    <div className="space-y-3">
      {parts.map((part) => {
        const isSelected = selectedId === part.id;
        
        return (
          <motion.button
            key={part.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(part.id)}
            className={`w-full p-4 rounded-xl text-left transition-all relative ${
              isSelected
                ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-400 ring-offset-2"
                : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="font-semibold mb-1">{part.name}</div>
                <div className={`text-sm ${isSelected ? 'opacity-90' : 'opacity-70'}`}>
                  {part.description}
                </div>
              </div>
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="shrink-0"
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              )}
            </div>

            {/* Preview thumbnail indicator - có thể mở rộng sau */}
            {part.thumbnail && (
              <div className="mt-2 text-xs opacity-60">
                {isSelected ? "✓ Đã chọn" : "Nhấn để xem"}
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
