import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import Dashboard from "@/pages/dashboard";
import Courses from "@/pages/dashboard/courses";
import DigitalProducts from "@/pages/dashboard/digital-products";
import Favorites from "@/pages/dashboard/favorites";
import Profile from "@/pages/dashboard/profile";
import Purchases from "@/pages/dashboard/purchases";
import Settings from "@/pages/dashboard/settings";
import ShoppingCart from "@/pages/dashboard/shopping-cart";
import { Route } from "react-router-dom";

export const dashboardRoutes = (
  <Route path="dashboard" element={<DashboardLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
    {/* Students Bag Routes */}
    <Route path="courses" element={<Courses />} />
    <Route path="digital-products" element={<DigitalProducts />} />
    <Route path="certificates" element={<div>الشهادات - قريباً</div>} />
    <Route path="favorites" element={<Favorites />} />
    {/* Other Routes */}
    <Route path="purchases" element={<Purchases />} />
    <Route path="shopping-cart" element={<ShoppingCart />} />
    {/* Shopping Cart Routes */}
    <Route
      path="affiliate-marketing"
      element={<div>التسويق بالعمولة - قريباً</div>}
    />
  </Route>
);
