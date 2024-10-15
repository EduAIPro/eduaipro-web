import Container from "@/components/common/ui/Container";
import HeroSection from "@/components/landing-page/HeroSection";
import ReasonsToChooseUs from "@/components/landing-page/ReasonsToChooseUs";
import Navbar from "@/components/navigation/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <HeroSection />
      <ReasonsToChooseUs />
    </Container>
  );
}
