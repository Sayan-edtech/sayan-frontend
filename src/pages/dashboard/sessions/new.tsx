import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, Users, DollarSign } from "lucide-react";
import { Routes, Pages } from "@/constants/enums";

interface SessionFormData {
  title: string;
  description: string;
  type: string;
  category: string;
  duration: number;
  price: number;
  maxParticipants: number;
  instructor: string;
  date: string;
  time: string;
  location: string;
}

function NewSession() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SessionFormData>({
    title: "",
    description: "",
    type: "",
    category: "",
    duration: 60,
    price: 0,
    maxParticipants: 1,
    instructor: "",
    date: "",
    time: "",
    location: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof SessionFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // هنا يمكن إضافة منطق حفظ الجلسة
      console.log("Session data:", formData);
      
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // العودة إلى صفحة الجلسات
      navigate(`${Routes.DASHBOARD}/${Pages.SESSIONS}`);
    } catch (error) {
      console.error("Error creating session:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0">
        <Button
          variant="ghost"
          onClick={() => navigate(`${Routes.DASHBOARD}/${Pages.SESSIONS}`)}
          className="flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          العودة إلى الجلسات
        </Button>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base font-noto">
            إضافة جلسة جديدة
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  المعلومات الأساسية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان الجلسة *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="أدخل عنوان الجلسة"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">وصف الجلسة</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="أدخل وصف مفصل للجلسة"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">نوع الجلسة *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الجلسة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="فردية">فردية</SelectItem>
                        <SelectItem value="جماعية">جماعية</SelectItem>
                        <SelectItem value="ورشة عمل">ورشة عمل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">الفئة *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="استشارات تقنية">استشارات تقنية</SelectItem>
                        <SelectItem value="استشارات أعمال">استشارات أعمال</SelectItem>
                        <SelectItem value="تطوير شخصي">تطوير شخصي</SelectItem>
                        <SelectItem value="تصميم">تصميم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructor">المدرب *</Label>
                  <Input
                    id="instructor"
                    value={formData.instructor}
                    onChange={(e) => handleInputChange("instructor", e.target.value)}
                    placeholder="أدخل اسم المدرب"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">المكان</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="أدخل مكان انعقاد الجلسة"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Session Details */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  تفاصيل الجلسة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">المدة (بالدقائق) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", parseInt(e.target.value) || 0)}
                    placeholder="60"
                    min="15"
                    max="480"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    السعر (ر.س) *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", parseInt(e.target.value) || 0)}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxParticipants" className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    الحد الأقصى للمشاركين *
                  </Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange("maxParticipants", parseInt(e.target.value) || 1)}
                    placeholder="1"
                    min="1"
                    max="100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">التاريخ *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">الوقت *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`${Routes.DASHBOARD}/${Pages.SESSIONS}`)}
          >
            إلغاء
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "جاري الحفظ..." : "حفظ الجلسة"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewSession;