import Dashboard from "@/pages/dashboard";
import MyCourses from "@/pages/dashboard/my-courses";
import DigitalProducts from "@/pages/dashboard/digital-products";
import Certificates from "@/pages/dashboard/certificates";
import Favorites from "@/pages/dashboard/favorites";
import Profile from "@/pages/dashboard/profile";
import Purchases from "@/pages/dashboard/purchases";
import Settings from "@/pages/dashboard/settings";
import ShoppingCart from "@/pages/dashboard/shopping-cart";
import Wallet from "@/pages/dashboard/wallet";
import { Route } from "react-router-dom";
import AcademyCourses from "../pages/dashboard/courses";
import AddNewCourse from "@/pages/dashboard/courses/new";
import Trainers from "../pages/dashboard/trainers";
import AddNewTrainer from "@/pages/dashboard/trainers/new";
import { templateRoutes } from "./TemplateRoutes";
import { ProtectedRoute } from "@/components/shared/GuardRoute";
import ManageCourse from "@/pages/dashboard/courses/mange";
import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import CouponsPage from "@/pages/dashboard/coupons";
import CouponStatsPage from "@/pages/dashboard/coupons/stats/[id]";
import MyCourseDetails from "@/pages/dashboard/my-courses/[courseId]";
import AcademyCoupons from "@/pages/coupons";
import CouponStats from "@/pages/coupons/stats/[id]";
import CertificatesEditing from "@/pages/certificates-editing";
import EditCertificate from "@/pages/certificates-editing/edit/[id]";
import CertificateStats from "@/pages/certificates-editing/stats/[id]";

export const dashboardRoutes = (
  <Route
    path="dashboard"
    element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Dashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
    {/* Students Bag Routes */}
    <Route path="my-courses">
      <Route index element={<MyCourses />} />
      <Route path=":courseId" element={<MyCourseDetails />} />
    </Route>
    <Route path="trainers" element={<Trainers />} />
    <Route path="trainers/new" element={<AddNewTrainer />} />
    <Route path="courses" element={<AcademyCourses />} />
    <Route path="courses/new" element={<AddNewCourse />} />
    <Route path="courses/manage/:courseId" element={<ManageCourse />} />

    <Route path="digital-products" element={<DigitalProducts />} />
    <Route path="certificates" element={<Certificates />} />
    <Route path="favorites" element={<Favorites />} />
    {/* Other Routes */}
    <Route path="purchases" element={<Purchases />} />
    <Route path="shopping-cart" element={<ShoppingCart />} />
    <Route path="wallet" element={<Wallet />} />
    {/* Coupons Routes */}
    <Route path="coupons" element={<CouponsPage />} />
    <Route path="coupons/stats/:id" element={<CouponStatsPage />} />
    {/* Shopping Cart Routes */}
    <Route
      path="affiliate-marketing"
      element={<div>التسويق بالعمولة - قريباً</div>}
    />
    <Route path="coupons">
      <Route index element={<AcademyCoupons />} />
      <Route path="stats/:id" element={<CouponStats />} />
    </Route>

    <Route path="certificates-editing" element={<CertificatesEditing />} />
    <Route path="certificates-editing/edit/:id" element={<EditCertificate />} />
    <Route
      path="certificates-editing/stats/:id"
      element={<CertificateStats />}
    />

    {templateRoutes}
  </Route>
);
