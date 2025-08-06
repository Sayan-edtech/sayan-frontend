import Dashboard from "@/pages/dashboard";
import MyCourses from "@/pages/dashboard/my-courses";
import DigitalProducts from "@/pages/dashboard/digital-products";
import Favorites from "@/pages/dashboard/favorites";
import Profile from "@/pages/dashboard/profile";
import Purchases from "@/pages/dashboard/purchases";
import Settings from "@/pages/dashboard/settings";
import ShoppingCart from "@/pages/dashboard/shopping-cart";
import Wallet from "@/pages/dashboard/wallet";
import { Route } from "react-router-dom";
import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import AcademyCourses from "../pages/dashboard/courses/index";
import AddNewCourse from "@/pages/dashboard/courses/new";

import Trainers from "../pages/dashboard/trainers";
import AddNewTrainer from "@/pages/dashboard/trainers/new";
import { templateRoutes } from "./TemplateRoutes";
// إضافة استيرادات المدونات
import Blogs from "@/pages/dashboard/blogs";
import AddNewBlog from "@/pages/dashboard/blogs/new";
import EditBlog from "@/pages/dashboard/blogs/edit/[id]";
// إضافة استيرادات المنتجات الرقمية
import AddDigitalProduct from "@/pages/dashboard/digital-products/add";
// إضافة استيرادات الجلسات الحضورية
import AcademySessions from "@/pages/dashboard/sessions";
import AddNewSession from "@/pages/dashboard/sessions/new";
// إضافة استيرادات المواعيد
import AcademyAppointments from "@/pages/dashboard/appointments";
import AddNewAppointment from "@/pages/dashboard/appointments/new";
// إضافة استيرادات المواد التعليمية الذكية
import AILearningMaterials from "@/pages/dashboard/ai-learning-materials";
import AddAILearningMaterial from "@/pages/dashboard/ai-learning-materials/add";
import StudyMaterial from "@/pages/dashboard/ai-learning-materials/[id]/study";
import InnovativeStudyMaterial from "@/pages/dashboard/ai-learning-materials/innovative-study";
import ComprehensiveWebDevelopment from "@/pages/dashboard/ai-learning-materials/comprehensive-web-development";
import CreateChallenge from "@/pages/dashboard/ai-learning-materials/create-challenge";
import ChallengesList from "@/pages/dashboard/ai-learning-materials/challenges";
import ChallengePage from "@/pages/dashboard/ai-learning-materials/challenge/[id]";
// إضافة استيرادات البث المباشر
import LiveStreamPage from "@/pages/dashboard/ai-learning-materials/live-stream/LiveStreamPage";
import NewLiveStreamPage from "@/pages/dashboard/ai-learning-materials/live-stream/new";
// إضافة استيرادات الشهادات
import CertificatesEditing from "@/pages/dashboard/certificates-editing";
import EditCertificate from "@/pages/dashboard/certificates-editing/edit/[id]";
import CertificateStatsPage from "@/pages/dashboard/certificates-editing/stats/[id]";

export const dashboardRoutes = (
  <Route path="dashboard" element={<DashboardLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
    {/* Students Bag Routes */}
    <Route path="my-courses" element={<MyCourses />} />
    <Route path="trainers" element={<Trainers />} />
    <Route path="trainers/new" element={<AddNewTrainer />} />
    <Route path="courses" element={<AcademyCourses />} />
    <Route path="courses/new" element={<AddNewCourse />} />
    {/* إضافة مسارات المدونات */}
    <Route path="blogs" element={<Blogs />} />
    <Route path="blogs/new" element={<AddNewBlog />} />
    <Route path="blogs/edit/:id" element={<EditBlog />} />
    {/* إضافة مسارات المنتجات الرقمية */}
    <Route path="digital-products" element={<DigitalProducts />} />
    <Route path="digital-products/add" element={<AddDigitalProduct />} />
    {/* إضافة مسارات الجلسات الحضورية */}
    <Route path="sessions" element={<AcademySessions />} />
    <Route path="sessions/new" element={<AddNewSession />} />
    {/* إضافة مسارات المواعيد */}
    <Route path="appointments" element={<AcademyAppointments />} />
    <Route path="appointments/new" element={<AddNewAppointment />} />
              {/* إضافة مسارات المواد التعليمية الذكية */}
          <Route path="ai-learning-materials" element={<AILearningMaterials />} />
          <Route path="ai-learning-materials/add" element={<AddAILearningMaterial />} />
          <Route path="ai-learning-materials/:id/study" element={<StudyMaterial />} />
          <Route path="ai-learning-materials/innovative-study" element={<InnovativeStudyMaterial />} />
          <Route path="ai-learning-materials/comprehensive-web-development" element={<ComprehensiveWebDevelopment />} />
          <Route path="ai-learning-materials/create-challenge" element={<CreateChallenge />} />
          <Route path="ai-learning-materials/challenges" element={<ChallengesList />} />
          <Route path="ai-learning-materials/challenge/:id" element={<ChallengePage />} />
          {/* إضافة مسارات البث المباشر */}
          <Route path="ai-learning-materials/live-stream/:id" element={<LiveStreamPage />} />
          <Route path="ai-learning-materials/live-stream/new" element={<NewLiveStreamPage />} />
    <Route path="certificates" element={<div>الشهادات - قريباً</div>} />
                    <Route path="certificates-editing" element={<CertificatesEditing />} />
                <Route path="certificates-editing/edit/:id" element={<EditCertificate />} />
                <Route path="certificates-editing/stats/:id" element={<CertificateStatsPage />} />
    <Route path="favorites" element={<Favorites />} />
    {/* Other Routes */}
    <Route path="purchases" element={<Purchases />} />
    <Route path="shopping-cart" element={<ShoppingCart />} />
    <Route path="wallet" element={<Wallet />} />
    {/* Shopping Cart Routes */}
    <Route
      path="affiliate-marketing"
      element={<div>التسويق بالعمولة - قريباً</div>}
    />
    {templateRoutes}
  </Route>
);
