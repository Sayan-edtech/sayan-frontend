import { useState } from "react";
import WebBuilderLayout from "@/components/shared/WebBuilderLayout";
import AcademyMainMenuForm from "./AcademyMainMenuForm";
import CustomCSSProvider from "./CustomCSSProvider";
import HomePreview from "@/templates/template-one/pages/preview";

function MainMenu() {
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
        title="القسم الرئيسي"
        onSave={handleSave}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        showBuilderControls={false}
        previewComponent={
          <div className="w-full h-full bg-white">
            <HomePreview />
          </div>
        }
      >
        <div className="space-y-6">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">تحرير القسم الرئيسي</h3>
            <p className="text-sm text-green-700">
              قم بتعديل محتوى وعناصر القسم الرئيسي للأكاديمية
            </p>
          </div>
          <AcademyMainMenuForm />
        </div>
      </WebBuilderLayout>
    </CustomCSSProvider>
  );
}

export default MainMenu;
