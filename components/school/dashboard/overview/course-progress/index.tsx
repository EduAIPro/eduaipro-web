import { CourseProgressChart } from "./chart";

type CourseProgressProps = {};

export const CourseProgress = ({}: CourseProgressProps) => {
  return (
    <div className="bg-white p-5 border border-grey-400 rounded-xl space-y-5">
      <div className="space-y-3">
        <h2 className="font-semibold text-lg">Course Progress</h2>
        <CourseProgressChart />
      </div>
    </div>
  );
};
