"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ChangePassword = () => {
  type PasswordData = {
    formerPassword: string;
    newPassword: string;
    confirmPassword: string;
  };

  const [passwordData, setPasswordData] = useState<PasswordData>({
    formerPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");

  const handlePasswordChange = (field: keyof PasswordData, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New password and Confirm password must match.");
      return;
    }

    console.log("Saving password:", passwordData);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold text-[#141414]">
          Change Password
        </p>
        <hr className="bg-[#DBDBDB]" />
      </div>

      
      <div className="mt-6 w-full max-w-[781px] mx-auto space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
          <label
            htmlFor="formerPassword"
            className="text-sm font-medium text-[#656565] sm:w-[210px]"
          >
            Former Password:
          </label>
          <Input
            id="formerPassword"
            type="password"
            value={passwordData.formerPassword}
            onChange={(e) =>
              handlePasswordChange("formerPassword", e.target.value)
            }
            className="bg-gray-50 w-full"
            placeholder="••••••••"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
          <label
            htmlFor="newPassword"
            className="text-sm font-medium text-[#656565] sm:w-[210px]"
          >
            New Password:
          </label>
          <Input
            id="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              handlePasswordChange("newPassword", e.target.value)
            }
            className="bg-gray-50 w-full"
            placeholder="••••••••"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-[#656565] sm:w-[210px]"
          >
            Confirm Password:
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              handlePasswordChange("confirmPassword", e.target.value)
            }
            className="bg-gray-50 w-full"
            placeholder="••••••••"
          />
        </div>


        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
      </div>

      <div className="mt-6 justify-end sm:justify-end w-full max-w-[781px] mx-auto flex xl:float-right xl:-translate-y-[63px]">
        <Button
          variant="default"
          onClick={handlePasswordSave}
          className="w-full sm:w-auto"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
