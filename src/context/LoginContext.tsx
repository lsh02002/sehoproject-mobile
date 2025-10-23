import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type LoginContextValue = {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  isMemuRefresh: boolean;
  setIsMenuRefresh: Dispatch<SetStateAction<boolean>>;
};

export const LoginContext = createContext<LoginContextValue | undefined>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isMemuRefresh, setIsMenuRefresh] = useState(false);

  const value: LoginContextValue = { isLogin, setIsLogin, isMemuRefresh, setIsMenuRefresh };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export function useLogin() {
  const ctx = useContext(LoginContext);

  if (!ctx) throw new Error("useLogin must be used within <LoginProvider>");
  return ctx;
}