import React from "react";
import Header from "@/templates/template-one/components/header";
import Footer from "@/templates/template-one/components/footer";
import CustomCSSProvider from "@/features/template/components/CustomCSSProvider";

interface HomeLayoutProps {
  children: React.ReactNode;
  customCSS?: string;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children, customCSS }) => {
  return (
    <CustomCSSProvider customCSS={customCSS}>
      <Header />
      {children}
      <Footer />
    </CustomCSSProvider>
  );
};

export default HomeLayout;
