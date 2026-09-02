"use client";
import {
  ChangePassword,
  EditProfile,
  ProfileHeader,
  UserInfo,
} from "@/components/dashboard/profile";
import useUser from "@/hooks/use-user";
import { useMemo } from "react";

const ProfilePage = () => {
  const { user, refetch } = useUser();
  const userDetails = useMemo(
    () => ({
      userFirstName: user?.firstName ?? "",
      userLastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phoneNumber: user?.phoneNumber ?? "",
    }),
    [user]
  );

  const userImageInfo = useMemo(
    () => ({
      name: user ? `${user?.firstName} ${user?.lastName}` : "",
      email: user?.email ?? "",
      profilePicUrl: user?.profileImageUrl ?? "",
    }),
    [user]
  );
  return (
    <>
      <ProfileHeader user={userImageInfo} refetch={refetch} />
      <section className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        <div
          className="bg-white rounded-xl p-5 h-fit"
          style={{
            border: "1px solid #E5E7EB",
            boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
          }}
        >
          <UserInfo
            user={{
              ...userDetails,
              fullName: user ? `${user?.firstName} ${user?.lastName}` : "",
              lastLoggedInAt: user?.lastLoggedInAt ?? "",
            }}
          />
        </div>
        <div
          className="xl:col-span-2 bg-white rounded-xl p-5 space-y-6"
          style={{
            border: "1px solid #E5E7EB",
            boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
          }}
        >
          <EditProfile refetch={refetch} user={userDetails} />
          <div className="border-t border-grey-3 pt-6">
            <ChangePassword />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
