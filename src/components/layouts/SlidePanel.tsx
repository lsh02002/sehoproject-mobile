import { layout } from "../../theme/Theme";

type SlidePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  direction?: "left" | "right" | "bottom";
  zIndex?: number;
};

const SlidePanel = ({
  isOpen,
  onClose,
  title,
  children,
  direction = "right", // "left" | "bottom"
  zIndex = 50,
}: SlidePanelProps) => {
  const isRight = direction === "right";

  return (
    <aside
      aria-hidden={!isOpen}
      className={`position-fixed bg-white shadow d-flex flex-column ${isRight ? "start-0" : "start-0"}`}
      style={{
        top: 55,
        zIndex: zIndex,
        width: isRight ? "100%" : "300px",
        borderRadius: isRight ? 0 : "20px 20px 0 0",
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
      {/* header */}
      <div
        className="d-flex align-items-center justify-content-between border-bottom px-3"
        style={{ width: isRight ? "100%" : "300px" }}
      >
        <h2 className="m-0 fs-6 fw-bold">{title}</h2>
        <button
          className="btn border-0 bg-transparent fs-3 text-secondary px-1 py-0"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>
      </div>

      {/* body */}
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

export default SlidePanel;
