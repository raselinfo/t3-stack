import React, { useContext, useState } from "react";
import MainSection from "src/components/MainSection";
import SideSection from "src/components/SideSection";
import MainLayout from "src/Layout/MainLayout";
import Modal from "@components/Modal"
import { GlobalContext } from "~/context/GlobalContextProvider";

const HomePage: React.FC = () => {
  const {isWriteModalOpen,setIsWriteModalOpen}=useContext(GlobalContext)
  return (
    <MainLayout>
      <section className="grid grid-cols-12">
        <MainSection />
        <SideSection />
      </section>
      <Modal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        // title="Create Post"
      >
        <h1>Hello modal</h1>
      </Modal>
    </MainLayout>
  );
};

export default HomePage;
