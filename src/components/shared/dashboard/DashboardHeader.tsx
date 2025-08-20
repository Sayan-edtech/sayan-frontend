import { Button } from "@/components/ui/button";
import { Eye, Menu } from "lucide-react";
import Searchbar from "./Searchbar";
import { UserMenu } from "./UserMenu";
import { Link } from "react-router-dom";
import { useCurrentUserProfile } from "@/features/dashboard/profile/hooks";
import { getAcademyDetails } from "@/lib/academy";
import AddItemModal from "./AddItemModal";
import { NotificationsDropdown } from "./NotificationsDropdown";

interface DashboardHeaderProps {
  onMobileMenuClick: () => void;
}

export function DashboardHeader({ onMobileMenuClick }: DashboardHeaderProps) {
  const { data: user } = useCurrentUserProfile();

  return (
    <header className="bg-white border-b border-border">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          <div className="flex items-center gap-4">
            <UserMenu align="start" />
            {user?.academy_memberships && (
              <>
                <Link
                  to={`/academy/${getAcademyDetails(user!)?.academy_slug}`}
                  target="_blank"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative"
                    title="معاينة الأكاديمية"
                  >
                    <Eye className="w-5 h-5" />
                  </Button>
                </Link>
                <AddItemModal />
              </>
            )}

            <NotificationsDropdown />
          </div>
          <Searchbar />
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMobileMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
