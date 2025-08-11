import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dummy purchases data
const dummyPurchases = [
  {
    id: 1,
    title: "البرمجة بـ React للمبتدئين",
    type: "course",
    academy: "أكاديمية التقنية المتقدمة",
    academyImage: "/api/placeholder/40/40",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop&crop=center",
    purchaseDate: "2024-01-15",
    price: "299 ريال",
    status: "مكتمل",
  },
  {
    id: 2,
    title: "كتاب البرمجة الحديثة - PDF",
    type: "product",
    academy: "دار النشر التقني",
    academyImage: "/api/placeholder/40/40",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop&crop=center",
    purchaseDate: "2024-02-10",
    price: "49 ريال",
    status: "مكتمل",
  },
  {
    id: 3,
    title: "تطوير تطبيقات الجوال باستخدام Flutter",
    type: "course",
    academy: "معهد البرمجة الحديثة",
    academyImage: "/api/placeholder/40/40",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop&crop=center",
    purchaseDate: "2024-02-20",
    price: "399 ريال",
    status: "فشل",
  },
  {
    id: 4,
    title: "قوالب تصميم UI/UX - مجموعة كاملة",
    type: "product",
    academy: "استوديو التصميم",
    academyImage: "/api/placeholder/40/40",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=200&fit=crop&crop=center",
    purchaseDate: "2024-03-05",
    price: "129 ريال",
    status: "مكتمل",
  },
  {
    id: 5,
    title: "أساسيات التصميم UI/UX",
    type: "course",
    academy: "مدرسة التصميم الرقمي",
    academyImage: "/api/placeholder/40/40",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=300&h=200&fit=crop&crop=center",
    purchaseDate: "2024-03-10",
    price: "199 ريال",
    status: "مكتمل",
  },
];

function Purchases() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-700";
      case "فشل":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };



  const getTypeLabel = (type: string) => {
    return type === "course" ? "دورة تعليمية" : "منتج رقمي";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <Header />

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {dummyPurchases.map((purchase) => (
          <div
            key={purchase.id}
            className="bg-white rounded-lg border border-gray-200 p-4 space-y-3"
          >
            <div className="flex items-start gap-3">
              <img
                src={purchase.image}
                alt={purchase.title}
                className="w-16 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 line-clamp-2">{purchase.title}</div>
                <Badge variant="outline" className="text-xs mt-1">
                  {getTypeLabel(purchase.type)}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div 
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                onClick={() => window.open(`/academy/${purchase.id}`, '_blank')}
              >
                <img
                  src={purchase.academyImage}
                  alt={purchase.academy}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600">{purchase.academy}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">{formatDate(purchase.purchaseDate)}</div>
                <div className="font-semibold text-blue-600">{purchase.price}</div>
              </div>
              
              <div className="flex justify-end">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                  {purchase.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border border-gray-200 bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-right font-semibold text-gray-700 py-4">الصورة</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">المنتج</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">النوع</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">المُنشئ</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">تاريخ الشراء</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">السعر</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyPurchases.map((purchase) => (
              <TableRow key={purchase.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <TableCell className="text-right py-4">
                  <img 
                    src={purchase.image} 
                    alt={purchase.title}
                    className="w-16 h-10 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="font-medium text-gray-900 line-clamp-1">{purchase.title}</div>
                </TableCell>
                <TableCell className="text-right py-4">
                  <Badge variant="outline" className="text-xs">
                    {getTypeLabel(purchase.type)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-4">
                  <div 
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => window.open(`/academy/${purchase.id}`, '_blank')}
                  >
                    <img 
                      src={purchase.academyImage} 
                      alt={purchase.academy}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600">{purchase.academy}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="text-sm text-gray-600">{formatDate(purchase.purchaseDate)}</div>
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="font-semibold text-blue-600">{purchase.price}</div>
                </TableCell>
                <TableCell className="text-right py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                    {purchase.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Purchases;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <ShoppingBag className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            المشتريات
          </span>
        </div>
      </div>
    </div>
  );
}