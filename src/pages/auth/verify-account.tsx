import { Pages } from "@/constants/enums";
import AuthForm from "@/features/auth/components/AuthForm";

function VerifyAccount() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-card-foreground">
          تحقق من حسابك
        </h1>
        <p className="text-muted-foreground text-lg">
          أدخل رمز التحقق المكون من 6 أرقام المرسل إلى هاتفك أو بريدك الإلكتروني
        </p>
      </div>
      <AuthForm slug={Pages.VERIFY_ACCOUNT} />
    </div>
  );
}

export default VerifyAccount;
