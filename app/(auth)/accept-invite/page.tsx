import { getPageMetadata } from "@/utils/config";
import AcceptInvitePageClient from "./accept-invite-client";

export const metadata = getPageMetadata({
  title: "Accept Invitation",
  description: "Accept your invitation to join EduAIPro.",
  path: "/accept-invite",
  noIndex: true,
});

export default function AcceptInvitePage() {
  return <AcceptInvitePageClient />;
}
