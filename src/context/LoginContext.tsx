import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { SprintResponseType, TaskResponseType } from "../types/type";

type LoginContextValue = {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  isMemuRefresh: boolean;
  setIsMenuRefresh: Dispatch<SetStateAction<boolean>>;
  isTaskOpen: boolean;
  setIsTaskOpen: Dispatch<SetStateAction<boolean>>;
  task: TaskResponseType | undefined;
  setTask: Dispatch<SetStateAction<TaskResponseType | undefined>>;  
  isSprintOpen: boolean;
  setIsSprintOpen: Dispatch<SetStateAction<boolean>>;
  sprint: SprintResponseType | undefined;
  setSprint: Dispatch<SetStateAction<SprintResponseType | undefined>>;
};

export const LoginContext = createContext<LoginContextValue | undefined>(
  undefined,
);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isMemuRefresh, setIsMenuRefresh] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [task, setTask] = useState<TaskResponseType>();
  const [isSprintOpen, setIsSprintOpen] = useState(false);
  const [sprint, setSprint] = useState<SprintResponseType>();
  
  const value: LoginContextValue = {
    isLogin,
    setIsLogin,
    isMemuRefresh,
    setIsMenuRefresh,
    isTaskOpen,
    setIsTaskOpen,
    task,
    setTask,
    isSprintOpen,
    setIsSprintOpen,
    sprint,
    setSprint,
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
