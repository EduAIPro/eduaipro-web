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
      //initiate result array - will contain an array of urls as well as their unit, module and module item indexes
      const result: { url: string; indexes: number[] }[] = [];

      // map out all pdf's(and their specific indexes) from form data
      const allPdfs: { file: File; indexes: number[] }[] = values.units
        .flatMap((u, uI) =>
          u.modules.flatMap((m, moduleId) =>
            m.moduleItems.map((mI, moduleItemIndex) => ({
              file: mI.pdfFile as File,
              indexes: [uI, moduleId, moduleItemIndex],
            }))
          )
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
      const units: CreateCourseUnit[] = values.units.map((u, unitId) => {
        const modules: CreateCourseModule[] = u.modules.map((m, moduleId) => {
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
                  r.indexes[0] === unitId &&
                  r.indexes[1] === moduleId &&
                  r.indexes[2] === moduleItemId
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

      // re-route and display success messages
      router.push("/admin/courses");
      toast.success("Course created successfully!");

      // reset the form
      resetForm();
    } catch (error) {
      toast.error(error as string);
    }
  }

  const createCourseInitialValues: CreateCourseFormValue = {
    courseName: "",
    description: "",
    teachingLevel: "",
    completionPeriod: "",
    validityPeriod: "",
    units: [emptyUnit as any],
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
