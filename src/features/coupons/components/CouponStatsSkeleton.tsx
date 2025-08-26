import { Skeleton } from "@/components/ui/skeleton";

const StatCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border-0 shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Skeleton className="h-4 w-24 mb-3" />
          <Skeleton className="h-8 w-16 mb-3" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
        <div className="ml-4">
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export function CouponStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>
  );
}
