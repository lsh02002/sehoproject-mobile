import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
} from "react";

type ScrollPositionType = {
  x: number;
  y: number;
};

type ScrollContextValue = {
  scroll: ScrollPositionType;
  setScroll: Dispatch<SetStateAction<ScrollPositionType>>;
};

export const ScrollContext = createContext<ScrollContextValue | undefined>(
  undefined,
);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [scroll, setScroll] = useState<ScrollPositionType>({ x: 0, y: 0 });

  const value: ScrollContextValue = useMemo(
    () => ({ scroll, setScroll }),
    [scroll],
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};

export function useScroll() {
  const ctx = useContext(ScrollContext);

  if (!ctx) throw new Error("useLogin must be used within <LoginProvider>");
  return ctx;
}
