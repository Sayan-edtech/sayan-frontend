import { Home } from "lucide-react";
import { UserType } from "@/constants/enums";
import AcademySidebar from "./AcademySidebar";
import StudentSidebar from "./StudentSidebar";
import type { User as UserData } from "@/types/user";

interface SidebarSubItem {
  id: string;
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  comingSoon?: boolean;
}

interface SidebarItem {
  id: string;
  title: string;
  href?: string;
  icon: React.ReactNode;
  badge?: string;
  comingSoon?: boolean;
  isExpandable?: boolean;
  subItems?: SidebarSubItem[];
}

interface DashboardSidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  userType: UserType;
  user?: UserData;
}

function DashboardSidebar({
  isMobile = false,
  isOpen = true,
  onClose,
  userType,
  user,
}: DashboardSidebarProps) {
  // Base sidebar items that are common to both academy and student
  const baseSidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      title: "لوحة التحكم",
      href: "/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
  ];

  // Render the appropriate sidebar based on user type
  if (userType === UserType.ACADEMY) {
    return (
      <AcademySidebar
        isMobile={isMobile}
        isOpen={isOpen}
        onClose={onClose}
        baseSidebarItems={baseSidebarItems}
        user={user!}
      />
    );
  }

  return (
    <StudentSidebar
      isMobile={isMobile}
      isOpen={isOpen}
      onClose={onClose}
      baseSidebarItems={baseSidebarItems}
    />
  );
}

export default DashboardSidebar;
