import BoostCareer from "@/components/landing-page/BoostCareer";
import CallToAction from "@/components/landing-page/CallToAction";
import CoursesList from "@/components/landing-page/CoursesList";
import HeroSection from "@/components/landing-page/HeroSection";
import OurFeatures from "@/components/landing-page/OurFeatures";
import ReasonsToChooseUs from "@/components/landing-page/ReasonsToChooseUs";
import Testimonials from "@/components/landing-page/Testimonials";
import Footer from "@/components/navigation/Footer";
import { getPageMetadata } from "@/utils/config";

export const metadata = getPageMetadata("Home");

export default function Home() {
  return (
    <>
      <HeroSection />
      <ReasonsToChooseUs />
      <OurFeatures />
      {/* <UserTypes /> */}
      <BoostCareer />
      <CoursesList />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}
