function Hero() {
  return (
    <section
      style={{
        background:
          "linear-gradient(156.58deg, rgba(15, 232, 232, 0.33) 17.14%, rgba(217, 217, 217, 0) 75.12%)",
      }}
      className="pt-40"
    >
      <div className="container mx-auto px-4">
        <div className="element-center gap-20">
          <div className="w-32 h-32 md:w-52 md:h-52 hidden md:block">
            <img
              src="/assets/images/ai/stats1.png"
              alt="Statistics 2"
              loading="eager"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-52 h-52 md:w-80 md:h-80">
            <img
              src="/assets/images/ai/ai.png"
              alt="Book"
              loading="eager"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="w-32 h-32 md:w-52 md:h-52 hidden md:block">
            <img
              src="/assets/images/ai/stats2.png"
              alt="Statistics"
              loading="eager"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-10">
            الذكاء الاصطناعي
          </h1>

          <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            <p>
              في منصة سيان، نعتبر الذكاء الاصطناعي حجر الزاوية في تعزيز تجربة
              التعليم الرقمي. نؤمن بأهمية دمجه كأداة مساعدة وداعمة ليس فقط
              للطلاب، بل أيضًا لمنشئي المحتوى التعليمي، مما يعزز فاعلية التعلم
              والتدريس.
            </p>
            <p>
              في منصة سيان، نقدم مجموعة متنوعة من الميزات الفريدة المدعومة
              بالذكاء الاصطناعي لتحسين وتعزيز تجربة التعلم وإعداد المحتوى.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
