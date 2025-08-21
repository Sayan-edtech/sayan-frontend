import { useState } from "react";
import { ClipboardCheck, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { Lesson } from "@/types/lesson";
import { MobileMenuButton } from "./MobileMenuButton";

interface QuizLessonProps {
  lesson: Lesson;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

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

interface QuizResults {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  isCompleted: boolean;
}

// Mock quiz data based on the Exam component structure
const mockQuizData = {
  title: "اختبار HTML الأساسي",
  timeLimit: 30, // minutes
  questions: [
    {
      id: 1,
      type: "mcq" as const,
      question: "ما هو الغرض من HTML؟",
      options: [
        "تنسيق الصفحات",
        "بناء هيكل الصفحات",
        "إضافة التفاعل",
        "إدارة البيانات",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      type: "mcq" as const,
      question: "أي من هذه العناصر يستخدم للعنوان الرئيسي؟",
      options: ["<title>", "<h1>", "<header>", "<head>"],
      correctAnswer: 1,
    },
    {
      id: 3,
      type: "qa" as const,
      question: "اكتب العنصر المستخدم لإنشاء فقرة في HTML؟",
      answer: "<p>",
    },
    {
      id: 4,
      type: "tf" as const,
      question: "HTML هو لغة برمجة",
      correctAnswer: false,
    },
    {
      id: 5,
      type: "tf" as const,
      question: "عنصر <br> يستخدم لإنشاء سطر جديد",
      correctAnswer: true,
    },
    {
      id: 6,
      type: "mcq" as const,
      question: "ما هو العنصر المستخدم لإنشاء قائمة غير مرتبة؟",
      options: ["<ol>", "<ul>", "<li>", "<list>"],
      correctAnswer: 1,
    },
  ] as Question[],
};

export function QuizLesson({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: QuizLessonProps) {
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: string | number | boolean;
  }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(
    mockQuizData.timeLimit * 60
  ); // in seconds

  const { questions } = mockQuizData;

  // Calculate results
  const calculateResults = (): QuizResults => {
    let correctAnswers = 0;
    questions.forEach((q) => {
      const userAnswer = userAnswers[q.id];
      if (q.type === "mcq" && userAnswer === q.correctAnswer) {
        correctAnswers++;
      } else if (
        q.type === "qa" &&
        typeof userAnswer === "string" &&
        userAnswer.toLowerCase().trim() === q.answer.toLowerCase().trim()
      ) {
        correctAnswers++;
      } else if (q.type === "tf" && userAnswer === q.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / questions.length) * 100);
    return {
      score,
      totalQuestions: questions.length,
      correctAnswers,
      isCompleted: true,
    };
  };

  const handleAnswerChange = (
    questionId: number,
    answer: string | number | boolean
  ) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
    setTimeRemaining(mockQuizData.timeLimit * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const progress = (answeredCount / questions.length) * 100;
  const results = showResults ? calculateResults() : null;

  // Results view
  if (showResults && results) {
    return (
      <div className="bg-white rounded-xl shadow-sm border-0 h-full">
        <div className="p-4 lg:p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <MobileMenuButton
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            <div className="flex items-center gap-2 text-right flex-1 lg:flex-none justify-end">
              <Award className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-900">
                نتائج الاختبار
              </h2>
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-6">
          <Card className="p-6 text-center space-y-6 border-border">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">
                {results.score}%
              </div>
              <p className="text-gray-600">درجتك في الاختبار</p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-semibold text-green-600">
                  {results.correctAnswers}
                </div>
                <p className="text-sm text-gray-600">إجابات صحيحة</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-semibold text-red-600">
                  {results.totalQuestions - results.correctAnswers}
                </div>
                <p className="text-sm text-gray-600">إجابات خاطئة</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-semibold text-blue-600">
                  {results.totalQuestions}
                </div>
                <p className="text-sm text-gray-600">إجمالي الأسئلة</p>
              </div>
            </div>

            <div className="pt-4">
              <Badge
                className={`px-4 py-2 text-base ${
                  results.score >= 70
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {results.score >= 70 ? "نجح ✓" : "راسب ✗"}
              </Badge>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={resetQuiz}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                إعادة المحاولة
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  /* Navigate to next lesson */
                }}
                className="flex-1"
              >
                المتابعة للدرس التالي
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border-0 border-border h-full">
      <div className="p-4 lg:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <MobileMenuButton
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          <div className="flex items-center gap-2 text-right flex-1 lg:flex-none justify-end">
            <ClipboardCheck className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              {mockQuizData.title}
            </h2>
          </div>
        </div>

        {/* Quiz Progress */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>
              {answeredCount} / {questions.length} سؤال مجاب
            </span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="p-4 lg:p-6 space-y-6">
        {/* All Questions */}
        {questions.map((question, index) => (
          <Card key={question.id} className="p-6 border-border">
            <div className="space-y-4">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 text-right">
                  السؤال {index + 1}: {question.question}
                </h3>
                <div
                  className={`w-6 h-6 rounded-full border-2 border-border flex items-center justify-center ${
                    userAnswers[question.id] !== undefined
                      ? "border-primary bg-primary"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {userAnswers[question.id] !== undefined && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>

              {/* MCQ Options */}
              {question.type === "mcq" && (
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                        userAnswers[question.id] === optionIndex
                          ? "border-blue-500 bg-blue-50"
                          : "border-border"
                      }`}
                    >
                      <span className="text-right flex-1 font-medium text-gray-700">
                        {option}
                      </span>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={optionIndex}
                        checked={userAnswers[question.id] === optionIndex}
                        onChange={() =>
                          handleAnswerChange(question.id, optionIndex)
                        }
                        className="w-4 h-4 text-blue-600"
                      />
                    </label>
                  ))}
                </div>
              )}

              {/* Q&A Input */}
              {question.type === "qa" && (
                <div>
                  <input
                    type="text"
                    value={(userAnswers[question.id] as string) || ""}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    placeholder="اكتب إجابتك هنا..."
                    className="w-full p-4 border border-border rounded-lg focus:border-blue-500 focus:outline-none text-right"
                  />
                </div>
              )}

              {/* True/False Options */}
              {question.type === "tf" && (
                <div className="space-y-3">
                  <label
                    className={`flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                      userAnswers[question.id] === true
                        ? "border-green-500 bg-green-50"
                        : "border-border"
                    }`}
                  >
                    <span className="text-right flex-1 font-medium text-green-700">
                      صحيح ✓
                    </span>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value="true"
                      checked={userAnswers[question.id] === true}
                      onChange={() => handleAnswerChange(question.id, true)}
                      className="w-4 h-4 text-green-600"
                    />
                  </label>
                  <label
                    className={`flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                      userAnswers[question.id] === false
                        ? "border-red-500 bg-red-50"
                        : "border-border"
                    }`}
                  >
                    <span className="text-right flex-1 font-medium text-red-700">
                      خطأ ✗
                    </span>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value="false"
                      checked={userAnswers[question.id] === false}
                      onChange={() => handleAnswerChange(question.id, false)}
                      className="w-4 h-4 text-red-600"
                    />
                  </label>
                </div>
              )}
            </div>
          </Card>
        ))}

        {/* Submit Button */}
        <div className="flex justify-center pt-6 border-t border-border">
          <Button
            onClick={handleSubmitQuiz}
            disabled={answeredCount < questions.length}
          >
            إرسال الاختبار ({answeredCount} / {questions.length})
          </Button>
        </div>
      </div>
    </div>
  );
}
