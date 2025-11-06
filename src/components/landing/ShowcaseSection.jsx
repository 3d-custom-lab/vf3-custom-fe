import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const showcaseItems = [
  {
    title: "Sport Edition",
    color: "Đỏ Racing",
    image:
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Luxury Black",
    color: "Đen Bóng",
    image:
      "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Pearl White",
    color: "Trắng Ngọc Trai",
    image:
      "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Ocean Blue",
    color: "Xanh Đại Dương",
    image:
      "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Sunset Orange",
    color: "Cam Hoàng Hôn",
    image:
      "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Silver Storm",
    color: "Bạc Metallic",
    image:
      "https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const ShowcaseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="showcase"
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
            Bộ sưu tập custom
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Khám phá những mẫu xe VF3 đã được tùy chỉnh bởi cộng đồng
          </p>
        </motion.div>

        {/* Showcase Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/30 transition-all cursor-pointer border border-cyan-500/20 hover:border-cyan-500/50"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <h3 className="text-white text-2xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-cyan-300 text-sm">{item.color}</p>
              </motion.div>

              {/* Bottom Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-gray-800 p-4">
                <h3 className="text-white text-xl font-bold mb-1">
                  {item.title}
                </h3>
                <p className="text-cyan-400 text-sm">{item.color}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
