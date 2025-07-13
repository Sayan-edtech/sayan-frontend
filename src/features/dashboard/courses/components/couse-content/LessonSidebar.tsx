import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, Play } from "lucide-react";
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

function LessonSidebar() {
  const [selectedLesson, setSelectedLesson] = useState(1);

  // Mock data for sections and lessons
  const sections = [
    {
      id: 1,
      title: "المقدمة",
      lessons: [
        { id: 1, title: "مرحباً بك في الدورة", duration: "5:30" },
        { id: 2, title: "ما ستتعلمه في هذه الدورة", duration: "8:15" },
        { id: 3, title: "إعداد بيئة العمل", duration: "12:45" },
      ],
    },
    {
      id: 2,
      title: "الأساسيات",
      lessons: [
        { id: 4, title: "المفاهيم الأساسية", duration: "15:20" },
        { id: 5, title: "التطبيق العملي الأول", duration: "18:30" },
      ],
    },
    {
      id: 3,
      title: "التطبيقات المتقدمة",
      lessons: [
        { id: 6, title: "تقنيات متقدمة", duration: "22:10" },
        { id: 7, title: "مشروع تطبيقي", duration: "25:45" },
      ],
    },
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-lg w-72 space-y-4">
      <h2 className="text-lg font-semibold">محتوى الدورة</h2>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            value={`section-${section.id}`}
            className="border rounded-lg bg-white last:border-b-1"
          >
            <AccordionTrigger className="px-3 py-2 hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">{section.title}</span>
                  <span className="text-sm text-muted-foreground">
                    ({section.lessons.length} دروس)
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3">
              <div className="space-y-2">
                {section.lessons.map((lesson) => (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    isSelected={selectedLesson === lesson.id}
                    onSelect={() => setSelectedLesson(lesson.id)}
                  />
                ))}
                <AddLesson sectionId={section.id} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <AddSection />
    </div>
  );
}

function LessonItem({
  lesson,
  isSelected,
  onSelect,
}: {
  lesson: { id: number; title: string; duration: string };
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`group relative p-3 rounded-md border cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected
          ? "bg-primary/10 border-primary"
          : "bg-white hover:bg-gray-50"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <Play className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className={`font-medium text-sm truncate ${
              isSelected ? "text-primary" : "text-foreground"
            }`}
          >
            {lesson.title}
          </h4>
          <p className="text-xs text-muted-foreground">{lesson.duration}</p>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <EditLesson lesson={lesson} />
          <DeleteLesson lesson={lesson} />
        </div>
      </div>
    </div>
  );
}

function EditLesson({
  lesson,
}: {
  lesson: { id: number; title: string; duration: string };
}) {
  const [lessonTitle, setLessonTitle] = useState(lesson.title);
  const [lessonDuration, setLessonDuration] = useState(lesson.duration);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle edit logic here
    console.log(`Editing lesson ${lesson.id}:`, {
      lessonTitle,
      lessonDuration,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-6 h-6 p-0 hover:bg-blue-100"
          onClick={(e) => e.stopPropagation()}
        >
          <Edit className="w-3 h-3 text-blue-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleEdit}>
          <DialogHeader>
            <DialogTitle>تعديل الدرس</DialogTitle>
            <DialogDescription>يمكنك تعديل تفاصيل الدرس هنا.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="lesson-title">عنوان الدرس</Label>
              <Input
                id="lesson-title"
                name="lesson-title"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="أدخل عنوان الدرس"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="lesson-duration">مدة الدرس</Label>
              <Input
                id="lesson-duration"
                name="lesson-duration"
                value={lessonDuration}
                onChange={(e) => setLessonDuration(e.target.value)}
                placeholder="مثال: 10:30"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">إلغاء</Button>
            </DialogClose>
            <Button type="submit">حفظ التغييرات</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteLesson({
  lesson,
}: {
  lesson: { id: number; title: string; duration: string };
}) {
  const handleDelete = () => {
    // Handle delete logic here
    console.log(`Deleting lesson ${lesson.id}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-6 h-6 p-0 hover:bg-red-100"
          onClick={(e) => e.stopPropagation()}
        >
          <Trash2 className="w-3 h-3 text-red-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>حذف الدرس</DialogTitle>
          <DialogDescription>
            هل أنت متأكد من أنك تريد حذف درس "{lesson.title}"؟ لا يمكن التراجع
            عن هذا الإجراء.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">إلغاء</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleDelete}>
              حذف الدرس
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddLesson({ sectionId }: { sectionId: number }) {
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDuration, setLessonDuration] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle add lesson logic here
    console.log(`Adding lesson to section ${sectionId}:`, {
      lessonTitle,
      lessonDuration,
    });
    setLessonTitle("");
    setLessonDuration("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full h-8 text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          إضافة درس
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleAdd}>
          <DialogHeader>
            <DialogTitle>إضافة درس جديد</DialogTitle>
            <DialogDescription>
              يمكنك إضافة درس جديد إلى هذا القسم.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="new-lesson-title">عنوان الدرس</Label>
              <Input
                id="new-lesson-title"
                name="new-lesson-title"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="أدخل عنوان الدرس"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="new-lesson-duration">مدة الدرس</Label>
              <Input
                id="new-lesson-duration"
                name="new-lesson-duration"
                value={lessonDuration}
                onChange={(e) => setLessonDuration(e.target.value)}
                placeholder="مثال: 10:30"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">إلغاء</Button>
            </DialogClose>
            <Button type="submit">إضافة الدرس</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
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
        <Button type="button" variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-1" />
          إضافة قسم
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleAdd}>
          <DialogHeader>
            <DialogTitle>إضافة قسم جديد</DialogTitle>
            <DialogDescription>يمكنك إضافة قسم جديد للدورة.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="section-title">عنوان القسم</Label>
              <Input
                id="section-title"
                name="section-title"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder="أدخل عنوان القسم"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">إلغاء</Button>
            </DialogClose>
            <Button type="submit">إضافة القسم</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LessonSidebar;
