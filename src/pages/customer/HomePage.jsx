import Header from "../../components/layout/Header";
import HeroSection from "../../components/landing/HeroSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import ShowcaseSection from "../../components/landing/ShowcaseSection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import CTASection from "../../components/landing/CTASection";
import Footer from "../../components/layout/Footer";

function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-950 to-black">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default HomePage;
