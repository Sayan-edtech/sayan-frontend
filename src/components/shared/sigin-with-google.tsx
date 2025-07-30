import { useGoogleLogin } from "@react-oauth/google";
import { authService } from "@/features/auth/services/authService";
import { authCookies } from "@/lib/cookies";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "./Loader";
import { Routes, type UserType } from "@/constants/enums";
import { useNavigate } from "react-router-dom";

function SiginWithGoogle({
  children,
  userType,
  setError,
}: {
  children: React.ReactNode;
  userType?: UserType | null;
  setError: (name: string, error: { type: string; message: string }) => void;
}) {
  const navigate = useNavigate();
  const isSignupPage = window.location.pathname.includes("signup");
  const [loading, setLoading] = useState(false);
  const login = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        setLoading(false);
        let data;
        if (isSignupPage && userType) {
          data = await authService.signup({
            google_token: access_token,
            user_type: userType as UserType,
          });
        }
        data = await authService.login({
          google_token: access_token,
        });
        // Store in cookies
        authCookies.setAuthData(
          data.access_token,
          data.refresh_token,
          data.user_data
        );

        toast(data.message || "تم تسجيل الدخول بنجاح");
        navigate(`/${Routes.DASHBOARD}`, {
          replace: true,
        });
      } catch (error) {
        setLoading(false);
        toast.error(
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "فشل في تسجيل الدخول باستخدام جوجل"
        );
        console.error("Google login failed:", error);
        throw error;
      }
    },
    onError: () => {
      toast.error("فشل في تسجيل الدخول باستخدام جوجل");
      console.log("Login Failed");
    },
  });

  const handleLoginClick = () => {
    setLoading(true);
    if (!userType && isSignupPage) {
      toast.error("يرجى تحديد نوع المستخدم قبل تسجيل الدخول");
      setLoading(false);
      setError("user_type", {
        type: "manual",
        message: "يرجى تحديد نوع المستخدم",
      });
      return;
    }
    login();
  };

  return (
    <button
      type="button"
      onClick={handleLoginClick}
      disabled={loading}
      className="bg-[#F4F7FE] flex items-center justify-center gap-2 w-full h-12 rounded-md hover:bg-[#EAEFF4] transition-colors duration-200"
    >
      {loading ? (
        <Loader size="sm" />
      ) : (
        <>
          <span className="text-sm font-medium text-card-foreground">
            {children}
          </span>
          <img
            src="/assets/icons/google.svg"
            alt="Google Icon"
            loading="lazy"
            className="w-4 h-4"
          />
        </>
      )}
    </button>
  );
}

export default SiginWithGoogle;
