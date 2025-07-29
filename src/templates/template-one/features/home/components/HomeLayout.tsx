import Footer from "@/templates/template-one/components/footer";
import Header from "@/templates/template-one/components/header";
import { Helmet } from "react-helmet-async";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="This is the home page of our app." />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Helmet>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default HomeLayout;
