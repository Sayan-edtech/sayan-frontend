import Features from "@/components/shared/features";

function WhyUs() {
  const features = [
    {
      icon: (
        <img
          src="/assets/icons/why-us/high.svg"
          alt="High Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "نقلة نوعية في المبيعات",
      description:
        "استفد من أدواتنا الذكية لتعزيز مبيعاتك وتحسين أداء الطلاب في سيان، مما يساعدك على تحقيق أهدافك التجارية بفعالية.",
    },
    {
      icon: (
        <img
          src="/assets/icons/why-us/support.svg"
          alt="Support Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "دعم فني بلا توقف",
      description:
        "تمتع بالمطمئنة مع دعمنا الفني المتاح على مدار الساعة، مهما كان استفسارك أو تحديث.",
    },
    {
      icon: (
        <img
          src="/assets/icons/why-us/ai.svg"
          alt="Ai Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "الريادة مع الذكاء الاصطناعي",
      description:
        "اختر منصة سيان الرائدة في تقديم تجارب تعليمية ذكية ومتطورة، معنا التعليم ليس فقط عملية تعلم، بل تجربة متطورة تتجاوز التوقعات",
    },
    {
      icon: (
        <img
          src="/assets/icons/why-us/education.svg"
          alt="Education Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "بناني المواد التعليمية الاحترافي",
      description:
        "نظام سيان يتيح بناء مواد تعليمية ذات جودة عالية وتفاعلية، مستفيداً من تكنولوجيا الذكاء الاصطناعي لتحقيق أقصى استفادة تعليمية",
    },
    {
      icon: (
        <img
          src="/assets/icons/why-us/success.svg"
          alt="Success Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "توسيع آفاق النجاح",
      description:
        "اغتنم فرصة التسويق والبيع لمحتواك الرقمية عبر منصة تتيح لك الوصول إلى جمهور أوسع",
    },
    {
      icon: (
        <img
          src="/assets/icons/improve.svg"
          alt="Improve Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "تحسين تجربة التعليم",
      description:
        "استكشف قوة الذكاء الاصطناعي في تعزيز فهم الطلاب وتلبية احتياجاتهم التعليمية بدقة",
    },
  ];

  return (
    <section className="py-14 sm:py-20 relative">
      <div
        style={{
          rotate: "-180deg",
          background:
            "linear-gradient(136.72deg, rgba(0, 255, 206, 0.1) -16.9%, rgba(255, 255, 255, 0.173594) 34.08%, rgba(255, 255, 255, 0) 135.36%)",
        }}
        className="absolute inset-0 z-[-1]"
      ></div>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-3xl mb-10 md:text-4xl lg:text-5xl font-bold text-foreground">
          لماذا نحن<span className="text-primary">؟</span>
        </h2>

        {/* Features Grid */}
        <Features features={features} />
      </div>
    </section>
  );
}

export default WhyUs;
