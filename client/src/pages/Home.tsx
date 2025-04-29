import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import QuoteSection from "@/components/QuoteSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <QuoteSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
