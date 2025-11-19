import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Nguyễn Tuấn Vũ',
    role: 'Chủ xe VF3',
    avatar: 'https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/558436371_1216966850473615_8734924411749036286_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGRKy0k5bbL-HnSUmoqrUGkzIEqV8ZtgCbMgSpXxm2AJsYFa7yQJLVeWn0GYDThG_MwljCHWaRLnPMVbEV_iX86&_nc_ohc=fPS7vNXcvlIQ7kNvwGfIX5z&_nc_oc=AdmbTkUKolyPg-pdI-CuU1qjK9Rmu4issw7pJ-pC496-UibSgeN2FJwR2sZJvUX2g6jYgsXBGU3U-qNWaV3uZRpz&_nc_zt=23&_nc_ht=scontent.fhan3-2.fna&_nc_gid=urbTvi1hnIUNnAYIU1MiWg&oh=00_AfgYlPhR9uIaZzUlCXmo01-R_q4sTkEmtb81VOycw3sCOQ&oe=692322FF',
    content: 'Công nghệ 3D tuyệt vời! Tôi đã thử hàng chục màu sơn trước khi quyết định. Rất hài lòng với kết quả.',
    rating: 5,
  },
  {
    name: 'Nguyễn Thanh Tùng',
    role: 'Designer',
    avatar: 'https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/572009459_2672251156472109_5787999813392930188_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEksOT8Q6wC83ljnuKXub8zltqq4dugt6-W2qrh26C3rxjHtfrFSk47dR-wmdywmIDlTnF7OHPZuhGbDD0ADp9r&_nc_ohc=m3mAOaIuD1IQ7kNvwEkHqQO&_nc_oc=Adnu61Ls-Os-5GYBi1r8McRLcBaWOYH5mHNnvW_RhyTXDPW6it6Jq9qiEmzeaMsBwfmHw3GN5RdHgtXrOpi6dvRS&_nc_zt=23&_nc_ht=scontent.fhan3-2.fna&_nc_gid=y2FDf-d4TitekxM7IgLnHg&oh=00_AfgMMcf3zmmtnwjGpCje0znF6nX-YxZcrcKEQBQPjrhcdg&oe=692311E6',
    content: 'Giao diện đẹp, dễ sử dụng. Tôi có thể tùy chỉnh mọi chi tiết từ màu sơn đến mâm xe một cách trực quan.',
    rating: 5,
  },
  {
    name: 'Nguyễn Đàm Thái Sơn',
    role: 'Doanh nhân',
    avatar: 'https://scontent.fhan3-1.fna.fbcdn.net/v/t39.30808-6/419128520_1755277188282232_5375968373233193336_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGINeZnDU9-SgYf9_wmrLPN5zbKzLss59DnNsrMuyzn0KTzTY4xBMMkm95xGl3M9_UPdmtb7IX_gOmZa8f2qbzr&_nc_ohc=QmjUSEqu4DcQ7kNvwFXPij6&_nc_oc=AdmMTcwxXFUBKoeJSAIG76u8RjuVAp8F7Tmogm8FIb1HzarVnY9YuIZAzDcUVI0qVxYVf98Xh-E0B_bB730cl91w&_nc_zt=23&_nc_ht=scontent.fhan3-1.fna&_nc_gid=FgVwo0hno3tqnNOQ6LdC_A&oh=00_AfgoWVO9kWXNHx3EmFSUnhflLu9mYd6X86LiV8_uOZFUhQ&oe=69231AB2',
    content: 'Nền tảng tuyệt vời để thể hiện phong cách cá nhân. Render 3D cực kỳ chi tiết và chân thực.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-24 gradient-dark relative overflow-hidden">
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
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl hover:shadow-2xl transition-all border border-cyan-500/30 hover:border-cyan-500/60 backdrop-blur-sm glow-cyan"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-cyan-500"
                />
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
