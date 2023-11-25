import React from "react";
import MainSection from "src/components/MainSection";
import SideSection from "src/components/SideSection";
import MainLayout from "src/Layout/MainLayout";
import WriteFormModal from "~/components/WriteFormModal";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <section className="grid grid-cols-12">
        <MainSection />
        <SideSection />
      </section>
      <WriteFormModal />
    </MainLayout>
  );
};

export default HomePage;
