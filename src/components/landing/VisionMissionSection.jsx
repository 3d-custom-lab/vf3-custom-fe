import { motion } from "framer-motion";
import { Target, Compass, Heart, Zap, Users, Link2 } from "lucide-react";

function VisionMissionSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Về Chúng Tôi
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20 bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Giới Thiệu 3DCustomLab
              </h3>
            </div>
          </div>
          <p className="text-lg text-slate-300 leading-relaxed">
            <span className="font-semibold text-white">3DCustomLab</span> là một trang web công nghệ cao được phát triển nhằm mang đến trải nghiệm tùy chỉnh xe VF3 một cách trực quan, linh hoạt và chính xác ngay trên nền tảng di động. Website cho phép người dùng thử nghiệm các kiểu độ xe phổ biến như{" "}
            <span className="text-blue-400 font-medium">thay đổi mâm xe, phối màu sơn, dán decal, lắp bodykit</span> và nhiều phụ kiện khác trong không gian mô phỏng 3D chân thực, trước khi đưa ra quyết định độ xe ngoài đời thực. Nền tảng gợi ý các gara uy tín gần nhất để người dùng có thể biến bản độ của mình thành hiện thực.
          </p>
        </motion.div>

        {/* Vision & Mission Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
            
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">Tầm Nhìn</h3>
              </div>
              
              <p className="text-slate-300 text-lg leading-relaxed">
                Trở thành <span className="text-blue-400 font-semibold">nền tảng số hàng đầu Việt Nam</span> về cá nhân hóa và trải nghiệm độ xe, đồng thời là sàn thương mại điện tử uy tín cho phụ kiện và dịch vụ độ xe, nơi người dùng có thể{" "}
                <span className="text-white font-medium">mua sắm – trải nghiệm – kết nối</span> một cách an toàn và tiện lợi.
              </p>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
            
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <Compass className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">Sứ Mệnh</h3>
              </div>
              
              <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
                <p>
                  <span className="text-purple-400 font-semibold">Đặt người dùng làm trung tâm</span> trong mọi quyết định, chúng tôi xây dựng một hệ sinh thái độ xe minh bạch và dễ tiếp cận.
                </p>
                <p>
                  Kết nối người dùng với các gara uy tín, giúp việc tư vấn trở nên{" "}
                  <span className="text-white font-medium">nhanh hơn – chính xác hơn</span>, đồng thời hỗ trợ mua sắm phụ kiện và hiện thực hóa phong cách độ xe.
                </p>
                <p>
                  Xây dựng <span className="text-white font-medium">cộng đồng sáng tạo VF3</span> nơi mọi ý tưởng đều được chia sẻ và lan tỏa.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Giá Trị Cốt Lõi
            </h3>
            <p className="text-xl text-blue-400 font-semibold">"3D Custom Lab"</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 3D Technology */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl">
                  <Zap className="w-10 h-10 text-white" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-white text-center mb-3">
                Công Nghệ 3D
              </h4>
              <p className="text-slate-300 text-center leading-relaxed">
                Giúp người dùng nhìn trước bản độ, tự tin lựa chọn và rút ngắn khoảng cách giữa ý tưởng & xe thật.
              </p>
            </motion.div>

            {/* Customer-Centric */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-white text-center mb-3">
                Customer-Centric
              </h4>
              <p className="text-slate-300 text-center leading-relaxed">
                Mọi tính năng, trải nghiệm và quyết định sản phẩm đều xoay quanh nhu cầu – sự tiện lợi – sự hài lòng của người dùng.
              </p>
            </motion.div>

            {/* Linkage */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-green-500/50 transition-all"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-linear-to-br from-green-500 to-emerald-500 rounded-2xl">
                  <Link2 className="w-10 h-10 text-white" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-white text-center mb-3">
                Linkage (Kết Nối)
              </h4>
              <p className="text-slate-300 text-center leading-relaxed">
                Kết nối người dùng – cộng đồng – garage uy tín, giúp biến bản thiết kế 3D thành sản phẩm thực tế nhanh và chính xác.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default VisionMissionSection;
