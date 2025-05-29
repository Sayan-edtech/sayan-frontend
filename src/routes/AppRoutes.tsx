import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "@/pages";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);
