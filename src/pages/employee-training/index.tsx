import Layout from "../components/Layout";
import Hero from "./components/Hero";
function Ai() {
  return (
    <Layout>
      <main
        style={{
          background:
            "linear-gradient(156.58deg, rgba(15, 232, 232, 0.33) 17.14%, rgba(217, 217, 217, 0) 75.12%",
        }}
        className="pt-44 pb-20"
      >
        <Hero />
      </main>
    </Layout>
  );
}

export default Ai;
