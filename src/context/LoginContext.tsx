import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import {
  MilestoneResponseType,
  SprintResponseType,
  TaskResponseType,
} from "../types/type";

type LoginContextValue = {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  isMemuRefresh: boolean;
  setIsMenuRefresh: Dispatch<SetStateAction<boolean>>;
  isSideOpen: boolean;
  setIsSideOpen: Dispatch<SetStateAction<boolean>>;
  task: TaskResponseType | undefined;
  setTask: Dispatch<SetStateAction<TaskResponseType | undefined>>;
  sprint: SprintResponseType | undefined;
  setSprint: Dispatch<SetStateAction<SprintResponseType | undefined>>;
  milestone: MilestoneResponseType | undefined;
  setMilestone: Dispatch<SetStateAction<MilestoneResponseType | undefined>>;
  projectId: number | null;
  setProjectId: Dispatch<SetStateAction<number | null>>;

  resetLoginContext: () => void;
};

export const LoginContext = createContext<LoginContextValue | undefined>(
  undefined,
);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isMemuRefresh, setIsMenuRefresh] = useState(false);
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [task, setTask] = useState<TaskResponseType>();
  const [sprint, setSprint] = useState<SprintResponseType>();
  const [milestone, setMilestone] = useState<MilestoneResponseType>();
  const [projectId, setProjectId] = useState<number | null>(null);

  const resetLoginContext = () => {
    setIsLogin(false);
    setIsMenuRefresh(false);
    setIsSideOpen(false);
    setTask(undefined);
    setSprint(undefined);
    setMilestone(undefined);
    setProjectId(null);
  };

  const value: LoginContextValue = {
    isLogin,
    setIsLogin,
    isMemuRefresh,
    setIsMenuRefresh,
    isSideOpen,
    setIsSideOpen,
    task,
    setTask,
    sprint,
    setSprint,
    milestone,
    setMilestone,
    projectId,
    setProjectId,
    resetLoginContext,
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
