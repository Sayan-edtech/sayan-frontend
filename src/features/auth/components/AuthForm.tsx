import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import FormFields from "@/components/shared/formFields/form-fields";
import type { IFormField } from "@/types/app";
import { useForm, type Control, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/shared/Loader";
import { toast } from "sonner";
import { UserType, Pages, Routes } from "@/constants/enums";
import { useAuth } from "@/features/auth/hooks/useAuthStore";
import useFormFields from "../hooks/useFormFields";
import useFormValidations from "../hooks/useFormValidations";
import LoginDialog from "@/components/ui/login-dialog";

const AuthForm: React.FC<{ slug: string }> = ({ slug }) => {
  const navigate = useNavigate();
  const { getFormFields } = useFormFields({ slug });
  const { getValidationSchema } = useFormValidations({ slug });

  const { signup, isLoading } = useAuth();

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
          // await login({
          //   email: data.email as string,
          //   password: data.password as string,
          // });
          toast.success("تم تسجيل الدخول بنجاح");
          navigate("/dashboard");
        } else if (slug === Pages.SIGNUP) {
          await signup({
            name: data.name as string,
            email: data.email as string,
            phone: data.phone as string,
            password: data.password as string,
            confirm_password: data.confirm_password as string,
            user_type: data.user_type as UserType,
            profile_picture: data.profile_picture as File,
          });
          toast.success("تم إنشاء الحساب بنجاح");
          navigate("/");
        }
      } catch (error: unknown) {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "حدث خطأ ما";
        toast.error(errorMessage);
      }
    },
    [slug, signup, navigate]
  );

  const formLoading = isSubmitting || isLoading;

  const renderFormFields = () => {
    const fields = getFormFields();
    
    if (slug === Pages.SIGNUP) {
      // All fields visible except profile picture (optional)
      return (
        <div className="space-y-5">
          {/* Account Type and Name on same row - for all screen sizes */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <FormFields {...fields[0]} control={control} errors={errors} />
            <FormFields {...fields[2]} control={control} errors={errors} />
          </div>
          
          {/* Email and Phone on same row - for all screen sizes */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <FormFields {...fields[4]} control={control} errors={errors} />
            <FormFields {...fields[3]} control={control} errors={errors} />
          </div>
          
          {/* Password - for all screen sizes */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <FormFields {...fields[5]} control={control} errors={errors} />
            <FormFields {...fields[6]} control={control} errors={errors} />
          </div>
          
          {/* Profile Picture - Optional */}
          <div className="border-t border-gray-200 pt-4">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs text-gray-500">+</span>
                  </span>
                  الصورة الشخصية (اختياري)
                </span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              
              <div className="mt-4 bg-gray-50 rounded-xl p-4">
                <FormFields {...fields[1]} control={control} errors={errors} />
              </div>
            </details>
          </div>
        </div>
      );
    } else {
      // Enhanced signin layout
      return (
        <div className="space-y-5 text-right" dir="rtl">
          {fields.map((field: IFormField) => (
            <div key={field.name} className="space-y-2">
              <FormFields {...field} control={control} errors={errors} />
              {/* Add helpful hints for certain fields */}
 
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
       {renderFormFields()}
 
       <SubmitButton slug={slug} disabled={formLoading} loading={formLoading} />
       
       {/* تم نقل زر "هل نسيت كلمة المرور؟" إلى مكون AuthFormWithForgotPassword */}
       
       <NavigationLink slug={slug} />
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
    <div className="flex items-center justify-between p-3 rounded-md bg-accent border border-border">
      <div className="flex items-center gap-2">
        <FormFields
          type="checkbox"
          name="remember"
          aria-describedby="remember"
          id="remember"
          label="تذكرني"
          control={control}
          errors={errors}
        />
      </div>
      <Link
        to={`/${Routes.AUTH}/${Pages.FORGOT_PASSWORD}`}
        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
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
        return "تسجيل";
      case Pages.FORGOT_PASSWORD:
        return "متابعة";
      case Pages.VERIFY_ACCOUNT:
        return "إعادة إرسال بريد التحقق";
      case Pages.RESET_PASSWORD:
        return "تغيير كلمة المرور";
      case Pages.ENTER_OTP:
        return "تأكيد";
      default:
        return "تسجيل الدخول";
    }
  };



  const getLoadingText = () => {
    switch (slug) {
      case Pages.SIGNIN:
        return "جار تسجيل الدخول...";
      case Pages.SIGNUP:
        return "جار التسجيل...";
      default:
        return "جار التحميل...";
    }
  };

  return (
    <Button
      type="submit"
      size="lg"
      className="w-full"
      disabled={loading}
      {...rest}
    >
      <LoadingButton
        loading={loading}
        loadingText={getLoadingText()}
        loaderSize="sm"
      >
        {renderButtonText()}
      </LoadingButton>
    </Button>
  );
}

function NavigationLink({ slug }: { slug: string }) {
  const getText = () => {
    switch (slug) {
      case Pages.SIGNIN:
        return {
          desc: "ليس لديك حساب؟",
          title: "سجل الآن مجاناً",
          slug: Pages.SIGNUP,
        };
      case Pages.SIGNUP:
        return {
          desc: "",
          title: "تسجيل الدخول",
          slug: Pages.SIGNIN,
        };
      default:
        return {
          desc: "هل تحتاج إلى مساعدة؟",
          title: "اتصل بنا",
          slug: Pages.FORGOT_PASSWORD,
        };
    }
  };
  
  // تم إزالة "أو" و "سجل الآن مجاناً" كما طلب المستخدم
  return null;
}
