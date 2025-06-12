import Hero from "@/features/ai/components/Hero";
import Layout from "@/features/ai/components/Layout";
import FAQs from "@/components/shared/faqs";
import AiFeatures from "@/features/ai/components/AiFeatures";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

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

function Ai() {
  return (
    <Layout>
      <main>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Hero />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <AiFeatures />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FAQs faqItems={faqItems} />
        </motion.div>
      </main>
    </Layout>
  );
}

export default Ai;
