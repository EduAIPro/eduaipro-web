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
      <ProfileHeader user={userImageInfo} />
      <section className="mt-5 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        <div className="border border-grey-400 bg-white rounded-lg p-5">
          <UserInfo
            user={{
              ...userDetails,
              fullName: user ? `${user?.firstName} ${user?.lastName}` : "",
              lastLoggedInAt: user?.lastLoggedInAt ?? "",
            }}
          />
        </div>
        <div className="xl:col-span-2 border border-grey-400 bg-white rounded-lg p-5 space-y-5">
          <EditProfile refetch={refetch} user={userDetails} />
          <ChangePassword />
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
