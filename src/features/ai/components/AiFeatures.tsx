import Features from "@/components/shared/features";

function AiFeatures() {
  const features = [
    {
      icon: (
        <img
          src="/assets/icons/ai/test.svg"
          alt="Test Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "تصحيح الاختبارات",
      description:
        "الذكاء الاصطناعي يوفرى تصحيح الاختبارات ويقدم تحليلات مفصلة لنتائج الطلاب.",
    },
    {
      icon: (
        <img
          src="/assets/icons/ai/question.svg"
          alt="Question Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "خاصية سؤال التركيز",
      description:
        "هذه الخاصية تعزز تركيز الطالب عبر سؤال يطرح فاعلية التقدم في الدرس.",
    },
    {
      icon: (
        <img
          src="/assets/icons/ai/test-me.svg"
          alt="Test Me Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "خاصية اختبارني",
      description: "توفر اختبارات محددة بعد كل درس ليقيس مستوى استيعاب الطالب.",
    },
    {
      icon: (
        <img
          src="/assets/icons/ai/help.svg"
          alt="Help Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "المساعد الشخصي",
      description:
        "مساعد رقمي ذكي يجاب دائماً لمساعدة الطالب والمعلمين في جميع احتياجاتهم التعليمية.",
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
      title: "الإجابة على أسئلة الطلاب",
      description:
        "الذكاء الاصطناعي يجيب على الاستفسارات، مؤثراً مفهماً أعمق للمواد.",
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
        {/* Features Grid */}
        <Features features={features} />
      </div>
    </section>
  );
}

export default AiFeatures;
