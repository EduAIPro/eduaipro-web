import Typography from "@/components/common/ui/Typography";
import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import defaultImage from "@/public/assets/images/default-profile.webp";

const DashboardProfile = () => {
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>(
    null
  );
  const [imgFile, setImgFile] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full p-2 px-3">
      <Typography.H5 className="font-semibold text-xl">Profile</Typography.H5>
      <div className="flex flex-col items-center gap-1 w-full">
        {/* profile image */}
        <div className="relative flex items-center justify-center w-32 h-32 rounded-full overflow-hidden border">
          <Image
            src={typeof profileImg === "string" ? profileImg : defaultImage}
            alt="user profile image"
            height={300}
            width={300}
            className="w-full h-full object-cover"
          />
          <div
            role="button"
            onClick={() => imageRef?.current?.click()}
            className="absolute flex items-center justify-center bottom-0 h-10 bg-[#00000080] text-lg text-white left-0 right-0"
          >
            <FaCamera />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={imageRef}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <Typography.H5 className="text-success font-semibold">
          Accredited
        </Typography.H5>
        {/* details */}
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center gap-2 p-2 rounded-md border-2">
            <Typography.P className="font-semibold text-lg">Name:</Typography.P>
            <Typography.P>King Japser</Typography.P>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-md border-2">
            <Typography.P className="font-semibold text-lg">Role:</Typography.P>
            <Typography.P>Student</Typography.P>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-md border-2">
            <Typography.P className="font-semibold text-lg">
              School:
            </Typography.P>
            <Typography.P>Some School located somewhere</Typography.P>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
