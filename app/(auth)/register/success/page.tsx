import { getPageMetadata } from "@/utils/config";
import RegisterSuccessClient from "./success-client";

export const metadata = getPageMetadata({
  title: "Account Created",
  description: "Your EduAIPro school account has been created successfully.",
  path: "/register/success",
  noIndex: true,
});

export default function RegisterSuccess() {
  return <RegisterSuccessClient />;
}
