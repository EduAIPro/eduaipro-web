import Typography from "@/components/common/ui/Typography";
import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import defaultImage from "@/public/assets/images/default-profile.webp";
import Field from "../common/Field";
import { capitalizeFirstLetter } from "@/utils/text";
import Status from "../common/Status";

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

  const user = {
    name: "King Japser",
    role: "Teacher/Mentor",
    school: "Nnamdi Azikiwe University",
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full p-2 px-3">
      <Typography.H5 className="font-semibold text-xl">Profile</Typography.H5>
      <div className="flex flex-col items-center gap-3 w-full">
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
        <Status status="pending" text="Not Accredited" />

        {/* details */}
        <div className="flex flex-col gap-3 w-full">
          {Object.entries(user).map(([key, value], index) => (
            <Field
              key={index + key}
              title={capitalizeFirstLetter(key)}
              value={capitalizeFirstLetter(value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
