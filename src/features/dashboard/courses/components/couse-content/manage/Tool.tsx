import DeleteItemDialog from "@/components/shared/DeleteItemDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Lesson } from "@/types/couse";
import { Label } from "@radix-ui/react-dropdown-menu";
import { CreditCard, Plus } from "lucide-react";

import { useState } from "react";

function Tool({ lesson }: { lesson: Lesson }) {
  const [title, setTitle] = useState(lesson.title || "");
  const [cards, setCards] = useState<any[]>(lesson.cards || []);

  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      title: "",
      content: "",
      color: "#3B82F6",
      image: null,
    };
    setCards((prev) => [...prev, newCard]);
  };

  const handleUpdateCard = (index: number, field: string, value: any) => {
    const updated = [...cards];
    updated[index][field] = value;
    setCards(updated);
  };

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  return (
    <Card className="p-6 shadow-sm border-0 h-fit">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>

        {/* Edit Title */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            عنوان الدرس
          </Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
              <p className="text-xs text-gray-500">{cards.length} بطاقة</p>
            </div>
            <Button
              type="button"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleAddCard}
            >
              <Plus className="w-4 h-4 mr-2" />
              إضافة بطاقة
            </Button>
          </div>

          {/* Cards List */}
          <div className="space-y-3">
            {cards.length === 0 ? (
              <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">لا توجد بطاقات بعد</p>
                <p className="text-sm mb-4">ابدأ بإنشاء بطاقتك الأولى</p>
                <Button
                  type="button"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleAddCard}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  إنشاء بطاقة جديدة
                </Button>
              </div>
            ) : (
              cards.map((card, index) => (
                <div key={card.id} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">بطاقة {index + 1}</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="text-xs px-2 py-1"
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      حذف
                    </Button>
                  </div>
                  <Input
                    value={card.title}
                    onChange={(e) =>
                      handleUpdateCard(index, "title", e.target.value)
                    }
                    placeholder="عنوان البطاقة"
                    className="mb-2"
                  />
                  <Input
                    value={card.content}
                    onChange={(e) =>
                      handleUpdateCard(index, "content", e.target.value)
                    }
                    placeholder="محتوى البطاقة"
                    className="mb-2"
                  />
                  {/* Color picker */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs">لون البطاقة:</span>
                    <input
                      type="color"
                      value={card.color}
                      onChange={(e) =>
                        handleUpdateCard(index, "color", e.target.value)
                      }
                      className="w-8 h-8 border-2 border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                  {/* Image upload (optional) */}
                  {/* You can add image upload logic here if needed */}
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
              onClick={() => {
                // Save logic here
                console.log("Saving flashcard lesson:", { title, cards });
              }}
            >
              حفظ التغييرات
            </Button>

            <DeleteItemDialog
              id={String(lesson.id)}
              isPending={false} // Replace with actual pending state if needed
              onDelete={() => {
                console.log("Deleting flashcard lesson:", lesson.id);
              }}
              heading="حذف الدرس"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Tool;
