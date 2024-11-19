import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { CloseCircle } from "iconsax-react";
import PersonalInfo from "./steps/PersonalInfo";
import {
  goalsValidation,
  personalInfoValidation,
  professionalBackgroundValidation,
} from "@/utils/validation/reg-info";
import ProfessionalBackground from "./steps/ProfessionalBackground";
import GoalsAndSecurity from "./steps/GoalsAndSecurity";
import { Button } from "@radix-ui/themes";
import Typography from "../common/ui/Typography";

export interface PostRegistrationFormValues {
  dateOfBirth: string;
  schoolName: string;
  phone: string;
  location: string;
  language: string;
  termsAccepted: boolean;
  teachingLevel: string;
  educationLevel: string;
  areaOfSpecialization: string;
  interestInSkills: string;
  yearsOfExperience: string;
  learningGoals: string;
  learningMethod: string;
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
          />
        )}
        {currentStep === 3 && (
          <GoalsAndSecurity touched={formik.touched} errors={formik.errors} />
        )}
      </motion.div>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Open Form
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white xs:rounded-lg shadow-xl w-full max-xs:h-screen max-w-xl p-4 xs:p-6 relative">
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
                language: "",
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
                  setSubmitting(false);
                } else {
                  console.log("Form submitted:", values);
                  setIsOpen(false);
                  setSubmitting(false);
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
                      >
                        Previous
                      </Button>
                    )}
                    <Button type="submit" className="primary__btn btn">
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
      )}
    </>
  );
}
