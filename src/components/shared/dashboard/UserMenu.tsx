import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut, HelpCircle, ShoppingCart, Eye } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Routes } from "@/constants/enums";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { AddItemModal } from "./AddItemModal";

export function UserMenu() {
  const location = useLocation();
  
  const handleSignOut = () => {
    // TODO: Implement sign out logic
    console.log("Signing out...");
  };

  // تحديد نوع المستخدم بناءً على الصفحة الحالية
  const isStudentPage = location.pathname.includes('/courses/') || location.pathname.includes('/student');
  const isAcademyPage = location.pathname.includes('/dashboard') && !location.pathname.includes('/template');

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/87553297?v=4"
                alt="User"
              />
              <AvatarFallback className="bg-green-100 text-green-700 text-sm">
                ك
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 border-border"
          align="start"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">كريم شيمس</p>
              <p className="text-xs leading-none text-muted-foreground">
                kareem@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to={Routes.DASHBOARD_PROFILE} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>الملف الشخصي</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={Routes.DASHBOARD_SETTINGS} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>الإعدادات</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>المساعدة والدعم</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-600 focus:text-red-600"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>تسجيل الخروج</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* زر السلة - يظهر فقط في صفحة الطالب */}
      {isStudentPage && (
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingCart className="w-5 h-5" />
        </Button>
      )}
      
      {/* زر العين - ينقل لصفحة الأكاديمية ويظهر فقط في صفحة الأكاديمية */}
      {isAcademyPage && (
        <Link to="/template/preview">
          <Button variant="ghost" size="sm" className="relative" title="معاينة الأكاديمية">
            <Eye className="w-5 h-5" />
          </Button>
        </Link>
      )}
      
      {/* زر الإضافة - يظهر في صفحات الأكاديمية */}
      {isAcademyPage && <AddItemModal />}
      
      <NotificationsDropdown />
    </div>
  );
}
