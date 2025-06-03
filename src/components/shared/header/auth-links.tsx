import { Link } from "react-router-dom";
import { buttonVariants } from "../../ui/button";

interface AuthLinksProps {
  className?: string;
}

export default function AuthLinks({ className = "" }: AuthLinksProps) {
  return (
    <div className={`hidden lg:flex items-center gap-6 ${className}`}>
      <Link
        to="/auth/signin"
        className={`${buttonVariants({
          variant: "link",
        })} !text-lg !font-medium`}
      >
        دخول
      </Link>
      <Link
        to="/auth/signup"
        className={`${buttonVariants({ size: "lg" })} !font-bold`}
      >
        انضم الان
      </Link>
    </div>
  );
}
