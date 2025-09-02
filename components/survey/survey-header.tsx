"use client";

import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Plus, Trash2, GripVertical, ArrowLeft } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetOverlay,
} from "../ui/sheet";
import { Input } from "../ui/input";

interface Option {
  id: number;
  value: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

export default function SurveyHeader() {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const addQuestion = () => {
    if (!currentQuestion.trim()) return;
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        text: currentQuestion,
        options: options.map((o) => ({ ...o })),
      },
    ]);
    setCurrentQuestion("");
    setOptions([]);
    setSelectedQuestionId(null);
  };

  const saveQuestion = () => {
    if (!currentQuestion.trim()) return;

    if (selectedQuestionId !== null) {
  
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === selectedQuestionId
            ? {
                ...q,
                text: currentQuestion,
                options: options.map((o) => ({ ...o })),
              }
            : q
        )
      );
    } else {
      setQuestions((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: currentQuestion,
          options: options.map((o) => ({ ...o })),
        },
      ]);
    }

    setCurrentQuestion("");
    setOptions([]);
    setSelectedQuestionId(null);
  };

  const addOption = () => {
    setOptions([...options, { id: Date.now(), value: "" }]);
  };

  const updateOption = (id: number, value: string) => {
    setOptions(options.map((o) => (o.id === id ? { ...o, value } : o)));
  };

  const removeOption = (id: number) => {
    setOptions(options.filter((o) => o.id !== id));
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSelectQuestion = (q: Question) => {
    setSelectedQuestionId(q.id);
    setCurrentQuestion(q.text);
    setOptions(q.options.map((o) => ({ ...o })));
  };

  const handleDeleteFromEditor = () => {
    if (selectedQuestionId !== null) {
      deleteQuestion(selectedQuestionId);
      setSelectedQuestionId(null);
    }
    setCurrentQuestion("");
    setOptions([]);
  };

  const handleNewQuestion = () => {
    setSelectedQuestionId(null);
    setCurrentQuestion("");
    setOptions([]);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const selectedIndex =
    selectedQuestionId !== null
      ? questions.findIndex((q) => q.id === selectedQuestionId)
      : -1;

  return (
    <div className="flex items-center justify-between">
      <p className="text-[18px] font-semibold text-[#141414]">Recent Surveys</p>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="default" onClick={() => setOpen(true)}>
            <Plus className="" />
            Create Survey
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-full sm:max-w-full top-[84px] h-[calc(100vh-64px)] p-0 bg-[#F9FBFC] flex flex-col overflow-hidden"
          withOverlay={false}>
          <SheetOverlay className="hidden" />

          <SheetHeader className="p-6">
            <div
              className="flex items-center gap-2 cursor-pointer w-[152px]"
              onClick={() => setOpen(false)}>
              <ArrowLeft size={18} className=" mb-0.5" />
              <SheetTitle className="text-[18px] font-semibold text-[#141414]">
                Create Survey
              </SheetTitle>
            </div>
          </SheetHeader>

          <div className="flex gap-[10px]  mx-[30px] bg-white overflow-scroll">
            <div className="w-1/3 border p-4 space-y-2 rounded-[12px] flex flex-col justify-between">
              <div className="flex flex-col justify-between overflow-y-auto">
                <p className="font-semibold text-[#141414] text-[18px] mb-[30px]">
                  Questions
                </p>
                <div className="flex flex-col gap-[10px] mb-[10px]">
                  {questions.map((q) => (
                    <div
                      key={q.id}
                      className="p-[10px] border rounded-md flex gap-[10px] bg-[#F9FBFC]"
                      onClick={() => handleSelectQuestion(q)}>
                      <GripVertical size={16} className="mt-[3px]" />

                      <div className="flex flex-col gap-[10px]">
                        <p className="font-semibold text-[14px] text-[#141414]">
                          {q.text}
                        </p>
                        <p className="text-[14px] font-medium text-[#656565]">
                          Multiple Choice
                        </p>
                      </div>
                    </div>
                  ))}{" "}
                </div>

                <div>
                  <Button
                    variant="secondary"
                    className="text-[#0043BE] border-[#0043BE]"
                    onClick={handleNewQuestion}>
                    <Plus /> Add Question
                  </Button>
                </div>
              </div>

              <Button className="">Create Course</Button>
            </div>

            <div className="flex-1 border rounded-[12px] p-6 space-y-6 overflow-y-auto">
              <div className="flex flex-col gap-[5px]">
                <label className="block text-[14px] tex-[#141414] font-medium">
                  Question
                </label>
                <Input
                  ref={inputRef}
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  placeholder="Enter your question"
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="block text-[14px] tex-[#141414] font-medium">
                  Options
                </label>
                {options.map((o) => (
                  <div key={o.id} className="flex items-center gap-2 mb-2">
                    <input
                      value={o.value}
                      onChange={(e) => updateOption(o.id, e.target.value)}
                      placeholder="Option text"
                      className="flex-1 border rounded-md p-2"
                    />
                    <div className="flex items-center gap-[5px]">
                      <button className="bg-white border border-[#DBDBDB] rounded-[5.05px] w-[24px] h-[24px] flex justify-center items-center">
                        <GripVertical className="w-[11px] h-[11px] text-[#656565]" />
                      </button>
                      <button
                        onClick={() => removeOption(o.id)}
                        className="bg-[#FA6666] border border-[#FF0000] rounded-[5.05px] w-[24px] h-[24px] flex justify-center items-center">
                        <Trash2 className="w-[11px] h-[11px] text-white" />
                      </button>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addOption}
                  className="mt-2 w-full">
                  + Add Option
                </Button>
              </div>

              <div>
                <p className="font-semibold mb-2">Question Preview</p>
                <div className="p-4 border rounded-md bg-[#F9FBFC]">
                  <p className="mb-2">
                    Question{" "}
                    {selectedIndex >= 0
                      ? selectedIndex + 1
                      : questions.length + 1}
                    . {currentQuestion || ""}
                  </p>
                  {options.map((o) => (
                    <div key={o.id} className="flex items-center gap-2 mb-1">
                      <input type="checkbox" disabled />
                      <span>{o.value || "Option"}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="destructive"
                  onClick={handleDeleteFromEditor}
                  className="flex items-center">
                  <Trash2 className="w-4 h-4" /> Delete Question
                </Button>
                <Button variant="default" onClick={saveQuestion}>
                  Save Question
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
