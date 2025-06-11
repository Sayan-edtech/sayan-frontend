import About from "@/features/launch-academy/components/About";
import Hero from "@/features/launch-academy/components/Hero";
import WhyUs from "@/features/launch-academy/components/WhyUs";
import Certification from "@/features/launch-academy/components/Certification";
import Stats from "@/features/launch-academy/components/Stats";
import GoalVision from "@/features/launch-academy/components/GoalVision";
// import Clients from "@/features/launch-academy/components/Clients";
import Layout from "@/features/launch-academy/components/Layout";
import Pricing from "@/features/launch-academy/components/Pricing";
import FAQs from "@/components/shared/faqs";

const faqItems = [
  {
    id: crypto.randomUUID(),
    question: "كيف يمكنني إنشاء أكاديميتي الخاصة على منصة سيان؟",
    answer:
      "يمكنك إنشاء أكاديميتك الخاصة بسهولة من خلال التسجيل على المنصة واختيار الباقة المناسبة لاحتياجاتك، ثم اتباع خطوات الإعداد البسيطة التي تتضمن تخصيص الملف التعريفي، وإضافة المحتوى التعليمي، وتعيين المدربين والإداريين إذا لزم الأمر.",
  },
  {
    id: crypto.randomUUID(),
    question: "ما نوع المحتوى الذي يمكنني تقديمه عبر أكاديميتي؟",
    answer:
      "تتيح لك منصة سيان تقديم مجموعة متنوعة من المحتوى التعليمي بما في ذلك مقاطع الفيديو، والملفات الصوتية، والعروض التقديمية، والمستندات النصية، والاختبارات التفاعلية، ودورات تدريبية كاملة. كما يمكنك تنظيم المحتوى في وحدات ودروس لتسهيل عملية التعلم.",
  },
  {
    id: crypto.randomUUID(),
    question: "هل تقدم المنصة شهادات معتمدة؟",
    answer:
      "نعم، منصة سيان معتمدة من المركز الوطني للتعليم الإلكتروني في المملكة العربية السعودية، مما يتيح لك إصدار شهادات معتمدة للمتعلمين بعد إكمال الدورات التدريبية بنجاح. هذه الشهادات معترف بها رسمياً وتضيف قيمة حقيقية لمحتواك التعليمي.",
  },
  {
    id: crypto.randomUUID(),
    question: "هل توجد عمولة على مبيعات الدورات؟",
    answer:
      "تعتمد العمولة على نوع الباقة التي تشترك بها. الباقة المجانية تحتوي على نسبة عمولة أعلى، بينما تقل هذه النسبة في الباقات المدفوعة. يمكنك الاطلاع على تفاصيل العمولات المحددة لكل باقة من صفحة التسعير، وتختلف النسب بحسب حجم الأكاديمية ومستوى الاشتراك.",
  },
];

function LaunchAcademy() {
  return (
    <Layout>
      <main>
        <Hero />
        <About />
        <WhyUs />
        <Certification />
        <Stats />
        <GoalVision />
        {/* <Clients /> */}
        <Pricing />
        <FAQs faqItems={faqItems} />
      </main>
    </Layout>
  );
}

export default LaunchAcademy;
