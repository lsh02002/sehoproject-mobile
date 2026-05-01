import React, { useCallback, useEffect } from "react";
import { Menu } from "lucide-react";
import SidebarMenu from "./MyMenu";
import { useLogin } from "../../context/LoginContext";
import TaskEditPage from "../../pages/task/TaskEditPage";
import TaskCreatePage from "../../pages/task/TaskCreatePage";
import SprintEditPage from "../../pages/sprint/SprintEditPage";
import SprintCreatePage from "../../pages/sprint/SprintCreatePage";
import { BackwardButton } from "../form/BackwardButton";
import SlidePanel from "./SlidePanel";
import { layout } from "../../theme/Theme";
import MilestoneEditPage from "../../pages/milestone/MilestoneEditPage";
import MilestoneCreatePage from "../../pages/milestone/MilestoneCreatePage";

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
  const {
    isMemuRefresh,
    setIsMenuRefresh,
    isSideOpen,
    setIsSideOpen,
    isTaskOpen,
    setIsTaskOpen,
    task,
    isSprintOpen,
    setIsSprintOpen,
    sprint,
    isMilestoneOpen,
    setIsMilestoneOpen,
    milestone,
  } = useLogin();

  useEffect(() => {
    if (isSideOpen) setIsMenuRefresh(!isMemuRefresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSideOpen]);

  const closeTopModal = useCallback(() => {
    if (isMilestoneOpen) return setIsMilestoneOpen(false);
    if (isSprintOpen) return setIsSprintOpen(false);
    if (isTaskOpen) return setIsTaskOpen(false);
    if (isSideOpen) return setIsSideOpen(false);
  }, [
    isMilestoneOpen,
    isSideOpen,
    isSprintOpen,
    isTaskOpen,
    setIsMilestoneOpen,
    setIsSideOpen,
    setIsSprintOpen,
    setIsTaskOpen,
  ]);

  useEffect(() => {
    const handlePopState = () => {
      closeTopModal();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSideOpen || isTaskOpen || isSprintOpen || isMilestoneOpen) {
      window.history.pushState({ modal: true }, "");
    }
  }, [isMilestoneOpen, isSideOpen, isSprintOpen, isTaskOpen]);

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
        aria-expanded={isSideOpen}
        aria-controls="side-nav"
        onClick={() => setIsSideOpen(true)}
      >
        <Menu style={{ width: 20, height: 20 }} />
      </button>

      <div
        role="presentation"
        className="position-fixed start-0 w-100 h-100"
        onClick={closeTopModal}
        aria-hidden={!isSideOpen}
        style={{
          top: 55,
          background: "rgba(0, 0, 0, 0.32)",
          opacity: isSideOpen ? 1 : 0,
          pointerEvents: isSideOpen ? "auto" : "none",
          transition: "opacity 160ms ease",
          zIndex: 10,
        }}
      />

      <SlidePanel
        isOpen={isSideOpen}
        onClose={closeTopModal}
        title={appName}
        direction="left"
        zIndex={50}
      >
        <SidebarMenu open={isSideOpen} setOpen={setIsSideOpen} />
      </SlidePanel>

      <SlidePanel
        isOpen={isTaskOpen}
        onClose={closeTopModal}
        title="태스크 창"
        zIndex={20}
      >
        {task ? (
          <TaskEditPage windowOpenTaskId={task?.id} />
        ) : (
          <TaskCreatePage />
        )}
      </SlidePanel>

      <SlidePanel
        isOpen={isSprintOpen}
        onClose={closeTopModal}
        title="스프린트 창"
        zIndex={20}
      >
        {sprint ? (
          <SprintEditPage windowOpenSprintId={sprint?.id} />
        ) : (
          <SprintCreatePage />
        )}
      </SlidePanel>

      <SlidePanel
        isOpen={isMilestoneOpen}
        onClose={closeTopModal}
        title="마일스톤 창"
        zIndex={20}
      >
        {milestone ? (
          <MilestoneEditPage windowOpenMilestoneId={milestone?.id} />
        ) : (
          <MilestoneCreatePage />
        )}
      </SlidePanel>

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
          style={{ maxWidth: layout.maxWidth }}
        >
          <strong className="small text-secondary">{appName}</strong>
        </div>
      </header>

      <main
        id="main"
        className="mx-auto"
        style={{
          maxWidth: layout.maxWidth,
          paddingBottom: 100,
        }}
      >
        <BackwardButton />
        {children}
      </main>
    </div>
  );
}
