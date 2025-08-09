import { format } from "date-fns";
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
  console.log({ user });
  const userInfo = useMemo(
    () =>
      user
        ? [
            {
              title: "Full name",
              value: user.fullName,
            },
            {
              title: "Email address",
              value: user?.email,
            },
            {
              title: "Phone number",
              value: user?.phoneNumber,
            },
            {
              title: "Status",
              value: "Active",
            },
            {
              title: "Last login",
              value: format(
                user?.lastLoggedInAt !== "" ? user?.lastLoggedInAt : new Date(),
                "dd/MM/yyyy"
              ),
            },
          ]
        : [],
    [user]
  );
  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Profile</h3>
        <ul className="space-y-2">
          {userInfo?.length
            ? userInfo.map((info) => (
                <li
                  key={info.title}
                  className="flex items-center justify-between"
                >
                  <h4 className="font-semibold text-grey-500 text-sm">
                    {info.title}
                  </h4>
                  <p className="text-grey-800 font-medium w-1/2 truncate">
                    {info.value}
                  </p>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};
