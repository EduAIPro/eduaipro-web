import { FourStepApproach } from "@/components/bespoke-course-dev/FourStepApproach";
import { HeroSection } from "@/components/bespoke-course-dev/HeroSection";
import { WhySchoolsTrustUs } from "@/components/bespoke-course-dev/WhySchoolsTrustUs";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";
import { getPageMetadata } from "@/utils/config";

export const metadata = getPageMetadata("Bespoke Course Development");

export default function BespokeCourseDevelopment() {
  return (
    <>
      <HeroSection />
      <FourStepApproach />
      <WhySchoolsTrustUs />
      <CallToAction />
      <Footer />
    </>
  );
}
