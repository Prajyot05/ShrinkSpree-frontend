import { createContext, useContext, useState, ReactNode } from "react";

interface ContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
}

const ContextApi = createContext<ContextProps | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.parse(localStorage.getItem("JWT_TOKEN")!)
    : null;

  const [token, setToken] = useState<string | null>(getToken);

  const sendData = { token, setToken };

  return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>;
};

export const useStoreContext = (): ContextProps => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("useStoreContext must be used within a ContextProvider");
  }
  return context;
};
