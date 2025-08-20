import { UserType } from "@/constants/enums";
import StatisticsCards from "@/features/dashboard/components/StatisticsCards";
import StudentDashboard from "@/features/dashboard/components/StudentDashboard";
import AcademyDashboard from "@/features/dashboard/components/AcademyDashboard";
import { LayoutDashboard } from "lucide-react";
import { Loader } from "@/components/shared";
import { useAuth } from "@/features/auth/hooks/useAuthStore";

function Dashboard() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="element-center">
        <Loader />
      </div>
    );
  }

  return (
    !isLoading &&
    user && (
      <div className="space-y-6">
        <Header />
        <StatisticsCards userType={user.user_type} />
        {user.user_type === UserType.ACADEMY ? (
          <AcademyDashboard />
        ) : (
          <StudentDashboard />
        )}
      </div>
    )
  );
}

export default Dashboard;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <LayoutDashboard className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">لوحة التحكم</span>
        </div>
      </div>
    </div>
  );
}
