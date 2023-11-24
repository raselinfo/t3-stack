import { createContext, useState ,ReactNode,Dispatch} from "react";

type TGlobalContextType = {
  isWriteModalOpen: boolean;
  setIsWriteModalOpen: Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalContext = createContext<TGlobalContextType>({
  isWriteModalOpen: false,
  setIsWriteModalOpen: () => {
    throw new Error("setIsWriteModalOpen not implemented");
  },
});

type TGlobalContextProviderProps = {
  children: ReactNode;
};

const GlobalContextProvider = ({ children }: TGlobalContextProviderProps) => {

  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={{
        isWriteModalOpen,
        setIsWriteModalOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};


export default GlobalContextProvider;