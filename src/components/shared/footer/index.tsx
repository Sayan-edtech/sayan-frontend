import SocialMedia from "./social-media";
import Navbar from "./navbar";
import { Link } from "react-router-dom";

function Footer() {
  const linkStyles =
    "text-[#EAEFF4] hover:text-white hover:underline duration-200 transition-colors";
  return (
    <header className="bg-primary pt-10 lg:pt-20 pb-8">
      <div className="container flex flex-col gap-20">
        <div className="flex justify-between flex-wrap gap-10">
          <div className="flex flex-col gap-6">
            <Link to="/">
              <img
                src="/assets/images/footer-logo.svg"
                alt="Logo"
                className="w-[100px] h-[45px]"
              />
            </Link>
            <p className="text-lg text-[#EAEFF4] lg:w-[350px]">
              منصة سيان التعليمية توفر تجربة تعلم فريدة تجمع بين أحدث التقنيات
              وأفضل الممارسات التعليمية لتقديم محتوى عالي الجودة.
            </p>
            <SocialMedia />
          </div>
          <Navbar />
        </div>
        <p className="border-t border-[#EDEFF2] pt-6 text-[#EAEFF4] lg:text-lg text-center">
          جميع الحقوق محفوظة لمنصة سيان © 2025 |{" "}
          <Link to="/terms" target="_blank" className={linkStyles}>
            الشروط والأحكام
          </Link>{" "}
          |{" "}
          <Link to="/privacy" target="_blank" className={linkStyles}>
            سياسة الخصوصية
          </Link>
        </p>
      </div>
    </header>
  );
}

export default Footer;
