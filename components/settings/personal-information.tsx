"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const PersonalInformation = () => {
  type PersonalInfo = {
    fullName: string;
    email: string;
    phoneNumber: string;
    position: string;
  };

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "Elmer Boyle",
    email: "elmer_boyle1@gmail.com",
    phoneNumber: "(706)-615-0242",
    position: "Principal",
  });

  const handlePersonalInfoChange = (
    field: keyof PersonalInfo,
    value: string
  ) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePersonalInfoSave = () => {
    console.log("Saving personal info:", personalInfo);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold text-[#141414]">
          Personal Information
        </p>
        <hr className="bg-[#DBDBDB]" />
      </div>

      <div className="mt-6 w-full max-w-[781px] mx-auto space-y-4">
      
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-[#656565] sm:w-[210px]"
          >
            Full Name:
          </label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) =>
              handlePersonalInfoChange("fullName", e.target.value)
            }
            className="bg-gray-50 w-full"
          />
        </div>

   
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-[#656565] sm:w-[210px]"
          >
            Email Address:
          </label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
            className="bg-gray-50 w-full"
          />
        </div>

   
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-[#656565] sm:w-[210px]"
          >
            Phone Number:
          </label>
          <Input
            id="phone"
            value={personalInfo.phoneNumber}
            onChange={(e) =>
              handlePersonalInfoChange("phoneNumber", e.target.value)
            }
            className="bg-gray-50 w-full"
          />
        </div>

    
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
          <label
            htmlFor="position"
            className="text-sm font-medium text-[#656565] sm:w-[210px]"
          >
            Position:
          </label>
          <Input
            id="position"
            value={personalInfo.position}
            onChange={(e) =>
              handlePersonalInfoChange("position", e.target.value)
            }
            className="bg-gray-50 w-full"
          />
        </div>
      </div>

      
      <div className="mt-6 justify-end sm:justify-end w-full max-w-[781px] mx-auto flex xl:float-right xl:-translate-y-[63px]">
        <Button
          variant="default"
          onClick={handlePersonalInfoSave}
          className="w-full sm:w-auto"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default PersonalInformation;
