import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LearningPointsCard() {
  const points = [
    "أساسيات التصميم والألوان",
    "استخدام أدوات التصميم",
    "تصميم واجهات تفاعلية",
    "مبادئ تجربة المستخدم",
    "إنشاء نماذج أولية",
    "تطبيق المشاريع العملية"
  ];

  return (
    <Card className="border-gray-200 bg-white">
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-4 text-gray-900">ماذا سوف تتعلم</h3>
        <div className="space-y-3">
          {points.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}