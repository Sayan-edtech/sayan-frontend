import Courses from "@/features/home/components/Courses";
import Features from "@/features/home/components/Features";
import Hero from "@/features/home/components/Hero";
import HomeLayout from "@/features/home/components/HomeLayout";

function Home() {
  return (
    <HomeLayout>
      <main>
        <Hero />
        <Features />
        <Courses />
      </main>
    </HomeLayout>
  );
}

export default Home;
