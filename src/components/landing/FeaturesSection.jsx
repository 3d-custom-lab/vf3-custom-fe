import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaPalette, FaCog, FaCube, FaEye } from "react-icons/fa";

const features = [
  {
    icon: FaPalette,
    title: "Thay đổi màu sơn",
    description:
      "Khám phá hàng trăm màu sơn cao cấp, từ cổ điển đến hiện đại, áp dụng ngay lập tức với công nghệ 3D.",
  },
  {
    icon: FaCog,
    title: "Thay lốp & mâm xe",
    description:
      "Lựa chọn từ bộ sưu tập lốp và mâm xe đa dạng, phù hợp với mọi phong cách từ thể thao đến sang trọng.",
  },
  {
    icon: FaCube,
    title: "Độ ngoại thất",
    description:
      "Tùy chỉnh mui xe, body kit, đèn LED và các chi tiết ngoại thất khác để tạo nên chiếc xe độc nhất.",
  },
  {
    icon: FaEye,
    title: "Xem trước 3D",
    description:
      "Xoay 360° và zoom chi tiết mọi góc nhìn với công nghệ render 3D siêu thực tế thời gian thực.",
  },
];

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      ref={ref}
      className="py-16 md:py-24 gradient-dark relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Tính năng nổi bật
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Công nghệ 3D tiên tiến giúp bạn tùy chỉnh mọi chi tiết của chiếc VF3
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl hover:shadow-2xl transition-all cursor-pointer border border-cyan-500/30 hover:border-cyan-500/60 backdrop-blur-sm glow-cyan"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6"
                >
                  <Icon className="text-white text-2xl" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
