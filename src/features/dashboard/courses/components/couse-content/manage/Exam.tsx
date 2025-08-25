import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { FileQuestion, Plus, Trash2, GripVertical } from "lucide-react";
import type { Lesson } from "@/types/couse";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
      }
    | {
        id: number;
        type: "tf";
        question: string;
        correctAnswer: boolean;
      };

  // Sortable Question Item Component
  interface SortableQuestionItemProps {
    question: Question;
    globalIndex: number;
    onDelete: (questionId: number) => void;
    onUpdate: (questionId: number, updates: Partial<Question>) => void;
    onUpdateMCQOption: (
      questionId: number,
      optionIndex: number,
      value: string
    ) => void;
  }

  function SortableQuestionItem({
    question,
    globalIndex,
    onDelete,
    onUpdate,
    onUpdateMCQOption,
  }: SortableQuestionItemProps) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: question.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <AccordionItem
        ref={setNodeRef}
        style={style}
        key={question.id}
        value={`question-${question.id}`}
        className={`${isDragging ? "z-50" : ""}`}
      >
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full mr-4">
            <div className="flex items-center gap-3">
              {/* Drag Handle */}
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
              >
                <GripVertical className="w-4 h-4 text-gray-500" />
              </div>
              <span className="font-medium text-gray-800">
                السؤال {globalIndex + 1}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  question.type === "mcq"
                    ? "bg-blue-100 text-blue-700"
                    : question.type === "qa"
                    ? "bg-green-100 text-green-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {question.type === "mcq"
                  ? "اختيار من متعدد"
                  : question.type === "qa"
                  ? "سؤال وجواب"
                  : "صح أم خطأ"}
              </span>
              {question.question && (
                <span className="text-sm text-gray-500 truncate max-w-xs">
                  {question.question.substring(0, 50)}
                  {question.question.length > 50 ? "..." : ""}
                </span>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              className="text-xs px-2 py-1 ml-2"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(question.id);
              }}
            >
              <Trash2 className="w-3 h-3 ml-1" />
              حذف
            </Button>
          </div>
        </AccordionTrigger>

        <AccordionContent className="pb-4">
          <div className="space-y-4 pt-2">
            {/* Question Input */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                نص السؤال
              </label>
              <Input
                value={question.question}
                onChange={(e) =>
                  onUpdate(question.id, {
                    question: e.target.value,
                  })
                }
                placeholder="اكتب نص السؤال هنا..."
                className="w-full"
              />
            </div>

            {/* MCQ Options */}
            {question.type === "mcq" && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  الخيارات
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {question.options.map((option: string, optIdx: number) => (
                    <div key={optIdx} className="space-y-1">
                      <label className="text-xs text-gray-500">
                        الخيار {optIdx + 1}
                      </label>
                      <Input
                        value={option}
                        onChange={(e) =>
                          onUpdateMCQOption(question.id, optIdx, e.target.value)
                        }
                        placeholder={`الخيار ${optIdx + 1}`}
                      />
                    </div>
                  ))}
                </div>

                {/* Correct Answer Selection */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    الإجابة الصحيحة:
                  </label>
                  <Select
                    value={question.correctAnswer.toString()}
                    onValueChange={(value) =>
                      onUpdate(question.id, {
                        correctAnswer: Number(value),
                      })
                    }
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="اختر الإجابة" />
                    </SelectTrigger>
                    <SelectContent>
                      {question.options.map((_: string, optIdx: number) => (
                        <SelectItem key={optIdx} value={optIdx.toString()}>
                          الخيار {optIdx + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Q&A Answer */}
            {question.type === "qa" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  الإجابة المتوقعة
                </label>
                <Input
                  value={question.answer}
                  onChange={(e) =>
                    onUpdate(question.id, {
                      answer: e.target.value,
                    })
                  }
                  placeholder="اكتب الإجابة المتوقعة هنا..."
                />
              </div>
            )}

            {/* True/False Answer */}
            {question.type === "tf" && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  الإجابة الصحيحة
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`tf-${question.id}`}
                      checked={question.correctAnswer === true}
                      onChange={() =>
                        onUpdate(question.id, {
                          correctAnswer: true,
                        })
                      }
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="text-sm text-green-700 font-medium mr-2">
                      صحيح
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`tf-${question.id}`}
                      checked={question.correctAnswer === false}
                      onChange={() =>
                        onUpdate(question.id, {
                          correctAnswer: false,
                        })
                      }
                      className="w-4 h-4 text-red-600"
                    />
                    <span className="text-sm text-red-700 font-medium mr-2">
                      خطأ
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestionType, setNewQuestionType] = useState<"mcq" | "qa" | "tf">(
    "mcq"
  );
  const [examTitle, setExamTitle] = useState(lesson?.title || "");

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

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
    } else if (newQuestionType === "qa") {
      const newQuestion: Question = {
        id: Date.now(),
        type: "qa",
        question: "",
        answer: "",
      };
      setQuestions((prev) => [...prev, newQuestion]);
    } else if (newQuestionType === "tf") {
      const newQuestion: Question = {
        id: Date.now(),
        type: "tf",
        question: "",
        correctAnswer: true,
      };
      setQuestions((prev) => [...prev, newQuestion]);
    }
  };

  const handleDeleteQuestion = (questionId: number) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const updateQuestion = (questionId: number, updates: Partial<Question>) => {
    const updated = questions.map((q) => {
      if (q.id !== questionId) return q;
      if (q.type === "mcq" && updates.type !== "qa" && updates.type !== "tf") {
        return {
          ...q,
          ...(updates as Partial<Extract<Question, { type: "mcq" }>>),
        };
      }
      if (q.type === "qa" && updates.type !== "mcq" && updates.type !== "tf") {
        return {
          ...q,
          ...(updates as Partial<Extract<Question, { type: "qa" }>>),
        };
      }
      if (q.type === "tf" && updates.type !== "mcq" && updates.type !== "qa") {
        return {
          ...q,
          ...(updates as Partial<Extract<Question, { type: "tf" }>>),
        };
      }
      return q;
    });
    setQuestions(updated);
  };

  const updateMCQOption = (
    questionId: number,
    optionIndex: number,
    value: string
  ) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && question.type === "mcq") {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const mcqQuestions = questions.filter((q) => q.type === "mcq");
  const qaQuestions = questions.filter((q) => q.type === "qa");
  const tfQuestions = questions.filter((q) => q.type === "tf");

  return (
    <Card className="p-6 shadow-sm border-0 h-fit">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <FileQuestion className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">إنشاء اختبار</h3>
        </div>

        {/* Edit Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            عنوان الاختبار
          </label>
          <Input
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
            placeholder="أدخل عنوان الاختبار"
            className="border-gray-200 focus:border-blue-500"
          />
        </div>

        {/* Question Controls */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              نوع السؤال:
            </span>
            <Select
              value={newQuestionType}
              onValueChange={(value: "mcq" | "qa" | "tf") =>
                setNewQuestionType(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="اختر نوع السؤال" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcq">اختيار من متعدد</SelectItem>
                <SelectItem value="qa">سؤال وجواب</SelectItem>
                <SelectItem value="tf">صح أم خطأ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="button"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleAddQuestion}
          >
            <Plus className="w-4 h-4 ml-1" />
            إضافة سؤال
          </Button>
        </div>

        {/* Questions Summary */}
        {questions.length > 0 && (
          <div className="flex gap-4 text-sm text-gray-600">
            <span>إجمالي الأسئلة: {questions.length}</span>
            <span>اختيار من متعدد: {mcqQuestions.length}</span>
            <span>سؤال وجواب: {qaQuestions.length}</span>
            <span>صح أم خطأ: {tfQuestions.length}</span>
          </div>
        )}

        {/* All Questions Display */}
        <div className="space-y-6">
          {questions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <FileQuestion className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">لا توجد أسئلة في الاختبار</p>
              <p className="text-xs text-gray-400 mt-1">
                اضغط على "إضافة سؤال" لبدء إنشاء الاختبار
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-800">
                أسئلة الاختبار ({questions.length})
              </h4>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={questions.map((q) => q.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <Accordion type="single" collapsible className="w-full">
                    {questions.map((question, globalIndex) => (
                      <SortableQuestionItem
                        key={question.id}
                        question={question}
                        globalIndex={globalIndex}
                        onDelete={handleDeleteQuestion}
                        onUpdate={updateQuestion}
                        onUpdateMCQOption={updateMCQOption}
                      />
                    ))}
                  </Accordion>
                </SortableContext>
              </DndContext>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t">
          <div className="flex gap-3">
            <Button
              type="button"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                console.log("Saving exam:", { title: examTitle, questions });
                // Add your save logic here
              }}
              disabled={questions.length === 0 || !examTitle.trim()}
            >
              حفظ الاختبار ({questions.length} سؤال)
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setQuestions([]);
                setExamTitle("");
              }}
              disabled={questions.length === 0}
            >
              مسح الكل
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Exam;
