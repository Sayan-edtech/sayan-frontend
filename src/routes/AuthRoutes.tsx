import Signup from "@/pages/auth/signup";
import { Route } from "react-router-dom";

export const authRoutes = (
  <Route path="auth">
    <Route path="signup" element={<Signup />} />
  </Route>
);
