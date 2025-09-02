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
      <div className="flex flex-col gap-[10px]">
        <p className="text-[18px] font-semibold text-[#141414]">
          Change Password
        </p>
        <hr className="bg-[#DBDBDB]" />
      </div>

      <div className="mt-[30px] w-[781px] mx-auto">
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[20px]">
            <label
              htmlFor="formerPassword"
              className="text-[14px] font-medium text-[#656565] w-[210px]">
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
          <div className="flex items-center gap-[20px]">
            <label
              htmlFor="newPassword"
              className="text-[14px] font-medium text-[#656565] w-[210px]">
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
          <div className="flex items-center gap-[20px]">
            <label
              htmlFor="confirmPassword"
              className="text-[14px] font-medium text-[#656565] w-[210px]">
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
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
      </div>

      <div className="flex float-right -translate-y-[40px]">
        <Button variant="default" onClick={handlePasswordSave}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
