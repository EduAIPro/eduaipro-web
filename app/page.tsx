import Container from "@/components/common/ui/Container";
import BoostCareer from "@/components/landing-page/BoostCareer";
import CallToAction from "@/components/landing-page/CallToAction";
import CoursesList from "@/components/landing-page/CoursesList";
import HeroSection from "@/components/landing-page/HeroSection";
import ReasonsToChooseUs from "@/components/landing-page/ReasonsToChooseUs";
import Testimonials from "@/components/landing-page/Testimonials";
import UserTypes from "@/components/landing-page/UserTypes";
import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <HeroSection />
      <ReasonsToChooseUs />
      <UserTypes />
      <BoostCareer />
      <CoursesList />
      <Testimonials />
      <CallToAction />
      <Footer />
    </Container>
  );
}
