import { FourStepApproach } from "@/components/bespoke-course-dev/FourStepApproach";
import { HeroSection } from "@/components/bespoke-course-dev/HeroSection";
import { WhySchoolsTrustUs } from "@/components/bespoke-course-dev/WhySchoolsTrustUs";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";
import { getPageMetadata } from "@/utils/config";

export const metadata = getPageMetadata({
  title: "Bespoke Course Development",
  description:
    "Partner with EduAIPro to design a bespoke, accredited CPD course tailored to your school or institution's training needs.",
  path: "/bespoke-course-development",
});

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
