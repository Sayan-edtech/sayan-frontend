import AuthForm from "../../features/auth/components/AuthForm";
import { Pages } from "@/constants/enums";
import { motion } from "framer-motion";

const Signup = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="h-full max-h-screen flex flex-col"
    >
      <div className="flex-shrink-0 space-y-2 mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-card-foreground">
          إنشاء حساب جديد
        </h1>
        <p className="text-muted-foreground text-lg">
          قم بإنشاء حساب جديد للبدء في استخدام خدماتنا
        </p>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
        <AuthForm slug={Pages.SIGNUP} />
      </div>
    </motion.div>
  );
};

export default Signup;
