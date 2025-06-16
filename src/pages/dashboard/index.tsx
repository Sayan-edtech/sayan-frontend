import { Users, ShoppingBag, Heart } from "lucide-react";
import { EducationalMaterialsChart } from "@/components/shared/dashboard/EducationalMaterialsChart";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/formatters";

const statsCards = [
  {
    id: "courses",
    title: "الدورات التدريبية",
    value: "0",
    textColor: "text-gray-900",
    iconColor: "bg-blue-500",
    bgColor: "#0062ff0f",
    link: "/dashboard/courses",
  },
  {
    id: "purchases",
    title: "المشتريات المكتملة",
    value: "0",
    textColor: "text-gray-900",
    iconColor: "bg-pink-500",
    bgColor: "#c902790f",
    link: "/dashboard/purchases",
  },
  {
    id: "favorites",
    title: "المفضلة",
    value: "0",
    textColor: "text-gray-900",
    iconColor: "bg-green-500",
    bgColor: "#59c9020f",
    link: "/dashboard/favorites",
  },
  {
    id: "affiliate-marketing",
    title: "التسويق بالعمولة",
    value: formatCurrency(0),
    percentage: "100.00%",
    bgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
    textColor: "text-white",
    link: "/dashboard/affiliate-marketing",
  },
];
function Dashboard() {
  return (
    <div className="space-y-6">
      <StatisticsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EducationalMaterials />
        <div className="flex flex-col justify-between gap-6">
          <UpcomingCourses />
          <Classes />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

function StatisticsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:sm:grid-cols-3 xl:grid-cols-4 gap-6">
      {statsCards.map((card) => (
        <Link
          key={card.id}
          to={card.link}
          className={`block p-6 rounded-2xl shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer ${card.bgColor}`}
          style={card.bgColor ? { backgroundColor: card.bgColor } : {}}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3
                className={`text-sm font-medium ${card.textColor} opacity-80`}
              >
                {card.title}
              </h3>
              <div className="mt-2">
                <span className={`text-3xl font-bold ${card.textColor}`}>
                  {card.value}
                </span>
                {card.percentage && (
                  <p className={`text-xs mt-1 ${card.textColor} opacity-60`}>
                    {card.percentage} منذ آخر شهر
                  </p>
                )}
              </div>
            </div>
            {card.iconColor && (
              <div
                className={`w-12 h-12 ${card.iconColor} rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-110`}
              >
                {card.id === "courses" && (
                  <Users className="w-6 h-6 text-white" />
                )}
                {card.id === "purchases" && (
                  <ShoppingBag className="w-6 h-6 text-white" />
                )}
                {card.id === "favorites" && (
                  <Heart className="w-6 h-6 text-white" />
                )}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

function EducationalMaterials() {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            إحصائيات المواد التعليمية
          </h2>
          <span className="text-sm text-gray-500">احصائيات</span>
        </div>

        {/* Chart Component */}
        <EducationalMaterialsChart />
      </div>
    </div>
  );
}

function UpcomingCourses() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          مادة تعليمية قادمة
        </h3>
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <span className="text-blue-600 text-xl">📚</span>
        </div>
      </div>
      <p className="text-gray-600 text-center py-8">لا توجد دورة قادمة</p>
    </div>
  );
}
function Classes() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600">لا يوجد فصل محدد</span>
      </div>

      <div className="flex -space-x-2 mt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full border-2 border-white"
            style={{
              backgroundColor: [
                "#ef4444",
                "#f97316",
                "#eab308",
                "#22c55e",
                "#3b82f6",
              ][i - 1],
            }}
          />
        ))}
        <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-xs text-gray-600">10+</span>
        </div>
      </div>
    </div>
  );
}
