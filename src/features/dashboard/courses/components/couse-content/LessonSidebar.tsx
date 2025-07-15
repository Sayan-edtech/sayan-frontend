import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Play, FileQuestion, Code, CreditCard } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddLessonDialog from "./AddLessonDialog";

interface LessonSidebarProps {
  onItemSelect: (item: any) => void;
}

function LessonSidebar({ onItemSelect }: LessonSidebarProps) {
  const [selectedLesson, setSelectedLesson] = useState(1);

  // Mock data for sections and lessons
  const sections = [
    {
      id: 1,
      title: "المقدمة",
      description: "فصل تمهيدي يغطي الأساسيات",
      isPublished: true,
      lessons: [
        { 
          id: 1, 
          title: "مرحباً بك في الدورة", 
          duration: "5:30",
          description: "مقدمة ترحيبية بالطلاب",
          isPublished: true,
          type: "video",
          videoUrl: "https://example.com/video1.mp4",
          resources: [
            { id: 1, name: "ملاحظات الدرس", type: "PDF", size: "2.5 MB", url: "#" }
          ]
        },
        { 
          id: 2, 
          title: "ما ستتعلمه في هذه الدورة", 
          duration: "8:15",
          description: "نظرة عامة على محتوى الدورة",
          isPublished: false,
          type: "video",
          videoUrl: "https://example.com/video2.mp4",
          resources: []
        },
        { 
          id: 3, 
          title: "إعداد بيئة العمل", 
          duration: "12:45",
          description: "شرح كيفية تحضير بيئة العمل",
          isPublished: true,
          type: "video",
          videoUrl: "https://example.com/video3.mp4",
          resources: [
            { id: 2, name: "دليل التثبيت", type: "DOCX", size: "1.8 MB", url: "#" },
            { id: 3, name: "ملفات المشروع", type: "ZIP", size: "5.2 MB", url: "#" }
          ]
        },
        { 
          id: 8, 
          title: "درس فيديو: أساسيات HTML المتقدمة", 
          duration: "18:30",
          description: "شرح مفصل لأساسيات HTML المتقدمة",
          isPublished: true,
          type: "video",
          videoUrl: "https://example.com/video8.mp4",
          resources: [
            { id: 6, name: "ملاحظات الدرس", type: "PDF", size: "4.1 MB", url: "#" },
            { id: 7, name: "أمثلة عملية", type: "HTML", size: "1.2 MB", url: "#" }
          ]
        },
        { 
          id: 9, 
          title: "أداة تفاعلية: بطاقات HTML", 
          duration: "∞",
          description: "بطاقات تفاعلية لتعلم عناصر HTML",
          isPublished: true,
          type: "interactive",
          toolType: "flashcards",
          cards: [
            {
              id: 1,
              title: "ما هو تاج <h1>؟",
              content: "تاج العنوان الرئيسي الأكبر في الصفحة",
              color: "#3B82F6",
              image: null
            },
            {
              id: 2,
              title: "ما هو تاج <p>؟",
              content: "تاج الفقرة النصية",
              color: "#10B981",
              image: null
            },
            {
              id: 3,
              title: "ما هو تاج <div>؟",
              content: "تاج الحاوي العام للتجميع",
              color: "#F59E0B",
              image: null
            },
            {
              id: 4,
              title: "ما هو تاج <a>؟",
              content: "تاج الرابط التشعبي",
              color: "#EF4444",
              image: null
            },
            {
              id: 5,
              title: "ما هو تاج <img>؟",
              content: "تاج عرض الصور",
              color: "#8B5CF6",
              image: null
            }
          ],
          resources: [
            { id: 8, name: "دليل العناصر", type: "PDF", size: "2.3 MB", url: "#" }
          ]
        },
        { 
          id: 10, 
          title: "اختبار: تقييم فهم HTML", 
          duration: "15:00",
          description: "اختبار شامل لتقييم فهم أساسيات HTML",
          isPublished: true,
          type: "quiz",
          questions: [
            {
              id: 1,
              question: "أي من التالي يُستخدم لإنشاء قائمة مرتبة؟",
              options: ["<ul>", "<ol>", "<li>", "<list>"],
              correctAnswer: 1
            },
            {
              id: 2,
              question: "ما هو الهيكل الأساسي لصفحة HTML؟",
              options: ["<html>, <body>, <head>", "<html>, <head>, <body>", "<head>, <html>, <body>", "<body>, <head>, <html>"],
              correctAnswer: 1
            },
            {
              id: 3,
              question: "أي تاج يُستخدم لإنشاء جدول؟",
              options: ["<table>", "<tab>", "<grid>", "<tbl>"],
              correctAnswer: 0
            },
            {
              id: 4,
              question: "ما هو الفرق بين <div> و <span>؟",
              options: ["لا يوجد فرق", "<div> للنصوص، <span> للحاويات", "<div> block element، <span> inline element", "<span> أكبر من <div>"],
              correctAnswer: 2
            },
            {
              id: 5,
              question: "أي خاصية تُستخدم لإضافة نص بديل للصور؟",
              options: ["title", "alt", "description", "text"],
              correctAnswer: 1
            }
          ],
          resources: [
            { id: 9, name: "نتائج الاختبار", type: "PDF", size: "1.5 MB", url: "#" }
          ]
        },
        { 
          id: 11, 
          title: "أداة تفاعلية: محرر HTML", 
          duration: "∞",
          description: "أداة تفاعلية لممارسة كتابة HTML",
          isPublished: true,
          type: "interactive",
          toolType: "html-editor",
          content: `<!DOCTYPE html>
<html>
<head>
    <title>صفحتي الأولى</title>
</head>
<body>
    <h1>مرحباً بالعالم!</h1>
    <p>هذه أول صفحة HTML لي.</p>
</body>
</html>`,
          resources: [
            { id: 10, name: "دليل HTML", type: "PDF", size: "2.8 MB", url: "#" }
          ]
        },
      ],
    },
    {
      id: 2,
      title: "الأساسيات",
      description: "المفاهيم الأساسية والتطبيقات",
      isPublished: true,
      lessons: [
        { 
          id: 4, 
          title: "درس فيديو: المفاهيم الأساسية", 
          duration: "15:20",
          description: "شرح المفاهيم الأساسية بالفيديو",
          isPublished: true,
          type: "video",
          videoUrl: "https://example.com/video4.mp4",
          resources: [
            { id: 4, name: "شرائح الدرس", type: "PDF", size: "3.2 MB", url: "#" }
          ]
        },
        { 
          id: 5, 
          title: "اختبار: فحص المعرفة", 
          duration: "10:00",
          description: "اختبار تفاعلي لقياس فهم الطلاب",
          isPublished: true,
          type: "quiz",
          questions: [
            {
              id: 1,
              question: "ما هو HTML؟",
              options: ["لغة برمجة", "لغة ترميز", "قاعدة بيانات", "نظام تشغيل"],
              correctAnswer: 1
            },
            {
              id: 2,
              question: "ما هو الغرض من تاج <head>؟",
              options: ["عرض المحتوى", "معلومات الصفحة", "التنسيق", "الروابط"],
              correctAnswer: 1
            }
          ],
          resources: []
        },
        { 
          id: 6, 
          title: "أداة تفاعلية: محرر HTML", 
          duration: "∞",
          description: "أداة تفاعلية لممارسة كتابة HTML",
          isPublished: true,
          type: "interactive",
          toolType: "code-editor",
          initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>صفحتي الأولى</title>
</head>
<body>
    <h1>مرحباً بالعالم!</h1>
    <p>هذه أول صفحة HTML لي.</p>
</body>
</html>`,
          resources: [
            { id: 5, name: "دليل HTML", type: "PDF", size: "2.8 MB", url: "#" }
          ]
        },
      ],
    },
    {
      id: 3,
      title: "التطبيقات المتقدمة",
      description: "تطبيقات متقدمة ومشاريع عملية",
      isPublished: false,
      lessons: [
        { 
          id: 11, 
          title: "تقنيات متقدمة", 
          duration: "22:10",
          description: "تقنيات متقدمة في المجال",
          isPublished: false,
          type: "video",
          videoUrl: "https://example.com/video6.mp4",
          resources: []
        },
        { 
          id: 12, 
          title: "مشروع تطبيقي", 
          duration: "25:45",
          description: "مشروع تطبيقي شامل",
          isPublished: false,
          type: "video",
          videoUrl: "https://example.com/video7.mp4",
          resources: []
        },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">محتوى الدورة</h2>
        <div className="text-sm text-gray-600">
          {sections.reduce((total, section) => total + section.lessons.length, 0)} درس
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            value={`section-${section.id}`}
            className="border-0 bg-gray-50 rounded-xl overflow-hidden"
          >
            <AccordionTrigger 
              className="px-4 py-3 hover:no-underline hover:bg-gray-100 transition-colors"
              onClick={() => onItemSelect({ ...section, type: 'section' })}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-800">{section.title}</span>
                </div>
                <span className="text-sm text-gray-500 mr-2">
                  {section.lessons.length} درس
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 bg-white">
              <div className="space-y-2 pt-2">
                {section.lessons.map((lesson) => (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    isSelected={selectedLesson === lesson.id}
                    onSelect={() => setSelectedLesson(lesson.id)}
                    onItemSelect={onItemSelect}
                  />
                ))}
                <AddLesson sectionId={section.id} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="mt-6 pt-4 border-t">
        <AddSection />
      </div>
    </div>
  );
}

function LessonItem({
  lesson,
  isSelected,
  onSelect,
  onItemSelect,
}: {
  lesson: any;
  isSelected: boolean;
  onSelect: () => void;
  onItemSelect: (item: any) => void;
}) {
  const handleClick = () => {
    onSelect();
    onItemSelect({ 
      ...lesson, 
      type: 'lesson',
      lessonType: lesson.type === 'interactive' ? 'interactive' : lesson.type,
      toolType: lesson.toolType,
      questions: lesson.questions,
      cards: lesson.cards,
      content: lesson.content
    });
  };

  const getIcon = () => {
    switch (lesson.type) {
      case 'video':
        return <Play className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-600"}`} />;
      case 'quiz':
        return <FileQuestion className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-600"}`} />;
      case 'interactive':
        if (lesson.toolType === 'flashcards') {
          return <CreditCard className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-600"}`} />;
        }
        return <Code className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-600"}`} />;
      default:
        return <Play className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-600"}`} />;
    }
  };

  return (
    <div
      className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? "bg-blue-50 border-2 border-blue-200"
          : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isSelected ? "bg-blue-500" : "bg-gray-300"
          }`}>
            {getIcon()}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4
              className={`font-medium text-sm truncate ${
                isSelected ? "text-blue-700" : "text-gray-800"
              }`}
            >
              {lesson.title}
            </h4>
          </div>
          <p className="text-xs text-gray-500">{lesson.duration}</p>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* أزرار التعديل والحذف محذوفة */}
        </div>
      </div>
    </div>
  );
}

function AddLesson({ sectionId }: { sectionId: number }) {
  const handleAddLesson = (lesson: any) => {
    // Handle add lesson logic here
    console.log(`Adding lesson to section ${sectionId}:`, lesson);
  };

  return <AddLessonDialog onAddLesson={handleAddLesson} />;
}

function AddSection() {
  const [sectionTitle, setSectionTitle] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle add section logic here
    console.log(`Adding section:`, { sectionTitle });
    setSectionTitle("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          type="button"
          size="sm" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          إضافة فصل جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-0 shadow-xl">
        <form onSubmit={handleAdd}>
          <DialogHeader>
            <DialogTitle className="text-gray-800">إضافة فصل جديد</DialogTitle>
            <DialogDescription className="text-gray-600">
              يمكنك إضافة فصل جديد للدورة.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="section-title" className="text-gray-700">عنوان الفصل</Label>
              <Input
                id="section-title"
                name="section-title"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder="أدخل عنوان الفصل"
                className="border-gray-200 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="border-gray-200">إلغاء</Button>
            </DialogClose>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">إضافة الفصل</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LessonSidebar;
