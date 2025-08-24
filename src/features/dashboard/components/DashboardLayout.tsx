import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/shared/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/shared/dashboard/DashboardHeader";
import { useState } from "react";
import { UserType } from "@/constants/enums";
import { useUser } from "@/features/auth/store";
import { useLanguage } from "@/contexts/LanguageContext";

function DashboardLayout() {
  const { lang } = useLanguage();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useUser();
  
  // Debug logs
  console.log("DashboardLayout user:", user);
  console.log("user?.user_type:", user?.user_type);
  
  // تحديد نوع المستخدم، افتراضياً طالب إذا لم يتم العثور على نوع
  const userType = user?.user_type === "ACADEMY" ? UserType.ACADEMY : UserType.ACADEMY;
  
  console.log("DashboardLayout userType:", userType);

  return (
    <div className="min-h-screen bg-background flex" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <DashboardSidebar 
        userType={userType}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <DashboardSidebar
        isMobile={true}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        userType={userType}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
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
  );
}

export default DashboardLayout;
