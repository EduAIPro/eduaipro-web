import ProfilePic from "@/components/svgs/user-profile.svg";
import Image from "next/image";
type ProfileHeaderProps = {
  user: {
    name: string;
    email: string;
    profilePicUrl?: string | null;
  };
};

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <section className="py-12 bg-[linear-gradient(180deg,_#FFFFFF_0%,_#EBEBEB_100%)] md:-mx-12 -mx-6 px-6 md:px-12 max-md:-mt-6">
      <div className="flex items-center gap-5">
        <div className="shrink-0">
          {user?.profilePicUrl ? (
            <Image
              width={100}
              height={100}
              className="rounded-full"
              src={user.profilePicUrl}
              alt="profile img"
            />
          ) : (
            <ProfilePic />
          )}
        </div>
        <div>
          <h2 className="font-semibold text-grey-650">{user?.name ?? "..."}</h2>
          <p className="font-medium text-grey-500">{user?.email ?? "..."}</p>
        </div>
      </div>
    </section>
  );
};
