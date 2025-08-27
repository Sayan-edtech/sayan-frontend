import { Pages } from "@/constants/enums";
import AuthForm from "../../features/auth/components/AuthForm";
import { motion } from "framer-motion";

const Signin = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-card-foreground">
            تسجيل الدخول
          </h1>
          <p className="text-muted-foreground text-lg">
            ادخل المعلومات الخاصة بحسابك
          </p>
        </div>
        <AuthForm slug={Pages.SIGNIN} />
      </div>
    </motion.div>
  );
};

export default Signin;
