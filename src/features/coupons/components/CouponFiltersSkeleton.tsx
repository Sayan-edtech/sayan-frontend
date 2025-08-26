import { Skeleton } from "@/components/ui/skeleton";

export function CouponFiltersSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border-0">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* الفلاتر الأساسية */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* البحث */}
          <div className="relative flex-1 max-w-sm">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* فلتر الحالة */}
          <div className="w-full sm:w-[180px]">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* فلتر النوع */}
          <div className="w-full sm:w-[180px]">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        {/* أزرار التحكم */}
        <div className="flex items-center gap-3">
          {/* زر الأعمدة */}
          <Skeleton className="h-10 w-20 rounded-md" />

          {/* زر مسح الفلاتر */}
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
