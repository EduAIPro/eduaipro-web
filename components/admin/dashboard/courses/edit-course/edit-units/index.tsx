import { adminUpdateCourseUnitKey, bulkUploadFilesKey } from "@/api/keys";
import { bulkUploadFiles, updateCourseUnits } from "@/api/mutations";
import useGetUnit from "@/hooks/use-get-unit";
import {
  CreateCourseModule,
  CreateCourseModuleItem,
  UpdateUnitPayload,
} from "@/types/admin/courses";
import { ModuleType } from "@/types/course";
import {
  createCourseValidation,
  UpdateUnitFormValue,
} from "@/utils/validation/admin";
import { Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { emptyModule } from "../../constants";
import { UnitDetails } from "./unit-details";

export const EditCourseUnits = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const unitId = searchParams.get("unit-id");

  const { data: unitInfo, isLoading: unitLoading } = useGetUnit({
    unitId,
  });

  const { trigger, isMutating } = useSWRMutation(
    unitId ? adminUpdateCourseUnitKey(unitId) : null,
    updateCourseUnits
  );
  const { trigger: triggerBulkUpload, isMutating: isFileMutating } =
    useSWRMutation(bulkUploadFilesKey, bulkUploadFiles);

  async function handleSubmit(
    values: UpdateUnitFormValue,
    { resetForm }: { resetForm: VoidFunction }
  ) {
    try {
      //initiate result array - will contain an array of urls as well as their unit, module and module item indexes
      const result: { url: string; indexes: number[] }[] = [];

      // map out all pdf's(and their specific indexes) from form data
      const allPdfs: { file: File; indexes: number[] }[] = values.modules
        .flatMap((m, moduleId) =>
          m.moduleItems.map((mI, moduleItemIndex) => ({
            file: mI.pdfFile as File,
            indexes: [moduleId, moduleItemIndex],
          }))
        )

        .filter((v) => v.file && v.file instanceof File);

      // group the pdf's into batches of 5
      const batchedPdfs = [];
      for (let i = 0; i < allPdfs.length; i += 5) {
        batchedPdfs.push(allPdfs.slice(i, i + 5));
      }

      // then upload the individual batches and store the results in the result array
      await Promise.all(
        batchedPdfs.map((batch) => {
          return triggerBulkUpload({ files: batch.map((i) => i.file) }).then(
            (res) => {
              res.urls.forEach((i, index) =>
                result.push({ url: i.url, indexes: batch[index].indexes })
              );
            }
          );
        })
      );

      // then organise the units, modules, module items and pages according to how the api expects them
      const modules: CreateCourseModule[] = values.modules.map(
        (m, moduleId) => {
          const moduleItems: CreateCourseModuleItem[] = m.moduleItems.map(
            (mItem, moduleItemId) => {
              // map out pages
              const pages = mItem.pages.map((p) => ({
                title: p.title,
                number: Number(p.number),
              }));

              // lcoate the pdf url for this particular module item
              const pdfUrl = result.find(
                (r) =>
                  r.indexes[0] === moduleId && r.indexes[1] === moduleItemId
              );
              // return module item object
              return {
                pdfUrl: pdfUrl?.url ?? "",
                type: mItem.type as ModuleType,
                index: moduleItemId + 1,
                pages,
              };
            }
          );

          // return module object
          return {
            title: m.title,
            index: moduleId + 1,
            moduleItems,
          };
        }
      );

      // prepare api payload
      const payload: UpdateUnitPayload = {
        modules,
      };

      // send payload to api
      await trigger(payload);

      // re-route and display success messages
      router.push("/admin/courses");
      toast.success("Course units updated successfully!");

      // reset the form
      resetForm();
    } catch (error) {
      toast.error(error as string);
    }
  }

  const updateUnitInitialValues: UpdateUnitFormValue = useMemo(() => {
    if (unitInfo) {
      const modules = unitInfo?.modules.flatMap((mod) => {
        const moduleItems = mod.moduleItems?.map((modItem) => ({
          pdfFile: modItem.signedPdfUrl,
          type: modItem.type,
          pages: modItem.pages.map((page) => ({
            title: page.pageTitle,
            number: page.pageNumber,
          })),
        }));

        return {
          title: mod.title,
          moduleItems,
        };
      });

      return { modules };
    } else {
      return {
        modules: [emptyModule as any],
      };
    }
  }, [unitInfo]);
  return (
    <div>
      <Formik
        validateOnMount
        initialValues={updateUnitInitialValues}
        onSubmit={handleSubmit}
        validationSchema={createCourseValidation}
        enableReinitialize
      >
        <Form className="max-w-3xl mx-auto">
          <UnitDetails isLoading={unitLoading} />
        </Form>
      </Formik>
    </div>
  );
};
