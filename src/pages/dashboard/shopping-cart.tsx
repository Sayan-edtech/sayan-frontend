import { ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function ShoppingCart() {
  return (
    <div className="p-6 space-y-6">
      {/* Empty State */}
      <div className="bg-white p-12 rounded-lg shadow-sm">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          {/* Icon */}
          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
            <ShoppingCartIcon className="w-12 h-12 text-gray-400" />
          </div>

          {/* Main Text */}
          <h3 className="text-2xl font-semibold text-gray-800">
            عربة التسوق فارغة
          </h3>

          {/* Description */}
          <p className="text-gray-500 max-w-md text-lg">
            لم تقم بإضافة أي مواد تعليمية إلى عربة التسوق بعد
          </p>

          {/* Action Button */}
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium rounded-lg mt-4"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            تصفح المواد التعليمية
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
