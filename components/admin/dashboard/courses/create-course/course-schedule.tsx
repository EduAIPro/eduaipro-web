import { UnitFormField } from "../sub-fields/units";

export const CourseSchedule = () => {
  return (
    <div className="bg-white p-3 md:p-5 border border-grey-400 rounded-xl flex flex-col justify-between gap-10 md:gap-20">
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-grey-650">Course schedule</h2>

          <div className="max-h-[80vh] overflow-y-scroll mt-4">
            <UnitFormField />
          </div>
        </div>
      </div>
    </div>
  );
};
