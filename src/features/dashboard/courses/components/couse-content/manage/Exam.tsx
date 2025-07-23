import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Lesson } from "@/types/couse";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { FileQuestion, Plus } from "lucide-react";

function Exam({ lesson }: { lesson: Lesson }) {
  type Question =
    | {
        id: number;
        type: "mcq";
        question: string;
        options: string[];
        correctAnswer: number;
      }
    | {
        id: number;
        type: "qa";
        question: string;
        answer: string;
      };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestionType, setNewQuestionType] = useState<"mcq" | "qa">("mcq");
  // Optionally, you can initialize with lesson.questions if available
  // const [questions, setQuestions] = useState<any[]>(lesson.questions || []);

  const handleAddQuestion = () => {
    if (newQuestionType === "mcq") {
      const newQuestion: Question = {
        id: Date.now(),
        type: "mcq",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      };
      setQuestions((prev) => [...prev, newQuestion]);
    } else {
      const newQuestion: Question = {
        id: Date.now(),
        type: "qa",
        question: "",
        answer: "",
      };
      setQuestions((prev) => [...prev, newQuestion]);
    }
  };

  return (
    <Card className="p-6 shadow-sm border-0 h-fit">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <FileQuestion className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            {lesson.title}
          </h3>
        </div>

        {/* Edit Title */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            عنوان الاختبار
          </Label>
          <Input
            value={lesson?.title}
            onChange={() => {}}
            placeholder="أدخل عنوان الاختبار"
            className="border-gray-200 focus:border-blue-500"
          />
        </div>

        {/* Questions Section */}
        <div className="space-y-4">
          {/* Question type selector */}
          <div className="flex items-center gap-6 mb-2">
            <span className="text-sm font-medium text-gray-700">
              نوع السؤال:
            </span>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="question-type"
                value="mcq"
                checked={newQuestionType === "mcq"}
                onChange={() => setNewQuestionType("mcq")}
              />
              <span className="text-xs">اختيار من متعدد</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="question-type"
                value="qa"
                checked={newQuestionType === "qa"}
                onChange={() => setNewQuestionType("qa")}
              />
              <span className="text-xs">سؤال وجواب</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                الأسئلة
              </Label>
              <p className="text-xs text-gray-500">{questions.length} سؤال</p>
            </div>
            <Button
              type="button"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleAddQuestion}
            >
              <Plus className="w-4 h-4 mr-2" />
              إضافة سؤال
            </Button>
          </div>

          {/* Questions List */}
          <div className="space-y-3">
            {questions.length === 0 ? (
              <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <FileQuestion className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">لا توجد أسئلة بعد</p>
                <p className="text-sm mb-4">ابدأ بإنشاء سؤالك الأول</p>
                <Button
                  type="button"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleAddQuestion}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  إنشاء سؤال جديد
                </Button>
              </div>
            ) : (
              questions.map((question, index) => (
                <div
                  key={question.id}
                  className="p-4 bg-gray-50 rounded-lg border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">سؤال {index + 1}</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="text-xs px-2 py-1"
                      onClick={() => {
                        setQuestions(
                          questions.filter((q) => q.id !== question.id)
                        );
                      }}
                    >
                      حذف
                    </Button>
                  </div>
                  <Input
                    value={question.question}
                    onChange={(e) => {
                      const updated = [...questions];
                      updated[index] = {
                        ...question,
                        question: e.target.value,
                      };
                      setQuestions(updated);
                    }}
                    placeholder="نص السؤال"
                    className="mb-2"
                  />
                  {/* MCQ Options */}
                  {question.type === "mcq" && (
                    <>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        {question.options.map((option, optIdx) => (
                          <div key={optIdx} className="flex flex-col">
                            <span className="text-xs text-gray-500 mb-1">
                              الخيار {optIdx + 1}
                            </span>
                            <Input
                              value={option}
                              onChange={(e) => {
                                const updated = [...questions];
                                if (question.type === "mcq") {
                                  const newOptions = [...question.options];
                                  newOptions[optIdx] = e.target.value;
                                  updated[index] = {
                                    ...question,
                                    options: newOptions,
                                  };
                                  setQuestions(updated);
                                }
                              }}
                              placeholder={`اكتب الخيار هنا`}
                            />
                          </div>
                        ))}
                      </div>
                      {/* Correct answer selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs">الإجابة الصحيحة:</span>
                        {question.options.map((_, optIdx) => (
                          <label
                            key={optIdx}
                            className="flex items-center gap-1"
                          >
                            <input
                              type="radio"
                              name={`correct-${question.id}`}
                              checked={question.correctAnswer === optIdx}
                              onChange={() => {
                                const updated = [...questions];
                                if (question.type === "mcq") {
                                  updated[index] = {
                                    ...question,
                                    correctAnswer: optIdx,
                                  };
                                  setQuestions(updated);
                                }
                              }}
                            />
                            <span className="text-xs">{optIdx + 1}</span>
                          </label>
                        ))}
                      </div>
                    </>
                  )}
                  {/* Q&A Answer */}
                  {question.type === "qa" && (
                    <div className="mb-2">
                      <span className="text-xs text-gray-500 mb-1 block">
                        الإجابة
                      </span>
                      <Input
                        value={question.answer}
                        onChange={(e) => {
                          const updated = [...questions];
                          if (question.type === "qa") {
                            updated[index] = {
                              ...question,
                              answer: e.target.value,
                            };
                            setQuestions(updated);
                          }
                        }}
                        placeholder="اكتب الإجابة هنا"
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t">
          <div className="flex gap-3">
            <Button
              type="button"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {}}
            >
              حفظ التغييرات
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Exam;
