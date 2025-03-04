"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";
import Quiz from "./Quiz";

// Sample quiz data
const sampleQuizData = {
  id: "quiz-123",
  title: "Graded Quiz: Assessment for Learning",
  estimatedMinutes: 15,
  questions: [
    {
      id: "q1",
      question: "Which HTML element is used to create a hyperlink?",
      options: [
        { id: "q1_a", text: "<link>" },
        { id: "q1_b", text: "<a>" },
        { id: "q1_c", text: "<href>" },
        { id: "q1_d", text: "<url>" },
      ],
      correctOptionId: "q1_b",
      marks: 2,
    },
    {
      id: "q2",
      question: "Which CSS property is used to change the text color?",
      options: [
        { id: "q2_a", text: "text-color" },
        { id: "q2_b", text: "font-color" },
        { id: "q2_c", text: "color" },
        { id: "q2_d", text: "text-style" },
      ],
      correctOptionId: "q2_c",
      marks: 1,
    },
    {
      id: "q3",
      question:
        "Which JavaScript method is used to add an element to the end of an array?",
      options: [
        { id: "q3_a", text: "push()" },
        { id: "q3_b", text: "append()" },
        { id: "q3_c", text: "addToEnd()" },
        { id: "q3_d", text: "insert()" },
      ],
      correctOptionId: "q3_a",
      marks: 2,
    },
    {
      id: "q4",
      question: "Which of the following is NOT a JavaScript data type?",
      options: [
        { id: "q4_a", text: "Boolean" },
        { id: "q4_b", text: "Undefined" },
        { id: "q4_c", text: "Character" },
        { id: "q4_d", text: "Symbol" },
      ],
      correctOptionId: "q4_c",
      marks: 3,
    },
    {
      id: "q5",
      question: "What CSS property is used to create space between elements?",
      options: [
        { id: "q5_a", text: "spacing" },
        { id: "q5_b", text: "margin" },
        { id: "q5_c", text: "padding" },
        { id: "q5_d", text: "gap" },
      ],
      correctOptionId: "q5_b",
      marks: 2,
    },
  ],
};

// Sample previous attempts
const samplePreviousAttempts = [
  {
    id: "attempt-1",
    date: new Date(2025, 1, 15),
    score: 6,
    maxScore: 10,
    percentage: 60,
  },
  {
    id: "attempt-2",
    date: new Date(2025, 1, 18),
    score: 8,
    maxScore: 10,
    percentage: 80,
  },
];

export default function QuizPage() {
  const [previousAttempts, setPreviousAttempts] = useState(
    samplePreviousAttempts
  );
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState<{
    score: number;
    maxScore: number;
    percentage: number;
    wasAutoSubmitted: boolean;
    answers: Record<string, string>;
  } | null>(null);

  // Handle quiz submission
  const handleQuizSubmit = (
    answers: Record<string, string>,
    wasAutoSubmitted: boolean
  ) => {
    // Calculate the score
    let score = 0;
    const maxScore = sampleQuizData.questions.reduce(
      (total, q) => total + q.marks,
      0
    );

    // Grade the quiz
    sampleQuizData.questions.forEach((question) => {
      if (answers[question.id] === question.correctOptionId) {
        score += question.marks;
      }
    });

    const percentage = Math.round((score / maxScore) * 100);

    // Save the results
    const results = {
      score,
      maxScore,
      percentage,
      wasAutoSubmitted,
      answers,
    };

    setQuizResults(results);
    setShowResults(true);

    // Add to previous attempts
    const newAttempt = {
      id: `attempt-${previousAttempts.length + 1}`,
      date: new Date(),
      score,
      maxScore,
      percentage,
    };

    setPreviousAttempts([...previousAttempts, newAttempt]);
  };

  // Reset after viewing results
  const handleCloseResults = () => {
    setShowResults(false);
    setQuizResults(null);
  };

  return (
    <div className="container mx-auto sm:py-8">
      <Quiz
        quizData={sampleQuizData}
        previousAttempts={previousAttempts}
        onSubmit={handleQuizSubmit}
      />

      {/* Results Dialog */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="sm:max-w-md p-4">
          <DialogHeader>
            <DialogTitle>Quiz Results</DialogTitle>
            <DialogDescription>
              {quizResults?.wasAutoSubmitted
                ? "Your quiz was automatically submitted because you navigated away from the tab."
                : "Here's how you did on the quiz."}
            </DialogDescription>
          </DialogHeader>

          {quizResults && (
            <div className="py-4">
              {quizResults.wasAutoSubmitted && (
                <Card className="mb-4 border-amber-200 bg-amber-50">
                  <CardContent className="p-4 flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-800 text-sm">
                      Your quiz was automatically submitted because you
                      navigated away from the tab.
                    </p>
                  </CardContent>
                </Card>
              )}

              <Card
                className={`mb-4 p-0 ${
                  quizResults.percentage >= 70
                    ? "border-green-300 bg-green-100/50"
                    : "border-red-300 bg-red-100/50"
                }`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-center text-xl text-gray-700">
                    {quizResults.percentage >= 70 ? (
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Passed!</span>
                      </div>
                    ) : (
                      "Need Improvement"
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-gray-700 text-3xl font-bold mb-2">
                      {quizResults.score}/{quizResults.maxScore}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800/90 text-sm">
                        {quizResults.percentage}% Score
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Question Summary:</h3>
                <div className="space-y-2">
                  {sampleQuizData.questions.map((question, index) => {
                    const isCorrect =
                      quizResults.answers[question.id] ===
                      question.correctOptionId;
                    const answered = !!quizResults.answers[question.id];

                    return (
                      <div
                        key={question.id}
                        className={`p-3 rounded-md text-sm ${
                          !answered
                            ? "bg-gray-100/70"
                            : isCorrect
                            ? "bg-green-50/70 border border-green-200"
                            : "bg-red-50/70 border border-red-200"
                        }`}
                      >
                        <div className="font-medium">Question {index + 1}:</div>
                        <div className="text-muted-foreground mb-1 text-xs">
                          {!answered
                            ? "Not answered"
                            : isCorrect
                            ? "Correct"
                            : "Incorrect"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={handleCloseResults}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
