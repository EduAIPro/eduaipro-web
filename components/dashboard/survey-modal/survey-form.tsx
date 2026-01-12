import React, { useState } from "react";
import { Survey, SurveyAnswer, SurveyQuestion } from "@/types/admin/surveys";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming it exists or I use Input
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"; // Assuming it exists
import { cn } from "@/lib/utils";

type SurveyFormProps = {
  survey: Survey;
  onSubmit: (answers: SurveyAnswer[]) => void;
  isSubmitting: boolean;
  onCancel: () => void;
};

export const SurveyForm: React.FC<SurveyFormProps> = ({
  survey,
  onSubmit,
  isSubmitting,
  onCancel,
}) => {
  const [answers, setAnswers] = useState<
    Record<string, Omit<SurveyAnswer, "questionId">>
  >({});

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: { textValue: value } }));
  };

  const handleRadioChange = (
    questionId: string,
    value: string,
    optionId: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { selectedOptions: [value], optionId },
    }));
  };

  const handleCheckboxChange = (
    questionId: string,
    value: string,
    checked: boolean
  ) => {
    setAnswers((prev) => {
      const current = (prev[questionId] as string[]) || [];
      if (checked) {
        return {
          ...prev,
          [questionId]: { selectedOptions: [...current, value] },
        };
      } else {
        return {
          ...prev,
          [questionId]: { selectedOptions: current.filter((v) => v !== value) },
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedAnswers = Object.entries(answers).map(
      ([questionId, answer]) => ({
        questionId,
        ...answer,
      })
    );
    onSubmit(formattedAnswers);
  };

  const renderQuestionInput = (question: SurveyQuestion) => {
    switch (question.type) {
      case "SHORT_TEXT":
        return (
          <Input
            placeholder={question.placeholder || "Your answer"}
            value={(answers[question.id] as string) || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            required={question.isRequired}
            className="w-full"
          />
        );
      case "LONG_TEXT":
        return (
          // Fallback to Input if Textarea doesn't exist, but I'll assume it likely does or standard textarea
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={question.placeholder || "Your answer"}
            value={(answers[question.id] as string) || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            required={question.isRequired}
          />
        );
      case "MULTIPLE_CHOICE_SINGLE":
      case "YES_NO":
      case "RATING_SCALE": // Treating rating roughly as single choice for now unless specific UI
        return (
          <RadioGroup
            value={(answers[question.id] as string) || ""}
            className="space-y-2"
            onValueChange={(val) => {
              const [value, optionId] = val.split("~");
              handleRadioChange(question.id, value, optionId);
            }}
          >
            {question.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={`${option.value}~${option.id}`}
                  id={`${question.id}-${option.id}`}
                />
                <Label htmlFor={`${question.id}-${option.id}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "MULTIPLE_CHOICE_MULTIPLE":
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}-${option.id}`}
                  checked={((answers[question.id] as string[]) || []).includes(
                    option.value
                  )}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      question.id,
                      option.value,
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor={`${question.id}-${option.id}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <Input
            placeholder={question.placeholder || "Your answer"}
            value={(answers[question.id] as string) || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full"
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 py-4">
      <div className="flex flex-col gap-6 max-h-[60vh] overflow-y-auto px-1">
        {survey.questions
          ?.sort((a, b) => a.index - b.index)
          .map((question, index) => (
            <div key={question.id} className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label className="font-semibold text-zinc-800">
                  {index + 1}. {question.title}{" "}
                  {question.isRequired && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                {question.description && (
                  <p className="text-sm text-zinc-500">
                    {question.description}
                  </p>
                )}
              </div>
              <div className="mt-1">{renderQuestionInput(question)}</div>
            </div>
          ))}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
        <Button
          variant="outline"
          onClick={onCancel}
          type="button"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          Submit Survey
        </Button>
      </div>
    </form>
  );
};
