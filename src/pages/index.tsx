import React from "react";
import MainSection from "src/components/MainSection";
import SideSection from "src/components/SideSection";
import MainLayout from "src/Layout/MainLayout"


const Index: React.FC = () => {
  return (
    <MainLayout>
      <section className="grid grid-cols-12">
        <MainSection />
        <SideSection />
      </section>
    </MainLayout>
  );
};

export default Index;
