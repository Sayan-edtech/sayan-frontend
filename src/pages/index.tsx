import Courses from "@/features/home/components/Courses";
import Features from "@/features/home/components/Features";
import Hero from "@/features/home/components/Hero";
import Layout from "@/features/home/components/Layout";

function Home() {
  return (
    <Layout>
      <main>
        <Hero />
        <Features />
        <Courses />
      </main>
    </Layout>
  );
}

export default Home;
