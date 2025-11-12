import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useAuthStore } from "../../store/authStore";

const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/studio");
    } else {
      navigate("/auth");
    }
  };

  return (
    <section
      id="hero"
      className="pt-24 pb-16 md:pt-32 md:pb-48 gradient-dark relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left text section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              3D Custom Lab
              <span className="block bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-2">
                Tự tay tạo nên phong cách
              </span>
              <span className="block bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                cho chiếc VF3 của bạn
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Trải nghiệm công nghệ 3D tiên tiến để tùy chỉnh màu sơn, lốp xe,
              mui xe và ngoại thất. Biến ý tưởng của bạn thành hiện thực trong
              chớp mắt.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={handleGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer bg-linear-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 glow-cyan"
              >
                {isAuthenticated
                  ? "Bắt đầu tùy chỉnh ngay"
                  : "Đăng nhập để bắt đầu"}
                <FaArrowRight />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right image section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="../../../img/car-home.png"
                alt="VF3 Custom"
                className="w-full h-auto"
              />
            </div>

            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-500/30 rounded-full blur-3xl opacity-70"
            />

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl opacity-70"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
