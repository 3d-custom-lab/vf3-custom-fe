import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import HeroSection from "../../components/landing/HeroSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import ShowcaseSection from "../../components/landing/ShowcaseSection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import CTASection from "../../components/landing/CTASection";

function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  // Xử lý đăng xuất
  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}

export default HomePage;
