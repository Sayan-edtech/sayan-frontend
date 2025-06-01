import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "@/pages";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";
import CourseDetails from "@/pages/courses/[slug]";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="courses/:slug" element={<CourseDetails />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);
