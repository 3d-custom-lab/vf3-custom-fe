import Header from "../../components/layout/Header";
import HeroSection from "../../components/landing/HeroSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import ShowcaseSection from "../../components/landing/ShowcaseSection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import VisionMissionSection from "../../components/landing/VisionMissionSection";
import Footer from "../../components/layout/Footer";

function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0F1F]">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <VisionMissionSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}

export default HomePage;
