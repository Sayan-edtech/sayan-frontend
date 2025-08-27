import { PublicRoute } from "@/components/shared/GuardRoute";
import { ArrowRight, Clock, Shield } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Shield,
    title: "بياناتك آمنة",
    description: "حماية كاملة لمعلوماتك الشخصية",
  },
  {
    icon: Clock,
    title: "دقيقة واحدة",
    description: "التسجيل سريع وسهل",
  },
];
function AuthLayout() {
  const { pathname } = useLocation();
  console.log(pathname);
  const title = pathname === "/auth/signup" ? "انضم الآن إلى" : "مرحبا بك في";
  return (
    <PublicRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block space-y-8"
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    <span className="text-sm font-medium">العودة للرئيسية</span>
                  </Link>

                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    {title} {""}
                    <span className="text-blue-600">منصة سيان</span>
                  </h1>
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <benefit.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">50K+</div>
                    <div className="text-sm text-gray-600">طالب نشط</div>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <div className="text-2xl font-bold text-green-600">
                      500+
                    </div>
                    <div className="text-sm text-gray-600">دورة تدريبية</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      95%
                    </div>
                    <div className="text-sm text-gray-600">معدل الرضا</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <Outlet />
          </div>
        </div>
      </div>
      =
    </PublicRoute>
  );
}

export default AuthLayout;
