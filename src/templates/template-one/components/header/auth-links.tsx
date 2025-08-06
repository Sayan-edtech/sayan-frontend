import { Link, useParams } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import LoginDialog from "@/components/ui/login-dialog";

interface AuthLinksProps {
  className?: string;
}

export default function AuthLinks({ className = "" }: AuthLinksProps) {
  const { academySlug } = useParams();
  return (
    <div className={`hidden lg:flex items-center gap-6 ${className}`}>
      <LoginDialog
        triggerText="دخول"
        triggerVariant="secondary"
        className="!text-lg !font-medium border border-border hover:border-primary hover:text-primary transition-colors"
      />
      <Link
        to={`/academy/${academySlug}/auth/signup`}
        className={`${buttonVariants({ size: "lg" })} !font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
      >
        حساب جديد
      </Link>
    </div>
  );
}
