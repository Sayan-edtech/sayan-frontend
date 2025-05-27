import Navbar from "./navbar";
import AuthLinks from "./auth-links";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="py-8">
      <div className="container">
        <div
          style={{
            background:
              "linear-gradient(91.81deg, rgba(255, 255, 255, 0.87) 21.24%, rgba(255, 255, 255, 0.87) 109.59%)",
          }}
          className="p-4 rounded-[20px] flex items-center justify-between"
        >
          <div className="flex items-center gap-10">
            <Link to="/">
              <img
                src="/assets/images/logo.svg"
                alt="Logo"
                className="w-[100px] h-[45px]"
              />
            </Link>
            <Navbar />
          </div>
          <AuthLinks />
        </div>
      </div>
    </header>
  );
}

export default Header;
