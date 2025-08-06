import { useState } from "react";
import WebBuilderLayout from "@/components/shared/WebBuilderLayout";
import AcademyAboutForm from "./AcademyAboutForm";
import CustomCSSProvider from "./CustomCSSProvider";
import HomePreview from "@/templates/template-one/pages/preview";

function About() {
  const [canUndo] = useState(false);
  const [canRedo] = useState(false);

  const handleSave = () => {
    // تنفيذ عملية الحفظ
    console.log("حفظ التغييرات");
  };

  const handleUndo = () => {
    // تنفيذ عملية التراجع
    console.log("تراجع");
  };

  const handleRedo = () => {
    // تنفيذ عملية الإعادة
    console.log("إعادة");
  };

  return (
    <CustomCSSProvider>
      <WebBuilderLayout
        title="قسم من نحن"
        onSave={handleSave}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        previewComponent={
          <div className="w-full h-full bg-white">
            <HomePreview />
          </div>
        }
      >
        <div className="space-y-6">
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">تحرير قسم من نحن</h3>
            <p className="text-sm text-purple-700">
              قم بتعديل محتوى ومعلومات قسم "من نحن" للأكاديمية
            </p>
          </div>
          <AcademyAboutForm />
        </div>
      </WebBuilderLayout>
    </CustomCSSProvider>
  );
}

export default About;
