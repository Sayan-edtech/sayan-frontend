import Hero from "@/features/launch-academy/components/Hero";
import Stats from "@/features/launch-academy/components/Stats";
import GoalVision from "@/features/launch-academy/components/GoalVision";
import Layout from "@/features/launch-academy/components/Layout";
import Pricing from "@/features/launch-academy/components/Pricing";
import FAQs from "@/components/shared/faqs";
import Clients from "@/features/launch-academy/components/Clients";

const faqItems = [
  {
    question: "ما هي أكاديمية الإطلاق؟",
    answer:
      "أكاديمية الإطلاق هي منصة تعليمية متكاملة تهدف إلى تمكين الأفراد والشركات من خلال توفير دورات تدريبية عالية الجودة في مجالات متنوعة مثل التكنولوجيا والأعمال والتطوير الذاتي.",
  },
  {
    question: "من هم المستفيدون من الأكاديمية؟",
    answer:
      "تستهدف الأكاديمية كل من يسعى لتطوير مهاراته، من الطلاب والخريجين الجدد إلى المهنيين وأصحاب الشركات الذين يرغبون في مواكبة التطورات في سوق العمل.",
  },
  {
    question: "هل الشهادات معتمدة؟",
    answer:
      "نعم، نقدم شهادات إتمام معتمدة من الأكاديمية عند إكمال أي دورة تدريبية بنجاح، مما يعزز من سيرتك الذاتية وفرصك الوظيفية.",
  },
  {
    question: "كيف يمكنني التسجيل في دورة؟",
    answer:
      'يمكنك التسجيل بسهولة من خلال تصفح الدورات المتاحة على موقعنا، واختيار الدورة التي تناسبك، ثم الضغط على زر "سجل الآن" واتباع الخطوات المطلوبة.',
  },
];

function LaunchAcademy() {
  return (
    <Layout>
      <Hero />
      <Clients />
      <Stats />
      <GoalVision />
      <Pricing />
      <FAQs faqItems={faqItems.map((item, index) => ({
        ...item,
        id: `faq-${index + 1}`
      }))} />
    </Layout>
  );
}

export default LaunchAcademy;
