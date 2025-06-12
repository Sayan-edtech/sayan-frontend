import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const plans = [
    {
      id: 0,
      name: "المجانية",
      price: 0.0,
      free: true,
      monthlyPrice: 0.0,
      annualPrice: 0.0,
      period: "شهر",
      description:
        "جرب منصتنا مجانًا واكتشف الإمكانيات الأساسية لتعزيز تجربتك التعليمية",
      features: [
        { name: "عدد محدود من الدورات التعليمية", included: true },
        { name: "دعم فني أساسي", included: true },
        { name: "إمكانية الوصول للمحتوى الأساسي", included: true },
        { name: "تتبع تقدم المتعلمين", included: false },
      ],
      buttonText: "ابدأ مجانًا",
      isPopular: false,
    },
    {
      id: 1,
      name: "الأساسية",
      price: 70.0,
      monthlyPrice: 70.0,
      annualPrice: 700.0, // 12 months for the price of 10
      period: "شهر",
      description:
        "خطة مثالية للبدء في رحلتك التعليمية مع جميع الميزات الأساسية",
      features: [
        { name: "وصول كامل للدورات الأساسية", included: true },
        { name: "دعم فني متقدم", included: true },
        { name: "تتبع تقدم المتعلمين", included: true },
        { name: "تخصيص المحتوى التعليمي", included: false },
      ],
      buttonText: "اشترك",
      isPopular: false,
    },
    {
      id: 2,
      name: "النمو",
      price: 120.0,
      monthlyPrice: 120.0,
      annualPrice: 1200.0, // 12 months for the price of 10
      period: "شهر",
      description:
        "لأصحاب المشاريع التعليمية المتوسطة الراغبين في النمو والتوسع",
      features: [
        { name: "جميع ميزات الباقة الأساسية", included: true },
        { name: "تحليلات متقدمة للأداء", included: true },
        { name: "تخصيص المحتوى التعليمي", included: true },
        { name: "دعم أولوية متقدم", included: false },
      ],
      buttonText: "اشترك",
      isPopular: true,
    },
    {
      id: 3,
      name: "الاحترافية",
      price: 199.0,
      monthlyPrice: 199.0,
      annualPrice: 1990.0, // 12 months for the price of 10
      period: "شهر",
      description:
        "للمؤسسات التعليمية الكبيرة التي تحتاج إلى حلول متكاملة واحترافية",
      features: [
        { name: "جميع ميزات باقة النمو", included: true },
        { name: "دعم أولوية متقدم", included: true },
        { name: "API مخصص للتكامل", included: true },
        { name: "تدريب مخصص للفريق", included: true },
      ],
      buttonText: "اشترك",
      isPopular: false,
    },
  ];

  return (
    <section className="py-14 sm:py-20 relative">
      <div
        style={{
          background:
            "linear-gradient(136.72deg, rgba(0, 255, 206, 0.1) -16.9%, rgba(255, 255, 255, 0.173594) 34.08%, rgba(255, 255, 255, 0) 135.36%)",
        }}
        className="absolute inset-0 z-[-1] rotate-180"
      ></div>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            باقاتنا هي تقدرات مختلفة للنمو
          </h2>

          {/* Billing Description */}
          <p className="text-muted-foreground mb-4">
            {billingPeriod === "annual"
              ? "وفر حتى 20% مع الدفع السنوي"
              : "مرونة الدفع الشهري لباقات متنوعة"}
          </p>

          {/* Toggle Buttons */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <button
              className={`px-6 py-3 rounded-lg transition-colors ${
                billingPeriod === "annual"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:text-primary"
              }`}
              onClick={() => setBillingPeriod("annual")}
            >
              سنوي
            </button>
            <button
              className={`px-6 py-3 rounded-lg transition-colors ${
                billingPeriod === "monthly"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:text-primary"
              }`}
              onClick={() => setBillingPeriod("monthly")}
            >
              شهري
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-8 relative transition-all duration-300 hover:shadow-lg ${
                plan.isPopular
                  ? "ring-2 ring-primary shadow-lg scale-105"
                  : "shadow-sm border border-gray-100"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium">
                    الأكثر شعبية
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {plan.name}
                </h3>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">
                    {billingPeriod === "monthly"
                      ? plan.monthlyPrice.toFixed(2)
                      : plan.annualPrice.toFixed(2)}
                  </span>
                  <span className="text-lg text-muted-foreground mr-2">
                    ر.س /{billingPeriod === "monthly" ? "شهر" : "سنة"}
                  </span>

                  {billingPeriod === "annual" && plan.price > 0 && (
                    <div className="mt-2 text-sm text-green-600 font-medium">
                      وفر{" "}
                      {Math.round(
                        ((plan.monthlyPrice * 12 - plan.annualPrice) /
                          (plan.monthlyPrice * 12)) *
                          100
                      )}
                      ٪
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          feature.included
                            ? "bg-primary text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {feature.included ? (
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-3 h-3 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground line-through"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              {plan.free ? (
                <Button
                  asChild
                  className="w-full py-3 text-lg rounded-xl bg-white border-2 border-primary text-primary hover:bg-primary/10"
                >
                  <Link to="/auth/signup">{plan.buttonText}</Link>
                </Button>
              ) : (
                <Button
                  className={`w-full py-3 text-lg rounded-xl ${
                    plan.isPopular
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "bg-primary hover:bg-primary/90 text-white"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
