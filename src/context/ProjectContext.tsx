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
  clearProjectIdLocal: () => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(() =>
    localStorage.getItem("userId"),
  );

  const storageKey = userId ? `projectIdLocal:${userId}` : "projectIdLocal";  

  const [projectIdLocal, setProjectIdState] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    setProjectIdState(stored ? Number(stored) : null);    
  }, [storageKey]);

  const setProjectIdLocal = (id: number | null) => {
    if (id === null) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, String(id));
    }

    setProjectIdState(id);
  };

  const clearProjectIdLocal = () => {
    localStorage.removeItem(storageKey);
    setProjectIdState(null);
  };

  useEffect(() => {
    const handleUserIdChange = () => {
      setUserId(localStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleUserIdChange);
    window.addEventListener("userIdChanged", handleUserIdChange);

    return () => {
      window.removeEventListener("storage", handleUserIdChange);
      window.removeEventListener("userIdChanged", handleUserIdChange);
    };
  }, [storageKey]);

  return (
    <ProjectContext.Provider
      value={{
        projectIdLocal,
        setProjectIdLocal,
        clearProjectIdLocal,
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
