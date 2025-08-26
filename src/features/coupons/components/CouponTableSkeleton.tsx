import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MobileCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-5 w-12" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-2 w-2 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

const DesktopTableRowSkeleton = () => {
  return (
    <TableRow className="border-b border-gray-100">
      {/* كود الكوبون */}
      <TableCell className="text-right py-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </TableCell>

      {/* النوع والقيمة */}
      <TableCell className="text-right py-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-5 w-12" />
        </div>
      </TableCell>

      {/* الحالة */}
      <TableCell className="text-right py-4">
        <Skeleton className="h-6 w-16 rounded-full" />
      </TableCell>

      {/* الاستخدام */}
      <TableCell className="text-right py-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <div className="flex flex-col space-y-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-1 w-16 rounded-full" />
          </div>
        </div>
      </TableCell>

      {/* تاريخ الانتهاء */}
      <TableCell className="text-right py-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
        </div>
      </TableCell>

      {/* المنتجات المطبقة */}
      <TableCell className="text-right py-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="flex flex-col space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </TableCell>

      {/* الإجراءات */}
      <TableCell className="text-right py-4">
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </TableCell>
    </TableRow>
  );
};

export function CouponTableSkeleton() {
  return (
    <div className="w-full">
      {/* Mobile Card View Skeleton */}
      <div className="block lg:hidden space-y-4">
        <MobileCardSkeleton />
        <MobileCardSkeleton />
        <MobileCardSkeleton />
        <MobileCardSkeleton />
        <MobileCardSkeleton />
      </div>

      {/* Desktop Table View Skeleton */}
      <div className="hidden lg:block rounded-lg border-0 shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-right font-semibold text-gray-700 py-4">
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">
                <Skeleton className="h-4 w-28" />
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">
                <Skeleton className="h-4 w-16" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <DesktopTableRowSkeleton />
            <DesktopTableRowSkeleton />
            <DesktopTableRowSkeleton />
            <DesktopTableRowSkeleton />
            <DesktopTableRowSkeleton />
            <DesktopTableRowSkeleton />
            <DesktopTableRowSkeleton />
            <DesktopTableRowSkeleton />
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-16 rounded-md" />
          <Skeleton className="h-9 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
}
