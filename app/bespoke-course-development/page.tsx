import { FourStepApproach } from "@/components/bespoke-course-dev/FourStepApproach";
import { HeroSection } from "@/components/bespoke-course-dev/HeroSection";
import { WhySchoolsTrustUs } from "@/components/bespoke-course-dev/WhySchoolsTrustUs";
import Pill from "@/components/common/ui/Pill";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";
import { CustomCard, SchoolProCard } from "@/components/packages/school-plans";
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
      <section className="py-10 max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto space-y-6">
        <div className="space-y-2.5 text-center">
          <Pill text="Our School Packages" pillBg="#F1F5FF" />
          <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl">
            We Offer Flexible School Plans to Suit Your Needs
          </h2>
        </div>
        <SchoolProCard />
        <CustomCard />
      </section>
      <CallToAction />
      <Footer />
    </>
  );
}
