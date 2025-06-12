function Hero() {
  return (
    <section
      style={{
        background:
          "linear-gradient(156.58deg, rgba(15, 232, 232, 0.33) 17.14%, rgba(217, 217, 217, 0) 75.12%)",
      }}
      className="pt-40 md:pb-20"
    >
      <div className="container mx-auto px-4">
        <div className="element-center gap-20">
          <div className="w-32 h-32 md:w-52 md:h-52 hidden md:block">
            <img
              src="/assets/images/employee-training/stats1.png"
              alt="Statistics 2"
              loading="eager"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-52 h-52 md:w-80 md:h-80">
            <img
              src="/assets/images/employee-training/employee.png"
              alt="Book"
              loading="eager"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="w-32 h-32 md:w-52 md:h-52 hidden md:block">
            <img
              src="/assets/images/employee-training/stats2.png"
              alt="Statistics"
              loading="eager"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-10">
            تدريب وتطوير الموظفين
          </h1>

          <p className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            في منصة سيان، نقوم بتطوير مهارات موظفيكم من خلال تجربة تدريبية فريدة
            من نوعها، تمزج بين خبراتنا الواسعة وأساليب التدريب الحديثة. نلتزم
            بتصميم برامج تدريبية تركز على تعزيز الكفاءة العملية ومواكبة التطورات
            المستمرة في العصر الحديث، لضمان تطوير مهارات فريق عملكم بأعلى مستوى
            وتحقيق النجاح المستدام.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
