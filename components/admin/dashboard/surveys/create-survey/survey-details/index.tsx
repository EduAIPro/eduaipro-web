import { getCoursesKey, getCoursesPublicKey, getSchoolsKey } from "@/api/keys";
import { fetchWithSearchQuery, generalFetcher } from "@/api/queries";
import FormInput, {
  DateInput,
  SearchSelectInput,
  SelectInput,
} from "@/components/common/ui/FormInput";
import { MultiSearchSelectInput } from "@/components/common/ui/Select";
import { Button } from "@/components/ui/button";
import { SchoolslistResponse } from "@/types/admin/schools";
import { SurveyVisibilityEum, TriggerType } from "@/types/admin/surveys";
import { CreateSurveyFormValue } from "@/utils/validation/admin";
import { useFormikContext } from "formik";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { SurveyStatus } from "..";
import { surveyVisibilityOptions, triggerTypeOptions } from "../constants";
import { AdminCourse, GetPublicCourseList } from "@/types/course";
import { Course } from "@/types/course";

export const SurveyDetails = ({
  loading,
  onSelect,
  status,
}: {
  loading: boolean;
  status: string;
  onSelect: (v: SurveyStatus) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseSearchTerm, setCourseSearchTerm] = useState("");
  const [unitSearchTerm, setUnitSearchTerm] = useState("");
  const [moduleSearchTerm, setModuleSearchTerm] = useState("");

  const { errors, touched, isValid, values } =
    useFormikContext<CreateSurveyFormValue>();

  const fieldError = (fieldName: keyof CreateSurveyFormValue) =>
    touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;

  const { data: schools, isLoading: schoolsLoading } =
    useSWR<SchoolslistResponse>(
      [getSchoolsKey, searchTerm],
      fetchWithSearchQuery
    );
  const { data: courses, isLoading: coursesLoading } =
    useSWR<GetPublicCourseList>(getCoursesKey, generalFetcher);

  const { data: courseInfo, isLoading: courseInfoLoading } =
    useSWR<AdminCourse>(
      values.courseId ? `${getCoursesKey}/${values.courseId}` : null,
      generalFetcher
    );

  const schoolsArr = useMemo(() => {
    const defaultValues = { label: "All schools", value: "all" };
    if (schools) {
      const options = schools.data.map((s) => ({
        label: s.institutionName,
        value: s.id,
      }));
      return [defaultValues, ...options];
    } else return [defaultValues];
  }, [schools]);

  const [units, modules] = useMemo(() => {
    if (courseInfo) {
      const units = courseInfo.units.map((u) => ({
        label: u.title,
        value: u.id,
      }));
      const modules = courseInfo.units
        .map((u) => u.modules)
        .flatMap((m) => m)
        .map((m) => ({
          label: m.title,
          value: m.id,
        }));

      return [units, modules];
    } else return [[], []];
  }, [courseInfo]);

  return (
    <div className="bg-white p-3 md:p-5 border border-grey-400 rounded-xl flex flex-col justify-between gap-10 md:gap-20">
      <div>
        <h2 className="font-semibold text-grey-650">Survey information</h2>
        <div className="space-y-5 mt-4 md:mt-8">
          <FormInput
            name="title"
            label="Title"
            placeholder="Enter survey title"
            error={fieldError("title") as string | null}
          />
          <FormInput
            as="textarea"
            name="description"
            label="Survey description"
            placeholder="Enter a suitable description"
            error={fieldError("description") as string | null}
          />

          <SelectInput
            name="visibility"
            label="Target audience"
            options={surveyVisibilityOptions}
            error={fieldError("visibility") as string | null}
            placeholder="Who is this survey for?"
          />
          <SelectInput
            name="triggerType"
            label="Trigger type"
            options={triggerTypeOptions}
            error={fieldError("triggerType") as string | null}
            placeholder="When should this survey be shown?"
          />

          {values.triggerType === TriggerType.MANUAL ? null : (
            <>
              <SearchSelectInput
                name="courseId"
                label="Select course"
                options={
                  courses?.data.map((c) => ({
                    label: c.title,
                    value: c.id,
                  })) || []
                }
                searchTerm={courseSearchTerm}
                setSearchTerm={setCourseSearchTerm}
                error={fieldError("courseId") as string | null}
                placeholder="Choose a course"
                isLoading={coursesLoading}
                disabled={loading}
              />
              <SearchSelectInput
                name="unitId"
                label="Select unit"
                options={units}
                searchTerm={unitSearchTerm}
                setSearchTerm={setUnitSearchTerm}
                error={fieldError("unitId") as string | null}
                placeholder="Choose a unit"
                isLoading={courseInfoLoading}
                disabled={loading || !values.courseId}
              />

              {values.triggerType === TriggerType.MODULE_COMPLETE ? (
                <SearchSelectInput
                  name="moduleId"
                  label="Select module"
                  options={modules}
                  searchTerm={moduleSearchTerm}
                  setSearchTerm={setModuleSearchTerm}
                  error={fieldError("moduleId") as string | null}
                  placeholder="Choose a module"
                  isLoading={courseInfoLoading}
                  disabled={loading}
                />
              ) : null}
            </>
          )}

          {values.visibility !== SurveyVisibilityEum.SCHOOL_ONLY ? (
            <MultiSearchSelectInput
              label="Select school (optional)"
              name="schoolId"
              placeholder="Choose a school"
              searchPlaceholder="Search school..."
              options={schoolsArr}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              error={fieldError("schoolId") as string | null}
              showSelectedCount={false}
              isLoading={schoolsLoading}
              disabled={values.schoolId?.length === 1}
            />
          ) : null}

          <DateInput
            name="startsAt"
            label="When will this survey start?"
            placeholder="Select a date"
            error={fieldError("startsAt") as string | null}
          />
          <DateInput
            name="endsAt"
            label="When will this survey end?"
            placeholder="Select a date"
            error={fieldError("endsAt") as string | null}
          />
          <FormInput
            name="thankyouMessage"
            label="Thank you message"
            placeholder="Enter here"
            error={fieldError("thankyouMessage") as string | null}
            note="Enter a particular message you want to show when this survey is completed"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 justify-between">
        <Button
          loading={loading && status === "DRAFT"}
          disabled={!isValid}
          onClick={() => onSelect("DRAFT")}
          type="submit"
          variant="outline"
          className="border-primary text-primary w-full"
        >
          <p>Save as draft</p>
        </Button>
        <Button
          loading={loading && status === "ACTIVE"}
          disabled={!isValid}
          onClick={() => onSelect("ACTIVE")}
          type="submit"
          className="w-full"
        >
          <p>Create survey</p>
        </Button>
      </div>
    </div>
  );
};
