"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Types
type QuizQuestion = {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  marks: number;
};

type QuizData = {
  id: string;
  title: string;
  estimatedMinutes: number;
  questions: QuizQuestion[];
};

type Attempt = {
  id: string;
  date: Date;
  score: number;
  maxScore: number;
  percentage: number;
};

type QuizProps = {
  quizData: QuizData;
  previousAttempts: Attempt[];
  onSubmit: (
    answers: Record<string, string>,
    wasAutoSubmitted: boolean
  ) => void;
};

export function Quiz({ quizData, previousAttempts, onSubmit }: QuizProps) {
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [verificationChecked, setVerificationChecked] = useState(false);
  const [hasShownWarning, setHasShownWa] = useState(false);
  const [autoSubmitWarningVisible, setAutoSubmitWarningVisible] =
    useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const wasAutoSubmitted = useRef(false);

  // Calculate total possible marks
  const totalMarks = quizData.questions.reduce(
    (total, q) => total + q.marks,
    0
  );

  // Start timer when quiz begins
  useEffect(() => {
    if (isQuizActive) {
      setTimeLeft(quizData.estimatedMinutes * 60);

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isQuizActive, quizData.estimatedMinutes]);

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle tab visibility change
  //   useEffect(() => {
  //     const handleVisibilityChange = () => {
  //       if (isQuizActive && document.visibilityState === "hidden") {
  //         wasAutoSubmitted.current = true;
  //         handleSubmit();
  //       }
  //     };

  //     document.addEventListener("visibilitychange", handleVisibilityChange);

  //     return () => {
  //       document.removeEventListener("visibilitychange", handleVisibilityChange);
  //     };
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [isQuizActive, answers]);

  useEffect(() => {
    // Show warning when quiz is active
    if (isQuizActive) {
      setAutoSubmitWarningVisible(true);
      const timer = setTimeout(() => {
        setAutoSubmitWarningVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isQuizActive]);

  // Handle starting the quiz
  const handleStartQuiz = () => {
    setIsQuizActive(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setVerificationChecked(false);
    wasAutoSubmitted.current = false;
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Navigate to next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Navigate to previous question
  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Handle quiz submission
  const handleSubmit = () => {
    onSubmit(answers, wasAutoSubmitted.current);
    setIsQuizActive(false);
  };

  // Calculate progress percentage
  const progressPercentage = Math.round(
    (Object.keys(answers).length / quizData.questions.length) * 100
  );

  // Current question
  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div className="mx-auto max-sm:p-0 py-3 lg:py-8 lg:px-4">
      {/* Initial Quiz Info Screen */}
      {!isQuizActive && (
        <Card className="w-full border-0 shadow-none">
          <CardHeader className="max-sm:px-0">
            <CardTitle className="text-base sm:text-4xl">
              {quizData.title}
            </CardTitle>
            {/* <CardDescription>{quizData.description}</CardDescription> */}
            <div className="flex items-center sm:mt-2 text-muted-foreground max-sm:text-sm">
              <Clock className="h-4 w-4 mr-2" />
              <span className="font-medium">
                Estimated time: {quizData.estimatedMinutes} minutes
              </span>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <div>
              <div className="">
                <h3 className="sm:text-lg font-medium">Your grade</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  You {"haven't"} submitted this yet. We keep your highest score
                </p>
                <h2 className="text-xl font-semibold">--</h2>
              </div>
            </div>
            <div className="my-6">
              <h3 className="sm:text-lg font-medium mb-3">
                Your Previous Attempts
              </h3>
              {previousAttempts.length > 0 ? (
                <div className="space-y-3">
                  {previousAttempts.map((attempt) => (
                    <Card key={attempt.id} className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">
                              {new Date(attempt.date).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Score: {attempt.score}/{attempt.maxScore} points
                            </p>
                          </div>
                          <Badge
                            variant={
                              attempt.percentage >= 70
                                ? "success"
                                : "destructive"
                            }
                          >
                            {attempt.percentage}%
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  You {"haven't"} attempted this quiz yet.
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="max-sm:px-0">
            <Button onClick={handleStartQuiz} className="ml-auto">
              Take Quiz Now
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Full Screen Quiz Modal */}
      <AnimatePresence>
        {isQuizActive && (
          <motion.div
            className="fixed inset-0 bg-background z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Auto-submit warning */}
            <AnimatePresence>
              {autoSubmitWarningVisible && (
                <motion.div
                  className="fixed top-4 left-4 right-4 bg-amber-100 border border-amber-400 text-amber-800 p-4 rounded-md shadow-md z-50"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        Warning: Do not leave this tab!
                      </p>
                      <p className="text-sm">
                        If you navigate away from this page, your quiz will be
                        automatically submitted with your current answers.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quiz Header */}
            <div className="border-b sticky top-0 bg-background z-10">
              <div className="container max-w-3xl mx-auto py-4 px-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-bold">{quizData.title}</h1>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-mono">{formatTime(timeLeft)}</span>
                  </div>
                </div>
                <div className="mt-4 mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </div>
            </div>

            {/* Quiz Content */}
            <div className="container max-w-3xl mx-auto py-8 px-4">
              {/* Current Question */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">
                    Question {currentQuestionIndex + 1} of{" "}
                    {quizData.questions.length}
                  </h2>
                  <Badge variant="outline" className="ml-auto">
                    {currentQuestion.marks}{" "}
                    {currentQuestion.marks === 1 ? "mark" : "marks"}
                  </Badge>
                </div>

                <p className="text-lg mb-6">{currentQuestion.question}</p>

                <RadioGroup
                  value={answers[currentQuestion.id] || ""}
                  onValueChange={(value) =>
                    handleAnswerSelect(currentQuestion.id, value)
                  }
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2 border p-4 rounded-md hover:bg-muted"
                    >
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label
                        htmlFor={option.id}
                        className="flex-grow cursor-pointer"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex max-xs:flex-col-reverse max-xs:gap-4 justify-between mt-8 mb-16">
                <Button
                  variant="outline"
                  className="max-xs:w-full"
                  onClick={goToPrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>

                {currentQuestionIndex < quizData.questions.length - 1 ? (
                  <Button className="max-xs:w-full" onClick={goToNextQuestion}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    className="max-xs:w-full"
                    onClick={() =>
                      window.scrollTo(0, document.body.scrollHeight)
                    }
                    variant="default"
                  >
                    Review & Submit
                  </Button>
                )}
              </div>

              {/* Submit Section - Only visible on the last question */}
              {currentQuestionIndex === quizData.questions.length - 1 && (
                <Card className="mt-8 border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle>Ready to Submit?</CardTitle>
                    <CardDescription>
                      {"You've"} answered {Object.keys(answers).length} of{" "}
                      {quizData.questions.length} questions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-2 mb-6">
                      <Checkbox
                        id="verification"
                        checked={verificationChecked}
                        onCheckedChange={(checked) =>
                          setVerificationChecked(checked === true)
                        }
                        className="mt-1"
                      />
                      <Label htmlFor="verification" className="text-sm">
                        I confirm that I have completed this quiz on my own
                        without any assistance from others, and I understand
                        that leaving this tab will result in automatic
                        submission of my quiz.
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleSubmit}
                      disabled={
                        !verificationChecked ||
                        Object.keys(answers).length === 0
                      }
                      className="w-full"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Submit Quiz
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Quiz;
