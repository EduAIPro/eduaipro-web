import Container from "@/components/common/ui/Container";
import CoursesHeroSection from "@/components/courses/CoursesHeroSection";
import CoursesRender from "@/components/courses/CoursesRender";
import Filter from "@/components/courses/Filter";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";
import React from "react";

export default function CoursesPage() {
  return (
    <Container>
      <CoursesHeroSection />

      <CoursesRender />
      <CallToAction />
      <Footer />
    </Container>
  );
}
