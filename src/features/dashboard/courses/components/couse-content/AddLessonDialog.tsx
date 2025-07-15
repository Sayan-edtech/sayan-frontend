import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Plus, Play, FileQuestion, Code, CreditCard, FileText, List } from "lucide-react";

interface AddLessonDialogProps {
  onAddLesson: (lesson: any) => void;
}

function AddLessonDialog({ onAddLesson }: AddLessonDialogProps) {
  const [step, setStep] = useState(1);
  const [lessonData, setLessonData] = useState({
    title: "",
    lessonType: "",
    toolType: "",
    content: "",
    questions: [],
    cards: [],
    definitions: []
  });

  const [isOpen, setIsOpen] = useState(false);

  const resetForm = () => {
    setStep(1);
    setLessonData({
      title: "",
      lessonType: "",
      toolType: "",
      content: "",
      questions: [],
      cards: [],
      definitions: []
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleNext = () => {
    if (step === 1 && lessonData.title.trim() && lessonData.lessonType) {
      if (lessonData.lessonType === 'interactive') {
        setStep(2);
      } else {
        // للفيديو والاختبار يتم الإنشاء مباشرة
        handleSubmit();
      }
    } else if (step === 2 && lessonData.toolType) {
      // للأدوات التفاعلية يتم الإنشاء مباشرة بعد اختيار النوع
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = () => {
    const newLesson = {
      id: Date.now(),
      title: lessonData.title,
      description: "",
      duration: lessonData.lessonType === 'video' ? "0:00" : lessonData.lessonType === 'quiz' ? "15:00" : "∞",
      isPublished: false,
      type: lessonData.lessonType,
      lessonType: lessonData.lessonType,
      ...(lessonData.lessonType === 'interactive' && { 
        toolType: lessonData.toolType,
        ...(lessonData.toolType === 'flashcards' && { cards: lessonData.cards }),
        ...(lessonData.toolType === 'text' && { content: lessonData.content }),
        ...(lessonData.toolType === 'definitions' && { definitions: lessonData.definitions })
      }),
      ...(lessonData.lessonType === 'quiz' && { questions: lessonData.questions }),
      resources: []
    };

    onAddLesson(newLesson);
    handleClose();
  };

  const interactiveTools = [
    {
      id: 'flashcards',
      name: 'أداة البطاقات',
      description: 'بطاقات تفاعلية للأسئلة والأجوبة',
      icon: CreditCard
    },
    {
      id: 'text',
      name: 'أداة الدرس النصي',
      description: 'محتوى نصي تفاعلي',
      icon: FileText
    },
    {
      id: 'definitions',
      name: 'أداة التعريفات المرتبة',
      description: 'قائمة تعريفات منظمة',
      icon: List
    }
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">اسم الدرس</Label>
              <Input
                id="title"
                value={lessonData.title}
                onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                placeholder="أدخل اسم الدرس"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label>اختر نوع الدرس</Label>
              <div className="grid grid-cols-1 gap-3 mt-2">
                <Card 
                  className={`p-4 cursor-pointer transition-all ${
                    lessonData.lessonType === 'video' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setLessonData({ ...lessonData, lessonType: 'video' })}
                >
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">درس فيديو</h4>
                      <p className="text-sm text-gray-600">درس بصيغة فيديو</p>
                    </div>
                  </div>
                </Card>

                <Card 
                  className={`p-4 cursor-pointer transition-all ${
                    lessonData.lessonType === 'quiz' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setLessonData({ ...lessonData, lessonType: 'quiz' })}
                >
                  <div className="flex items-center gap-3">
                    <FileQuestion className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">اختبار</h4>
                      <p className="text-sm text-gray-600">اختبار تقييمي</p>
                    </div>
                  </div>
                </Card>

                <Card 
                  className={`p-4 cursor-pointer transition-all ${
                    lessonData.lessonType === 'interactive' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setLessonData({ ...lessonData, lessonType: 'interactive' })}
                >
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium">أداة تفاعلية</h4>
                      <p className="text-sm text-gray-600">أداة تفاعلية للتعلم</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {interactiveTools.map((tool) => (
                <Card 
                  key={tool.id}
                  className={`p-4 cursor-pointer transition-all ${
                    lessonData.toolType === tool.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setLessonData({ ...lessonData, toolType: tool.id })}
                >
                  <div className="flex items-center gap-3">
                    <tool.icon className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium">{tool.name}</h4>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "إنشاء درس جديد";
      case 2:
        return "اختر نوع الأداة التفاعلية";
      default:
        return "";
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return lessonData.title.trim() !== "" && lessonData.lessonType !== "";
      case 2:
        return lessonData.toolType !== "";
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          إضافة درس
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{getStepTitle()}</DialogTitle>
          <DialogDescription>
            {step === 1 && "أدخل اسم الدرس واختر نوعه"}
            {step === 2 && "اختر نوع الأداة التفاعلية"}
          </DialogDescription>
        </DialogHeader>

        {renderStepContent()}

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                السابق
              </Button>
            )}
            <Button variant="outline" onClick={handleClose}>
              إلغاء
            </Button>
          </div>
          <div>
            {step === 1 && (lessonData.lessonType === 'video' || lessonData.lessonType === 'quiz') ? (
              <Button 
                onClick={handleNext}
                disabled={!canProceed()}
              >
                إنشاء الدرس
              </Button>
            ) : step === 1 && lessonData.lessonType === 'interactive' ? (
              <Button 
                onClick={handleNext}
                disabled={!canProceed()}
              >
                التالي
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                disabled={!canProceed()}
              >
                إنشاء الدرس
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddLessonDialog;
