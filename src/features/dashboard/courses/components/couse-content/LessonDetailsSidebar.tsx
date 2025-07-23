import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  Play,
  FileText,
  Settings,
  Eye,
  Upload,
  FileQuestion,
  Code,
  CreditCard,
  Plus,
  X,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useDeleteSection,
  useUpdateSection,
  type SectionUpdatePayload,
} from "../../hooks/useSectionsMutations";
import { Loader } from "@/components/shared";

// Simple Toggle Component
function Toggle({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${checked ? "bg-blue-600" : "bg-gray-200"}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${checked ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
}

function LessonDetailsSidebar({
  selectedSection,
}: {
  selectedSection: Seleced;
}) {
  const { mutateAsync: deleteSection, isPending: isDeleteSectionPending } =
    useDeleteSection();
  const { mutateAsync: updateSection, isPending: isUpdateSectionPending } =
    useUpdateSection();
  const [sectionData, setSectionData] = useState<SectionUpdatePayload>({});

  useEffect(() => {
    setSectionData((prev) => ({
      ...prev,
      title: selectedSection?.title || "",
    }));
  }, [selectedSection?.title]);
  // Handle video upload with file size validation
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (512MB = 512 * 1024 * 1024 bytes)
    const maxSize = 512 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("حجم الملف يتجاوز الحد الأقصى المسموح (512 ميجا)");
      event.target.value = "";
      return;
    }

    // Check file type
    if (!file.type.startsWith("video/")) {
      alert("يرجى اختيار ملف فيديو صالح");
      event.target.value = "";
      return;
    }

    // Handle file upload logic here
    console.log("Uploading video file:", file);
    // You can add your upload logic here
  };
  const onPublishToggle: (id: number, isPublished: boolean) => void = () => {};
  const onEdit: (id: numer, data: any) => void = () => {};
  const onDelete = async () => {
    try {
      if (selectedSection && selectedSection.type === "section") {
        await deleteSection(String(selectedSection.id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!selectedSection) {
    return (
      <Card className="p-6 shadow-sm border-0 h-fit">
        <div className="text-center text-gray-500 py-8">
          <Settings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-2">لم يتم تحديد عنصر</p>
          <p className="text-sm">اختر درساً أو فصلاً لعرض خيارات التحكم</p>
        </div>
      </Card>
    );
  }

  const isLesson = selectedSection.type === "lesson";

  // دالة لتحديد الأيقونة المناسبة
  const getIcon = () => {
    if (!isLesson) return null;

    const iconClass = "w-4 h-4 text-blue-400";

    switch (selectedSection.lessonType) {
      case "video":
        return <Play className={iconClass} />;
      case "quiz":
        return <FileQuestion className={iconClass} />;
      case "text":
        return <FileText className={iconClass} />;
      case "interactive":
        if (selectedSection.toolType === "flashcards") {
          return <CreditCard className={iconClass} />;
        }
        if (selectedSection.toolType === "html-editor") {
          return <Code className={iconClass} />;
        }
        return <Code className={iconClass} />;
      default:
        return <Play className={iconClass} />;
    }
  };

  // دالة لتحديد النص المناسب للمدة/العدد
  const getDurationText = () => {
    if (!selectedSection.duration) return null;

    switch (selectedSection.lessonType) {
      case "quiz":
        return `${selectedSection.questions?.length || 0} سؤال`;
      case "interactive":
        if (selectedSection.toolType === "flashcards") {
          return `${selectedSection.cards?.length || 0} بطاقة`;
        }
        return selectedSection.duration;
      default:
        return selectedSection.duration;
    }
  };

  // للاختبارات - واجهة مخصصة
  if (isLesson && selectedSection.lessonType === "quiz") {
    return (
      <Card className="p-6 shadow-sm border-0 h-fit">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <FileQuestion className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              {selectedSection.title}
            </h3>
          </div>

          {/* Edit Title */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              عنوان الاختبار
            </Label>
            <Input
              value={selectedSection.title}
              onChange={(e) =>
                onEdit(selectedSection.id, {
                  ...selectedSection,
                  title: e.target.value,
                })
              }
              placeholder="أدخل عنوان الاختبار"
              className="border-gray-200 focus:border-blue-500"
            />
          </div>

          {/* Questions Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  الأسئلة
                </Label>
                <p className="text-xs text-gray-500">
                  {selectedSection.questions?.length || 0} سؤال
                </p>
              </div>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  // Add new question logic
                  const newQuestion = {
                    id: Date.now(),
                    question: "",
                    options: ["", "", "", ""],
                    correctAnswer: 0,
                  };
                  const updatedQuestions = [
                    ...(selectedSection.questions || []),
                    newQuestion,
                  ];
                  onEdit(selectedSection.id, {
                    ...selectedSection,
                    questions: updatedQuestions,
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                إضافة سؤال
              </Button>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {selectedSection.questions?.map(
                (question: any, index: number) => (
                  <QuestionEditor
                    key={question.id}
                    question={question}
                    index={index}
                    onUpdate={(updatedQuestion: any) => {
                      const updatedQuestions = (
                        selectedSection.questions || []
                      ).map((q: any) =>
                        q.id === question.id ? updatedQuestion : q
                      );
                      onEdit(selectedSection.id, {
                        ...selectedSection,
                        questions: updatedQuestions,
                      });
                    }}
                    onDelete={() => {
                      const updatedQuestions = (
                        selectedSection.questions || []
                      ).filter((q: any) => q.id !== question.id);
                      onEdit(selectedSection.id, {
                        ...selectedSection,
                        questions: updatedQuestions,
                      });
                    }}
                  />
                )
              )}

              {(!selectedSection.questions ||
                selectedSection.questions.length === 0) && (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <FileQuestion className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">لا توجد أسئلة بعد</p>
                  <p className="text-sm mb-4">ابدأ بإنشاء سؤالك الأول</p>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      const newQuestion = {
                        id: Date.now(),
                        question: "",
                        options: ["", "", "", ""],
                        correctAnswer: 0,
                      };
                      const updatedQuestions = [
                        ...(selectedSection.questions || []),
                        newQuestion,
                      ];
                      onEdit(selectedSection.id, {
                        ...selectedSection,
                        questions: updatedQuestions,
                      });
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    إنشاء سؤال جديد
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t">
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Saving quiz:", selectedSection);
                }}
              >
                حفظ التغييرات
              </Button>

              <DeleteItemDialog
                isPending={isDeleteSectionPending}
                item={selectedSection}
                onDelete={onDelete}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // للبطاقات التفاعلية - واجهة مخصصة
  if (
    isLesson &&
    selectedSection.lessonType === "interactive" &&
    selectedSection.toolType === "flashcards"
  ) {
    return (
      <Card className="p-6 shadow-sm border-0 h-fit">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              {selectedSection.title}
            </h3>
          </div>

          {/* Edit Title */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              عنوان الدرس
            </Label>
            <Input
              value={selectedSection.title}
              onChange={(e) =>
                onEdit(selectedSection.id, {
                  ...selectedSection,
                  title: e.target.value,
                })
              }
              placeholder="أدخل عنوان الدرس"
              className="border-gray-200 focus:border-blue-500"
            />
          </div>

          {/* Cards Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  البطاقات التفاعلية
                </Label>
                <p className="text-xs text-gray-500">
                  {selectedSection.cards?.length || 0} بطاقة
                </p>
              </div>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  // Add new card logic
                  const newCard = {
                    id: Date.now(),
                    title: "",
                    content: "",
                    color: "#3B82F6",
                    image: null,
                  };
                  const updatedCards = [
                    ...(selectedSection.cards || []),
                    newCard,
                  ];
                  onEdit(selectedSection.id, {
                    ...selectedSection,
                    cards: updatedCards,
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                إضافة بطاقة
              </Button>
            </div>

            {/* Cards List */}
            <div className="space-y-3">
              {selectedSection.cards?.map((card: any, index: number) => (
                <FlashcardEditor
                  key={card.id}
                  card={card}
                  index={index}
                  onUpdate={(updatedCard: any) => {
                    const updatedCards = (selectedSection.cards || []).map(
                      (c: any) => (c.id === card.id ? updatedCard : c)
                    );
                    onEdit(selectedSection.id, {
                      ...selectedSection,
                      cards: updatedCards,
                    });
                  }}
                  onDelete={() => {
                    const updatedCards = (selectedSection.cards || []).filter(
                      (c: any) => c.id !== card.id
                    );
                    onEdit(selectedSection.id, {
                      ...selectedSection,
                      cards: updatedCards,
                    });
                  }}
                />
              ))}

              {(!selectedSection.cards ||
                selectedSection.cards.length === 0) && (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">لا توجد بطاقات بعد</p>
                  <p className="text-sm mb-4">ابدأ بإنشاء بطاقتك الأولى</p>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      const newCard = {
                        id: Date.now(),
                        title: "",
                        content: "",
                        color: "#3B82F6",
                        image: null,
                      };
                      const updatedCards = [
                        ...(selectedSection.cards || []),
                        newCard,
                      ];
                      onEdit(selectedSection.id, {
                        ...selectedSection,
                        cards: updatedCards,
                      });
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    إنشاء بطاقة جديدة
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t">
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Saving flashcard lesson:", selectedSection);
                }}
              >
                حفظ التغييرات
              </Button>

              <DeleteItemDialog
                isPending={isDeleteSectionPending}
                item={selectedSection}
                onDelete={onDelete}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // لمحرر HTML التفاعلي - واجهة مخصصة
  if (
    isLesson &&
    selectedSection.lessonType === "interactive" &&
    selectedSection.toolType === "html-editor"
  ) {
    return (
      <Card className="p-6 shadow-sm border-0 h-fit">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              {selectedSection.title}
            </h3>
          </div>

          {/* Edit Title */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              عنوان الدرس
            </Label>
            <Input
              value={selectedSection.title}
              onChange={(e) =>
                onEdit(selectedSection.id, {
                  ...selectedSection,
                  title: e.target.value,
                })
              }
              placeholder="أدخل عنوان الدرس"
              className="border-gray-200 focus:border-blue-500"
            />
          </div>

          {/* Edit Content */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              محتوى الدرس النصي
            </Label>
            <Textarea
              value={selectedSection.content || ""}
              onChange={(e) =>
                onEdit(selectedSection.id, {
                  ...selectedSection,
                  content: e.target.value,
                })
              }
              placeholder="أدخل محتوى الدرس النصي..."
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[200px] resize-none"
              rows={8}
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t">
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Saving HTML editor lesson:", selectedSection);
                }}
              >
                حفظ التغييرات
              </Button>

              <DeleteItemDialog
                isPending={isDeleteSectionPending}
                item={selectedSection}
                onDelete={onDelete}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // للفصول - واجهة تعديل مبسطة
  if (!isLesson) {
    return (
      <Card className="p-6 shadow-sm border-0 h-fit">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              {sectionData.title}
            </h3>
          </div>

          {/* Edit Title */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              اسم الفصل
            </Label>
            <Input
              value={sectionData.title}
              onChange={(e) =>
                setSectionData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              placeholder="أدخل اسم الفصل"
              className="border-gray-200 focus:border-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t">
            <div className="flex gap-3">
              <Button
                type="button"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={async () =>
                  updateSection({
                    id: String(selectedSection.id),
                    sectionData,
                  })
                }
                disabled={isUpdateSectionPending || isDeleteSectionPending}
              >
                حفظ التغييرات
                {isUpdateSectionPending && <Loader />}
              </Button>

              <DeleteItemDialog
                isPending={isDeleteSectionPending || isUpdateSectionPending}
                item={selectedSection}
                onDelete={onDelete}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // للدروس النصية (مقالات) - واجهة مخصصة
  if (isLesson && selectedSection.lessonType === "text") {
    return (
      <Card className="p-6 shadow-sm border-0 h-fit">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              {sectionData.title}
            </h3>
          </div>

          {/* Edit Title */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              عنوان المقال
            </Label>
            <Input
              value={selectedSection.title}
              onChange={(e) =>
                onEdit(selectedSection.id, {
                  ...selectedSection,
                  title: e.target.value,
                })
              }
              placeholder="أدخل عنوان المقال"
              className="border-gray-200 focus:border-blue-500"
            />
          </div>

          {/* Edit Content */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              محتوى المقال
            </Label>
            <Textarea
              value={selectedSection.content || ""}
              onChange={(e) =>
                onEdit(selectedSection.id, {
                  ...selectedSection,
                  content: e.target.value,
                })
              }
              placeholder="أدخل محتوى المقال..."
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[200px] resize-none"
              rows={8}
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t">
            <div className="flex gap-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                حفظ التغييرات
              </Button>

              <DeleteItemDialog
                isPending={isDeleteSectionPending}
                item={selectedSection}
                onDelete={onDelete}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // للدروس المرئية - واجهة مبسطة
  if (isLesson && selectedSection.lessonType === "video") {
    return (
      <Card className="p-6 shadow-sm border-0 h-fit">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <Play className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              {selectedSection.title}
            </h3>
          </div>

          {/* Edit Title */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              عنوان الدرس
            </Label>
            <Input
              value={selectedSection.title}
              onChange={(e) =>
                onEdit(selectedSection.id, {
                  ...selectedSection,
                  title: e.target.value,
                })
              }
              placeholder="أدخل عنوان الدرس"
              className="border-gray-200 focus:border-blue-500"
            />
          </div>

          {/* Video Upload/Edit */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">الفيديو</Label>
            {selectedSection.videoUrl ? (
              <div className="space-y-3">
                <div className="relative">
                  <video
                    src={selectedSection.videoUrl}
                    className="w-full h-40 object-cover rounded-lg"
                    controls={false}
                    poster="/api/placeholder/400/200"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      document.getElementById("video-upload")?.click()
                    }
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    تغيير الفيديو
                  </Button>
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    style={{ display: "none" }}
                  />
                  <p className="text-xs text-gray-500 text-center">
                    الحد الأقصى للملف: 512 ميجا
                  </p>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-3">
                  لا يوجد فيديو مرفوع
                </p>
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById("video-upload")?.click()
                  }
                >
                  <Upload className="w-4 h-4 mr-2" />
                  رفع فيديو
                </Button>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  style={{ display: "none" }}
                />
                <p className="text-xs text-gray-500 mt-2">
                  الحد الأقصى للملف: 512 ميجا
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t">
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  // Handle save logic here
                  console.log("Saving lesson:", selectedSection);
                }}
              >
                حفظ التغييرات
              </Button>

              <DeleteItemDialog
                isPending={isDeleteSectionPending}
                item={selectedSection}
                onDelete={onDelete}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // للدروس الأخرى - الواجهة الأصلية
  return (
    <Card className="p-6 shadow-sm border-0 h-fit">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant={selectedSection.isPublished ? "default" : "secondary"}
              >
                {selectedSection.isPublished ? "منشور" : "مسودة"}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {selectedSection.title}
            </h3>
            {selectedSection.duration && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {getIcon()}
                <span>{getDurationText()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {selectedSection.description && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">الوصف</Label>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              {selectedSection.description}
            </p>
          </div>
        )}

        {/* Video Preview (for lessons) */}
        {isLesson && selectedSection.videoUrl && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">الفيديو</Label>
            <div className="relative">
              <video
                src={selectedSection.videoUrl}
                className="w-full h-32 object-cover rounded-lg border"
                controls={false}
                poster="/api/placeholder/400/200"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                <Play className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Publish Toggle */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Eye className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-medium text-sm">حالة النشر</p>
              <p className="text-xs text-gray-600">
                {selectedSection.isPublished ? "مرئي للطلاب" : "مخفي عن الطلاب"}
              </p>
            </div>
          </div>
          <Toggle
            checked={selectedSection.isPublished || false}
            onCheckedChange={(checked: boolean) =>
              onPublishToggle(selectedSection.id, checked)
            }
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <EditItemDialog item={selectedSection} />
          <DeleteItemDialog
            isPending={isDeleteSectionPending}
            item={selectedSection}
            onDelete={onDelete}
          />
        </div>

        {/* Additional Actions */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Upload className="w-4 h-4 mr-2" />
              رفع فيديو
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <FileText className="w-4 h-4 mr-2" />
              إضافة مادة
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function EditItemDialog({ item }: { item: any }) {
  const [title, setTitle] = useState(item.title);
  const [duration, setDuration] = useState(item.duration || "");
  const [description, setDescription] = useState(item.description || "");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          <Edit className="w-4 h-4 mr-2" />
          تعديل
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-gray-800">
            تعديل {item.type === "lesson" ? "الدرس" : "الفصل"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            يمكنك تعديل تفاصيل {item.type === "lesson" ? "الدرس" : "الفصل"} هنا.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-3">
            <Label htmlFor="edit-title" className="text-gray-700">
              العنوان
            </Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="أدخل العنوان"
              className="border-gray-200 focus:border-blue-500"
            />
          </div>
          {item.type === "lesson" && (
            <div className="grid gap-3">
              <Label htmlFor="edit-duration" className="text-gray-700">
                المدة
              </Label>
              <Input
                id="edit-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="مثال: 10:30"
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
          )}
          <div className="grid gap-3">
            <Label htmlFor="edit-description" className="text-gray-700">
              الوصف
            </Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="أدخل الوصف..."
              className="border-gray-200 focus:border-blue-500"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="border-gray-200">
              إلغاء
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            حفظ التغييرات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteItemDialog({
  item,
  onDelete,
  isPending,
}: {
  item: any;
  onDelete: (id: number) => void;
  isPending: boolean;
}) {
  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="flex-1">
          <Trash2 className="w-4 h-4 mr-2" />
          حذف {item.type === "lesson" ? "الدرس" : "الفصل"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-gray-800">
            حذف {item.type === "lesson" ? "الدرس" : "الفصل"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            هل أنت متأكد من أنك تريد حذف{" "}
            {item.type === "lesson" ? "درس" : "فصل"} "{item.title}"؟ لا يمكن
            التراجع عن هذا الإجراء.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="border-gray-200">
              إلغاء
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              حذف {item.type === "lesson" ? "الدرس" : "الفصل"}
              {isPending && <Loader />}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// مكون تحرير الأسئلة
function QuestionEditor({
  question,
  index,
  onUpdate,
  onDelete,
}: {
  question: any;
  index: number;
  onUpdate: (question: any) => void;
  onDelete: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempQuestion, setTempQuestion] = useState(question);

  // Update tempQuestion when question changes
  useEffect(() => {
    setTempQuestion(question);
  }, [question]);

  const handleSave = () => {
    onUpdate(tempQuestion);
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setTempQuestion(question);
    setIsExpanded(false);
  };

  const updateOption = (optionIndex: number, value: string) => {
    const updatedOptions = [...tempQuestion.options];
    updatedOptions[optionIndex] = value;
    setTempQuestion({ ...tempQuestion, options: updatedOptions });
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm border border-gray-200">
      <div className="p-3">
        {/* Header - Simple and clean */}
        <div className="flex items-center justify-between mb-2">
          <div
            className="flex items-center gap-3 cursor-pointer flex-1"
            onClick={(e) => {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }}
          >
            <div className="w-3 h-3 rounded-full bg-green-500 border border-gray-300" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800 text-sm">
                  السؤال {index + 1}
                </span>
                {question.question && (
                  <span className="text-sm text-gray-600">
                    - {question.question.substring(0, 50)}...
                  </span>
                )}
              </div>
              {!isExpanded && question.question && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-1 truncate">
                  {question.question}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onDelete();
            }}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 h-6 w-6"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>

        {/* Expanded editor */}
        {isExpanded && (
          <div className="space-y-3 mt-3 border-t pt-3">
            {/* Question */}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">
                نص السؤال
              </Label>
              <Textarea
                value={tempQuestion.question || ""}
                onChange={(e) =>
                  setTempQuestion({ ...tempQuestion, question: e.target.value })
                }
                placeholder="أدخل نص السؤال"
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[50px] resize-none"
                rows={2}
              />
            </div>

            {/* Options */}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">
                الخيارات
              </Label>
              <div className="space-y-2">
                {tempQuestion.options?.map(
                  (option: string, optionIndex: number) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={tempQuestion.correctAnswer === optionIndex}
                        onChange={() =>
                          setTempQuestion({
                            ...tempQuestion,
                            correctAnswer: optionIndex,
                          })
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <Input
                        value={option}
                        onChange={(e) =>
                          updateOption(optionIndex, e.target.value)
                        }
                        placeholder={`الخيار ${optionIndex + 1}`}
                        className="flex-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-8"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Save and Cancel buttons */}
            <div className="flex gap-2 pt-3 border-t">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-8 text-sm"
              >
                حفظ
              </Button>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  handleCancel();
                }}
                className="flex-1 border-gray-300 hover:bg-gray-50 h-8 text-sm"
              >
                إلغاء
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

// مكون تحرير البطاقات التفاعلية
function FlashcardEditor({
  card,
  index,
  onUpdate,
  onDelete,
}: {
  card: any;
  index: number;
  onUpdate: (card: any) => void;
  onDelete: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempCard, setTempCard] = useState(card);

  // Update tempCard when card changes
  useEffect(() => {
    setTempCard(card);
  }, [card]);

  const handleSave = () => {
    onUpdate(tempCard);
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setTempCard(card);
    setIsExpanded(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (5MB limit for images)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("حجم الصورة يتجاوز الحد الأقصى المسموح (5 ميجا)");
      event.target.value = "";
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("يرجى اختيار صورة صالحة");
      event.target.value = "";
      return;
    }

    // Create object URL for preview
    const imageUrl = URL.createObjectURL(file);
    setTempCard({ ...tempCard, image: imageUrl });
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm border border-gray-200">
      <div className="p-3">
        {/* Header - Simple and clean */}
        <div className="flex items-center justify-between mb-2">
          <div
            className="flex items-center gap-3 cursor-pointer flex-1"
            onClick={(e) => {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }}
          >
            <div
              className="w-3 h-3 rounded-full border border-gray-300"
              style={{ backgroundColor: card.color || "#3B82F6" }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800 text-sm">
                  البطاقة {index + 1}
                </span>
                {card.title && (
                  <span className="text-sm text-gray-600">- {card.title}</span>
                )}
              </div>
              {!isExpanded && card.content && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-1 truncate">
                  {card.content}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onDelete();
            }}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 h-6 w-6"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>

        {/* Expanded editor */}
        {isExpanded && (
          <div className="space-y-3 mt-3 border-t pt-3">
            {/* Title */}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">
                عنوان البطاقة
              </Label>
              <Input
                value={tempCard.title || ""}
                onChange={(e) =>
                  setTempCard({ ...tempCard, title: e.target.value })
                }
                placeholder="أدخل عنوان البطاقة"
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-8"
              />
            </div>

            {/* Content */}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">
                المحتوى
              </Label>
              <Textarea
                value={tempCard.content || ""}
                onChange={(e) =>
                  setTempCard({ ...tempCard, content: e.target.value })
                }
                placeholder="أدخل محتوى البطاقة"
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[50px] resize-none"
                rows={2}
              />
            </div>

            {/* Color Selection */}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">
                لون البطاقة
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={tempCard.color || "#3B82F6"}
                  onChange={(e) =>
                    setTempCard({ ...tempCard, color: e.target.value })
                  }
                  className="w-8 h-8 border-2 border-gray-300 rounded cursor-pointer"
                />
                <span className="text-sm text-gray-600">اختر لون البطاقة</span>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">
                الصورة
              </Label>
              {tempCard.image ? (
                <div className="space-y-2">
                  <div className="relative">
                    <img
                      src={tempCard.image}
                      alt="Card preview"
                      className="w-full h-20 object-cover rounded border"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(`image-upload-${card.id}`)
                          ?.click();
                      }}
                      className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50 h-8 text-xs"
                    >
                      <Upload className="w-3 h-3 mr-1" />
                      تغيير
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setTempCard({ ...tempCard, image: null });
                      }}
                      className="text-red-600 border-red-600 hover:bg-red-50 h-8 text-xs"
                    >
                      حذف
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded p-3 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 mb-2">اسحب صورة أو</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(`image-upload-${card.id}`)
                        ?.click();
                    }}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50 h-8 text-xs"
                  >
                    <Upload className="w-3 h-3 mr-1" />
                    اختر صورة
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    الحد الأقصى: 5 ميجا
                  </p>
                </div>
              )}
              <input
                id={`image-upload-${card.id}`}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>

            {/* Save and Cancel buttons */}
            <div className="flex gap-2 pt-3 border-t">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-8 text-sm"
              >
                حفظ
              </Button>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  handleCancel();
                }}
                className="flex-1 border-gray-300 hover:bg-gray-50 h-8 text-sm"
              >
                إلغاء
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default LessonDetailsSidebar;
