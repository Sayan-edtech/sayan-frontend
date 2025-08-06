import { TrendingUp, Package, Download, DollarSign, Star } from "lucide-react";
import type { DigitalProduct } from "@/types/digital-product";

interface DigitalProductStatsProps {
  products: DigitalProduct[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

function StatCard({ title, value, icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${
              trendUp ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${
                trendUp ? '' : 'rotate-180'
              }`} />
              {trend}
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
}

export function DigitalProductStats({ products }: DigitalProductStatsProps) {
  const totalProducts = products.length;
  const publishedProducts = products.filter(p => p.status === 'published').length;
  const draftProducts = products.filter(p => p.status === 'draft').length;
  const totalDownloads = products.reduce((sum, product) => sum + product.downloads, 0);
  const totalRevenue = products.reduce((sum, product) => {
    const price = product.discountPrice || product.price;
    return sum + (price * product.downloads);
  }, 0);
  const averageRating = products.length > 0 
    ? (products.reduce((sum, product) => sum + product.rating, 0) / products.length).toFixed(1)
    : '0.0';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <StatCard
        title="إجمالي المنتجات"
        value={totalProducts}
        icon={<Package className="w-6 h-6 text-blue-600" />}
        trend="+12% من الشهر الماضي"
        trendUp={true}
      />
      
      <StatCard
        title="المنتجات المنشورة"
        value={publishedProducts}
        icon={<Package className="w-6 h-6 text-green-600" />}
        trend="+8% من الشهر الماضي"
        trendUp={true}
      />
      
      <StatCard
        title="المسودات"
        value={draftProducts}
        icon={<Package className="w-6 h-6 text-orange-600" />}
      />
      
      <StatCard
        title="إجمالي التحميلات"
        value={totalDownloads.toLocaleString()}
        icon={<Download className="w-6 h-6 text-purple-600" />}
        trend="+25% من الشهر الماضي"
        trendUp={true}
      />
      
      <StatCard
        title="إجمالي الإيرادات"
        value={`$${totalRevenue.toLocaleString()}`}
        icon={<DollarSign className="w-6 h-6 text-green-600" />}
        trend="+18% من الشهر الماضي"
        trendUp={true}
      />
      
      <StatCard
        title="متوسط التقييم"
        value={`${averageRating} ⭐`}
        icon={<Star className="w-6 h-6 text-yellow-600" />}
        trend="+0.2 من الشهر الماضي"
        trendUp={true}
      />
    </div>
  );
}