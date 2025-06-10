import About from "@/features/launch-academy/components/About";
import Hero from "@/features/launch-academy/components/Hero";
import WhyUs from "@/features/launch-academy/components/WhyUs";
import Certification from "@/features/launch-academy/components/Certification";
import Stats from "@/features/launch-academy/components/Stats";
import GoalVision from "@/features/launch-academy/components/GoalVision";
import Clients from "@/features/launch-academy/components/Clients";
import Layout from "@/features/launch-academy/components/Layout";
import Pricing from "@/features/launch-academy/components/Pricing";
import FAQs from "@/features/launch-academy/components/FAQs";

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
        <Clients />
        <Pricing />
        <FAQs />
      </main>
    </Layout>
  );
}

export default LaunchAcademy;
