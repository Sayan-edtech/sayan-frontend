import { useForm, Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImageField from "@/components/shared/formFields/image-field";
import TextareaField from "@/components/shared/formFields/textarea-field";
import {
  academyAboutSchema,
  type AcademyAboutForm as AcademyAboutFormType,
} from "@/validations/template";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, Settings, Image as ImageIcon, CheckCircle, Loader2 } from "lucide-react";
import { useSliders } from "../hooks/useSlidersQueries";
import { useCreateSlider, useUpdateSlider } from "../hooks/useSlidersMutations";
import { Loader } from "@/components/shared";

const AcademyAboutForm = () => {
  const [hasUserChanges, setHasUserChanges] = useState(false);
  const [currentSliderId, setCurrentSliderId] = useState<string | null>(null);

  // API Hooks
  const { data: slidersResponse, isLoading: isLoadingSliders, error: slidersError } = useSliders();
  const createSliderMutation = useCreateSlider();
  const updateSliderMutation = useUpdateSlider();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    setValue,
  } = useForm<AcademyAboutFormType>({
    resolver: zodResolver(academyAboutSchema),
    defaultValues: {
      title: "",
      description: "",
      featureOne: "",
      featureTwo: "",
    },
    mode: "onChange",
  });

  // Track when user actually makes changes (after initial render)
  useEffect(() => {
    if (isDirty) {
      setHasUserChanges(true);
    }
  }, [isDirty]);

  // Load data from API when available
  useEffect(() => {
    if (slidersResponse?.data && slidersResponse.data.length > 0) {
      const slider = slidersResponse.data[0]; // Get first slider
      setCurrentSliderId(slider.id.toString());
      setValue("title", slider.title || "");
      setValue("description", slider.description || "");
      setValue("featureOne", slider.featureOne || "");
      setValue("featureTwo", slider.featureTwo || "");
    }
  }, [slidersResponse, setValue]);

  const onSubmit = async (data: AcademyAboutFormType) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        featureOne: data.featureOne,
        featureTwo: data.featureTwo,
        heroImage: data.heroImage,
      };

      if (currentSliderId) {
        // Update existing slider
        await updateSliderMutation.mutateAsync({
          id: currentSliderId,
          data: payload,
        });
      } else {
        // Create new slider
        const response = await createSliderMutation.mutateAsync(payload);
        if (response.data?.id) {
          setCurrentSliderId(response.data.id.toString());
        }
      }

      // After successful submission, reset the user changes flag
      setHasUserChanges(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleReset = () => {
    reset();
    setHasUserChanges(false);
  };

  const formLoading = isSubmitting || createSliderMutation.isPending || updateSliderMutation.isPending;

  // Show loading state while fetching data
  if (isLoadingSliders) {
    return (
      <div className="space-y-6" dir="rtl">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-base font-semibold text-gray-900">تحرير قسم "من نحن"</h2>
              <p className="text-sm text-gray-600">قم بتخصيص المعلومات التعريفية لأكاديميتك</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      </div>
    );
  }

  // Show error state if there's an error
  if (slidersError) {
    return (
      <div className="space-y-6" dir="rtl">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-base font-semibold text-gray-900">تحرير قسم "من نحن"</h2>
              <p className="text-sm text-gray-600">قم بتخصيص المعلومات التعريفية لأكاديميتك</p>
            </div>
          </div>
        </div>
        <div className="text-center py-10 text-red-500">
          حدث خطأ أثناء جلب البيانات
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Section */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-blue-600" />
          <div>
            <h2 className="text-base font-semibold text-gray-900">تحرير قسم "من نحن"</h2>
            <p className="text-sm text-gray-600">قم بتخصيص المعلومات التعريفية لأكاديميتك</p>
          </div>
          {hasUserChanges && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 mr-auto">
              <Settings className="w-3 h-3 ml-1" />
              يوجد تغييرات غير محفوظة
            </Badge>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Titles Combined */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <Info className="w-4 h-4 text-blue-600" />
                العناوين
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">
                  العنوان الرئيسي
                </Label>
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="أدخل العنوان الجذاب"
                      disabled={formLoading}
                      className={`${
                        errors.title
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="rtl"
                    />
                  )}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>


            </CardContent>
          </Card>

          {/* Statistics Combined */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <CheckCircle className="w-4 h-4 text-green-600" />
                الإحصائيات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">
                  الإحصائية الأولى
                </Label>
                <Controller
                  control={control}
                  name="featureOne"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="مثال: +500 طالب"
                      disabled={formLoading}
                      className={`${
                        errors.featureOne
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="rtl"
                    />
                  )}
                />
                {errors.featureOne && (
                  <p className="text-sm text-destructive">
                    {errors.featureOne.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">
                  الإحصائية الثانية
                </Label>
                <Controller
                  control={control}
                  name="featureTwo"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="مثال: +50 دورة"
                      disabled={formLoading}
                      className={`${
                        errors.featureTwo
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="rtl"
                    />
                  )}
                />
                {errors.featureTwo && (
                  <p className="text-sm text-destructive">
                    {errors.featureTwo.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Hero Image */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                الصورة الرئيسية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <ImageField
                  name="heroImage"
                  type="image"
                  label=""
                  placeholder="اختر الصورة الرئيسية"
                  control={control as unknown as Control<Record<string, unknown>>}
                  errors={errors}
                  disabled={formLoading}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description - Second Row */}
        <Card className="shadow-sm border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
              <Info className="w-4 h-4 text-gray-600" />
              الوصف التفصيلي
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <TextareaField
              name="description"
              type="textarea"
              label=""
              placeholder="اكتب وصفاً شاملاً عن الأكاديمية، رؤيتها، رسالتها، والخدمات التي تقدمها..."
              control={control}
              errors={errors}
              disabled={formLoading}
              rows={6}
              maxLength={1000}
            />
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-start gap-3 pt-4 border-t border-gray-100">
          <Button
            type="submit"
            disabled={!isValid || isSubmitting || !hasUserChanges}
            className="px-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 ml-2" />
                حفظ التغييرات
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isSubmitting || !hasUserChanges}
            className="px-6"
          >
            إلغاء التغييرات
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AcademyAboutForm;
