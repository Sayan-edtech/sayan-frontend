import Courses from "./components/Courses";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Layout from "./components/Layout";

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
