import Container from "@/components/common/ui/Container";
import BoostCareer from "@/components/landing-page/BoostCareer";
import CoursesList from "@/components/landing-page/CoursesList";
import HeroSection from "@/components/landing-page/HeroSection";
import ReasonsToChooseUs from "@/components/landing-page/ReasonsToChooseUs";
import UserTypes from "@/components/landing-page/UserTypes";
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
    </Container>
  );
}
