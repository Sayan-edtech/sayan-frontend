import FAQs from "../features/home/components/faqs";
import Features from "../features/home/components/Features";
import Hero from "../features/home/components/Hero";
import HomeLayout from "../features/home/components/HomeLayout";
import Testimonials from "../features/home/components/Testimonials";
import { motion } from "framer-motion";
import Courses from "@/features/home/components/Courses";
import useAcademySettings from "@/hooks/useAcademySettings";
import "swiper/css";
import "swiper/css/navigation";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

function Home() {
  const { settings } = useAcademySettings();
  
  return (
    <HomeLayout customCSS={settings.customCSS}>
      <main className="bg-[rgb(249_250_251)]">
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
          <Features />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Courses />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Testimonials />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FAQs />
        </motion.div>
      </main>
    </HomeLayout>
  );
}

export default Home;
