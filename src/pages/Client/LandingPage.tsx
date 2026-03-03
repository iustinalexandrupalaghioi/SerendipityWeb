import CertificatesSection from "@/components/presentation/CertificatesSection";
import { CallToActionSection } from "@/components/presentation/CallToActionSection";
import { FeaturesSection } from "@/components/presentation/FeaturesSection";
import HeroSection from "@/components/presentation/HeroSection";
import ServicesPreview from "@/components/presentation/ServicesPreview";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ServicesPreview />
      <CallToActionSection />
      <CertificatesSection />
    </>
  );
};

export default LandingPage;
