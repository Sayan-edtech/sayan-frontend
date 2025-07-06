import { Pages, Routes } from "@/constants/enums";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState, useEffect } from "react";
import FormFields from "@/components/shared/formFields/form-fields";
import type { IFormField } from "@/types/app";
import { useForm, type Control, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/shared/Loader";
import { toast } from "sonner";
import { UserType } from "@/constants/enums";
import { useAuth } from "@/features/auth/hooks/useAuthStore";
import useFormFields from "../hooks/useFormFields";
import useFormValidations from "../hooks/useFormValidations";

const AuthForm: React.FC<{ slug: string }> = ({ slug }) => {
  const navigate = useNavigate();
  const { getFormFields } = useFormFields({ slug });
  const { getValidationSchema } = useFormValidations({ slug });
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const searchParams = useSearchParams();
  const { email: verifiedEmail } = Object.fromEntries(searchParams[0]);
  const { token } = Object.fromEntries(searchParams[0]);

  const {
    login,
    signup,
    isLoading,
    forgotPassword,
    verifyAccount,
    resetPassword,
  } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DEFAULT_VALUES: any = {};
  for (const field of getFormFields()) {
    DEFAULT_VALUES[field.name] = "";
  }

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(getValidationSchema()),
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        if (slug === Pages.SIGNIN) {
          await login({
            email: data.email as string,
            password: data.password as string,
          });

          toast.success("تم تسجيل الدخول بنجاح");
          navigate("/dashboard", {
            replace: true,
          });
        } else if (slug === Pages.SIGNUP) {
          const { status_code, message } = await signup({
            fname: data.fname as string,
            lname: data.lname as string,
            email: data.email as string,
            phone_number: data.phone_number as string,
            password: data.password as string,
            confirm_password: data.confirm_password as string,
            user_type: data.user_type as UserType,
            profile_picture: data.profile_picture as File,
          });
          if (status_code === 201) {
            toast.success(message);
            navigate(
              `/${Routes.AUTH}/${Pages.VERIFY_ACCOUNT}?email=${data.email}`,
              {
                replace: true,
              }
            );
          }
        } else if (slug === Pages.VERIFY_ACCOUNT) {
          const { status_code, message } = await verifyAccount({
            email: verifiedEmail as string,
            otp: data.otp as string,
          });
          if (status_code === 200) {
            toast.success(message);
            navigate(`/${Routes.AUTH}/${Pages.SIGNIN}`, {
              replace: true,
            });
          }
        } else if (slug === Pages.FORGOT_PASSWORD) {
          const { status_code, message } = await forgotPassword(
            data.email as string
          );
          if (status_code === 200) {
            setUserEmail(data.email as string);
            setForgotPasswordSent(true);
            toast.success(message);
          }
        } else if (slug === Pages.RESET_PASSWORD) {
          const { status_code, message } = await resetPassword({
            confirm_password: data.confirm_password as string,
            new_password: data.password as string,
            verification_token: token,
          });
          if (status_code === 200) {
            toast.success(message);
            navigate(`/${Routes.AUTH}/${Pages.SIGNIN}`, {
              replace: true,
            });
          }
        }
      } catch (error: unknown) {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "حدث خطأ ما";
        toast.error(errorMessage);
      }
    },
    [
      slug,
      login,
      navigate,
      signup,
      verifyAccount,
      verifiedEmail,
      forgotPassword,
      resetPassword,
      token,
    ]
  );

  const formLoading = isSubmitting || isLoading;

  // Show forgot password confirmation UI
  if (slug === Pages.FORGOT_PASSWORD && forgotPasswordSent) {
    return (
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-card-foreground">
            تم إرسال البريد الإلكتروني
          </h2>
          <p className="text-muted-foreground">
            تم إرسال رابط إعادة تعيين كلمة المرور إلى
          </p>
          <p className="text-primary font-medium">{userEmail}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">الخطوات التالية:</h3>
          <ol className="text-sm text-blue-800 space-y-1 text-right">
            <li>1. افحص صندوق الوارد في بريدك الإلكتروني</li>
            <li>2. انقر على رابط إعادة تعيين كلمة المرور</li>
            <li>3. أدخل كلمة المرور الجديدة</li>
          </ol>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            لم تستلم البريد الإلكتروني؟ تحقق من مجلد البريد المزعج
          </p>

          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setForgotPasswordSent(false)}
              className="w-full"
            >
              إعادة المحاولة
            </Button>

            <Link
              to={`/${Routes.AUTH}/${Pages.SIGNIN}`}
              className="text-primary hover:underline text-sm font-medium"
            >
              العودة إلى تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {getFormFields().map((field: IFormField) => (
        <div key={field.name} className="mb-4">
          <FormFields {...field} control={control} errors={errors} />
        </div>
      ))}

      {slug === Pages.SIGNIN && (
        <ForgotPassword control={control} errors={errors} />
      )}
      <SubmitButton slug={slug} disabled={formLoading} loading={formLoading} />
      <NavigationLink slug={slug} verifiedEmail={verifiedEmail} />
    </form>
  );
};

export default AuthForm;

function ForgotPassword({
  control,
  errors,
}: {
  errors: FieldErrors;
  control: Control<Record<string, unknown>>;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <FormFields
        type="checkbox"
        name="remember"
        aria-describedby="remember"
        id="remember"
        label="تذكرني"
        control={control}
        errors={errors}
      />
      <Link
        to={`/${Routes.AUTH}/${Pages.FORGOT_PASSWORD}`}
        className="text-sm font-medium text-primary hover:underline"
      >
        هل نسيت كلمة المرور؟
      </Link>
    </div>
  );
}

function SubmitButton({
  slug,
  loading,
  ...rest
}: {
  slug: string;
  loading?: boolean;
} & React.ComponentProps<typeof Button>) {
  const renderButtonText = () => {
    switch (slug) {
      case Pages.SIGNIN:
        return "تسجيل الدخول";
      case Pages.SIGNUP:
        return "إنشاء حساب";
      case Pages.FORGOT_PASSWORD:
        return "متابعة";
      case Pages.VERIFY_ACCOUNT:
        return "تأكيد";
      case Pages.RESET_PASSWORD:
        return "تغيير كلمة المرور";
      default:
        return "تسجيل الدخول";
    }
  };

  return (
    <Button
      type="submit"
      className="w-full h-10 text-white font-medium"
      {...rest}
    >
      <LoadingButton
        loading={loading}
        loadingText="جار التحميل..."
        loaderSize="sm"
      >
        {renderButtonText()}
      </LoadingButton>
    </Button>
  );
}

function NavigationLink({
  slug,
  verifiedEmail,
}: {
  slug: string;
  verifiedEmail: string;
}) {
  const { resendOtp, isLoading } = useAuth();
  const [countdown, setCountdown] = useState(60); // Start with 60 seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && slug === Pages.VERIFY_ACCOUNT) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, slug]);

  const handleResendOtp = async () => {
    try {
      // Using forgotPassword as a placeholder for resend OTP
      const { message, status_code } = await resendOtp(verifiedEmail); // This should be the user's email
      if (status_code === 200) {
        toast.success(message);
      }

      setCountdown(60); // Reset countdown after successful resend
    } catch (error) {
      console.error("Resend OTP failed:", error);
      toast.error(
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "فشل في إعادة إرسال رمز التحقق"
      );
      // toast.error("فشل في إرسال رمز التحقق");
    }
  };

  const getText = () => {
    switch (slug) {
      case Pages.SIGNIN:
        return {
          desc: "ليس لديك حساب؟",
          title: "سجل الآن",
          href: `/${Routes.AUTH}/${Pages.SIGNUP}`,
          isButton: false,
        };
      case Pages.SIGNUP:
        return {
          desc: "لديك حساب بالفعل؟",
          title: "تسجيل الدخول",
          href: `/${Routes.AUTH}/${Pages.SIGNIN}`,
          isButton: false,
        };
      case Pages.VERIFY_ACCOUNT:
        return {
          desc: "لم تستلم الرمز؟",
          title: countdown > 0 ? `إعادة إرسال (${countdown}s)` : "إعادة إرسال",
          href: "",
          isButton: true,
          disabled: countdown > 0 || isLoading,
          onClick: handleResendOtp,
        };
      default:
        return {
          desc: "هل تحتاج إلى مساعدة؟",
          title: "اتصل بنا",
          href: Routes.CONTACT,
          isButton: false,
        };
    }
  };

  const linkData = getText();

  return (
    <div className="mt-6 flex items-center gap-2">
      <p className="text-card-foreground text-sm">{linkData.desc}</p>
      {linkData.isButton ? (
        <button
          type="button"
          onClick={linkData.onClick}
          disabled={linkData.disabled}
          className={`text-sm font-medium transition-colors duration-200 ${
            linkData.disabled
              ? "text-gray-400 cursor-not-allowed"
              : "text-primary hover:underline"
          }`}
        >
          {linkData.title}
        </button>
      ) : (
        <Link
          to={linkData.href}
          replace
          className="text-primary hover:underline text-sm font-medium transition-colors duration-200"
        >
          {linkData.title}
        </Link>
      )}
    </div>
  );
}
