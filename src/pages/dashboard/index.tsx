import { UserType } from "@/constants/enums";
import StatisticsCards from "@/features/dashboard/components/StatisticsCards";
import StudentDashboard from "@/features/dashboard/components/StudentDashboard";
import AcademyDashboard from "@/features/dashboard/components/AcademyDashboard";
import { LayoutDashboard } from "lucide-react";

const userType = UserType.ACADEMY;

function Dashboard() {
  return (
    <div className="space-y-6" dir="rtl">
      <Header />
      <StatisticsCards userType={userType} />
      {userType === UserType.ACADEMY ? (
        <AcademyDashboard />
      ) : (
        <StudentDashboard />
      )}
    </div>
  );
}

export default Dashboard;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0" dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <LayoutDashboard className="w-6 h-6 text-blue-600" />
          <span className="font-semibold text-lg lg:text-xl text-gray-900">
            لوحة التحكم
          </span>
        </div>
      </div>
    </div>
  );
}
