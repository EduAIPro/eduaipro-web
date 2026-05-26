import { UpdateUnitFormValue } from "@/utils/validation/admin";
import { useFormikContext } from "formik";
import { Loader2Icon } from "lucide-react";
import { ModuleFormField } from "../../sub-fields/modules";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const UnitDetails = ({
  isLoading,
  index,
  isMutating,
}: {
  isLoading: boolean;
  index: number;
  isMutating: boolean;
}) => {
  const { values, isValid } = useFormikContext<UpdateUnitFormValue>();
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

          <div
            className={cn(
              "max-h-[80vh] overflow-y-scroll mt-4",
              isLoading ? "opacity-60 cursor-not-allowed" : "",
            )}
          >
            <ModuleFormField<UpdateUnitFormValue>
              fieldName={`units.${index}.modules`}
              unitItem={values}
              mode="edit"
            />
          </div>
          <Button
            className="w-full mt-5"
            loading={isMutating}
            disabled={!isValid}
            type="submit"
          >
            <p>Save changes</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
