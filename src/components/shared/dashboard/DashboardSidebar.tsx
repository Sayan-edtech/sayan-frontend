import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Briefcase,
  BookOpen,
  Package,
  GraduationCap,
  Heart,
  Menu,
  ShoppingCart,
  ChevronDown,
  X,
  FileText,
  Calendar,
  Clock,
  Layers,
  Edit3,
  Settings,
  Palette,
  List,
  Info,
  Star,
  HelpCircle,
  UserCheck,
  Users,
  ClipboardCheck,
  Award,
  MessageSquare,
  Database,
  Wallet,
  ExternalLink,
  Brain,
  PanelLeftClose,
  PanelRightClose
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { UserType } from "@/constants/enums";

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
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

function DashboardSidebar({
  isMobile = false,
  isOpen = true,
  onClose,
  userType,
  isCollapsed,
  setIsCollapsed,
}: DashboardSidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const academySidebarItems: SidebarItem[] = [
    {
      id: "content-management",
      title: "ادارة المحتوى",
      icon: <FileText className="w-5 h-5" />,
      isExpandable: true,
      subItems: [
        {
          id: "courses",
          title: "الدورات التدريبية",
          href: "/dashboard/courses",
          icon: <GraduationCap className="w-4 h-4" />,
        },

        {
          id: "sessions",
          title: "الجلسات الحضورية",
          href: "/dashboard/sessions",
          icon: <Calendar className="w-4 h-4" />,
        },
        {
          id: "appointments",
          title: "إدارة المواعيد",
          href: "/dashboard/appointments",
          icon: <Clock className="w-4 h-4" />,
        },
        {
          id: "certificates-editing",
          title: "تحرير الشهادات",
          href: "/dashboard/certificates-editing",
          icon: <Award className="w-4 h-4" />,
        },
        {
          id: "content-digital-products",
          title: "المنتجات الرقمية",
          href: "/dashboard/digital-products",
          icon: <Package className="w-4 h-4" />,
        },
        {
          id: "product-packages",
          title: "حزم المنتجات",
          href: "/dashboard/product-packages",
          icon: <Layers className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
        {
          id: "blogs",
          title: "المدونات",
          href: "/dashboard/blogs",
          icon: <Edit3 className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "student-information",
      title: "معلومات الطلاب",
      icon: <Database className="w-5 h-5" />,
      isExpandable: true,
      subItems: [
        {
          id: "student-data",
          title: "بيانات الطلاب",
          href: "/dashboard/student-data",
          icon: <Users className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
        {
          id: "exams",
          title: "الاختبارات",
          href: "/dashboard/exams",
          icon: <ClipboardCheck className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
        {
          id: "certificates-management",
          title: "الشهادات",
          href: "/dashboard/certificates-management",
          icon: <Award className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
        {
          id: "comments",
          title: "التعليقات",
          href: "/dashboard/comments",
          icon: <MessageSquare className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
      ],
    },
    {
      id: "academy-interface-editing",
      title: "تعديل واجهات الأكاديمية",
      icon: <Palette className="w-5 h-5" />,
      isExpandable: true,
      subItems: [
        {
          id: "template",
          title: "الاعدادات الرئيسية",
          href: "/dashboard/template",
          icon: <Settings className="w-4 h-4" />,
        },
        {
          id: "main-menu",
          title: "القسم الرئيسي",
          href: "/dashboard/template/main-menu",
          icon: <List className="w-4 h-4" />,
        },
        {
          id: "about",
          title: "قسم من نحن",
          href: "/dashboard/template/about",
          icon: <Info className="w-4 h-4" />,
        },
        {
          id: "student-reviews",
          title: "تقييمات الطلاب",
          href: "/dashboard/template/student-reviews",
          icon: <Star className="w-4 h-4" />,
        },
        {
          id: "faqs",
          title: "الأسئلة الشائعة",
          href: "/dashboard/template/faqs",
          icon: <HelpCircle className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "ai-learning-materials",
      title: "المواد التعليمية الذكية",
      href: "/dashboard/ai-learning-materials",
      icon: <Brain className="w-5 h-5" />,
      badge: "AI",
    },
    {
      id: "wallet",
      title: "المحفظة",
      href: "/dashboard/wallet",
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      id: "trainers",
      title: "ادارة المدربين",
      href: "/dashboard/trainers",
      icon: <UserCheck className="w-5 h-5" />,
    },
  ];
  const studentSidebarItems: SidebarItem[] = [
    {
      id: "students-bag",
      title: "حقيبة الطلاب",
      icon: <Briefcase className="w-5 h-5" />,
      isExpandable: true,
      subItems: [
        {
          id: "courses",
          title: "المواد التعليمية",
          href: "/dashboard/courses",
          icon: <BookOpen className="w-4 h-4" />,
        },

        {
          id: "digital-products",
          title: "المنتجات الرقمية",
          href: "/dashboard/digital-products",
          icon: <Package className="w-4 h-4" />,
        },
        {
          id: "certificates",
          title: "الشهادات",
          href: "/dashboard/certificates",
          icon: <GraduationCap className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
        {
          id: "favorites",
          title: "قائمة المفضلة",
          href: "/dashboard/favorites",
          icon: <Heart className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "ai-learning-materials",
      title: "المواد التعليمية الذكية", 
      href: "/dashboard/ai-learning-materials",
      icon: <Brain className="w-5 h-5" />,
      badge: "AI",
    },
    {
      id: "purchases",
      title: "المشتريات",
      href: "/dashboard/purchases",
      icon: <Menu className="w-5 h-5" />,
    },
    {
      id: "shopping-cart",
      title: "عربة التسوق",
      href: "/dashboard/shopping-cart",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
  ];

  const baseSidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      title: "لوحة التحكم",
      href: "/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: "profile",
      title: "الملف الشخصي",
      href: "/dashboard/profile",
      icon: <User className="w-5 h-5" />,
    },
  ];

  const sidebarItems: SidebarItem[] = [
    ...baseSidebarItems,
    ...(userType === UserType.ACADEMY
      ? academySidebarItems
      : studentSidebarItems),
  ];

  // Debug log to see the userType value
  console.log("DashboardSidebar userType:", userType);
  console.log("UserType.ACADEMY:", UserType.ACADEMY);
  console.log("Is Academy?", userType === UserType.ACADEMY);

  const isActivePath = (href: string) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    } else if (href === "/dashboard/template") {
      return location.pathname === "/dashboard/template";
    }
    return location.pathname.startsWith(href);
  };

  const renderSidebarItem = (item: SidebarItem) => {
    if (item.isExpandable && item.subItems) {
      const isExpanded = expandedItems.includes(item.id);
      const hasActiveSubItem = item.subItems.some(
        (subItem) => subItem.href && isActivePath(subItem.href)
      );

      return (
        <li key={item.id} className="mb-1">
          {/* Parent Item */}
          <button
            onClick={() => toggleExpanded(item.id)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200",
              hasActiveSubItem || isExpanded
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                hasActiveSubItem || isExpanded
                  ? "text-white"
                  : "text-blue-600"
              )}>
                {item.icon}
              </div>
              <span className="font-medium text-sm">{item.title}</span>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isExpanded ? "rotate-180" : "rotate-0"
              )}
            />
          </button>

          {/* Sub Items */}
          {isExpanded && (
            <div className="mt-1 ml-6 space-y-1 border-l-2 border-blue-100 pl-3">
              {item.subItems.map((subItem) => (
                <div key={subItem.id}>
                  {subItem.comingSoon ? (
                    <div className="flex items-center justify-between px-3 py-2 text-gray-400 cursor-not-allowed">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center">
                          {subItem.icon}
                        </div>
                        <span className="text-sm">{subItem.title}</span>
                      </div>
                      {subItem.badge && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-600 text-xs">
                          {subItem.badge}
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <Link to={subItem.href!} onClick={isMobile ? onClose : undefined}>
                      <div className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-200",
                        isActivePath(subItem.href!)
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      )}>
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-6 h-6 rounded-md flex items-center justify-center",
                            isActivePath(subItem.href!)
                              ? "text-white"
                              : "text-blue-600"
                          )}>
                            {subItem.icon}
                          </div>
                          <span className="text-sm">{subItem.title}</span>
                        </div>
                        {subItem.badge && !isActivePath(subItem.href!) && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-600 text-xs">
                            {subItem.badge}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </li>
      );
    }

    // Regular item (non-expandable)
    if (item.comingSoon) {
      return (
        <li key={item.id} className="mb-1">
          <div className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-400 cursor-not-allowed">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="font-medium text-sm">{item.title}</span>
            </div>
            {item.badge && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-600 text-xs">
                {item.badge}
              </Badge>
            )}
          </div>
        </li>
      );
    }

    return (
      <li key={item.id} className="mb-1">
        <Link to={item.href!} onClick={isMobile ? onClose : undefined}>
          <div className={cn(
            "flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200",
            isActivePath(item.href!)
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          )}>
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                isActivePath(item.href!)
                  ? "text-white"
                  : "text-blue-600"
              )}>
                {item.icon}
              </div>
              <span className="font-medium text-sm">{item.title}</span>
            </div>
            {item.badge && !isActivePath(item.href!) && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-600 text-xs">
                {item.badge}
              </Badge>
            )}
          </div>
        </Link>
      </li>
    );
  };

  const sidebarContent = (
    <div 
      className="h-full flex flex-col backdrop-blur-sm"
      style={{
        background:
          "linear-gradient(91.81deg, rgba(255, 255, 255, 0.87) 21.24%, rgba(255, 255, 255, 0.87) 109.59%)",
      }}
    >
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-white/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Menu className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">القائمة</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Profile Section & Collapse Button */}
      <div className={cn("p-4 border-b border-white/30", isCollapsed && "p-2")}>
        <div className="flex items-center justify-between">
          {!isCollapsed && (
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                  <img
                    src="https://avatars.githubusercontent.com/u/87553297?v=4"
                    alt="أكاديمية سيان"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">أكاديمية سيان</h3>
                  <p className="text-sm text-gray-600">لوحة التحكم</p>
                </div>
              </div>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            className="h-10 w-10"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <PanelRightClose className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </Button>
        </div>
        {!isCollapsed && userType === UserType.ACADEMY && (
           <div className="mt-3">
             <Link to="/academy/simple-arab-code" target="_blank" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  زيارة الأكاديمية
                </Button>
              </Link>
           </div>
        )}
      </div>

      {/* Back to Main Site Button */}
      <div className={cn("p-4 border-b border-white/30", isCollapsed && "p-2")}>
        <Link to="/" className="block">
          <Button 
            variant="outline"
            className="w-full justify-center gap-2 border-gray-300 hover:bg-white/50"
          >
            <Home className="w-4 h-4" />
            {!isCollapsed && "العودة للرئيسية"}
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav>
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              if (item.isExpandable && item.subItems) {
                const isExpanded = expandedItems.includes(item.id);
                const hasActiveSubItem = item.subItems.some(
                  (subItem) => subItem.href && isActivePath(subItem.href)
                );

                return (
                  <li key={item.id} className="mb-1">
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200",
                        hasActiveSubItem || isExpanded
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600",
                        isCollapsed && "px-2"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                          {item.icon}
                        </div>
                        {!isCollapsed && <span className="font-medium text-sm">{item.title}</span>}
                      </div>
                      {!isCollapsed && (
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            isExpanded ? "rotate-180" : "rotate-0"
                          )}
                        />
                      )}
                    </button>

                    {!isCollapsed && isExpanded && (
                      <div className="mt-1 ml-6 space-y-1 border-l-2 border-blue-100 pl-3">
                        {item.subItems.map((subItem) => (
                           <div key={subItem.id}>
                           {subItem.comingSoon ? (
                             <div className="flex items-center justify-between px-3 py-2 text-gray-400 cursor-not-allowed">
                               <div className="flex items-center gap-3">
                                 <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center">
                                   {subItem.icon}
                                 </div>
                                 <span className="text-sm">{subItem.title}</span>
                               </div>
                               {subItem.badge && (
                                 <Badge variant="secondary" className="bg-orange-100 text-orange-600 text-xs">
                                   {subItem.badge}
                                 </Badge>
                               )}
                             </div>
                           ) : (
                             <Link to={subItem.href!} onClick={isMobile ? onClose : undefined}>
                               <div className={cn(
                                 "flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-200",
                                 isActivePath(subItem.href!)
                                   ? "bg-blue-600 text-white"
                                   : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                               )}>
                                 <div className="flex items-center gap-3">
                                   <div className="w-6 h-6 rounded-md flex items-center justify-center">
                                     {subItem.icon}
                                   </div>
                                   <span className="text-sm">{subItem.title}</span>
                                 </div>
                                 {subItem.badge && !isActivePath(subItem.href!) && (
                                   <Badge variant="secondary" className="bg-blue-100 text-blue-600 text-xs">
                                     {subItem.badge}
                                   </Badge>
                                 )}
                               </div>
                             </Link>
                           )}
                         </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }
              
              return (
                 <li key={item.id} className="mb-1">
                 <Link to={item.href!} onClick={isMobile ? onClose : undefined}>
                   <div className={cn(
                     "flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200",
                     isActivePath(item.href!)
                       ? "bg-blue-600 text-white"
                       : "text-gray-700 hover:bg-blue-50 hover:text-blue-600",
                     isCollapsed && "px-2"
                   )}>
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                         {item.icon}
                       </div>
                       {!isCollapsed && <span className="font-medium text-sm">{item.title}</span>}
                     </div>
                     {!isCollapsed && item.badge && !isActivePath(item.href!) && (
                       <Badge variant="secondary" className="bg-blue-100 text-blue-600 text-xs">
                         {item.badge}
                       </Badge>
                     )}
                   </div>
                 </Link>
               </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={cn(
            "fixed top-0 right-0 h-full w-80 shadow-xl transform transition-transform duration-300 z-50 lg:hidden",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{
            background:
              "linear-gradient(91.81deg, rgba(255, 255, 255, 0.87) 21.24%, rgba(255, 255, 255, 0.87) 109.59%)",
          }}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <aside 
      className={cn(
        "border-l border-gray-200 h-full overflow-hidden hidden lg:block transition-all duration-300",
        isCollapsed ? "w-20" : "w-80"
      )}
      style={{
        background:
          "linear-gradient(91.81deg, rgba(255, 255, 255, 0.87) 21.24%, rgba(255, 255, 255, 0.87) 109.59%)",
      }}
    >
      {sidebarContent}
    </aside>
  );
}

export default DashboardSidebar;
