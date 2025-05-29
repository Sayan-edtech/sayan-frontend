import Courses from "./components/Courses";
import Features from "./components/Features";
import Hero from "./components/Hero";
import HomeLayout from "./components/HomeLayout";

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
