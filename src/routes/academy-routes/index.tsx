import Home from "@/templates/template-one/pages";
import CourseDetails from "@/templates/template-one/pages/courses/[slug]";
import { Outlet, Route } from "react-router-dom";
import { academyAuthRoutes } from "./AuthRoutes";

const hostname = window.location.hostname; // e.g. academy.example.com or test.localhost

// Check if we have a subdomain (not plain localhost or localhost with port)
const hasSubdomain = hostname.includes(".") && hostname !== "localhost";

export const academyRoutes = hasSubdomain ? (
  <Route path="/" element={<AcademyLayout />}>
    <Route index element={<h1>Hello</h1>} />
    <Route path="courses/:courseSlug" element={<CourseDetails />} />
    {academyAuthRoutes}
  </Route>
) : (
  <Route path="academy/:academySlug">
    <Route index element={<Home />} />
    <Route path="courses/:courseSlug" element={<CourseDetails />} />
    {academyAuthRoutes}
  </Route>
);

function AcademyLayout() {
  return (
    <div>
      {/* Add your layout components here, like Header, Footer, etc. */}
      <Outlet />
    </div>
  );
}
