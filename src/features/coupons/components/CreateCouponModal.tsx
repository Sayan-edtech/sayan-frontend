import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Percent,
  DollarSign,
  Info,
  Package,
  Search,
  X,
} from "lucide-react";
import React from "react";
import type { CouponPayload } from "@/types/coupon";
import type { Course } from "@/types/couse";
import { UserType } from "@/constants/enums";

interface CreateCouponModalProps {
  trigger?: React.ReactNode;
}

const courses: Course[] = [
  {
    id: "0f619651-f1dd-4cb1-ba9f-2424ec2d2909",
    academy_id: 89,
    category_id: 14,
    trainer_id: 115,
    slug: "course-29f8afba",
    image:
      "/static/uploads/courses/20250813_121323_4e9b9df0-8238-4f03-968f-96028b681944.png",
    content: "هذا وصف شامل ,  و مثال حي . ",
    short_content: "هذا وصف شامل ,  و مثال حي . ",
    preparations: null,
    requirements: "هذا وصف شامل ,  و مثال حي . ",
    learning_outcomes: "هذا وصف شامل ,  و مثال حي . ",
    gallery: null,
    preview_video:
      "/static/uploads/courses/videos/20250813_121323_8a5f3e4f-11d9-4dcc-96b8-da1139b4c77b.mp4",
    course_state: "published",
    featured: true,
    type: "recorded",
    level: "beginner",
    url: null,
    platform_fee_percentage: 10.0,
    avg_rating: 0.0,
    ratings_count: 0,
    students_count: 0,
    lessons_count: 0,
    completion_rate: 0.0,
    created_at: "2025-08-13T09:13:23",
    updated_at: "2025-08-13T09:27:59",
    title: "كورس في العادات الصحية لتناول الغذاء",
    trainer: {
      id: 115,
      email: "",
      fname: "",
      lname: "",
      avatar: "",
      user_type: UserType.STUDENT,
    },
    price: 1000.0,
    discount_price: null,
    discount_ends_at: null,
    category: {
      id: 14,
      title: "الصحة واللياقة",
      slug: "الصحة-واللياقة-bf21e5d0",
      content: "دورات لتحسين الصحة الجسدية والنفسية واللياقة البدنية.",
      image: null,
      status: true,
    },
  },
];

export function CreateCouponModal({ trigger }: CreateCouponModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CouponPayload>({
    code: "",
    coupon_type: "percentage",
    expires_at: "",
    is_active: true,
    starts_at: "",
    usage_limit: 0,
    application_scope: "GENERAL",
    applicable_courses: [],
  });
  const [startDate, setStartDate] = useState<string>("");
  const [availableCourses, setAvailableCourses] = useState<Course[]>(courses);
  const [courseSearchTerm, setcourseSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //   // التحقق من اختيار منتج واحد على الأقل للكوبون الخاص
    //   if (
    //     formData.applicationType === "specific" &&
    //     (!formData.applicable_courses || formData.applicable_courses.length === 0)
    //   ) {
    //     alert("يرجى اختيار منتج واحد على الأقل للكوبون الخاص");
    //     return;
    //   }

    //   const couponData: CouponPayload = {
    //     ...formData,
    //     startDate,
    //     endDate,
    //   };

    //   if (onCreateCoupon) {
    //     onCreateCoupon(couponData);
  };

  //   // Reset form
  //   setFormData({
  //     code: "",
  //     name: "",
  //     coupon_type: "percentage",
  //     value: 0,
  //     max_discount: undefined,
  //     usageLimit: undefined,
  //     startDate: "",
  //     endDate: "",
  //     applicationType: "general",
  //     applicable_courses: [],
  //   });
  //   setStartDate("");
  //   setEndDate("");
  //   setAvailablecourses([]);
  //   setcourseSearchTerm("");
  //   setOpen(false);
  // };

  const generateCouponCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setFormData((prev) => ({ ...prev, code: result }));
  };

  useEffect(() => {
    if (formData.application_scope === "SPECIFIC") {
      setAvailableCourses(courses);
    }
  }, [formData.application_scope]);

  const handleCourseSelect = (course: Course) => {
    const isAlreadySelected = formData.applicable_courses?.some(
      (p) => p.id === course.id
    );
    if (isAlreadySelected) return;

    setFormData((prev) => ({
      ...prev,
      applicable_courses: [...(prev.applicable_courses || []), course],
    }));
    setcourseSearchTerm("");
  };

  const handleCourseRemove = (courseId: string) => {
    setFormData((prev) => ({
      ...prev,
      applicable_courses:
        prev.applicable_courses?.filter((p) => p.id !== courseId) || [],
    }));
  };

  const filteredCourses = availableCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) &&
      !formData.applicable_courses?.some((p) => p.id === course.id)
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            كوبون جديد
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-4xl max-h-[95vh] overflow-y-auto"
        dir="rtl"
      >
        <DialogHeader className="border-b border-gray-100 pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3 justify-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Percent className="w-5 h-5 text-blue-600" />
            </div>
            إنشاء كوبون خصم جديد
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 pt-6">
          {/* معلومات أساسية */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              المعلومات الأساسية
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="code"
                  className="text-sm font-medium text-card-foreground text-right"
                >
                  كود الكوبون *
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        code: e.target.value.toUpperCase(),
                      }))
                    }
                    placeholder="SAVE20"
                    className="font-mono h-10 !bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                    dir="rtl"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateCouponCode}
                  >
                    توليد
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* تفاصيل الخصم */}
          <div className="bg-gray-50 rounded-xl p-6 pb-0 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              تفاصيل الخصم
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">نوع الخصم *</Label>
                <Select
                  value={formData.coupon_type}
                  onValueChange={(value: CouponPayload["coupon_type"]) =>
                    setFormData((prev) => ({ ...prev, coupon_type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4" />
                        نسبة مئوية
                      </div>
                    </SelectItem>
                    <SelectItem value="fixed">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        مبلغ ثابت
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max_discount">
                  قيمة الخصم *{" "}
                  {formData.coupon_type === "percentage" ? "(%)" : "(ر.س)"}
                </Label>
                <Input
                  id="max_discount"
                  type="number"
                  value={formData.max_discount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      max_discount: Number(e.target.value),
                    }))
                  }
                  placeholder={
                    formData.coupon_type === "percentage" ? "20" : "100"
                  }
                  min="0"
                  max={
                    formData.coupon_type === "percentage" ? "100" : undefined
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* نطاق التطبيق */}
          <div className="bg-blue-50 rounded-xl p-6 space-y-4 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              نطاق التطبيق
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="applicationType">نوع التطبيق *</Label>
                <Select
                  value={formData.application_scope}
                  onValueChange={(value: "GENERAL" | "SPECIFIC") => {
                    console.log(value);
                    setFormData((prev) => ({
                      ...prev,
                      application_scope: value,
                      applicable_courses:
                        value === "GENERAL" ? [] : prev.applicable_courses,
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GENERAL">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        كوبون عام - يطبق على جميع المنتجات
                      </div>
                    </SelectItem>
                    <SelectItem value="SPECIFIC">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        كوبون خاص - يطبق على منتجات محددة
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.application_scope === "SPECIFIC" && (
                <div className="space-y-4 p-6 bg-white rounded-lg border border-blue-200 shadow-sm">
                  <div className="space-y-2">
                    <Label
                      htmlFor="courseSearch"
                      className="text-sm font-medium text-card-foreground text-right"
                    >
                      البحث عن المنتجات وإضافتها
                    </Label>
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="courseSearch"
                        value={courseSearchTerm}
                        onChange={(e) => setcourseSearchTerm(e.target.value)}
                        placeholder="ابحث عن المنتجات لإضافتها..."
                        className="h-10 !bg-transparent text-right pr-10 pl-3 !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  {formData.applicable_courses &&
                    formData.applicable_courses.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900">
                          المنتجات المختارة (
                          {formData.applicable_courses.length})
                        </h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {formData.applicable_courses.map((course) => (
                            <div
                              key={course.id}
                              className="p-4 bg-green-50 rounded-lg border border-green-200"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={
                                    course.image ||
                                    "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png"
                                  }
                                  alt={course.title}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                <h4 className="font-medium text-green-800">
                                  {course.title}
                                </h4>
                                <button
                                  type="button"
                                  onClick={() => handleCourseRemove(course.id)}
                                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors"
                                  title="حذف المنتج"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {filteredCourses.length > 0 && (
                    <div className="max-h-48 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-2">
                      {filteredCourses.map((course) => (
                        <div
                          key={course.id}
                          onClick={() => handleCourseSelect(course)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-blue-200 transition-all"
                        >
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">
                              {course.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {course.price} ر.س
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    سيتم تطبيق الكوبون على المنتجات المختارة فقط
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* قيود الاستخدام */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              قيود الاستخدام
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="usageLimit">حد الاستخدام</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={formData.usage_limit || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      usageLimit: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    }))
                  }
                  placeholder="100"
                  min="1"
                />
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  اتركه فارغاً للاستخدام غير المحدود
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="startDate"
                  className="text-sm font-medium text-card-foreground text-right"
                >
                  تاريخ البداية *
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-10 !bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                  dir="rtl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="endDate"
                  className="text-sm font-medium text-card-foreground text-right"
                >
                  تاريخ الانتهاء *
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.expires_at}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      expires_at: e.target.value,
                    }));
                  }}
                  min={startDate}
                  className="h-10 !bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                  dir="rtl"
                  required
                />
              </div>
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              إلغاء
            </Button>
            <Button type="submit">إنشاء الكوبون</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
