import { useRef } from "react";
import { layout } from "../../theme/Theme";

type SlideSidePanelProps = {
  title: string;
  children: React.ReactNode;
  direction?: "left" | "right" | "bottom";
  zIndex?: number;
  name: string;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};

const SlideSidePanel = ({
  title,
  children,
  direction = "right",
  zIndex = 50,
  name,
  isOpen,
  setIsOpen,
}: SlideSidePanelProps) => {
  const isRight = direction === "right";

  const sidebarRef = useRef<HTMLElement | null>(null);

  const closePanel = () => {
    const activeElement = document.activeElement;

    if (
      activeElement instanceof HTMLElement &&
      sidebarRef.current?.contains(activeElement)
    ) {
      activeElement.blur();
    }

    setIsOpen(false);
  };

  return (
    <aside
      ref={sidebarRef}
      // aria-hidden={!isOpenPanel}
      className="position-fixed bg-white d-flex flex-column start-0"
      style={{
        top: 55,
        zIndex,
        width: isRight ? "100%" : "300px",
        borderRadius: 0,
        transform: isRight
          ? isOpen
            ? "translateX(0)"
            : "translateX(100%)"
          : isOpen
            ? "translateX(0)"
            : "translateX(-100%)",
        transition: "transform 220ms ease",
      }}
    >
      <div
        className="d-flex align-items-center justify-content-between border-bottom px-3"
        style={{ width: isRight ? "100%" : "300px" }}
      >
        <h2 className="m-0 fs-6 fw-bold">{title}</h2>

        <button
          type="button"
          className="btn border-0 bg-transparent fs-3 text-secondary px-1 py-0"
          onClick={closePanel}
          aria-label="닫기"
        >
          ×
        </button>
      </div>

      <div
        className="p-2 d-flex justify-content-center overflow-y-scroll"
        style={{ width: isRight ? "100%" : "300px" }}
      >
        <nav
          role="navigation"
          style={{
            flex: 1,
            minHeight: 0,
            marginBottom: 80,
            width: isRight ? "100%" : "300px",
            height: "calc(100vh - 190px)",
            scrollbarWidth: "thin",
            maxWidth: layout.maxWidth,
          }}
        >
          <div style={{ paddingBottom: 200 }}>{children}</div>
        </nav>
      </div>
    </aside>
  );
};

export default SlideSidePanel;
