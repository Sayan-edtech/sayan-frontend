import { ShoppingBag, Bookmark } from "lucide-react";

function Purchases() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">المشتريات</h1>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white p-6 md:p-12 rounded-lg shadow-sm">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          {/* Icon */}
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
            <Bookmark className="w-10 h-10 text-gray-400" />
          </div>

          {/* Main Text */}
          <h3 className="text-xl font-semibold text-gray-800">
            لا توجد مشتريات لعرضها حاليًا
          </h3>

          {/* Description */}
          <p className="text-gray-500 max-w-md">
            ابدأ بتصفح المواد التعليمية وإضافتها إلى مشترياتك
          </p>
        </div>
      </div>
    </div>
  );
}

export default Purchases;
