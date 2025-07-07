import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/shared/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/shared/dashboard/DashboardHeader";
import { useState } from "react";
import { DashboardLoading } from "@/components/shared/dashboard";
import { useCurrentUserProfile } from "../profile/hooks";
import { Button } from "@/components/ui/button";

export function DashboardLayout() {
  const { data: user, isLoading, isError } = useCurrentUserProfile();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (!isLoading && isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">حدث خطأ</h2>
          <p className="text-gray-600">لا يمكن تحميل بيانات المستخدم</p>
          <Button onClick={() => window.location.reload()}>
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  return (
    user && (
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar user={user} />
        <DashboardSidebar
          isMobile={true}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          user={user}
        />
        <div className="flex-1 flex flex-col">
          <DashboardHeader
            onMobileMenuClick={() => setIsMobileSidebarOpen(true)}
          />
          <main className="flex-1 p-4 lg:p-6 bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    )
  );
}
