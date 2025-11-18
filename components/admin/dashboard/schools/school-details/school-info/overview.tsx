import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, useState } from "react";
import { SchoolInfoProps } from ".";
import { EditSchoolInfo } from "./edit-school-info";

export const SchoolOverview = ({ data, isLoading }: SchoolInfoProps) => {
  const [isEditSchoolInfoOpen, setIsEditSchoolInfoOpen] = useState(false);
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
          onClick: () => setIsEditSchoolInfoOpen(true),
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

  const formData = useMemo(
    () => ({
      streetAddress: data?.streetAddress ?? "",
      state: data?.state ?? "",
      institutionName: data?.institutionName ?? "",
      contactEmail: data?.contactEmail ?? "",
      city: data?.city ?? "",
      contactPhone: {
        dialCode: data?.contactPhoneCountryCode ?? "",
        digits: data?.contactPhoneNumber ?? "",
      },
    }),
    [data]
  );

  return (
    <>
      <div className="space-y-6 mt-6">
        {schoolInfo.map((section, i) => (
          <div key={section.title} className="space-y-2">
            <h2 className="font-semibold text-grey-650 md:text-lg">
              {section.title}
            </h2>
            <div className="grid md:grid-cols-3 xl:grid-cols-2 gap-4 md:gap-6">
              <ul className="space-y-4 md:space-y-2 md:col-span-2 xl:col-span-1">
                {section.details.map((row) => (
                  <li
                    key={row.label}
                    className="max-md:flex-col flex md:items-center md:gap-20 font-medium"
                  >
                    <p className="text-grey-500 md:w-32 lg:w-40 xl:w-60">
                      {row.label}
                    </p>
                    {isLoading ? (
                      <Skeleton className="h-3 w-40 rounded-lg" />
                    ) : (
                      <p className="text-grey-800">{row.value}</p>
                    )}
                  </li>
                ))}
              </ul>
              {section.actions ? (
                <div className="h-full md:flex flex-col justify-end items-end md:max-w-36">
                  <Button
                    onClick={section.actions?.onClick}
                    variant="ghost"
                    className="!px-0 hover:!px-3"
                  >
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
      <EditSchoolInfo
        isOpen={isEditSchoolInfoOpen}
        toggleOpen={(v) => setIsEditSchoolInfoOpen(v)}
        schoolId={data?.id}
        initialData={formData}
      />
    </>
  );
};
