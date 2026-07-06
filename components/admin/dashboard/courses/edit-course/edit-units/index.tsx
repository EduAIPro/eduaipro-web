import {
  adminGetCourseUnit,
  adminUpdateCourseUnitKey,
  bulkUploadFilesKey,
} from "@/api/keys";
import { bulkUploadFiles, updateCourseUnits } from "@/api/mutations";
import useGetUnit from "@/hooks/use-get-unit";
import {
  CreateCourseModule,
  CreateCourseModuleItem,
  UpdateUnitPayload,
} from "@/types/admin/courses";
import { ModuleType, UnitDetails as UnitDetailsType } from "@/types/course";
import {
  updateUnitValidation,
  UpdateUnitFormValue,
} from "@/utils/validation/admin";
import { Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { emptyModule } from "../../constants";
import { UnitDetails } from "./unit-details";
import useSWR from "swr";
import { generalFetcher } from "@/api/queries";

export const EditCourseUnits = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const unitId = searchParams.get("unit-id");

  const { data: unitInfo, isLoading: unitLoading } = useSWR<UnitDetailsType>(
    unitId ? adminGetCourseUnit(unitId) : null,
    generalFetcher,
    // the form reinitializes from this data, so a focus refetch would wipe in-progress edits
    { revalidateOnFocus: false },
  );

  const { trigger, isMutating } = useSWRMutation(
    unitId ? adminUpdateCourseUnitKey(unitId) : null,
    updateCourseUnits,
  );
  const { trigger: triggerBulkUpload, isMutating: isFileMutating } =
    useSWRMutation(bulkUploadFilesKey, bulkUploadFiles);

  async function handleSubmit(
    values: UpdateUnitFormValue,
    { resetForm }: { resetForm: VoidFunction },
  ) {
    try {
      // map out all newly attached pdf's (keyed by their module and module item indexes)
      const allPdfs = values.modules.flatMap((m, moduleId) =>
        m.moduleItems.flatMap((mI, moduleItemId) =>
          mI.pdfFile instanceof File
            ? [{ file: mI.pdfFile, key: `${moduleId}.${moduleItemId}` }]
            : [],
        ),
      );

      // upload in batches of 5, one batch at a time, and key each returned url to its module item
      const uploadedUrls = new Map<string, string>();
      for (let i = 0; i < allPdfs.length; i += 5) {
        const batch = allPdfs.slice(i, i + 5);
        const res = await triggerBulkUpload({
          files: batch.map((b) => b.file),
        });
        if (!res?.urls || res.urls.length !== batch.length) {
          throw new Error("Some files failed to upload. Please try again.");
        }
        res.urls.forEach((u, index) =>
          uploadedUrls.set(batch[index].key, u.url),
        );
      }

      // then organise the modules, module items and pages according to how the api expects them
      const modules: CreateCourseModule[] = values.modules.map(
        (m, moduleId) => {
          const moduleItems: CreateCourseModuleItem[] = m.moduleItems.map(
            (mItem, moduleItemId) => {
              // map out pages
              const pages = mItem.pages.map((p) => ({
                title: p.title,
                number: Number(p.number),
              }));

              // a newly uploaded file wins; otherwise keep the item's existing pdf
              const pdfUrl =
                uploadedUrls.get(`${moduleId}.${moduleItemId}`) ??
                mItem.existingPdfUrl;
              if (!pdfUrl) {
                throw new Error(
                  `Missing file for module ${moduleId + 1}, sub-module ${moduleItemId + 1}. Please re-attach the file and try again.`,
                );
              }

              // return module item object
              return {
                pdfUrl,
                type: mItem.type as ModuleType,
                index: moduleItemId + 1,
                pages,
              };
            },
          );

          // return module object
          return {
            title: m.title,
            index: moduleId + 1,
            moduleItems,
          };
        },
      );

      // prepare api payload
      const payload: UpdateUnitPayload = {
        modules,
      };

      // send payload to api
      await trigger(payload);

      // reset the form, then re-route and display success messages
      resetForm();
      toast.success("Course units updated successfully!");
      router.push("/admin/courses");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }

  const updateUnitInitialValues: UpdateUnitFormValue = useMemo(() => {
    if (unitInfo) {
      const modules = unitInfo?.modules.flatMap((mod) => {
        const moduleItems = mod.moduleItems?.map((modItem) => ({
          // signed url is only for viewing; the permanent url is what gets saved back
          pdfFile: modItem.signedPdfUrl,
          existingPdfUrl: modItem.pdfUrl,
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
        modules: [structuredClone(emptyModule) as any],
      };
    }
  }, [unitInfo]);

  return (
    <div>
      <Formik
        validateOnMount
        initialValues={updateUnitInitialValues}
        onSubmit={handleSubmit}
        validationSchema={updateUnitValidation}
        enableReinitialize
      >
        <Form className="max-w-3xl mx-auto">
          <UnitDetails
            isLoading={unitLoading}
            index={unitInfo?.index || 0}
            isMutating={isMutating}
          />
        </Form>
      </Formik>
    </div>
  );
};
