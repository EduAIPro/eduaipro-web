"use client";

import React, { useState } from "react";
import { Switch } from "../ui/switch";

const Notification = () => {
  type Notifications = {
    newTeacherJoined: true;
    newAdminJoined: true;
    newSchoolRegistered: true;
    certificationRenewalAlert: true;
    accreditationObtained: false;
    courseAccessPeriodUpdate: false;
    courseValidityPeriodUpdate: false;
  };

  const [notifications, setNotifications] = useState<Notifications>({
    newTeacherJoined: true,
    newAdminJoined: true,
    newSchoolRegistered: true,
    certificationRenewalAlert: true,
    accreditationObtained: false,
    courseAccessPeriodUpdate: false,
    courseValidityPeriodUpdate: false,
  });

  const handleNotificationChange = (
    key: keyof Notifications,
    value: boolean
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="w-full">
      {" "}
      <div className="flex flex-col gap-[10px]">
        <p className="text-[18px] font-semibold text-[#141414]">Notification</p>
        <hr className="bg-[#DBDBDB]" />
      </div>
      <div className="mt-[30px] w-[781px] mx-auto">
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center justify-between">
            <label className="text-[14px] font-medium text-[#656565]">
              New Teacher Joined
            </label>
            <Switch
              checked={notifications.newTeacherJoined}
              onCheckedChange={(value) =>
                handleNotificationChange("newTeacherJoined", value)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-[14px] font-medium text-[#656565]">
              New Admin Joined
            </label>
            <Switch
              checked={notifications.newAdminJoined}
              onCheckedChange={(value) =>
                handleNotificationChange("newAdminJoined", value)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-[14px] font-medium text-[#656565]">
              New School Registered
            </label>
            <Switch
              checked={notifications.newSchoolRegistered}
              onCheckedChange={(value) =>
                handleNotificationChange("newSchoolRegistered", value)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-[14px] font-medium text-[#656565]">
              Certification Renewal Alert
            </label>
            <Switch
              checked={notifications.certificationRenewalAlert}
              onCheckedChange={(value) =>
                handleNotificationChange("certificationRenewalAlert", value)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-[14px] font-medium text-[#656565]">
              Accreditation Obtained
            </label>
            <Switch
              checked={notifications.accreditationObtained}
              onCheckedChange={(value) =>
                handleNotificationChange("accreditationObtained", value)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-[14px] font-medium text-[#656565]">
              Course Access Period Update
            </label>
            <Switch
              checked={notifications.courseAccessPeriodUpdate}
              onCheckedChange={(value) =>
                handleNotificationChange("courseAccessPeriodUpdate", value)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-[14px] font-medium text-[#656565]">
              Course Validity Period Update
            </label>
            <Switch
              checked={notifications.courseValidityPeriodUpdate}
              onCheckedChange={(value) =>
                handleNotificationChange("courseValidityPeriodUpdate", value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
