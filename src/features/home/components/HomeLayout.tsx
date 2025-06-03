import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

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
