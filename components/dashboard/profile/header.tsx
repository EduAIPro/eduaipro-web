import { singleUploadFileKey, updatePersonalInfoKey } from "@/api/keys";
import { singleUploadFile, updatePersonalInfo } from "@/api/mutations";
import ProfilePic from "@/components/svgs/user-profile.svg";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

type ProfileHeaderProps = {
  user: {
    name: string;
    email: string;
    profilePicUrl?: string | null;
  };
  refetch: VoidFunction;
};

export const ProfileHeader = ({ user, refetch }: ProfileHeaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { trigger: uploadFile } = useSWRMutation(
    singleUploadFileKey,
    singleUploadFile
  );
  const { trigger: updateProfile } = useSWRMutation(
    updatePersonalInfoKey,
    updatePersonalInfo
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (e.g., 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      const { url } = await uploadFile({ file });
      await updateProfile({ userProfileImage: url });
      refetch();
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile picture");
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <section className="py-12 bg-[linear-gradient(180deg,_#FFFFFF_0%,_#EBEBEB_100%)] md:-mx-12 -mx-6 px-6 md:px-12 max-md:-mt-6">
      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileChange}
      />

      <div className="flex items-center gap-5">
        <div className="shrink-0 relative group">
          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className="cursor-pointer relative rounded-full overflow-hidden w-[100px] h-[100px]"
          >
            {user?.profilePicUrl ? (
              <Image
                fill
                className="object-cover"
                src={user.profilePicUrl}
                alt="profile img"
              />
            ) : (
              <div className="w-full h-full bg-white flex items-center justify-center">
                <ProfilePic className="w-full h-full" />
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-medium">Change</span>
            </div>

            {/* Loading overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <Loader2 className="animate-spin text-white" size={24} />
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-grey-650">{user?.name ?? "..."}</h2>
          <p className="font-medium text-grey-500">{user?.email ?? "..."}</p>
        </div>
      </div>
    </section>
  );
};
