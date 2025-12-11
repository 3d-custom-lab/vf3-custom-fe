import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Nguyễn Tuấn Vũ",
    role: "Chủ xe VF3",
    content:
      "Công nghệ 3D tuyệt vời! Tôi đã thử hàng chục màu sơn trước khi quyết định. Rất hài lòng với kết quả.",
    rating: 5,
  },
  {
    name: "Nguyễn Thanh Tùng",
    role: "Designer",
    content:
      "Giao diện đẹp, dễ sử dụng. Tôi có thể tùy chỉnh mọi chi tiết từ màu sơn đến mâm xe một cách trực quan.",
    rating: 5,
  },
  {
    name: "Nguyễn Đàm Thái Sơn",
    role: "Doanh nhân",
    content:
      "Nền tảng tuyệt vời để thể hiện phong cách cá nhân. Render 3D cực kỳ chi tiết và chân thực.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-[#0A0F1F] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Hàng nghìn người dùng đã tin tùy chọn và tạo nên phong cách riêng
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-gray-800/50 p-8 rounded-2xl hover:shadow-2xl transition-all border border-cyan-500/30 hover:border-cyan-500/60 backdrop-blur-sm glow-cyan"
            >
              <div className="flex items-center mb-6">
                <span className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-cyan-500" />
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-cyan-400" />
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
