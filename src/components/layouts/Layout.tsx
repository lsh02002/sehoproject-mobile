import React, { useEffect } from "react";
import { Menu } from "lucide-react";
import SidebarMenu from "./MyMenu";
import { useLogin } from "../../context/LoginContext";
import TaskEditPage from "../../pages/task/TaskEditPage";
import TaskCreatePage from "../../pages/task/TaskCreatePage";
import SprintEditPage from "../../pages/sprint/SprintEditPage";
import SprintCreatePage from "../../pages/sprint/SprintCreatePage";
import { BackwardButton } from "../form/BackwardButton";

export type NavItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

interface Props {
  appName?: string;
  navItems?: NavItem[];
  children: React.ReactNode;
}

export default function Layout({
  appName = "앱",
  navItems = [],
  children,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const { isMemuRefresh, setIsMenuRefresh, isTaskOpen, setIsTaskOpen, task } =
    useLogin();

  const { isSprintOpen, setIsSprintOpen, sprint } = useLogin();

  useEffect(() => {
    if (open) setIsMenuRefresh(!isMemuRefresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const firstLinkRef = React.useRef<HTMLAnchorElement | null>(null);

  React.useEffect(() => {
    if (open && firstLinkRef.current) firstLinkRef.current.focus();
  }, [open]);

  return (
    <div className="min-vh-100 bg-white text-dark">
      <a
        href="#main"
        className="position-absolute"
        style={{ left: "-9999px", top: "-9999px" }}
      >
        본문으로 건너뛰기
      </a>

      <button
        className="btn bg-white shadow-sm position-fixed d-inline-flex align-items-center justify-content-center p-0"
        style={{
          top: 12,
          left: 12,
          zIndex: 50,
          width: 40,
          height: 40,
          borderRadius: 16,
        }}
        aria-label="메뉴 열기"
        aria-expanded={open}
        aria-controls="side-nav"
        onClick={() => setOpen(true)}
      >
        <Menu style={{ width: 20, height: 20 }} />
      </button>

      <div
        role="presentation"
        className="position-fixed top-0 start-0 w-100 h-100"
        onClick={() => {
          setOpen(false);
          setIsTaskOpen(false);
          setIsSprintOpen(false);
        }}
        aria-hidden={!(open || isTaskOpen || isSprintOpen)}
        style={{
          background: "rgba(0, 0, 0, 0.32)",
          opacity: open || isTaskOpen || isSprintOpen ? 1 : 0,
          pointerEvents: open || isTaskOpen || isSprintOpen ? "auto" : "none",
          transition: "opacity 160ms ease",
          zIndex: 40,
        }}
      />

      <aside
        id="side-nav"
        aria-hidden={!open}
        className="position-fixed top-0 start-0 bg-white shadow"
        style={{
          zIndex: 45,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 220ms ease",
        }}
      >
        <div className="d-flex align-items-center justify-content-between border-bottom px-3 w-100">
          <h2 className="m-0 fs-6 fw-bold">{appName}</h2>
          <button
            className="btn border-0 bg-transparent fs-3 text-secondary px-1 py-0"
            onClick={() => setOpen(false)}
            aria-label="메뉴 닫기"
          >
            ×
          </button>
        </div>

        <nav
          className="w-100 p-2 overflow-auto"
          role="navigation"
          aria-label="주 메뉴"
          style={{
            flex: 1,
            minHeight: 0,
            marginBottom: 80,
            maxWidth: 640,
            scrollbarWidth: "thin",
          }}
        >
          <SidebarMenu open={open} setOpen={setOpen} />
        </nav>
      </aside>

      <aside
        id="side-nav"
        aria-hidden={!isTaskOpen}
        className="position-fixed start-0 end-0 bottom-0 w-100 bg-white shadow d-flex flex-column align-items-center overflow-hidden"
        style={{
          top: 200,
          zIndex: 45,
          borderRadius: "20px 20px 0 0",
          transform: isTaskOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 220ms ease",
        }}
      >
        <div className="d-flex align-items-center justify-content-between border-bottom px-3 w-100">
          <h2 className="m-0 fs-6 fw-bold">태스크 창</h2>
          <button
            className="btn border-0 bg-transparent fs-3 text-secondary px-1 py-0"
            onClick={() => setIsTaskOpen(false)}
            aria-label="메뉴 닫기"
          >
            ×
          </button>
        </div>

        <nav
          className="w-100 p-2 overflow-auto"
          role="navigation"
          aria-label="주 메뉴"
          style={{
            flex: 1,
            minHeight: 0,
            marginBottom: 80,
            maxWidth: 640,
            scrollbarWidth: "thin",
          }}
        >
          {task ? (
            <TaskEditPage windowOpenTaskId={task?.id} />
          ) : (
            <TaskCreatePage />
          )}
        </nav>
      </aside>

      <aside
        id="side-nav"
        aria-hidden={!isSprintOpen}
        className="position-fixed start-0 end-0 bottom-0 w-100 bg-white shadow d-flex flex-column align-items-center overflow-hidden"
        style={{
          top: 200,
          zIndex: 45,
          borderRadius: "20px 20px 0 0",
          transform: isSprintOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 220ms ease",
        }}
      >
        <div className="d-flex align-items-center justify-content-between border-bottom px-3 w-100">
          <h2 className="m-0 fs-6 fw-bold">스프린트 창</h2>
          <button
            className="btn border-0 bg-transparent fs-3 text-secondary px-1 py-0"
            onClick={() => setIsSprintOpen(false)}
            aria-label="메뉴 닫기"
          >
            ×
          </button>
        </div>

        <nav
          className="w-100 p-2 overflow-auto"
          role="navigation"
          aria-label="주 메뉴"
          style={{
            flex: 1,
            minHeight: 0,
            marginBottom: 80,
            maxWidth: 640,
            scrollbarWidth: "thin",
          }}
        >
          {sprint ? (
            <SprintEditPage windowOpenSprintId={sprint?.id} />
          ) : (
            <SprintCreatePage />
          )}
        </nav>
      </aside>

      <header
        className="sticky-top border-bottom"
        style={{
          zIndex: 30,
          height: 56,
          backdropFilter: "blur(6px)",
          background: "rgba(255, 255, 255, 0.85)",
        }}
      >
        <div
          className="h-100 d-flex align-items-center justify-content-center mx-auto px-5"
          style={{ maxWidth: 640 }}
        >
          <strong className="small text-secondary">{appName}</strong>
        </div>
      </header>

      <main
        id="main"
        className="mx-auto"
        style={{
          maxWidth: 640,
          paddingBottom: 100,
        }}
      >
        <BackwardButton />
        {children}
      </main>

      <LockBodyScroll when={open || isTaskOpen} />
    </div>
  );
}

function LockBodyScroll({ when }: { when: boolean }) {
  React.useEffect(() => {
    if (!when) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [when]);
  return null;
}
