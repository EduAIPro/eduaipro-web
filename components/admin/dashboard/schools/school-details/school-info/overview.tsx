import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { SchoolInfoProps } from ".";

export const SchoolOverview = ({ data, isLoading }: SchoolInfoProps) => {
  const schoolInfo = useMemo(() => {
    return [
      {
        title: "School Profile",
        details: [
          {
            label: "Institution Name:",
            value: data?.institutionName,
          },
          {
            label: "State:",
            value: data?.state,
          },
          {
            label: "City:",
            value: data?.city,
          },
          {
            label: "Address:",
            value: data?.streetAddress,
          },
          {
            label: "Contact Email:",
            value: data?.contactEmail,
          },
          {
            label: "Contact Phone:",
            value: `+${data?.contactPhoneCountryCode}${data?.contactPhoneNumber}`,
          },
        ],
        actions: {
          label: "Edit School Info",
          onClick: () => {},
        },
      },
      {
        title: "Admin Profile",
        details: [
          {
            label: "Admin Name:",
            value: `${data?.owner?.user?.firstName} ${data?.owner?.user?.lastName}`,
          },
          {
            label: "Email Address:",
            value: data?.owner?.user?.email,
          },
          {
            label: "Phone Number:",
            value: `+${data?.owner?.user?.phoneCountryCode ?? ""}${
              data?.owner?.user?.phoneNumber ?? ""
            }`,
          },
          {
            label: "Position:",
            value: data?.owner?.positionDescription,
          },
        ],
        actions: {
          label: "View Admin Profile",
          onClick: () => {},
        },
      },
      {
        title: "School Overview",
        details: [
          {
            label: "Total Teachers:",
            value: data?.aggregates.totalTeacherCount,
          },
          {
            label: "Active Teachers:",
            value: data?.aggregates.totalActiveTeachers,
          },
        ],
      },
    ];
  }, [data]);

  console.log({ data });
  return (
    <div className="space-y-6 mt-6">
      {schoolInfo.map((section, i) => (
        <div className="space-y-2">
          <h2 className="font-semibold text-grey-650 text-lg">
            {section.title}
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <ul className="space-y-2">
              {section.details.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center gap-20 font-medium"
                >
                  <p className="text-grey-500 w-60">{row.label}</p>
                  {isLoading ? (
                    <Skeleton className="h-3 w-40 rounded-lg" />
                  ) : (
                    <p className="text-grey-800">{row.value}</p>
                  )}
                </li>
              ))}
            </ul>
            {section.actions ? (
              <div className="h-full flex flex-col justify-end items-end max-w-36">
                <Button onClick={section.actions?.onClick} variant="ghost">
                  <p className="underline text-primary">
                    {section.actions?.label}
                  </p>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};
