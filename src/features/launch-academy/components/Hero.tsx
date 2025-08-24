import { motion } from "framer-motion";
import { Users, TrendingUp, Award, Target, CheckCircle, Rocket } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { Link } from "react-router-dom";

function Hero() {
  const stats = [
    { icon: Users, value: "1000+", label: "منصة تعليمية نشطة" },
    { icon: TrendingUp, value: "50K+", label: "ريال تم تحقيقها شهرياً" },
    { icon: Award, value: "90%", label: "معدل رضا المستخدمين" },
    { icon: Target, value: "24/7", label: "دعم فني متواصل" },
  ];

  const benefits = [
    "إعداد سريع في 5 دقائق فقط",
    "بدون خبرة تقنية مطلوبة",
    "ابدأ مجاناً بدون بطاقة ائتمانية",
    "دعم فني متخصص 24/7"
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Preview Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="relative bg-white rounded-2xl p-4 shadow-lg border border-gray-200 max-w-5xl mx-auto">
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src="/assets/images/launch-academy/header.png"
                  alt="لوحة تحكم أكاديمية سيان"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              
              {/* Small floating badge */}
              <div className="absolute -top-3 -right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                لوحة التحكم المتطورة
              </div>
            </div>
          </motion.div>

          {/* Header Content */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Rocket className="w-4 h-4" />
                أكثر من 1,000 منصة تعليمية نشطة
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                حوّل <span className="text-blue-600">خبرتك</span>
                <span className="block text-blue-600 mt-2">إلى دخل شهري</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                أنشئ أكاديميتك الرقمية في 5 دقائق فقط وابدأ في تحقيق دخل من خبرتك ومعرفتك اليوم! 
                منصة متكاملة لبناء وإدارة المحتوى التعليمي بكل سهولة.
              </p>

              <div className="flex justify-center mt-8">
                <Link
                  to={`${Routes.AUTH}/${Pages.SIGNIN}`}
                  className={`${buttonVariants({
                    size: "lg",
                    className: "text-xl bg-blue-600 hover:bg-blue-700 px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300",
                  })}`}
                >
                  🚀 انشئ منصتك التعليمية الآن - مجاناً
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-12"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                لماذا تختار <span className="text-blue-600">منصة</span> سيان؟
              </h2>
              <p className="text-lg text-gray-600">
                حلول متطورة لبناء أكاديميتك الرقمية بسهولة ويسر
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
