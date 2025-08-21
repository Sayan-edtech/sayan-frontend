import {
  Zap,
  CheckCircle,
  CreditCard,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Shuffle,
  Code,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Lesson } from "@/types/lesson";
import { MobileMenuButton } from "./MobileMenuButton";
import { useState } from "react";

interface InteractiveLessonProps {
  lesson: Lesson;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

// Extended lesson interface to include toolType
interface ExtendedLesson extends Lesson {
  toolType?: "colored_card" | "timeline" | "text";
}

// Types for interactive tools
type ColoredCardType = {
  id: number;
  title: string;
  content: string;
  color: string;
  image: string | null;
  isFlipped?: boolean;
};

type TimelineCardType = {
  id: number;
  name: string;
  content: string;
  order: number;
  color: string;
  currentPosition?: number;
};

type TextCardType = {
  id: number;
  title: string;
  content: string;
  isRevealed?: boolean;
};

// Mock data for different tool types
const mockToolData = {
  colored_card: {
    title: "بطاقات HTML التفاعلية",
    cards: [
      {
        id: 1,
        title: "عنصر الفقرة",
        content: "<p> يستخدم لإنشاء فقرة نصية في الصفحة",
        color: "#3B82F6",
        image: null,
        isFlipped: false,
      },
      {
        id: 2,
        title: "عنصر العنوان",
        content: "<h1> يستخدم لإنشاء العنوان الرئيسي",
        color: "#10B981",
        image: null,
        isFlipped: false,
      },
      {
        id: 3,
        title: "عنصر الرابط",
        content: "<a> يستخدم لإنشاء روابط للصفحات الأخرى",
        color: "#F59E0B",
        image: null,
        isFlipped: false,
      },
      {
        id: 4,
        title: "عنصر الصورة",
        content: "<img> يستخدم لعرض الصور في الصفحة",
        color: "#EF4444",
        image: null,
        isFlipped: false,
      },
    ] as ColoredCardType[],
  },
  timeline: {
    title: "ترتيب خطوات إنشاء موقع ويب",
    cards: [
      {
        id: 1,
        name: "التخطيط",
        content: "تحديد الهدف من الموقع والجمهور المستهدف",
        order: 1,
        color: "#3B82F6",
        currentPosition: 3,
      },
      {
        id: 2,
        name: "التصميم",
        content: "إنشاء التصميم المرئي والواجهات",
        order: 2,
        color: "#10B981",
        currentPosition: 1,
      },
      {
        id: 3,
        name: "البرمجة",
        content: "كتابة الكود وتطوير الوظائف",
        order: 3,
        color: "#F59E0B",
        currentPosition: 2,
      },
      {
        id: 4,
        name: "النشر",
        content: "رفع الموقع على الخادم ونشره",
        order: 4,
        color: "#EF4444",
        currentPosition: 4,
      },
    ] as TimelineCardType[],
  },
  text: {
    title: "عناصر HTML الأساسية",
    cards: [
      {
        id: 1,
        title: "DOCTYPE",
        content: "<!DOCTYPE html> يحدد نوع المستند كـ HTML5",
        isRevealed: false,
      },
      {
        id: 2,
        title: "HTML",
        content: "<html> العنصر الجذر الذي يحتوي على جميع عناصر الصفحة",
        isRevealed: false,
      },
      {
        id: 3,
        title: "HEAD",
        content: "<head> يحتوي على معلومات الصفحة والروابط الخارجية",
        isRevealed: false,
      },
      {
        id: 4,
        title: "BODY",
        content: "<body> يحتوي على المحتوى المرئي للصفحة",
        isRevealed: false,
      },
    ] as TextCardType[],
  },
};

interface InteractiveLessonProps {
  lesson: Lesson;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function InteractiveLesson({
  lesson,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: InteractiveLessonProps) {
  // Determine tool type from lesson (you can modify this based on your lesson structure)
  // For now, we'll use a simple approach - you can extend this based on your lesson model
  const extendedLesson = lesson as ExtendedLesson;
  const toolType = extendedLesson.toolType || "colored_card"; // Default to colored_card

  const renderToolContent = () => {
    switch (toolType) {
      case "colored_card":
        return <ColoredCardTool />;
      case "timeline":
        return <TimelineTool />;
      case "text":
        return <TextTool />;
      default:
        return <ColoredCardTool />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border-0 h-full">
      <div className="p-4 lg:p-6 border-b">
        <div className="flex items-center justify-between">
          <MobileMenuButton
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          <div className="flex items-center gap-2 text-right flex-1 lg:flex-none justify-end">
            <Zap className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              {lesson.title}
            </h2>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-6">{renderToolContent()}</div>
    </div>
  );
}

// Colored Card Interactive Tool
function ColoredCardTool() {
  const [cards, setCards] = useState<ColoredCardType[]>(
    mockToolData.colored_card.cards
  );
  const [completedCards, setCompletedCards] = useState<number>(0);

  const handleFlipCard = (cardId: number) => {
    setCards((prev) =>
      prev.map((card) => {
        if (card.id === cardId) {
          const wasFlipped = card.isFlipped;
          if (!wasFlipped) {
            setCompletedCards((current) => current + 1);
          }
          return { ...card, isFlipped: !card.isFlipped };
        }
        return card;
      })
    );
  };

  const resetCards = () => {
    setCards((prev) => prev.map((card) => ({ ...card, isFlipped: false })));
    setCompletedCards(0);
  };

  const progress = (completedCards / cards.length) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">
          {mockToolData.colored_card.title}
        </h3>
        <p className="text-gray-600">اضغط على البطاقات لرؤية المحتوى</p>
        <div className="flex items-center justify-center gap-4">
          <Badge className="bg-blue-100 text-blue-800">
            {completedCards} / {cards.length} مكتمل
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={resetCards}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            إعادة تعيين
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className="relative h-48 cursor-pointer transition-all duration-500 transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
            onClick={() => handleFlipCard(card.id)}
          >
            <div
              className={`absolute inset-0 w-full h-full rounded-lg transition-transform duration-500 ${
                card.isFlipped ? "rotate-y-180" : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: card.isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front Face */}
              <div
                className="absolute inset-0 w-full h-full rounded-lg p-6 flex items-center justify-center text-white font-semibold text-lg text-center"
                style={{
                  backgroundColor: card.color,
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="space-y-2">
                  <CreditCard className="w-8 h-8 mx-auto" />
                  <p>{card.title}</p>
                </div>
              </div>

              {/* Back Face */}
              <div
                className="absolute inset-0 w-full h-full rounded-lg p-6 flex items-center justify-center bg-white border-2 text-gray-800 text-center"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  borderColor: card.color,
                }}
              >
                <div className="space-y-2">
                  <h4
                    className="font-semibold text-lg"
                    style={{ color: card.color }}
                  >
                    {card.title}
                  </h4>
                  <p className="text-sm leading-relaxed">{card.content}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {progress === 100 && (
        <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
          <h4 className="text-lg font-semibold text-green-800 mb-1">
            أحسنت! تم إكمال جميع البطاقات
          </h4>
          <p className="text-green-600">لقد استكشفت جميع عناصر HTML الأساسية</p>
        </div>
      )}
    </div>
  );
}

// Timeline Interactive Tool
function TimelineTool() {
  const [cards, setCards] = useState<TimelineCardType[]>(
    mockToolData.timeline.cards
  );
  const [isCompleted, setIsCompleted] = useState(false);

  const moveCard = (cardId: number, direction: "up" | "down") => {
    setCards((prev) => {
      const cardIndex = prev.findIndex((c) => c.id === cardId);
      if (cardIndex === -1) return prev;

      const newCards = [...prev];
      const targetIndex = direction === "up" ? cardIndex - 1 : cardIndex + 1;

      if (targetIndex >= 0 && targetIndex < newCards.length) {
        [newCards[cardIndex], newCards[targetIndex]] = [
          newCards[targetIndex],
          newCards[cardIndex],
        ];
      }

      return newCards;
    });
  };

  const shuffleCards = () => {
    setCards((prev) => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    setIsCompleted(false);
  };

  const checkOrder = () => {
    const isCorrect = cards.every((card, index) => {
      const expectedOrder = index + 1;
      return card.order === expectedOrder;
    });
    setIsCompleted(isCorrect);
  };

  const resetOrder = () => {
    setCards(mockToolData.timeline.cards);
    setIsCompleted(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">
          {mockToolData.timeline.title}
        </h3>
        <p className="text-gray-600">رتب البطاقات في الترتيب الصحيح</p>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={shuffleCards}
            className="flex items-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            خلط البطاقات
          </Button>
          <Button
            size="sm"
            onClick={checkOrder}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            فحص الترتيب
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetOrder}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            إعادة تعيين
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            className="p-4 border-l-4 hover:shadow-md transition-shadow"
            style={{ borderLeftColor: card.color }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{ backgroundColor: card.color }}
                  >
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-gray-900">{card.name}</h4>
                </div>
                <p className="text-gray-600 text-sm mr-11">{card.content}</p>
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveCard(card.id, "up")}
                  disabled={index === 0}
                  className="px-2 py-1"
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveCard(card.id, "down")}
                  disabled={index === cards.length - 1}
                  className="px-2 py-1"
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isCompleted && (
        <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
          <h4 className="text-lg font-semibold text-green-800 mb-1">
            ممتاز! الترتيب صحيح
          </h4>
          <p className="text-green-600">
            لقد رتبت خطوات إنشاء موقع الويب بشكل صحيح
          </p>
        </div>
      )}
    </div>
  );
}

// Text Interactive Tool
function TextTool() {
  const [cards, setCards] = useState<TextCardType[]>(mockToolData.text.cards);
  const [revealedCount, setRevealedCount] = useState(0);

  const toggleCardReveal = (cardId: number) => {
    setCards((prev) =>
      prev.map((card) => {
        if (card.id === cardId) {
          const wasRevealed = card.isRevealed;
          if (!wasRevealed) {
            setRevealedCount((current) => current + 1);
          } else {
            setRevealedCount((current) => current - 1);
          }
          return { ...card, isRevealed: !card.isRevealed };
        }
        return card;
      })
    );
  };

  const revealAll = () => {
    setCards((prev) => prev.map((card) => ({ ...card, isRevealed: true })));
    setRevealedCount(cards.length);
  };

  const hideAll = () => {
    setCards((prev) => prev.map((card) => ({ ...card, isRevealed: false })));
    setRevealedCount(0);
  };

  const progress = (revealedCount / cards.length) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">
          {mockToolData.text.title}
        </h3>
        <p className="text-gray-600">اضغط على العناوين لكشف المحتوى</p>
        <div className="flex items-center justify-center gap-4">
          <Badge className="bg-blue-100 text-blue-800">
            {revealedCount} / {cards.length} مكشوف
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={revealAll}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            كشف الكل
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={hideAll}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            إخفاء الكل
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className="p-6 cursor-pointer hover:shadow-md transition-shadow border-2 border-gray-100 hover:border-blue-200"
            onClick={() => toggleCardReveal(card.id)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">{card.title}</h4>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    card.isRevealed
                      ? "border-green-500 bg-green-500"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {card.isRevealed && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  card.isRevealed ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <p className="text-sm text-gray-700 leading-relaxed font-mono">
                    {card.content}
                  </p>
                </div>
              </div>

              {!card.isRevealed && (
                <div className="text-center py-4 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                  <Eye className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-xs">اضغط للكشف</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {progress === 100 && (
        <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
          <h4 className="text-lg font-semibold text-green-800 mb-1">
            رائع! تم استكشاف جميع العناصر
          </h4>
          <p className="text-green-600">لقد تعلمت جميع عناصر HTML الأساسية</p>
        </div>
      )}
    </div>
  );
}
