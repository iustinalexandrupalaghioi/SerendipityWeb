import { CallToActionSection } from "@/components/presentation/CallToActionSection";
import { CertificateSection } from "@/components/presentation/CourseCertificateSection";
import { CourseDetailSection } from "@/components/presentation/CourseDetailSection";
import CoursesPreview from "@/components/presentation/CoursesPreview";
import { FeaturesSection } from "@/components/presentation/FeaturesSection";
import HeroSection from "@/components/presentation/HeroSection";
import ServicesPreview from "@/components/presentation/ServicesPreview";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ServicesPreview />
      <CourseDetailSection />
      <CoursesPreview />
      <CertificateSection />
      <CallToActionSection />
    </>
  );
};

export default LandingPage;
