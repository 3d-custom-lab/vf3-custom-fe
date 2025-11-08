import { motion } from "framer-motion";

export const Card = ({ children, className = "", hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={
        hover ? { y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" } : {}
      }
      className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};
