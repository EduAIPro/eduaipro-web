import { completeSurveyKey } from "@/api/keys";
import { completeSurvey } from "@/api/mutations";
import { TeacherSurveyPayload } from "@/types/auth";
import { trimObj } from "@/utils/key";
import {
  GoalsFormValue,
  goalsValidation,
  PersonalInfoFormValue,
  personalInfoValidation,
  ProfessionalBackgroundFormValue,
  professionalBackgroundValidation,
} from "@/utils/validation/auth/";
import { Form, Formik, FormikState } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import Typography from "../common/ui/Typography";
import { Button } from "../ui/button";
import GoalsAndSecurity from "./steps/GoalsAndSecurity";
import PersonalInfo from "./steps/PersonalInfo";
import ProfessionalBackground from "./steps/ProfessionalBackground";

type SurveyFormValues = PersonalInfoFormValue &
  ProfessionalBackgroundFormValue &
  GoalsFormValue;

type MultiStepFormModalProps = { userPhone: boolean; isInvited: boolean };

export default function MultiStepFormModal({
  userPhone,
  isInvited,
}: MultiStepFormModalProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    completeSurveyKey,
    completeSurvey
  );

  const validationSchemas = [
    personalInfoValidation,
    professionalBackgroundValidation,
    goalsValidation,
  ];

  const onSubmit = async (values: SurveyFormValues) => {
    try {
      const payload: TeacherSurveyPayload = {
        personal: {
          dateOfBirth: values.dateOfBirth,
          ...(values.phone && { phoneNumber: values.phone }),
          ...(!isInvited && { schoolName: values.schoolName }),
          location: values.location,
        },
        professional: {
          teacherLevel: values.teachingLevel,
          educationalLevel: values.educationLevel,
          experienceRange: values.yearsOfExperience,
          areaOfSpecialization: values.areaOfSpecialization,
          interestedSkills: values.interestInSkills.split(","),
          primaryLearningGoal: values.learningGoals,
          altLearningGoal: values.otherLearningGoals ?? "",
          acceptedTermsAndConditions: !!values.termsAccepted,
        },
      };

      await trigger(trimObj(payload));
      router.refresh();
    } catch (error: any) {
      toast.error(error);
    }
  };

  const slideVariants = {
    initial: {
      opacity: 0,
      x: "30%",
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: "-30%",
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  const renderStep = (formik: FormikState<SurveyFormValues>) => {
    return (
      <motion.div
        key={currentStep}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={slideVariants}
        className="space-y-4"
      >
        {currentStep === 1 && (
          <PersonalInfo
            touched={formik.touched}
            errors={formik.errors}
            userPhoneExists={!!userPhone}
            isInvited={isInvited}
          />
        )}
        {currentStep === 2 && (
          <ProfessionalBackground
            touched={formik.touched}
            errors={formik.errors}
            values={formik.values}
          />
        )}
        {currentStep === 3 && (
          <GoalsAndSecurity touched={formik.touched} errors={formik.errors} />
        )}
      </motion.div>
    );
  };

  const defaultValues = {
    dateOfBirth: "",
    schoolName: "",
    phone: "",
    location: "",
    teachingLevel: "",
    educationLevel: "",
    areaOfSpecialization: "",
    interestInSkills: "",
    yearsOfExperience: "",
    learningGoals: "",
    termsAccepted: false,
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white xs:rounded-lg shadow-xl w-full max-xs:h-screen xs:h-[500px] overflow-y-scroll no__scrollbar max-w-xl p-4 xs:p-6 relative">
        {/* <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4"
        >
          <CloseCircle className="text-gray-500" />
        </button> */}

        <Formik
          initialValues={defaultValues}
          validationSchema={validationSchemas[currentStep - 1]}
          validateOnMount
          onSubmit={(values) => {
            if (currentStep < 3) {
              setCurrentStep(currentStep + 1);
            } else {
              onSubmit(values);
            }
          }}
        >
          {(formik) => (
            <Form className="flex flex-col h-full justify-between">
              <AnimatePresence mode="wait">
                {renderStep(formik)}
              </AnimatePresence>

              <div className="flex justify-between gap-2 sm:gap-4 max-sm:flex-col-reverse mt-6 xs:pb-6">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="w-full"
                    disabled={isMutating}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  loading={isMutating}
                  disabled={!formik.isValid}
                  type="submit"
                  className="w-full"
                >
                  <Typography.P fontColor="white">
                    {currentStep === 3 ? "Submit" : "Next"}
                  </Typography.P>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
