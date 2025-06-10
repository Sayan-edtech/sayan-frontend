import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
