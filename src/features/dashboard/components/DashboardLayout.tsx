import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/shared/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/shared/dashboard/DashboardHeader";
import { useState } from "react";
import { DashboardLoading } from "@/components/shared/dashboard";
import { useAuth } from "@/features/auth/hooks/useAuthStore";

function DashboardLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    !isLoading &&
    user && (
      <div className="min-h-screen bg-background flex">
        {/* Desktop Sidebar */}
        <DashboardSidebar
          userType={user.user_type}
          isMobile={false}
          user={user}
        />

        {/* Mobile Sidebar */}
        <DashboardSidebar
          userType={user.user_type}
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

export default DashboardLayout;
