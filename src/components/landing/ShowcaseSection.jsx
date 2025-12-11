import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const showcaseItems = [
  {
    title: "Off-road",
    color: "pazo design",
    image:
      "/img/products/Off-road (pazo design).webp",
  },
  {
    title: "Tiểu Defender",
    color: "Xuân Hoàn Mastercare",
    image:
      "/img/products/Tiểu Defender (Xuân Hoàn Mastercare).webp",
  },
  {
    title: "Tiểu G63",
    color: "phamvinh auto",
    image:
      "/img/products/Tiểu G63 ( phamvinh auto).webp",
  },
  {
    title: "Bodykit hầm hố",
    color: "ZKAR",
    image:
      "/img/products/Bodykit hầm hố ( ZKAR).webp",
  },
  {
    title: "Full hồng",
    color: "MMK auto",
    image:
      "/img/products/Full hồng (MMK auto).webp",
  },
  {
    title: "Hello Kitty",
    color: "Khắc Trung oto",
    image:
      "/img/products/Bé Hường Hello Kitty (Khắc Trung o tô).webp",
  }
];

const ShowcaseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="showcase"
      ref={ref}
      className="py-16 md:py-24 bg-[#0A0F1F] relative overflow-hidden"
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
                className="absolute inset-0 bg-black/70 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <h3 className="text-white text-2xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-cyan-300 text-sm">{item.color}</p>
              </motion.div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
