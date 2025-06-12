function Features() {
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
        <h2 className="text-3xl lg:text-4xl mb-10 text-center font-bold text-foreground">
          مميزات منصة سيان
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div>
            <img
              src="/assets/images/employee-training/features.png"
              alt="Features"
              loading="lazy"
              className="w-full h-auto"
            />
          </div>

          <div>
            <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-4">
              نظام إدارة ومتابعة المتدربين
            </h3>

            <p className="space-y-6 text-lg text-muted-foreground w-lg max-w-full leading-relaxed">
              نؤمن بأن التعليم هو القوة الدافعة لمستقبل مشرق، يسوده الإبداع
              والابتكا بناء جيل متعلم ومبدع، مجهز بالمعرفة والقدرات لقيادة عصر
              جديد من التقدم.ر.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
