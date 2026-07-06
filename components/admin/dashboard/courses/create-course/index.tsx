import { adminCreateCourseKey, bulkUploadFilesKey } from "@/api/keys";
import { bulkUploadFiles, createCourse } from "@/api/mutations";
import {
  CreateCourseModule,
  CreateCourseModuleItem,
  CreateCoursePayload,
  CreateCourseUnit,
} from "@/types/admin/courses";
import { ModuleType, TeacherLevelType } from "@/types/course";
import {
  CreateCourseFormValue,
  createCourseValidation,
} from "@/utils/validation/admin";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { emptyUnit } from "../constants";
import { CourseDetails } from "./course-details";
import { CourseSchedule } from "./course-schedule";

export const CreateCourse = () => {
  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(
    adminCreateCourseKey,
    createCourse
  );
  const { trigger: triggerBulkUpload, isMutating: isFileMutating } =
    useSWRMutation(bulkUploadFilesKey, bulkUploadFiles);

  async function handleSubmit(
    values: CreateCourseFormValue,
    { resetForm }: { resetForm: VoidFunction }
  ) {
    try {
      // map out all pdf's (keyed by their unit, module and module item indexes) from form data
      const allPdfs = values.units.flatMap((u, unitId) =>
        u.modules.flatMap((m, moduleId) =>
          m.moduleItems.flatMap((mI, moduleItemId) =>
            mI.pdfFile instanceof File
              ? [
                  {
                    file: mI.pdfFile,
                    key: `${unitId}.${moduleId}.${moduleItemId}`,
                  },
                ]
              : []
          )
        )
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
        res.urls.forEach((u, index) => uploadedUrls.set(batch[index].key, u.url));
      }

      // then organise the units, modules, module items and pages according to how the api expects them
      const units: CreateCourseUnit[] = values.units.map((u, unitId) => {
        const modules: CreateCourseModule[] = u.modules.map((m, moduleId) => {
          const moduleItems: CreateCourseModuleItem[] = m.moduleItems.map(
            (mItem, moduleItemId) => {
              // map out pages
              const pages = mItem.pages.map((p) => ({
                title: p.title,
                number: Number(p.number),
              }));

              // locate the pdf url for this particular module item
              const pdfUrl = uploadedUrls.get(
                `${unitId}.${moduleId}.${moduleItemId}`
              );
              if (!pdfUrl) {
                throw new Error(
                  `Missing uploaded file for unit ${unitId + 1}, module ${moduleId + 1}, sub-module ${moduleItemId + 1}. Please re-attach the file and try again.`
                );
              }

              // return module item object
              return {
                pdfUrl,
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
        });

        // return unit object
        return {
          title: u.title,
          index: unitId + 1,
          modules,
        };
      });

      // prepare api payload
      const payload: CreateCoursePayload = {
        title: values.courseName,
        description: values.description,
        level: values.teachingLevel as TeacherLevelType,
        certificateValidationDays: Number(values.validityPeriod),
        completionDurationDays: Number(values.completionPeriod),
        ...(values.introductoryVideo && {
          introductoryVideoUrl: values.introductoryVideo,
        }),
        units,
      };

      // send payload to api
      await trigger(payload);

      // reset the form, then re-route and display success messages
      resetForm();
      toast.success("Course created successfully!");
      router.push("/admin/courses");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }

  const createCourseInitialValues: CreateCourseFormValue = {
    courseName: "",
    description: "",
    introductoryVideo: "",
    teachingLevel: "",
    completionPeriod: "",
    validityPeriod: "",
    units: [structuredClone(emptyUnit) as any],
  };
  return (
    <div>
      <Formik
        validateOnMount
        initialValues={createCourseInitialValues}
        onSubmit={handleSubmit}
        validationSchema={createCourseValidation}
      >
        <Form className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-4">
          <CourseDetails loading={isFileMutating || isMutating} />
          <div className="lg:col-span-2">
            <CourseSchedule />
          </div>
        </Form>
      </Formik>
    </div>
  );
};
