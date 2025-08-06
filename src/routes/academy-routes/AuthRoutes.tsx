import Signup from "@/templates/template-one/pages/auth/signup";
import { Route } from "react-router-dom";

export const academyAuthRoutes = (
  <Route path="auth">
    <Route path="signup" element={<Signup />} />
  </Route>
);
