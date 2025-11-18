import * as Yup from "yup";

const pageItemValidation = Yup.object().shape({
  title: Yup.string()
    .required("Page title is a required value")
    .min(2, "Page title must be at least two characters long"),
  number: Yup.string().required("Page number is a required value"),
});

const moduleItemValidation = Yup.object().shape({
  pdfFile: Yup.mixed()
    .required("Please select a file")
    .test("fileType", "File is required", (value: any) => {
      return value && value instanceof File;
    }),
  type: Yup.string()
    .oneOf(
      ["CONTENT", "PRACTICAL_APPLICATIONS", "CASE_STUDY"],
      "Course type must be CONTENT, PRACTICAL_APPLICATIONS, CASE_STUDY"
    )
    .required("Course type is a required value"),
  pages: Yup.array()
    .of(pageItemValidation)
    .required("You must have at least one module page"),
});

const moduleValidation = Yup.object().shape({
  title: Yup.string()
    .required("Unit title is a required value")
    .min(2, "Unit title must be at least two characters long"),
  moduleItems: Yup.array()
    .of(moduleItemValidation)
    .required("You must have at least one module item"),
});

const unitValidation = Yup.object().shape({
  title: Yup.string()
    .required("Unit title is a required value")
    .min(2, "Unit title must be at least two characters long"),
  modules: Yup.array()
    .of(moduleValidation)
    .required("You must have at least one module under every unit"),
});

export const createCourseValidation = Yup.object().shape({
  courseName: Yup.string()
    .required("Course name is a required value")
    .min(2, "Course name must be at least two characters long"),
  description: Yup.string()
    .required("Course description is a required value")
    .min(2, "Course description must be at least two characters long"),
  completionPeriod: Yup.string()
    .required("Course duration is a required value")
    .min(2, "Course duration must be at least two characters long"),
  introductoryVideo: Yup.string()
    .url("Introductory video must be a valid URL")
    .optional(),
  teachingLevel: Yup.string().required("Teaching level is a required value"),
  validityPeriod: Yup.string()
    .required("Course validity period is a required value")
    .min(2, "Course validity period must be at least two characters long"),
  units: Yup.array()
    .of(unitValidation)
    .required("You must have at least one unit for every course"),
});

export const updateUnitValidation = Yup.object().shape({
  modules: Yup.array()
    .of(moduleValidation)
    .required("You must have at least one module under every unit"),
});

export const updateCourseSummaryValidation = Yup.object().shape({
  courseName: Yup.string()
    .required("Course name is a required value")
    .min(2, "Course name must be at least two characters long"),
  description: Yup.string()
    .required("Course description is a required value")
    .min(2, "Course description must be at least two characters long"),
  completionPeriod: Yup.string()
    .required("Course duration is a required value")
    .min(2, "Course duration must be at least two characters long"),
  introductoryVideo: Yup.string()
    .url("Introductory video must be a valid URL")
    .optional(),
  teachingLevel: Yup.string().required("Teaching level is a required value"),
  validityPeriod: Yup.string()
    .required("Course validity period is a required value")
    .min(2, "Course validity period must be at least two characters long"),
});

export type CreateCourseFormValue = Yup.InferType<
  typeof createCourseValidation
>;
export type ModuleItemFormValue = Yup.InferType<typeof moduleItemValidation>;
export type ModuleFormValue = Yup.InferType<typeof moduleValidation>;
export type UnitFormValue = Yup.InferType<typeof unitValidation>;

export type UpdateUnitFormValue = Yup.InferType<typeof updateUnitValidation>;
export type UpdateCourseSummaryFormValue = Yup.InferType<
  typeof updateCourseSummaryValidation
>;
