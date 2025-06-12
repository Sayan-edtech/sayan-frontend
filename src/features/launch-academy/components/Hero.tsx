import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

function Hero() {
  return (
    <section
      style={{
        background:
          "linear-gradient(156.58deg, rgba(15, 232, 232, 0.33) 17.14%, rgba(217, 217, 217, 0) 75.12%)",
      }}
      className="pt-40 md:pb-20"
    >
      <div className="container mx-auto px-4">
        <div className="element-center gap-20">
          <motion.div
            className="w-32 h-32 md:w-52 md:h-52 hidden md:block"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            {...floatingAnimation}
          >
            <img
              src="/assets/images/launch-academy/stats2.png"
              alt="Statistics 2"
              loading="eager"
              className="w-full h-full object-contain"
            />
          </motion.div>
          <motion.div
            className="w-52 h-52 md:w-80 md:h-80"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            {...floatingAnimation}
          >
            <img
              src="/assets/images/launch-academy/book.png"
              alt="Book"
              loading="eager"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div
            className="w-32 h-32 md:w-52 md:h-52 hidden md:block"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            {...floatingAnimation}
          >
            <img
              src="/assets/images/launch-academy/stats.png"
              alt="Statistics"
              loading="eager"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-10">
            أطلق <span className="text-primary">أكاديميتك</span> بدقائق
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
            أطلق العنان لإبداعك وبدء رحلتك التعليمية الرقمية بكل سهولة مع منصة
            سيان! الآن، يمكنك تأسيس أكاديميتك الخاصة في غضون دقائق، بدون الحاجة
            لأي خبرة تقنية مسبقة. اكتشف قوة البساطة والفعالية في بناء وإدارة
            محتواك التعليمي مع سيان، حيث يصبح التعليم الرقمي تجربة ممتعة وسلسة.
          </p>

          <Link
            to={`${Routes.AUTH}/${Pages.SIGNIN}`}
            className={`${buttonVariants({
              size: "lg",
              className: "text-lg !rounded-[10px] max-w-full sm:w-fit mx-auto",
            })}`}
          >
            ابدا الان وانشئ منصتك الرقمية بشكل مجاني
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
