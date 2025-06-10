function About() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Right */}
          <div className="text-right">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-10">
              من نحن<span className="text-primary">؟</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                نحن في منصة سيان نقود الطريق نحو مستقبل التعليم الرقمي. كأول
                منصة تعليمية تسخر الذكاء الاصطناعي والتقنيات الحديثة لتطوير
                تجربة التعليم، نحن معتمدون من المركز الوطني للتعليم الإلكتروني.
                مهمتنا هي توفير تجارب تعليمية وتدريبية متطورة تركز على الإبداع
                والشمولية، مصممة خصيصًا لتنمية العقول وتحقيق الريادة في المجال
                التعليمي.
              </p>

              <p>
                منصتنا هي الحل المثالي لكل من المعلمين والمتعلمين الساعين لتحسين
                جودة التعليم وتحقيق نتائج أفضل.
              </p>
            </div>
          </div>
          {/* Image Section - Left */}
          <div>
            <img
              src="/assets/images/launch-academy/about.png"
              alt="About Us"
              className="w-full h-auto"
              loading="lazy"
              width="600"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
