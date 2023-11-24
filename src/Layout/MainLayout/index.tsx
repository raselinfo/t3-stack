import React from "react";
import Header from "src/components/Header"
type TProps={
  children:React.ReactNode
}
const index: React.FC<TProps> = ({ children }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      {children}
    </div>
  );
};

export default index;
