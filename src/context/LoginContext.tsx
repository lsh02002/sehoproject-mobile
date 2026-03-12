import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { TaskResponseType } from "../types/type";

type LoginContextValue = {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  isMemuRefresh: boolean;
  setIsMenuRefresh: Dispatch<SetStateAction<boolean>>;
  isTaskOpen: boolean;
  setIsTaskOpen: Dispatch<SetStateAction<boolean>>;
  task: TaskResponseType | undefined;
  setTask: Dispatch<SetStateAction<TaskResponseType | undefined>>;  
};

export const LoginContext = createContext<LoginContextValue | undefined>(
  undefined,
);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isMemuRefresh, setIsMenuRefresh] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [task, setTask] = useState<TaskResponseType>();
  
  const value: LoginContextValue = {
    isLogin,
    setIsLogin,
    isMemuRefresh,
    setIsMenuRefresh,
    isTaskOpen,
    setIsTaskOpen,
    task,
    setTask,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export function useLogin() {
  const ctx = useContext(LoginContext);

  if (!ctx) throw new Error("useLogin must be used within <LoginProvider>");
  return ctx;
}
