import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

function Layout() {
  return (
    <div
      style={{
        background:
          "linear-gradient(156.58deg, rgba(15, 232, 232, 0.2) 17.14%, rgba(217, 217, 217, 0) 75.12%)",
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
