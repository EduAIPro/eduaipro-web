import CoursesHeroSection from "@/components/courses/CoursesHeroSection";
import CoursesRender from "@/components/courses/CoursesRender";
import Filter from "@/components/courses/Filter";
import StickyHeader from "@/components/courses/StickyHeader";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";
import React from "react";

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
