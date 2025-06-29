import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/shared/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/shared/dashboard/DashboardHeader";
import { useState } from "react";
import { UserType } from "@/constants/enums";
import { ProtectedRoute } from "@/components/shared/GuardRoute";

export function DashboardLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar userType={UserType.STUDENT} />
        <DashboardSidebar
          isMobile={true}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          userType={UserType.STUDENT}
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
    </ProtectedRoute>
  );
}
