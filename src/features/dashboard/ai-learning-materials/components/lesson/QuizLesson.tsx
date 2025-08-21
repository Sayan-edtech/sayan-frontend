import { useState } from "react";
import {
  ClipboardCheck,
  CheckCircle,
  XCircle,
  Award,
  Clock,
} from "lucide-react";
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
    [key: number]: string | number;
  }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(
    mockQuizData.timeLimit * 60
  ); // in seconds

  const { questions } = mockQuizData;
  const currentQuestion = questions[currentQuestionIndex];

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

  const handleAnswerChange = (questionId: number, answer: string | number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
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

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const results = showResults ? calculateResults() : null;

  // Results view
  if (showResults && results) {
    return (
      <div className="bg-white rounded-xl shadow-sm border-0 h-full">
        <div className="p-4 lg:p-6 border-b">
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
          <Card className="p-6 text-center space-y-6">
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

          {/* Review answers */}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              مراجعة الإجابات
            </h3>
            {questions.map((q, index) => {
              const userAnswer = userAnswers[q.id];
              const isCorrect =
                q.type === "mcq"
                  ? userAnswer === q.correctAnswer
                  : typeof userAnswer === "string" &&
                    userAnswer.toLowerCase().trim() ===
                      q.answer.toLowerCase().trim();

              return (
                <Card key={q.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          السؤال {index + 1}: {q.question}
                        </h4>

                        {q.type === "mcq" && (
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-600">
                              إجابتك:{" "}
                              <span
                                className={
                                  isCorrect ? "text-green-600" : "text-red-600"
                                }
                              >
                                {q.options[userAnswer as number] || "لم تجب"}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-green-600">
                                الإجابة الصحيحة: {q.options[q.correctAnswer]}
                              </p>
                            )}
                          </div>
                        )}

                        {q.type === "qa" && (
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-600">
                              إجابتك:{" "}
                              <span
                                className={
                                  isCorrect ? "text-green-600" : "text-red-600"
                                }
                              >
                                {(userAnswer as string) || "لم تجب"}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-green-600">
                                الإجابة الصحيحة: {q.answer}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border-0 h-full">
      <div className="p-4 lg:p-6 border-b">
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
              السؤال {currentQuestionIndex + 1} من {questions.length}
            </span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="p-4 lg:p-6">
        <Card className="p-6">
          <div className="space-y-6">
            {/* Question */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 text-right mb-4">
                {currentQuestion.question}
              </h3>

              {/* MCQ Options */}
              {currentQuestion.type === "mcq" && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                        userAnswers[currentQuestion.id] === optionIndex
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <span className="text-right flex-1 font-medium text-gray-700">
                        {option}
                      </span>
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={optionIndex}
                        checked={
                          userAnswers[currentQuestion.id] === optionIndex
                        }
                        onChange={() =>
                          handleAnswerChange(currentQuestion.id, optionIndex)
                        }
                        className="w-4 h-4 text-blue-600"
                      />
                    </label>
                  ))}
                </div>
              )}

              {/* Q&A Input */}
              {currentQuestion.type === "qa" && (
                <div>
                  <input
                    type="text"
                    value={(userAnswers[currentQuestion.id] as string) || ""}
                    onChange={(e) =>
                      handleAnswerChange(currentQuestion.id, e.target.value)
                    }
                    placeholder="اكتب إجابتك هنا..."
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-right"
                  />
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex gap-3">
                {currentQuestionIndex > 0 && (
                  <Button variant="outline" onClick={handlePreviousQuestion}>
                    السؤال السابق
                  </Button>
                )}

                {currentQuestionIndex < questions.length - 1 ? (
                  <Button
                    onClick={handleNextQuestion}
                    disabled={userAnswers[currentQuestion.id] === undefined}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    السؤال التالي
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmitQuiz}
                    disabled={
                      Object.keys(userAnswers).length < questions.length
                    }
                    className="bg-green-600 hover:bg-green-700"
                  >
                    إرسال الاختبار
                  </Button>
                )}
              </div>

              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                {Object.keys(userAnswers).length} / {questions.length} مجاب
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
