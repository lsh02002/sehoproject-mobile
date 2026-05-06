import React, { useEffect } from "react";
import SidebarMenu from "./MyMenu";
import { useLogin } from "../../context/LoginContext";
import TaskEditPage from "../../pages/task/TaskEditPage";
import TaskCreatePage from "../../pages/task/TaskCreatePage";
import SprintEditPage from "../../pages/sprint/SprintEditPage";
import SprintCreatePage from "../../pages/sprint/SprintCreatePage";
import { BackwardButton } from "../form/BackwardButton";
import SlidePanel from "./SlidePanel";
import { layout } from "../../theme/theme";
import MilestoneEditPage from "../../pages/milestone/MilestoneEditPage";
import MilestoneCreatePage from "../../pages/milestone/MilestoneCreatePage";
import SlideSidePanel from "./SlideSidePanel";
import { useModalManager } from "../../context/ModalContext";
import ScrollToTopButton from "../form/ScrollToTopButton";
import { SideMenuButton } from "./SideMenuButton";

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
    setIsMenuRefresh,
    task,
    sprint,
    milestone,
    isSideOpen,
    setIsSideOpen,
  } = useLogin();

  const { openModal, closeModal, hasOpenModal } = useModalManager();

  useEffect(() => {
    if (isSideOpen) setIsMenuRefresh((prev) => !prev);
  }, [isSideOpen, setIsMenuRefresh]);

  return (
    <div className="min-vh-100 text-dark">
      <SideMenuButton
        isSideOpen={isSideOpen}
        onOpen={() => {
          openModal("side");
          setIsSideOpen(true);
        }}
      />
      <div
        role="presentation"
        className="position-fixed start-0 w-100 h-100"
        style={{
          top: 55,
          zIndex: 150,
          background: "rgba(0, 0, 0, 0.32)",
          opacity: isSideOpen ? 1 : 0,
          pointerEvents: isSideOpen ? "auto" : "none",
          transition: "opacity 160ms ease",
        }}
        onClick={() => {
          closeModal("side");
          setIsSideOpen(false);
        }}
        aria-hidden={!isSideOpen}
      />
      <SlideSidePanel
        isSideOpen={isSideOpen}
        setIsSideOpen={setIsSideOpen}
        title="사이드 창"
        zIndex={200}
        direction="left"
        name="side"
      >
        <SidebarMenu open={isSideOpen} />
      </SlideSidePanel>

      <SlidePanel title="태스크 창" zIndex={100} name="task">
        {task ? (
          <TaskEditPage windowOpenTaskId={task?.id} />
        ) : (
          <TaskCreatePage />
        )}
      </SlidePanel>

      <SlidePanel title="스프린트 창" zIndex={100} name="sprint">
        {sprint ? (
          <SprintEditPage windowOpenSprintId={sprint?.id} />
        ) : (
          <SprintCreatePage />
        )}
      </SlidePanel>

      <SlidePanel title="마일스톤 창" zIndex={100} name="milestone">
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
        {!hasOpenModal && <ScrollToTopButton />}
        {children}
      </main>
    </div>
  );
}
