import { format } from "date-fns";
import {
  BadgeCheckIcon,
  CalendarClockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import { useMemo } from "react";

type UserInfoProps = {
  user: {
    fullName: string;
    email: string;
    phoneNumber: string;
    lastLoggedInAt: string;
  };
};

export const UserInfo = ({ user }: UserInfoProps) => {
  const userInfo = useMemo(
    () =>
      user
        ? [
            {
              title: "Full name",
              value: user.fullName,
              icon: <UserIcon size={15} />,
              color: "#1A56DB",
              bg: "#EFF6FF",
            },
            {
              title: "Email address",
              value: user?.email,
              icon: <MailIcon size={15} />,
              color: "#1A56DB",
              bg: "#EFF6FF",
            },
            {
              title: "Phone number",
              value: user?.phoneNumber || "Not provided",
              icon: <PhoneIcon size={15} />,
              color: "#1A56DB",
              bg: "#EFF6FF",
            },
            {
              title: "Last login",
              value: format(
                user?.lastLoggedInAt !== "" ? user?.lastLoggedInAt : new Date(),
                "dd/MM/yyyy",
              ),
              icon: <CalendarClockIcon size={15} />,
              color: "#EA580C",
              bg: "#FFF7ED",
            },
          ]
        : [],
    [user],
  );
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-grey-800">Profile details</h3>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#16A34A] bg-[#DCFCE7] rounded-full px-2.5 py-1">
          <BadgeCheckIcon size={12} />
          Active
        </span>
      </div>
      <ul className="space-y-1">
        {userInfo?.length
          ? userInfo.map((info) => (
              <li
                key={info.title}
                className="flex items-center gap-3 py-2.5 border-b border-grey-3 last:border-b-0"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: info.bg, color: info.color }}
                >
                  {info.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-medium text-grey-500">
                    {info.title}
                  </p>
                  <p className="text-grey-800 font-semibold text-sm truncate">
                    {info.value}
                  </p>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
