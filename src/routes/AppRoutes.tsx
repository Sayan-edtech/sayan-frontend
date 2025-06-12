import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "@/pages";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";
import CourseDetails from "@/pages/courses/[slug]";
import LaunchAcademy from "@/pages/launch-academy";
import EmployeeTraining from "@/pages/employee-training";
import Ai from "@/pages/ai";
import AuthLayout from "@/features/auth/components/AuthLayout";
import Signin from "@/pages/auth/signin";
import Signup from "@/pages/auth/signup";
import { DashboardLayout } from "./DashboardRoutes";
import { Dashboard } from "@/features/auth/components/Dashboard";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="courses/:slug" element={<CourseDetails />} />
      <Route path="launch-academy" element={<LaunchAcademy />} />
      <Route path="ai" element={<Ai />} />
      <Route path="employee-training" element={<EmployeeTraining />} />
      <Route path="auth" element={<AuthLayout />}>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<div>صفحة الملف الشخصي</div>} />
        <Route path="settings" element={<div>صفحة الإعدادات</div>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);
