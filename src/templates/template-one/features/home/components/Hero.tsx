import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: { opacity: 1, scale: 1, rotate: 0 },
};

export default function Hero() {
  return (
    <section id="home" className="pt-[15vh] lg:pt-[20vh] pb-16">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-20 xl:gap-30 items-center">
          <div className="flex flex-col gap-6 py-8 lg:py-16">
            <h1 className="text-4xl lg:text-3xl font-bold leading-tight text-foreground">
              المدرب عبدالرحمن .
            </h1>
            <p className="text-lg lg:text-lg text-muted-foreground leading-relaxed">
              المدرب عبدالرحمن يتميز بشغفه الكبير في نقل المعرفة وتمكين الآخرين،
              بخبرة عملية تجمع بين التدريب والتطوير الشخصي والمهني. عرف بأسلوبه
              المبسط والجاذب، وقدرته على تحفيز المتدربين لتحقيق أهدافهم بثقة
              وفعالية. ترك بصمة واضحة في مسيرته التدريبية من خلال تقديم برامج
              عالية الجودة تُلهم وتُحدث فرقاً حقيقياً.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                to="/auth/signup"
                className={`${buttonVariants({ size: "lg" })} bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-300 ease-in-out hover:scale-105 rounded-full font-bold px-8`}
              >
                مدونتي
              </Link>
              <Link
                to="/auth/signup"
                className={`${buttonVariants({
                  size: "lg",
                  variant: "outline",
                })} border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-transform duration-300 ease-in-out hover:scale-105 rounded-full font-bold px-8`}
              >
                قناتي في اليوتيوب
              </Link>
            </div>
          </div>
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="https://www.sayan-server.com/uploads/academies/sliders/FT288bmUcvJCtXwng9s9.png"
              alt="Hero"
              loading="eager"
              className="w-full h-auto object-contain rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
