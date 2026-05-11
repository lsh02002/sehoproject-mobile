// ProjectContext.tsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type ProjectContextType = {
  projectIdLocal: number | null;
  setProjectIdLocal: (id: number | null) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projectIdLocal, setProjectIdState] = useState<number | null>(() => {
    const stored = localStorage.getItem("projectId");
    return stored ? Number(stored) : null;
  });

  const setProjectIdLocal = (id: number | null) => {
    localStorage.setItem("projectId", String(id));
    setProjectIdState(id);
  };

  // 다른 탭 동기화
  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem("projectId");

      setProjectIdState(stored ? Number(stored) : null);
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projectIdLocal,
        setProjectIdLocal,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProject must be used within ProjectProvider");
  }

  return context;
};
