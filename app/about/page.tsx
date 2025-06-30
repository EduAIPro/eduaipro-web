import { FAQSection } from "@/components/about-us/FAQ";
import { HeroSection } from "@/components/about-us/HeroSection";
import { OurApproach } from "@/components/about-us/OurApproach";
import { OurTeam } from "@/components/about-us/OurTeam";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";
import { getPageMetadata } from "@/utils/config";

export const metadata = getPageMetadata("About Us");

export default function AboutPage() {
  return (
    <div>
      <HeroSection />
      <OurTeam />
      <OurApproach />
      <FAQSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
