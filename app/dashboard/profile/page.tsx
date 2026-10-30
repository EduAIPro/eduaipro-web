"use client";
import {
  ChangePassword,
  CpdPathways,
  EditProfile,
  ProfessionalBackgroundCard,
  ProfileHeader,
  SubscriptionCard,
  UserInfo,
} from "@/components/dashboard/profile";
import useUser from "@/hooks/use-user";
import { Staff } from "@/types/user";
import { useMemo } from "react";

const CARD_STYLE = {
  border: "1px solid #E5E7EB",
  boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
};

const ProfilePage = () => {
  const { user, staff, refetch } = useUser();
  const userDetails = useMemo(
    () => ({
      userFirstName: user?.firstName ?? "",
      userLastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phoneNumber: user?.phoneNumber ?? "",
    }),
    [user],
  );

  const userImageInfo = useMemo(
    () => ({
      name: user ? `${user?.firstName} ${user?.lastName}` : "",
      email: user?.email ?? "",
      profilePicUrl: user?.profileImageUrl ?? "",
    }),
    [user],
  );
  return (
    <>
      <ProfileHeader user={userImageInfo} refetch={refetch} />
      <section className="mt-6 grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        <div
          className="md:col-span-2 bg-white rounded-xl p-5"
          style={CARD_STYLE}
        >
          <CpdPathways
            acceptedTermsAndConditions={
              !!(staff as Staff)?.acceptedTermsAndConditions
            }
          />
        </div>
        <div className="bg-white rounded-xl p-5 h-fit" style={CARD_STYLE}>
          <UserInfo
            user={{
              ...userDetails,
              fullName: user ? `${user?.firstName} ${user?.lastName}` : "",
              lastLoggedInAt: user?.lastLoggedInAt ?? "",
            }}
          />
        </div>
        <div className="bg-white rounded-xl p-5 h-fit" style={CARD_STYLE}>
          <SubscriptionCard />
        </div>
        <div
          className="md:col-span-2 bg-white rounded-xl p-5 h-fit"
          style={CARD_STYLE}
        >
          <ProfessionalBackgroundCard staff={staff as Staff | null} />
        </div>
        <div
          className="md:col-span-2 bg-white rounded-xl p-5 space-y-6"
          style={CARD_STYLE}
        >
          {/* <EditProfile refetch={refetch} user={userDetails} /> */}
          {/* <div className="border-t border-grey-3 pt-6"> */}
          <ChangePassword />
          {/* </div> */}
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
