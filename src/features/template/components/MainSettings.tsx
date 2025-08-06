import { useState } from "react";
import WebBuilderLayout from "@/components/shared/WebBuilderLayout";
import CustomCSSProvider from "./CustomCSSProvider";
import HomePreview from "@/templates/template-one/pages/preview";

function MainSettings() {
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
        title="الإعدادات الرئيسية"
        onSave={handleSave}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        showBuilderControls={true}
        previewComponent={
          <div className="w-full h-full bg-white">
            <HomePreview />
          </div>
        }
      />
    </CustomCSSProvider>
  );
}

export default MainSettings;
