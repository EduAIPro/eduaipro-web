import { getSchoolsKey } from "@/api/keys";
import { fetchWithSearchQuery } from "@/api/queries";
import FormInput, {
  DateInput,
  SelectInput,
} from "@/components/common/ui/FormInput";
import { MultiSearchSelectInput } from "@/components/common/ui/Select";
import { Button } from "@/components/ui/button";
import { SchoolslistResponse } from "@/types/admin/schools";
import { SurveyVisibilityEum } from "@/types/admin/surveys";
import { CreateSurveyFormValue } from "@/utils/validation/admin";
import { useFormikContext } from "formik";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { SurveyStatus } from "..";
import { surveyVisibilityOptions } from "../constants";

export const SurveyDetails = ({
  loading,
  onSelect,
}: {
  loading: boolean;
  onSelect: (v: SurveyStatus) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: schools, isLoading: schoolsLoading } =
    useSWR<SchoolslistResponse>(
      [getSchoolsKey, searchTerm],
      fetchWithSearchQuery
    );
  const { errors, touched, isValid, values } =
    useFormikContext<CreateSurveyFormValue>();

  const fieldError = (fieldName: keyof CreateSurveyFormValue) =>
    touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;
  console.log({ errors });
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
          {values.visibility !== SurveyVisibilityEum.SCHOOL_ONLY ? (
            <MultiSearchSelectInput
              label="Select school"
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
          loading={loading}
          disabled={!isValid}
          onClick={() => onSelect("DRAFT")}
          type="submit"
          variant="outline"
          className="border-primary text-primary w-full"
        >
          <p>Save as draft</p>
        </Button>
        <Button
          loading={loading}
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
