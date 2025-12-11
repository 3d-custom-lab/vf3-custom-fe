import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Facebook,
  Music2,
  Heart,
  Sparkles,
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Facebook className="w-5 h-5" />,
      href: "https://www.facebook.com/profile.php?id=61582449365829",
      label: "Facebook",
      color: "hover:bg-blue-600 hover:border-blue-500",
      bgGlow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]",
    },
    {
      icon: <Music2 className="w-5 h-5" />,
      href: "https://www.tiktok.com/@vf3custom1?lang=vi",
      label: "TikTok",
      color: "hover:bg-pink-600 hover:border-pink-500",
      bgGlow: "hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]",
    },
  ];

  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px]"></div>
      </div>

      {/* Top Border with Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-blue-500/50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Brand & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-900/30">
                    <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm"></div>
                    <Heart className="relative w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      3DCustomLab
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium">
                      <Sparkles className="w-3 h-3" />
                      <span>Công nghệ 3D tiên phong</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                  Nền tảng tùy chỉnh xe VF3 bằng công nghệ 3D hàng đầu Việt Nam.
                  Biến ý tưởng thành hiện thực với trải nghiệm trực quan, chính xác
                  và đầy cảm hứng.
                </p>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
                  Kết Nối Với Chúng Tôi
                </h4>
                <div className="flex gap-2.5">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center justify-center w-11 h-11 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 ${social.color} ${social.bgGlow}`}
                      title={social.label}
                    >
                      <span className="text-slate-400 group-hover:text-white transition-colors duration-300">
                        {social.icon}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
                Thông Tin Liên Hệ
              </h4>

              {/* Phone */}
              <motion.a
                whileHover={{ x: 4 }}
                href="tel:0854075635"
                className="group flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-green-500/50 hover:bg-slate-900 transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all"></div>
                  <div className="relative p-2.5 rounded-lg bg-green-500 shadow-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                    Hotline - Tư Vấn 24/7
                  </p>
                  <p className="text-base text-white font-bold group-hover:text-green-400 transition-colors">
                    085.407.5635
                  </p>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                whileHover={{ x: 4 }}
                href="mailto:3dcustomlab29@gmail.com"
                className="group flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all"></div>
                  <div className="relative p-2.5 rounded-lg bg-blue-500 shadow-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                    Email - Hỗ Trợ
                  </p>
                  <p className="text-base text-white font-bold group-hover:text-blue-400 transition-colors truncate">
                    3dcustomlab29@gmail.com
                  </p>
                </div>
              </motion.a>

              {/* Additional Info */}
              <div className="pt-2 pl-1">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Chúng tôi luôn sẵn sàng hỗ trợ bạn trong hành trình
                  <span className="text-slate-400 font-medium"> tùy chỉnh và cá nhân hóa</span> chiếc VF3 của mình.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative py-6 border-t border-slate-900/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-sm text-slate-500"
            >
              <span>© {currentYear}</span>
              <span className="text-white font-semibold">3DCustomLab</span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                Made with
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                in Vietnam
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 text-sm"
            >
              <a
                href="#privacy"
                className="text-slate-500 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <span className="text-slate-800">•</span>
              <a
                href="#terms"
                className="text-slate-500 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
