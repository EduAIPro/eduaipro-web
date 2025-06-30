import { Dialog, DialogContent } from "@/components/common/ui/Dialog";
import Typography from "@/components/common/ui/Typography";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "iconsax-react";
import { useEffect, useState } from "react";
import { BsRobot } from "react-icons/bs";
import { CgClose } from "react-icons/cg";

interface TourStep {
  title: string;
  description: string;
  highlightElement?: string;
  position: "top" | "bottom" | "left" | "right";
}

const TourGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [spotlightPosition, setSpotlightPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const tourSteps: TourStep[] = [
    {
      title: "Welcome to EduAiPro! 👋",
      description:
        "Hi, I'm George, your AI assistant! I'll show you around the dashboard to help you get started.",
      //   highlightElement: "overview",
      position: "bottom",
    },
    {
      title: "Overview",
      description:
        "This section provides a comprehensive overview of your tests, exams, and accreditation status, enabling you to monitor your progress effectively.",
      highlightElement: "overview",
      position: "left",
    },
    {
      title: "Personal Development Plan",
      description:
        "Access your PDP here to set goals and track your professional growth journey.",
      highlightElement: "pdp",
      position: "left",
    },
    {
      title: "Cerification Status",
      description:
        "View the status of your certification, access your cerificates, sharing options and other details",
      highlightElement: "certification",
      position: "left",
    },
    {
      title: "Your Profile",
      description:
        "View and update your profile information, including your accreditation status and school details.",
      highlightElement: "profile",
      position: "left",
    },
    {
      title: "Notifications",
      description:
        "Access all notifications from the system admin about upcoming tests, exams and deadlines",
      highlightElement: "notifications",
      position: "left",
    },
  ];

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (!hasSeenTour) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen && tourSteps[currentStep].highlightElement) {
      const element = document.getElementById(
        tourSteps[currentStep].highlightElement
      );
      if (element) {
        const rect = element.getBoundingClientRect();
        setSpotlightPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    }
  }, [currentStep, isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenTour", "true");
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  return (
    <>
      {/* Spotlight overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-opacity-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute"
              style={{
                top: spotlightPosition.top - 4,
                left: spotlightPosition.left - 4,
                width: spotlightPosition.width + 8,
                height: spotlightPosition.height + 8,
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.75)",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md p-0 bg-transparent border-none shadow-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-lg shadow-lg"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 transition-colors"
            >
              <CgClose className="h-5 w-5" />
            </button>

            {/* Tour content */}
            <div className="p-6">
              {/* AI Assistant Avatar */}
              <div className="flex items-center mb-4">
                <div className="p-2 w-fit rounded-full bg-blue-300/10">
                  <div className="p-2 w-fit rounded-full bg-blue-500/10">
                    <BsRobot className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <span className="ml-2 font-medium text-gray-900">George</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tourSteps[currentStep].title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {tourSteps[currentStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Interactive progress bar */}
              <div className="mt-6 mb-4">
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentStep + 1) / tourSteps.length) * 100}%`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-500 text-right">
                  <Typography.P size="small">
                    {currentStep + 1} of {tourSteps.length}
                  </Typography.P>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleSkip}
                  className="text-sm text-gray-500 hover:text-gray-700 hover:bg-blue-50 duration-500 px-4 rounded-md transition-colors"
                >
                  <Typography.P>Skip tour</Typography.P>
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <span>
                    {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TourGuide;
