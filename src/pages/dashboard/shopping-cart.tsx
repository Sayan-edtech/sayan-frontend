import { ShoppingCart as ShoppingCartIcon, Trash2, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Dummy cart items data
const initialCartItems = [
  {
    id: 1,
    title: "البرمجة المتقدمة بـ JavaScript",
    type: "course",
    instructor: "خالد أحمد",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=240&fit=crop&crop=center",
    price: 399,
    originalPrice: 599,
    duration: "20 ساعة",
    rating: 4.9,
    studentsCount: 3500,
    level: "متقدم",
  },
  {
    id: 2,
    title: "مجموعة أيقونات التجارة الإلكترونية",
    type: "product",
    creator: "استوديو التصميم",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=240&fit=crop&crop=center",
    price: 89,
    originalPrice: 129,
    downloads: 1200,
    rating: 4.7,
    reviews: 234,
    format: "SVG, PNG",
  },
  {
    id: 3,
    title: "تصميم تطبيقات الهاتف المحمول",
    type: "course",
    instructor: "نورا محمد",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=240&fit=crop&crop=center",
    price: 299,
    originalPrice: 449,
    duration: "15 ساعة",
    rating: 4.8,
    studentsCount: 2100,
    level: "متوسط",
  },
];

function ShoppingCart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [discountCode, setDiscountCode] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("visa-mada");

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const getTotalOriginalPrice = () => {
    return cartItems.reduce((total, item) => total + item.originalPrice, 0);
  };

  const getSavings = () => {
    return getTotalOriginalPrice() - getTotalPrice();
  };



  const getTypeLabel = (type: string) => {
    return type === "course" ? "دورة تعليمية" : "منتج رقمي";
  };

  const getTypeColor = (type: string) => {
    return type === "course" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700";
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "مبتدئ":
        return "bg-green-100 text-green-700";
      case "متوسط":
        return "bg-yellow-100 text-yellow-700";
      case "متقدم":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex">
                {/* Item Image */}
                <div className="w-32 h-24 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                </div>

                {/* Item Details */}
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 line-clamp-1 mb-2">
                        {item.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        {item.type === "course" ? (
                          <>
                            {item.level && (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(item.level)}`}>
                                {item.level}
                              </span>
                            )}
                            <span>{item.duration}</span>
                            <span>{item.rating}</span>
                            <span>{item.studentsCount}</span>
                          </>
                        ) : (
                          <>
                            <span>{item.downloads} تحميل</span>
                            <span>{item.rating} ({item.reviews})</span>
                            <span>{item.format}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <span className="text-lg font-bold text-blue-600">{item.price} ريال</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ملخص الطلب</h3>
            
            {/* Discount Code Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كود الخصم
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="أدخل كود الخصم"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  className="px-4 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  تطبيق
                </Button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">المجموع:</span>
                <span className="font-medium">{getTotalOriginalPrice()} ريال</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>الخصم:</span>
                <span className="font-medium">-{getSavings()} ريال</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع الكلي:</span>
                  <span className="text-blue-600">{getTotalPrice()} ريال</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">طريقة الدفع</h4>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50">
                  <input
                    type="radio"
                    name="payment"
                    value="visa-mada"
                    checked={selectedPaymentMethod === "visa-mada"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <CreditCard className="w-4 h-4 text-gray-600 ml-3" />
                  <span className="text-sm">فيزا / مدى</span>
                </label>

                <label className="flex items-center p-3 bg-gray-50 rounded-lg cursor-not-allowed opacity-50">
                  <input
                    type="radio"
                    name="payment"
                    value="apple-pay"
                    checked={selectedPaymentMethod === "apple-pay"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="mr-3"
                    disabled
                  />
                  <Smartphone className="w-4 h-4 text-gray-600 ml-3" />
                  <span className="text-sm">Apple Pay</span>
                </label>

                <label className="flex items-center p-3 bg-gray-50 rounded-lg cursor-not-allowed opacity-50">
                  <input
                    type="radio"
                    name="payment"
                    value="samsung-pay"
                    checked={selectedPaymentMethod === "samsung-pay"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="mr-3"
                    disabled
                  />
                  <Smartphone className="w-4 h-4 text-gray-600 ml-3" />
                  <span className="text-sm">Samsung Pay</span>
                </label>

                <label className="flex items-center p-3 bg-gray-50 rounded-lg cursor-not-allowed opacity-50">
                  <input
                    type="radio"
                    name="payment"
                    value="tamara"
                    checked={selectedPaymentMethod === "tamara"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="mr-3"
                    disabled
                  />
                  <CreditCard className="w-4 h-4 text-gray-600 ml-3" />
                  <span className="text-sm">تمارا</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-medium rounded-lg"
                disabled={!selectedPaymentMethod}
              >
                الدفع الآن
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 py-3 font-medium rounded-lg"
                onClick={() => window.location.href = "/"}
              >
                متابعة التسوق
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <ShoppingCartIcon className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            سلة التسوق
          </span>
        </div>
      </div>
    </div>
  );
}
