import { useEffect, useRef, useState } from "react";
import { SprintResponseType, TaskResponseType } from "../../../types/type";
import {
  getSprintsByAssigneeApi,
  getTasksByAssigneeApi,
} from "../../../api/sehomanagerapi";
import TasksByState from "../../../components/list/TasksByState";
import { GrInProgress } from "react-icons/gr";
import { SiGoogletasks } from "react-icons/si";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { GiSprint } from "react-icons/gi";
import SprintsByState from "../../../components/list/SprintsByState";
import { useScroll } from "../../../context/ScrollContext";

const TaskByAssigneePage = () => {
  const [myTasks, setMyTasks] = useState<TaskResponseType[]>([]);
  const [mySprints, setMySprints] = useState<SprintResponseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const boardRef = useRef<HTMLDivElement | null>(null);
  const { scroll, setScroll } = useScroll();

  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startScrollLeft = useRef(0);
  const startScrollTop = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = boardRef.current;
    if (!el) return;

    isDragging.current = true;
    startX.current = e.pageX;
    startY.current = e.pageY;
    startScrollLeft.current = el.scrollLeft;
    startScrollTop.current = el.scrollTop;

    el.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  };

  const handleScroll = () => {
    const el = boardRef.current;
    if (!el) return;

    if (scrollTimer.current) {
      clearTimeout(scrollTimer.current);
    }

    scrollTimer.current = setTimeout(() => {
      setScroll({
        x: el.scrollLeft,
        y: el.scrollTop,
      });
    }, 150);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = boardRef.current;
      if (!el || !isDragging.current) return;

      e.preventDefault();

      const walkX = e.pageX - startX.current;
      const walkY = e.pageY - startY.current;

      el.scrollLeft = startScrollLeft.current - walkX;
      el.scrollTop = startScrollTop.current - walkY;
    };

    const handleMouseUp = () => {
      const el = boardRef.current;

      isDragging.current = false;

      if (el) {
        el.style.cursor = "grab";
      }

      document.body.style.removeProperty("user-select");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const projectId = Number(localStorage.getItem("projectId"));

    const fetchData = async () => {
      try {
        const [tasksRes, sprintsRes] = await Promise.all([
          getTasksByAssigneeApi(projectId),
          getSprintsByAssigneeApi(projectId),
        ]);

        setMyTasks(tasksRes.data ?? []);
        setMySprints(sprintsRes.data ?? []);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const el = boardRef.current;
    if (!el) return;

    const timer = setTimeout(() => {
      el.scrollTo({
        left: scroll.x,
        top: scroll.y,
        behavior: "auto",
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [isLoading, scroll.x, scroll.y]);

  useEffect(() => {
    return () => {
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
      document.body.style.removeProperty("user-select");
    };
  }, []);

  const todoTasks = myTasks.filter((task) => task.state === "TODO");
  const inProgressTasks = myTasks.filter(
    (task) => task.state === "IN_PROGRESS",
  );
  const inDoneTasks = myTasks.filter((task) => task.state === "DONE");

  return (
    <>
      {!isLoading && (
        <div
          ref={boardRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          className="d-flex w-100 overflow-auto"
          style={{ cursor: "grab" }}
        >
          <TasksByState
            title="TODO"
            tasksByState={todoTasks}
            icon={<SiGoogletasks />}
          />

          <TasksByState
            title="IN_PROGRESS"
            tasksByState={inProgressTasks}
            icon={<GrInProgress />}
          />

          <TasksByState
            title="DONE"
            tasksByState={inDoneTasks}
            icon={<MdOutlineFileDownloadDone />}
          />

          <SprintsByState
            title="스프린트"
            sprintsByState={mySprints}
            icon={<GiSprint />}
          />
        </div>
      )}
    </>
  );
};

export default TaskByAssigneePage;
