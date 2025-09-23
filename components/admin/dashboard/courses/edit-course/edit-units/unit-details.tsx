import { UpdateUnitFormValue } from "@/utils/validation/admin";
import { useFormikContext } from "formik";
import { Loader2Icon } from "lucide-react";
import { ModuleFormField } from "../../sub-fields/modules";

export const UnitDetails = ({ isLoading }: { isLoading: boolean }) => {
  const { values } = useFormikContext<UpdateUnitFormValue>();
  return (
    <div className="bg-white p-3 md:p-5 border border-grey-400 rounded-xl flex flex-col justify-between gap-10 md:gap-20">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-grey-650">Update unit</h2>
            {isLoading ? (
              <Loader2Icon className="animate-spin" size={20} />
            ) : null}
          </div>

          <div className="max-h-[80vh] overflow-y-scroll mt-4">
            <ModuleFormField<UpdateUnitFormValue>
              fieldName=""
              unitItem={values}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
