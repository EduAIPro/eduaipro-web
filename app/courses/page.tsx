import CoursesHeroSection from "@/components/courses/CoursesHeroSection";
import CoursesRender from "@/components/courses/CoursesRender";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";
import { getPageMetadata } from "@/utils/config";

export const metadata = getPageMetadata("Courses");

export default function CoursesPage() {
  return (
    <>
      <CoursesHeroSection />

      <CoursesRender />
      <CallToAction />
      <Footer />
    </>
  );
}
