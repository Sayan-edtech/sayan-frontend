import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, TrendingUp, Award, Target, CheckCircle } from "lucide-react";

function Hero() {
  const stats = [
    { icon: Users, value: "75%", label: "معدل الاحتفاظ بالموظفين" },
    { icon: TrendingUp, value: "40%", label: "زيادة الإنتاجية" },
    { icon: Award, value: "90%", label: "تحسن في المهارات" },
    { icon: Target, value: "85%", label: "تحقيق الأهداف" },
  ];

  const benefits = [
    "تقارير شاملة عن الأداء والتقدم",
    "نظام إدارة متكامل للمتدربين", 
    "محتوى تدريبي قابل للتخصيص",
    "دعم فني متخصص 24/7"
  ];

  return (
    <section className="pt-[150px] md:pt-[200px] pb-16 md:pb-20 bg-white">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          {/* Header Content */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Users className="w-4 h-4" />
                حلول تدريب الموظفين للشركات الكبيرة
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                <span className="text-blue-600">تدريب</span> وتطوير الموظفين
                <span className="block mt-2">بكفاءة وفعالية</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                منصة متكاملة لتدريب وتطوير مهارات الموظفين في الشركات الكبيرة، 
                تمزج بين الخبرة الواسعة وأحدث أساليب التدريب الرقمي لضمان تحقيق أهدافكم التدريبية.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="px-8 py-3 text-lg">
                  احجز عرض توضيحي
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                  تحدث مع مختص
                </Button>
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
            className="bg-blue-50 rounded-2xl p-8 md:p-12"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                لماذا تختار <span className="text-blue-600">منصة</span> سيان؟
              </h2>
              <p className="text-lg text-gray-600">
                حلول متطورة مصممة خصيصاً لاحتياجات الشركات الكبيرة
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
