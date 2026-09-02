import { singleUploadFileKey, updatePersonalInfoKey } from "@/api/keys";
import { singleUploadFile, updatePersonalInfo } from "@/api/mutations";
import ProfilePic from "@/components/svgs/user-profile.svg";
import {
  CameraIcon,
  GraduationCapIcon,
  Loader2,
  SparklesIcon,
} from "lucide-react";
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
    singleUploadFile,
  );
  const { trigger: updateProfile } = useSWRMutation(
    updatePersonalInfoKey,
    updatePersonalInfo,
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
    <section
      className="relative overflow-hidden py-10 md:-mx-12 -mx-6 px-6 md:px-12 max-md:-mt-6"
      style={{
        background:
          "linear-gradient(135deg, #EFF6FF 0%, #F8FAFF 55%, #FFFFFF 100%)",
      }}
    >
      {/* Decorative pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <GraduationCapIcon
          className="absolute -right-4 -top-6 rotate-12 text-[#1A56DB]/[0.06]"
          size={160}
        />
        <SparklesIcon
          className="absolute right-24 bottom-2 text-[#1A56DB]/[0.08] max-md:hidden"
          size={40}
        />
      </div>

      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileChange}
      />

      <div className="relative flex items-center gap-5">
        <div className="shrink-0 relative group">
          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className="cursor-pointer relative rounded-full overflow-hidden w-[100px] h-[100px] ring-4 ring-white shadow-[0_4px_20px_rgba(26,86,219,0.18)]"
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

          {/* Camera badge */}
          <button
            type="button"
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#1A56DB] text-white flex items-center justify-center ring-2 ring-white shadow-sm hover:bg-[#1442ad] transition-colors"
            aria-label="Change profile picture"
          >
            <CameraIcon size={13} />
          </button>
        </div>
        <div>
          <h2 className="font-bold text-lg text-grey-800">
            {user?.name ?? "..."}
          </h2>
          <p className="font-medium text-grey-500 text-sm mt-0.5">
            {user?.email ?? "..."}
          </p>
          <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#1A56DB] bg-[#1A56DB]/10 rounded-full px-2.5 py-1">
            <GraduationCapIcon size={12} />
            CPD Learner
          </span>
        </div>
      </div>
    </section>
  );
};
