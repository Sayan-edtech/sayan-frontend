import Features from "@/components/shared/features";

function EmployeeFeatures() {
  const features = [
    {
      icon: (
        <img
          src="/assets/icons/employee-training/increase-prod.svg"
          alt="Increase Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "زيادة الانتاجية",
      description:
        "التدريب يجعل الموظفين أكثر كفاءة وانتاجية، حيث يكونون مدربين بشكل أفضل لمواجهة مهامهم وكيسون ثقة أكبر في قدراتهم مما يؤدي إلى تحسين الأداء.",
    },
    {
      icon: (
        <img
          src="/assets/icons/employee-training/employees.svg"
          alt="Employees Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "الاحتفاظ بالموظفين",
      description:
        "75% من الموظفين من المرجح أن يبقوا لفترة أطول في المنظمات التي تستثمر في تدوهم، مما يعزز رضاهم ووالائهم.",
    },
    {
      icon: (
        <img
          src="/assets/icons/employee-training/skills.svg"
          alt="Skills Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "تحسين المهارات",
      description:
        "يساعد تطوير الموظفين على اكتساب مهارات جديدة، مما يزيد الربا الوظيفي ويشجع فرض التقدم.",
    },
    {
      icon: (
        <img
          src="/assets/icons/employee-training/think.svg"
          alt="Think Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "الابتكار والقدرة على التكيف",
      description:
        "تطوير الموظفين يعزز القدرة على التكيف مع التغيرات المستوعة ويشجع على الابتكار.",
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
        <h2 className="text-2xl md:text-3xl mb-10 text-center font-bold text-foreground">
          أهمية تدريب الموظفين:
        </h2>

        {/* Features Grid */}
        <Features features={features} />
      </div>
    </section>
  );
}

export default EmployeeFeatures;
