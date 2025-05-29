import Header from "../../components/shared/header";
import Footer from "../../components/shared/footer";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default HomeLayout;
