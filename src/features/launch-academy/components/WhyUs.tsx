function WhyUs() {
  const features = [
    {
      iconBg: "bg-gradient-to-br from-green-100 to-green-200",
      iconColor: "text-green-600",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: "نقلة نوعية في المبيعات",
      description:
        "استفد من أدواتنا الذكية لتعزيز مبيعاتك وتحسين أداء الطلاب في سيان، مما يساعدك على تحقيق أهدافك التجارية بفعالية.",
    },
    {
      iconBg: "bg-gradient-to-br from-orange-100 to-orange-200",
      iconColor: "text-orange-600",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M18 3a1 1 0 00-1.196-.98L4 5.692a1 1 0 00-.804.98V9a3 3 0 103 3v5.5a.5.5 0 001 0V3z" />
        </svg>
      ),
      title: "دعم فني بلا توقف",
      description:
        "تمتع بالمطمئنة مع دعمنا الفني المتاح على مدار الساعة، مهما كان استفسارك أو تحديث.",
    },
    {
      iconBg: "bg-gradient-to-br from-blue-100 to-blue-200",
      iconColor: "text-blue-600",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "الريادة مع الذكاء الاصطناعي",
      description:
        "اختر منصة سيان الرائدة في تقديم تجارب تعليمية ذكية ومتطورة، معنا التعليم ليس فقط عملية تعلم، بل تجربة متطورة تتجاوز التوقعات",
    },
    {
      iconBg: "bg-gradient-to-br from-green-100 to-green-200",
      iconColor: "text-green-600",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 1a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "بناني المواد التعليمية الاحترافي",
      description:
        "نظام سيان يتيح بناء مواد تعليمية ذات جودة عالية وتفاعلية، مستفيداً من تكنولوجيا الذكاء الاصطناعي لتحقيق أقصى استفادة تعليمية",
    },
    {
      iconBg: "bg-gradient-to-br from-orange-100 to-orange-200",
      iconColor: "text-orange-600",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
      title: "توسيع آفاق النجاح",
      description:
        "اغتنم فرصة التسويق والبيع لمحتواك الرقمية عبر منصة تتيح لك الوصول إلى جمهور أوسع",
    },
    {
      iconBg: "bg-gradient-to-br from-blue-100 to-blue-200",
      iconColor: "text-blue-600",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center group hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-20 h-20 ${feature.iconBg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className={feature.iconColor}>{feature.icon}</div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-4 leading-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-right">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
