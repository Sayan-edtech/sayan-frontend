import { Zap, CheckCircle, RotateCcw, Code, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Lesson } from "@/types/lesson";
import { MobileMenuButton } from "./MobileMenuButton";
import { useState } from "react";
import { motion } from "framer-motion";

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
  const toolType = extendedLesson.toolType || "timeline"; // Default to colored_card

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
      <div className="p-4 lg:p-6 border-b border-border">
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

      <div className="flex flex-wrap justify-center gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="cursor-pointer transition-all duration-500 ease-in-out hover:shadow-xl"
            style={{
              width: "300px",
              minHeight: "400px",
              transformStyle: "preserve-3d",
              transform: card.isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
            onClick={() => handleFlipCard(card.id)}
          >
            {/* Front Face */}
            <Card
              className="absolute inset-0 w-full h-full border-border overflow-hidden"
              style={{
                backgroundColor: card.color,
                backfaceVisibility: "hidden",
              }}
            >
              <div className="p-6 h-full flex flex-col justify-between text-white">
                <div className="space-y-4 flex-1 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-center leading-relaxed">
                    {card.title}
                  </h3>
                </div>
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFlipCard(card.id);
                    }}
                  >
                    انقر للمزيد
                  </Button>
                </div>
              </div>
            </Card>

            {/* Back Face */}
            <Card
              className="absolute inset-0 w-full h-full border-border overflow-hidden"
              style={{
                backgroundColor: card.color,
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="p-6 h-full flex flex-col justify-between text-white">
                <div className="space-y-4 flex-1 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-center leading-relaxed">
                    {card.content}
                  </h3>
                </div>
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFlipCard(card.id);
                    }}
                  >
                    العودة للعنوان
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

// Timeline Interactive Tool
function TimelineTool() {
  const [cards] = useState<TimelineCardType[]>(mockToolData.timeline.cards);
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<number>(0);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">
          {mockToolData.timeline.title}
        </h3>
        <p className="text-gray-600">اضغط على العناصر لرؤية التفاصيل</p>
      </div>

      <motion.div
        className="py-10 px-5 flex gap-10 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Timeline List */}
        <div className="w-72 relative pr-4 before:content-[''] before:absolute before:right-0 before:top-0 before:w-0.5 before:h-full before:bg-gradient-to-b before:from-gray-300/20 before:via-gray-600/60 before:to-gray-300/20">
          {cards?.map((card, index) => (
            <motion.div
              key={index}
              className={`p-4 px-6 my-2 cursor-pointer relative transition-all duration-300 ease-in-out rounded-lg hover:shadow-md ${
                selectedTimelineItem === index ? "shadow-lg" : ""
              }`}
              style={{
                backgroundColor:
                  selectedTimelineItem === index
                    ? `${card.color}15`
                    : selectedTimelineItem === index
                    ? `${card.color}10`
                    : "transparent",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedTimelineItem(index)}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute -right-6 top-1/2 w-4 h-4 rounded-full transform -translate-y-1/2 transition-all duration-300 ease-in-out border-2 border-white shadow-md ${
                  selectedTimelineItem === index ? "" : "bg-gray-400"
                }`}
                style={{
                  backgroundColor:
                    selectedTimelineItem === index ? card.color : undefined,
                }}
              />

              {/* Active indicator line */}
              {selectedTimelineItem === index && (
                <div
                  className="absolute -right-4 top-1/2 w-4 h-0.5 transform -translate-y-1/2"
                  style={{ backgroundColor: card.color }}
                />
              )}

              {/* Timeline Title */}
              <div
                className={`text-base transition-colors duration-300 ease-in-out ${
                  selectedTimelineItem === index
                    ? "font-semibold"
                    : "text-gray-500"
                }`}
                style={{
                  color:
                    selectedTimelineItem === index ? card.color : undefined,
                }}
              >
                {card.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Details */}
        <motion.div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            selectedTimelineItem !== null
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-5"
          }`}
          initial={false}
          animate={{
            opacity: selectedTimelineItem !== null ? 1 : 0,
            x: selectedTimelineItem !== null ? 0 : 20,
          }}
          transition={{ duration: 0.3 }}
        >
          {selectedTimelineItem !== null && (
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border-t-4"
              style={{ borderTopColor: cards[selectedTimelineItem].color }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Year/Order */}
              <div
                className="text-lg font-medium mb-4 w-8 h-8 element-center rounded-full"
                style={{
                  color: cards[selectedTimelineItem].color,
                  background: `${cards[selectedTimelineItem].color}15`,
                }}
              >
                {cards[selectedTimelineItem].order}
              </div>

              {/* Card Title */}
              <div
                className="text-xl font-medium mb-2"
                style={{ color: cards[selectedTimelineItem].color }}
              >
                {cards[selectedTimelineItem].name}
              </div>

              {/* Card Description */}
              <div className="text-base text-gray-500 leading-relaxed">
                {cards[selectedTimelineItem].content}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
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
