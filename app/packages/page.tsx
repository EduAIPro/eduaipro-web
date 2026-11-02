import { getPageMetadata } from "@/utils/config";
import PricingPageClient from "./packages-client";

export const metadata = getPageMetadata({
  title: "Pricing & Packages",
  description:
    "Simple, transparent pricing for EduAIPro's accredited CPD packages for teachers and schools.",
  path: "/packages",
});

export default function PricingPage() {
  return <PricingPageClient />;
}
