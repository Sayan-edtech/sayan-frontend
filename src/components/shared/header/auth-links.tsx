import { Link } from "react-router-dom";
import { buttonVariants } from "../../ui/button";

function AuthLinks() {
  return (
    <div className="flex items-center gap-6">
      <Link
        to="/auth/login"
        className={`${buttonVariants({
          variant: "link",
        })} !text-lg !font-medium`}
      >
        دخول
      </Link>
      <Link
        to="/auth/register"
        className={`${buttonVariants({ size: "lg" })} !font-bold`}
      >
        انضم الان
      </Link>
    </div>
  );
}

export default AuthLinks;
