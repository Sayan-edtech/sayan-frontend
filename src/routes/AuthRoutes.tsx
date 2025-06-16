import AuthLayout from "@/features/auth/components/AuthLayout";
import Signin from "@/pages/auth/signin";
import Signup from "@/pages/auth/signup";
import { Route } from "react-router-dom";

export const authRoutes = (
  <Route path="auth" element={<AuthLayout />}>
    <Route path="signin" element={<Signin />} />
    <Route path="signup" element={<Signup />} />
  </Route>
);
