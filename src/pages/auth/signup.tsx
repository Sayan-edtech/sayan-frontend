import { Pages } from "@/constants/enums";
import AuthForm from "@/features/auth/components/AuthForm";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            إنشاء حساب جديد
          </h2>
        </div>
        <AuthForm slug={Pages.SIGNUP} />
      </div>
      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          بالتسجيل، أنت توافق على{" "}
          <Link
            to="/terms"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            شروط الخدمة
          </Link>
          {" و "}
          <Link
            to="/privacy"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            سياسة الخصوصية
          </Link>
        </p>
      </div>
    </>
  );
}

export default Signup;
