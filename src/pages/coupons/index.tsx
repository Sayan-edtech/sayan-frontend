import { buttonVariants } from "@/components/ui/button";
import { useState, useMemo } from "react";
import type { Table } from "@tanstack/react-table";
import type { Coupon } from "@/types/coupon";
import { Plus, Ticket } from "lucide-react";
import CouponFilters from "@/features/coupons/components/CouponFilters";
import { CouponFiltersSkeleton } from "@/features/coupons/components/CouponFiltersSkeleton";
import { CreateCouponModal } from "@/features/coupons/components/CreateCouponModal";
import { CouponStats } from "@/features/coupons/components/CouponStats";
import { CouponStatsSkeleton } from "@/features/coupons/components/CouponStatsSkeleton";
import CouponTable from "@/features/coupons/components/CouponTable";
import { CouponTableSkeleton } from "@/features/coupons/components/CouponTableSkeleton";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { useCoupons } from "@/features/coupons/hooks/useCouponQueries";

function AcademyCoupons() {
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [selectedType, setSelectedType] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");
  const [table, setTable] = useState<Table<Coupon> | null>(null);
  const { data: coupons, isPending } = useCoupons();
  const filteredCoupons = useMemo(() => {
    return coupons?.filter((coupon) => {
      const matchesStatus =
        selectedStatus === "الكل" ||
        (selectedStatus === "نشط" && coupon.status === "active") ||
        (selectedStatus === "غير نشط" && coupon.status === "inactive") ||
        (selectedStatus === "منتهي الصلاحية" && coupon.status === "expired");

      const matchesType =
        selectedType === "الكل" ||
        (selectedType === "نسبة مئوية" &&
          coupon.coupon_type === "percentage") ||
        (selectedType === "مبلغ ثابت" && coupon.coupon_type === "fixed");

      const matchesSearch =
        searchTerm === "" ||
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase());
      // ||
      // coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // coupon.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // coupon.createdBy.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesType && matchesSearch;
    }) as Coupon[];
  }, [coupons, selectedStatus, selectedType, searchTerm]);

  const handleClearFilters = () => {
    setSelectedStatus("الكل");
    setSelectedType("الكل");
    setSearchTerm("");
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Ticket}
        title="إدارة كوبونات الخصم"
        actions={
          <CreateCouponModal
            trigger={
              <div className={buttonVariants()}>
                <Plus className="w-4 h-4 mr-2" />
                كوبون جديد
              </div>
            }
          />
        }
      />
      {isPending && (
        <>
          <CouponStatsSkeleton />
          <CouponFiltersSkeleton />
          <CouponTableSkeleton />
        </>
      )}
      {!isPending && coupons && (
        <>
          <CouponStats coupons={filteredCoupons || []} />
          <CouponFilters
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClearFilters={handleClearFilters}
            table={table}
          />
          <CouponTable
            coupons={filteredCoupons || []}
            onTableReady={setTable}
          />
        </>
      )}
    </div>
  );
}

export default AcademyCoupons;
