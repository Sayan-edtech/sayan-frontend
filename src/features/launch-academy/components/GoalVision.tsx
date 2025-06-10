function GoalVision() {
  const cards = [
    {
      id: 1,
      image: "/assets/images/launch-academy/goal.png",
      alt: "هدفنا",
      title: "هدفنا",
      description:
        "بناء جيل متعلم ومبدع، مجهز بالمعرفة والمهارات لقيادة عصر جديد من التقدم",
    },
    {
      id: 2,
      image: "/assets/images/launch-academy/vision.png",
      alt: "رؤيتنا",
      title: "رؤيتنا",
      description:
        "نؤمن بأن التعليم هو القوة الحقيقة لمستقبل مشرق يسوده الإبداع والابتكار",
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              style={{ boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.06)" }}
              className="text-center rounded-[24px] p-8 hover:!shadow-lg transition-shadow duration-300"
            >
              {/* 3D Illustration */}
              <div className="mb-8 flex justify-center">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-64 h-64 object-contain"
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {card.title}
              </h2>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GoalVision;
