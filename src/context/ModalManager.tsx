import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ModalName = string;

type ModalManagerContextValue = {
  openModals: ModalName[];
  topModal: ModalName | null;
  isOpen: (name: ModalName) => boolean;
  openModal: (name: ModalName) => void;
  closeTopModal: () => void;  
  closeModal: (name: ModalName) => void;
  closeAllModals: () => void;
};

const ModalManagerContext = createContext<ModalManagerContextValue | null>(
  null,
);

export function ModalManager({ children }: { children: React.ReactNode }) {
  const [openModals, setOpenModals] = useState<ModalName[]>([]);
  const stackRef = useRef<ModalName[]>([]);
  const isHandlingPopRef = useRef(false);

  const syncStack = useCallback((nextStack: ModalName[]) => {
    stackRef.current = nextStack;
    setOpenModals(nextStack);
  }, []);

  const openModal = useCallback((name: ModalName) => {
    const nextStack = [...stackRef.current, name];

    stackRef.current = nextStack;
    setOpenModals(nextStack);

    window.history.pushState({ modal: name }, "");
  }, []);

  const closeTopModal = useCallback(() => {
    if (stackRef.current.length === 0) return;

    const nextStack = stackRef.current.slice(0, -1);
    syncStack(nextStack);

    if (!isHandlingPopRef.current && window.history.state?.modal) {
      window.history.back();
    }
  }, [syncStack]);

  const closeModal = useCallback((name: ModalName) => {
    const top = stackRef.current.at(-1);

    if (top !== name) return;

    window.history.back();
  }, []);

  const closeAllModals = useCallback(() => {
    const count = stackRef.current.length;
    if (count === 0) return;

    syncStack([]);

    // history도 쌓인 만큼 뒤로 이동
    window.history.go(-count);
  }, [syncStack]);

  useEffect(() => {
    const handlePopState = () => {
      isHandlingPopRef.current = true;

      const nextStack = stackRef.current.slice(0, -1);
      syncStack(nextStack);

      queueMicrotask(() => {
        isHandlingPopRef.current = false;
      });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [syncStack]);

  const value = useMemo<ModalManagerContextValue>(() => {
    const topModal = openModals.at(-1) ?? null;

    return {
      openModals,
      topModal,
      isOpen: (name) => openModals.includes(name),
      openModal,
      closeTopModal,
      closeModal,
      closeAllModals,
    };
  }, [openModals, openModal, closeTopModal, closeModal, closeAllModals]);

  return (
    <ModalManagerContext.Provider value={value}>
      {children}
    </ModalManagerContext.Provider>
  );
}

export function useModalManager() {
  const context = useContext(ModalManagerContext);

  if (!context) {
    throw new Error("useModalManager must be used inside ModalManager");
  }

  return context;
}
