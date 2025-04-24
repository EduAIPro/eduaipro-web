import { StarIcon } from "@/components/svgs";
import { Course as CourseType } from "@/types/app";
import { generateKey } from "@/utils/key";
import { Profile2User, Video } from "iconsax-react";
import Image from "next/image";
import Typography from "../ui/Typography";

export default function Course({
  courseItem,
  coursesPage,
}: {
  courseItem: CourseType;
  coursesPage?: boolean;
}) {
  return (
    <div className={`bg-white p-3 relative w-full course_card`}>
      {/* {courseItem.isNew ? ( */}
      <div className="rounded-md border absolute left-5 px-1 pt-[2px] top-5 bg-white border-gray-500 flex gap-x-1">
        <StarIcon />
        <Typography.H2 size="small">New</Typography.H2>
      </div>
      {/* ) : null} */}
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-y-4">
          <div>
            <Image
              src={courseItem.img}
              alt="course image"
              width={780}
              height={250}
              className="rounded-lg max-sm:w-full"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-4">
              <div>
                <div className="flex mb-2 items-center -ml-3">
                  <Image
                    className="w-12 h-6"
                    width={40}
                    height={40}
                    src="/assets/images/cpd_certified.png"
                    alt="Certification"
                  />
                  <Typography.P
                    fontColor="brand"
                    size="small"
                    className="-ml-1"
                  >
                    Certified
                  </Typography.P>
                </div>
                <Typography.H2 size="large" fontColor="large" weight="bold">
                  {courseItem.name}
                </Typography.H2>
                <Typography.P
                  className="capitalize"
                  fontColor="medium"
                  size="small"
                >
                  {courseItem.description.slice(0, 100) + "..."}
                </Typography.P>

                {coursesPage ? (
                  <div className="mt-4">
                    <Typography.P fontColor="grey" weight="medium" size="small">
                      <strong className="text-grey-11">Topics taught:</strong>{" "}
                      {courseItem.overview.objectives
                        .map(
                          (value) =>
                            value.charAt(0).toUpperCase() + value.slice(1)
                        )
                        .join(",")
                        .slice(0, 100) + "..."}
                    </Typography.P>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="gap-2 mt-6 max-lg:hidden">
              <Typography.H3
                weight="bold"
                size="small"
                className="!text-gray-600"
              >
                Units:{" "}
              </Typography.H3>
              <ul className="px-4">
                {courseItem.units.slice(0, 8).map((item) => (
                  <li key={generateKey()} className="list-disc">
                    <Typography.P fontColor="medium" size="small">
                      {item.title}
                    </Typography.P>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-9 pb-3">
          <div className="flex items-center gap-x-1">
            <div className="w-fit">
              <Video className="w-5 h-5 text-grey-9" width={10} height={10} />
            </div>
            <Typography.P fontColor="medium" size="small">
              {/* {courseItem.courseLength} */}90
            </Typography.P>
          </div>
          <div className="flex items-center gap-x-1">
            <Typography.P fontColor="medium" size="small">
              {courseItem.students}
            </Typography.P>
            <div className="w-fit">
              <Profile2User
                className="w-5 h-5 text-grey-9"
                width={10}
                height={10}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
