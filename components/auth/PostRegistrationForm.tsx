import {
  goalsValidation,
  personalInfoValidation,
  professionalBackgroundValidation,
} from "@/utils/validation/reg-info";
import { Button } from "@radix-ui/themes";
import { Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { CloseCircle } from "iconsax-react";
import { useState } from "react";
import Typography from "../common/ui/Typography";
import GoalsAndSecurity from "./steps/GoalsAndSecurity";
import PersonalInfo from "./steps/PersonalInfo";
import ProfessionalBackground from "./steps/ProfessionalBackground";

export interface PostRegistrationFormValues {
  dateOfBirth: string;
  schoolName: string;
  phone: string;
  location: string;
  language: string;
  termsAccepted: boolean;
  teachingLevel: string;
  otherTeachingLevel: string;
  educationLevel: string;
  otherEducationLevel: string;
  areaOfSpecialization: string;
  interestInSkills: string;
  yearsOfExperience: string;
  learningGoals: string;
  otherLearningGoals: string;
  securityQuestion: string;
}

// Main form component
export default function MultiStepFormModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const validationSchemas = [
    personalInfoValidation,
    professionalBackgroundValidation,
    goalsValidation,
  ];

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

  const renderStep = (formik: any) => {
    return (
      <motion.div
        key={currentStep}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={slideVariants}
        className="space-y-4"
      >
        {/* [Previous step rendering logic remains the same] */}
        {currentStep === 1 && (
          <PersonalInfo touched={formik.touched} errors={formik.errors} />
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

  // const updateProfileMutation = useMutationApi(
  //   UPDATE_PROFILE_MUTATION_KEY,
  //   updateProfile,
  //   {
  //     onSuccess: (data) => {
  //       const _res = data.data;
  //       console.log({ res: _res });
  //     },
  //     onError(err) {
  //       console.log({ err });
  //     },
  //   }
  // );

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white xs:rounded-lg shadow-xl w-full max-xs:h-screen xs:h-[60vh] overflow-y-scroll no__scrollbar max-w-xl p-4 xs:p-6 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4"
        >
          <CloseCircle className="text-gray-500" />
        </button>

        <Formik
          initialValues={{
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
            learningMethod: "",
            securityQuestion: "",
            termsAccepted: false,
          }}
          validationSchema={validationSchemas[currentStep - 1]}
          onSubmit={(values, { setSubmitting }) => {
            if (currentStep < 3) {
              setCurrentStep(currentStep + 1);
            } else {
              // const payload = {
              //   teachingLevel: values.teachingLevel
              //   subjectsTaught: string[];
              //   specialSkills: string[];
              //   mentorDomain: string;
              //   expertiseAreas: string[];
              //   learningGoals: {
              //     careerAdvancement: boolean;
              //     skillDevelopment: boolean;
              //     subjectSpecificKnowledge: boolean;
              //   };
              //   interestInNetworkingOrCommunityEvents: boolean;
              //   privacySettings: {
              //     profileVisibility: "public" | "private";
              //     dataSharing: string;
              //   };
              //   securityQuestions: string[];
              //   qualifications: string;
              //   dateOfBirth: string;
              //   role: "Teacher" | "Mentor" | "Teaching Assistant";
              // };
              // updateProfileMutation.mutate(trimObj(payload));
              console.log("Form submitted:", values);
              setIsOpen(false);
            }
          }}
        >
          {(formik) => (
            <Form>
              <AnimatePresence mode="wait">
                {renderStep(formik)}
              </AnimatePresence>

              <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="btn"
                    // disabled={updateProfileMutation.isLoading}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  // loading={updateProfileMutation.isLoading}
                  // disabled={updateProfileMutation.isLoading}
                  type="submit"
                  className="primary__btn btn"
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
  ) : null;
}
