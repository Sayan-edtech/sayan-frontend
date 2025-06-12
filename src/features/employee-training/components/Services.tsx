function Services() {
  return (
    <section className="py-14 sm:py-20 sm:pb-0 relative">
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
          خدماتنا في منصة سيان
        </h2>

        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <div>
              <img
                src="/assets/images/employee-training/services.png"
                alt="Services"
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-4">
                خدمات تصميم تعليمي
              </h3>

              <p className="space-y-6 text-lg text-muted-foreground w-lg max-w-full leading-relaxed">
                نقدم تصميم مواد تعليمية مخصصة للموظفين، معتمدين على خبراتنا
                الواسعة في هذا المجال.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <div className="order-1 md:order-none">
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-4">
                إنتاج مقاطع فيديو تعليمية
              </h3>
              <p className="space-y-6 text-lg text-muted-foreground w-lg max-w-full leading-relaxed">
                لدينا فريق متخصص قادر على إنتاج محتوى مرئي جذاب وفعال للمواد
                التعليمية.
              </p>
            </div>
            <div>
              <img
                src="/assets/images/employee-training/create-videos.png"
                alt="Services"
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <div>
              <img
                src="/assets/images/employee-training/manage.png"
                alt="Services"
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-4">
                إنتاج مقاطع فيديو تعليمية
              </h3>
              <p className="space-y-6 text-lg text-muted-foreground w-lg max-w-full leading-relaxed">
                لدينا فريق متخصص قادر على إنتاج محتوى مرئي جذاب وفعال للمواد
                التعليمية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
