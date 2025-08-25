import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { FaCheckCircle } from "react-icons/fa";

function Terms() {
  return (
    <>
      <Header />
      <main className="pt-30 pb-20 bg-gradient-to-br from-[#eaf6fb] to-[#f9fafc] min-h-screen">
        <div className="max-w-[850px] mx-auto mt-10 px-8 py-10 bg-white shadow-[0_6px_32px_0_rgba(50,100,150,0.10),0_1.5px_3px_rgba(80,100,150,0.10)] rounded-[20px] sm:px-8 sm:py-9">
          <h1 className="text-center text-[#174066] mt-0 pt-[35px] text-4xl font-bold tracking-wide mb-6 sm:text-[1.7rem]">
            الشروط والاحكام وسياسة الخصوصية
          </h1>
          <h2 className="text-center mb-9 mt-3 text-[#2196f3] text-[1.35rem] font-medium tracking-wide sm:text-[1.1rem] sm:mb-6 sm:leading-[1.7]">
            شروط وأحكام استخدام منصة سيان
          </h2>

          <h3 className="text-[#2196f3] text-[1.08rem] font-bold mt-9 mb-3 tracking-wide border-r-4 border-[#e3f0fa] pr-3 sm:text-base sm:mt-6 sm:mb-3">
            مقدمة
          </h3>
          <p className="text-[1.1rem] text-[#333] leading-[1.7] my-5 px-3 pt-3">
            شروط وأحكام استخدام منصة سيان باستخدام منصة سيان، فإنك توافق على هذه
            الشروط والأحكام، والتي قد يتم تحديثها دوريًا. تلتزم سيان بحماية
            الحقوق الفكرية وضمان جودة المحتوى وفقًا للأنظمة والسياسات الوطنية.
            يُمنع نشر أي محتوى مخالف، ويحق للمنصة حذف أو إيقاف أي حساب ينتهك
            القواعد. لا تتحمل سيان مسؤولية الأعطال التقنية الناتجة عن ظروف خارجة
            عن إرادتها. يحق لـسيان تعديل الشروط دون إشعار مسبق، ويعد استمرار
            الاستخدام موافقة على التعديلات.
          </p>

          <h3 className="text-[#2196f3] text-[1.08rem] font-bold mt-9 mb-3 tracking-wide border-r-4 border-[#e3f0fa] pr-3 sm:text-base sm:mt-6 sm:mb-3">
            الامتثال
          </h3>
          <ul className="list-none p-0 m-0">
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                كلمة المرور: أنت مسؤول عن أمان حسابك، ويجب إبلاغنا فورًا عند أي
                اختراق. لا نتحمل مسؤولية أي خسائر ناتجة عن إهمال كلمة المرور.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                معلومات الحساب: يجب تحديث بيانات الحساب باستمرار، بما في ذلك
                البريد الإلكتروني ووسائل الدفع.
              </span>
            </li>
          </ul>

          <h3 className="text-[#2196f3] text-[1.08rem] font-bold mt-9 mb-3 tracking-wide border-r-4 border-[#e3f0fa] pr-3 sm:text-base sm:mt-6 sm:mb-3">
            سياسة الخصوصية والأمان
          </h3>
          <p className="text-[1.1rem] text-[#333] leading-[1.7] my-5 px-3 pt-3">
            سياسة الخصوصية والأمان: تلتزم سيان بحماية خصوصيتك، ويتم استخدام
            بياناتك وفقًا لسياسة الخصوصية المعتمدة. جميع المعلومات الشخصية وغير
            الشخصية محفوظة بأمان، وتخضع للقوانين المنظمة لحماية البيانات.
          </p>

          <h3 className="text-[#2196f3] text-[1.08rem] font-bold mt-9 mb-3 tracking-wide border-r-4 border-[#e3f0fa] pr-3 sm:text-base sm:mt-6 sm:mb-3">
            زوار الموقع والمعلومات التعريفية
          </h3>
          <p className="text-[1.1rem] text-[#333] leading-[1.7] my-5 px-3 pt-3">
            زوار الموقع والمعلومات التعريفية: تجمع سيان بيانات غير شخصية مثل نوع
            المتصفح وتاريخ الزيارة لفهم سلوك المستخدمين وتحسين التجربة، دون نشر
            أي معلومات شخصية. نلتزم بحماية خصوصية المستخدمين، ولا نشارك بياناتهم
            الشخصية إلا وفق المتطلبات القانونية، أو لتحسين خدماتنا وتقديم تجربة
            أفضل، أو لاستطلاع الآراء حول المنصة وعرض الإعلانات المتعلقة بها.
          </p>

          <h3 className="text-[#2196f3] text-[1.08rem] font-bold mt-9 mb-3 tracking-wide border-r-4 border-[#e3f0fa] pr-3 sm:text-base sm:mt-6 sm:mb-3">
            الملكية الفكرية وحقوق النشر
          </h3>
          <ul className="list-none p-0 m-0">
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                تحترم سيان حقوق الملكية الفكرية وتلتزم بحمايتها، كما يُحظر نشر
                أي محتوى غير مرخص أو ينتهك حقوق النشر. جميع النصوص، الرسومات،
                الشعارات، الأسماء، والوظائف في سيان هي ملك حصري للمنصة ومحمية
                بالقوانين المعمول بها. لا يجوز نسخ أو إعادة إنتاج أو توزيع أي
                محتوى دون إذن كتابي مسبق. يحق للزوار عرض المحتوى، لكنه يظل
                مملوكًا لـسيان أو الجهات المرخصة. يُمنع نشر أي محتوى يسيء
                للأفراد أو الجهات، أو يخالف القيم الإسلامية والأخلاقية، أو يؤثر
                سلبًا على الوحدة الوطنية.
              </span>
            </li>
          </ul>

          <h3 className="text-[#2196f3] text-[1.08rem] font-bold mt-9 mb-3 tracking-wide border-r-4 border-[#e3f0fa] pr-3 sm:text-base sm:mt-6 sm:mb-3">
            الرسوم، التسعير، والمدفوعات
          </h3>
          <p className="text-[1.1rem] text-[#333] leading-[1.7] my-5 px-3 pt-3">
            الرسوم، التسعير، والمدفوعات تسجيل الحساب في سيان مجاني، لكن قد تتغير
            هذه السياسة مستقبلاً. نحتفظ بالحق في تعديل أو فرض رسوم على بعض
            الخدمات، وتكون جميع الأسعار بالريال السعودي، سيان تحدد الاسعار، وقد
            يتم تعديلها بالزيادة أو النقصان وفقًا للسياسات المعتمدة.
          </p>

          <h3 className="text-[#2196f3] text-[1.08rem] font-bold mt-9 mb-3 tracking-wide border-r-4 border-[#e3f0fa] pr-3 sm:text-base sm:mt-6 sm:mb-3">
            سياسة استرجاع المال
          </h3>
          <ul className="list-none p-0 m-0">
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                جميع المدفوعات نهائية وغير قابلة للاسترجاع النقدي، إلا في
                الحالات المؤهلة وحسب تقديرنا.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                قد يتم النظر في إعادة الأموال في حال إلغاء أو تأجيل الدورة، أو
                خصم المبلغ مرتين بالخطأ.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                عمليات الاسترجاع تخضع لموافقة سيان، وقد تُمنح كرصيد في حساب
                المستخدم للاستخدام المستقبلي.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                لا يتم استرجاع الأموال بسبب عدم ملاءمة العتاد التقني أو حذف
                الدورات لأسباب قانونية.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                المنصة لا تضمن دقة المحتوى أو ملاءمته لتوقعات المستخدم، ولن يتم
                استرجاع الأموال بناءً على ذلك.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                لا يحق للمستخدم طلب استرجاع المبلغ إذا لم يجتاز الدورة.
              </span>
            </li>
          </ul>

          <h3 className="text-[#2196f3] text-[1.08rem] font-bold mt-9 mb-3 tracking-wide border-r-4 border-[#e3f0fa] pr-3 sm:text-base sm:mt-6 sm:mb-3">
            الشهادات
          </h3>
          <p className="text-[1.1rem] text-[#333] leading-[1.7] my-5 px-3 pt-3">
            الشهادات تُصدر منصة سيان والمؤسسات المقدمة للدورات شهادات إتمام
            بناءً على تقديرها الخاص، وقد لا تُمنح شهادة لبعض الدورات وفقًا
            لمعاييرها. لا يتيح التسجيل أو إكمال الدورات على سيان التقدم لبرامج
            درجات أكاديمية في المؤسسات المقدمة لها. استخدام موارد الدورة يقتصر
            على نطاق المنصة فقط، ولا يمنح أي امتيازات إضافية للمستخدم.
          </p>

          <h3 className="text-[#2196f3] text-[1.08rem] font-bold mt-9 mb-3 tracking-wide border-r-4 border-[#e3f0fa] pr-3 sm:text-base sm:mt-6 sm:mb-3">
            سلوكيات الأعضاء والزوار
          </h3>
          <ul className="list-none p-0 m-0">
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                جميع الأنشطة التي تتم باستخدام حسابك تقع تحت مسؤوليتك.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                لا يجوز لك مشاركة محتوى غير قانوني، مسيء، أو ينتهك القيم
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                يمنع نشر محتوى إعلاني غير مرغوب فيه أو برمجيات خبيثة قد تضر
                بالمستخدمين أو الموقع.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                أي انتهاك للقوانين المحلية أو الدولية، بما في ذلك حقوق الملكية
                الفكرية، غير مسموح به.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>لا يجوز انتحال شخصية أي شخص أو جهة.</span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>يمنع التلاعب بالأسعار أو التدخل في قوائم الدورات.</span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                لا يُسمح بوضع روابط لمواقع أخرى دون إذن كتابي من سيان.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>يحظر تسويق منتجات أو خدمات غير قانونية.</span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                لا يجوز تعطيل أو تشويش عمل الموقع بأي طريقة، مثل الهجمات
                السبرانية.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                يمنع استخدام عناوين بريد إلكتروني أو IP مضللة لإخفاء المصدر
                الحقيقي لأي محتوى.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                لا تحاول الوصول غير القانوني لأنظمة المنصة أو إعادة تفعيل حساب
                تم إيقافه.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                يمنع جمع بيانات شخصية للأعضاء أو الزوار لأغراض تجارية أو غير
                قانونية.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                لا يجوز استخدام أدوات أوتوماتيكية لتنزيل بيانات الموقع، إلا في
                الحالات المصرح بها مثل محركات البحث وأدوات RSS.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                يجب الإبلاغ عن أي حساب ينتحل صفتك عبر البريد الإلكتروني [email
                protected].
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                التسجيل يصبح رسميًا بعد تفعيل الحساب عبر الرابط المرسل إلى بريدك
                الإلكتروني.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                يمنع استخدام الموقع لأي أغراض غير قانونية أو غير مصرح بها.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                أي محاولة للتأثير السلبي على تجربة المستخدمين الآخرين ستؤدي إلى
                إجراءات صارمة.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                سيان تحتفظ بحق تعديل هذه الشروط وفقًا لتقديرها، ويجب عليك
                الالتزام بها دائمًا.
              </span>
            </li>
          </ul>

          <h3 className="text-[#2196f3] text-[1.08rem] font-bold mt-9 mb-3 tracking-wide border-r-4 border-[#e3f0fa] pr-3 sm:text-base sm:mt-6 sm:mb-3">
            رفع محتوى غير مناسب
          </h3>
          <p className="text-[1.1rem] text-[#333] leading-[1.7] my-5 px-3 pt-3">
            رفع محتوى غير مناسب منصة سيان غير مسؤولة عن أي محتوى يرفعه الأعضاء،
            وجميع المخاطر المتعلقة به تقع على عاتقك. تحتفظ المنصة بالحق في
            مراقبة أو تعديل أو حذف أي محتوى دون سابق إنذار وفقًا لتقديرها.
          </p>

          <h3 className="text-[#2196f3] text-[1.08rem] font-bold mt-9 mb-3 tracking-wide border-r-4 border-[#e3f0fa] pr-3 sm:text-base sm:mt-6 sm:mb-3">
            المعلومات المالية
          </h3>
          <ul className="list-none p-0 m-0">
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                المعلومات المالية: أنت توافق على دفع رسوم الدورات التدريبية التي
                تشتريها، وتفوضنا لمعالجة الدفع عبر بطاقة الخصم/الائتمان أو وسائل
                أخرى بالتعاون مع شركاء معالجة الدفع الخارجيين.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                عند إجراء عملية شراء، يجب أن تكون طريقة الدفع صالحة ومصرح بها.
                في حال فشل الدفع، يتعين عليك سداد الرسوم المستحقة خلال 7 أيام من
                الإشعار، وإلا سنحتفظ بالحق في تعطيل الوصول للخدمة.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                المبالغ المدفوعة غير قابلة للاسترجاع أو الاستبدال إلا في حال عدم
                تقديم الخدمة بسبب عطل فني من طرفنا، وفي هذه الحالة يُحتفظ
                بالمبلغ كرصيد لاستخدامه خلال سنة واحدة فقط.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                نحتفظ بالحق في حظر حسابك أو تقييد استخدامك إذا اعتقدنا أنك تسيء
                استخدام سياسة الاستبدال أو تنتهك الشروط والإرشادات.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                في حال تم إيقاف حسابك بسبب انتهاكات، لن تكون مؤهلاً لأي استرداد
                أو تعويض.
              </span>
            </li>
            <li className="text-[1.07rem] text-[#384141] bg-[#f7fbfc] rounded-xl mb-4 px-5 py-4 shadow-[0_1px_7px_0_rgba(150,180,220,.07)] flex items-center gap-4 transition-colors duration-250 leading-[1.8] hover:bg-[#eaf4fd] sm:text-[0.98rem] sm:px-2 sm:py-3 sm:gap-3">
              <div className="mr-[-1.1rem] flex items-center text-[1.4em] text-[#1783bc]">
                <FaCheckCircle />
              </div>
              <span>
                جميع المعاملات تخضع لتقديرنا النهائي، ونعمل دائمًا على ضمان
                توفير خدمات آمنة وموثوقة.
              </span>
            </li>
          </ul>

          <h3 className="text-[#2196f3] text-[1.08rem] font-bold mt-9 mb-3 tracking-wide border-r-4 border-[#e3f0fa] pr-3 sm:text-base sm:mt-6 sm:mb-3">
            المعلومات الشخصية التعريفية
          </h3>
          <p className="text-[1.1rem] text-[#333] leading-[1.7] my-5 px-3 pt-3">
            المعلومات الشخصية التعريفية خصوصية الأعضاء والزوار تعد أولوية قصوى
            لمنصة سيان، ونلتزم بعدم مشاركة معلوماتكم الشخصية إلا في الحالات
            القانونية أو لتطوير خدماتنا وحماية حقوقنا. نجمع معلومات أساسية مثل
            الاسم، البريد الإلكتروني، ووسيلة الدفع لتمكين استخدام الموقع وإدارة
            الحسابات بشكل آمن وفعال. تُستخدم البيانات لتخصيص المحتوى، إرسال
            الإيصالات، تنفيذ الدفعات، واستطلاع آرائكم لتحسين خدماتنا. قد نرسل
            تحديثات عن الخدمات الجديدة أو الدورات عبر البريد الإلكتروني، مع
            إمكانية إلغاء الاشتراك في أي وقت. نشارك المعلومات مع أطراف ثالثة فقط
            عند الحاجة لتقديم الخدمات أو الامتثال للقوانين والتحقيقات الرسمية.
            يتم التعامل مع بيانات المستخدمين إلكترونياً وبسرية تامة، وليست متاحة
            إلا للأطراف المصرح لها داخل الشركة. نتعاون مع هيئات إنفاذ القانون
            عند طلب معلومات ضمن سياق التحقيقات الجنائية أو المدنية المتعلقة
            بالصالح العام. نحتفظ بحق استخدام المعلومات داخلياً لتحسين تجربتكم
            وتزويدكم بمحتوى يلبي احتياجاتكم. جميع المعاملات تخضع لأعلى معايير
            الأمان والشفافية لضمان ثقتكم المستمرة في خدماتنا.
          </p>

          <h3 className="text-[#2196f3] text-[1.08rem] font-bold mt-9 mb-3 tracking-wide border-r-4 border-[#e3f0fa] pr-3 sm:text-base sm:mt-6 sm:mb-3">
            إخلاء مسؤولية من الضمان
          </h3>
          <p className="text-[1.1rem] text-[#333] leading-[1.7] my-5 px-3 pt-3">
            إخلاء مسؤولية من الضمان منصة سيان وجميع الشركات والأطراف المرتبطة
            بها تقدم خدماتها "كما هي" دون أي ضمانات صريحة أو ضمنية، بما في ذلك
            ضمانات النتائج المرجوة من الدورات. استخدامك للخدمات يكون على
            مسؤوليتك الخاصة، ولا تتحمل المنصة أي مسؤولية عن مصداقية الأعضاء أو
            المحتوى.
          </p>

          <h3 className="text-[#2196f3] text-[1.08rem] font-bold mt-9 mb-3 tracking-wide border-r-4 border-[#e3f0fa] pr-3 sm:text-base sm:mt-6 sm:mb-3">
            سياسة الخصوصية
          </h3>
          <p className="text-[1.1rem] text-[#333] leading-[1.7] my-5 px-3 pt-3">
            سياسة الخصوصية توضح سياسة الخصوصية الحالية الإرشادات الداخلية لمنصة
            سيان حول إدارة معلومات المستخدمين، دون أن تشكل اتفاقًا قانونيًا أو
            ضمانًا لأي نوع. نستخدم ملفات الكوكيز لتحسين تجربتك من خلال تتبع
            الاستخدام وتحليل البيانات غير الشخصية مثل نوع المتصفح ونظام التشغيل
            ومزود الخدمة. هذه المعلومات تساعدنا على تحسين الموقع وتخصيصه لتلبية
            احتياجاتك بشكل أفضل. نحتفظ بالحق في تعديل هذه السياسة وفقًا لتقديرنا
            الخاص، مع التزامنا بحماية خصوصيتك دائمًا.
          </p>

          <hr className="border-gray-300" />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Terms;
