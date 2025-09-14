import { CreateSurveyFormValue } from "@/utils/validation/admin";
import { useFormikContext } from "formik";
import { SurveyQuestionsField } from "./form/questions";

export const SurveyQuestions = () => {
  const {} = useFormikContext<CreateSurveyFormValue>();

  return (
    <div className="bg-white p-3 md:p-5 border border-grey-400 rounded-xl flex flex-col justify-between gap-10 md:gap-20 min-h-full">
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-grey-650">Survey questions</h2>

          <div className="max-h-[80vh] min-h-[500px] overflow-y-scroll mt-4">
            <SurveyQuestionsField />
          </div>
        </div>
      </div>
    </div>
  );
};
