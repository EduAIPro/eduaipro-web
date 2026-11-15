import { getPageMetadata } from "@/utils/config";
import VerifyEmailClient from "./verify-email-client";

export const metadata = getPageMetadata({
  title: "Verify Your Email",
  description: "Verify your email address to activate your EduAiPro account.",
  path: "/verify-email",
  noIndex: true,
});

export default function VerifyEmailPage() {
  return <VerifyEmailClient />;
}
