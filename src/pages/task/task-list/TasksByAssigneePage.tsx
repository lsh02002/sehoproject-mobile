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
import styled from "styled-components";
import SprintsByState from "../../../components/list/SprintsByState";
import { useScroll } from "../../../context/ScrollContext";

const TaskByAssigneePage = () => {
  const [myTasks, setMyTasks] = useState<TaskResponseType[] | null>([]);
  const [mySprints, setMySprints] = useState<SprintResponseType[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const { scroll, setScroll } = useScroll();

  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);
  const scrollTop = useRef(0);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = boardRef.current;
    if (!el) return;

    isDown.current = true;
    startX.current = e.pageX;
    startY.current = e.pageY;
    scrollLeft.current = el.scrollLeft;
    scrollTop.current = el.scrollTop;

    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  const onMouseLeave = () => {
    const el = boardRef.current;
    if (!el) return;

    isDown.current = false;
    el.style.cursor = "grab";
    el.style.removeProperty("user-select");
  };

  const onMouseUp = () => {
    const el = boardRef.current;
    if (!el) return;

    isDown.current = false;
    el.style.cursor = "grab";
    el.style.removeProperty("user-select");
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = boardRef.current;
    if (!el || !isDown.current) return;

    e.preventDefault();

    const walkX = e.pageX - startX.current;
    const walkY = e.pageY - startY.current;

    el.scrollLeft = scrollLeft.current - walkX;
    el.scrollTop = scrollTop.current - walkY;
  };

  const handleScroll = () => {
    const el = boardRef.current;
    if (!el) return;

    if (scrollTimer.current) clearTimeout(scrollTimer.current);

    scrollTimer.current = setTimeout(() => {
      setScroll({
        x: el.scrollLeft,
        y: el.scrollTop,
      });
    }, 150);
  };

  useEffect(() => {
    if (isLoading) return;

    const el = boardRef.current;
    if (!el) return;

    const timer = setTimeout(() => {
      el.scrollTo(scroll.x, scroll.y);
    }, 0);

    return () => clearTimeout(timer);
  }, [isLoading, scroll.x, scroll.y]);

  useEffect(() => {
    const projectId = localStorage.getItem("projectId");

    getTasksByAssigneeApi(Number(projectId))
      .then((res) => {
        console.log(res);
        setMyTasks(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const projectId = localStorage.getItem("projectId");

    getSprintsByAssigneeApi(Number(projectId))
      .then((res) => {
        console.log(res);
        setMySprints(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const todoTasks = myTasks?.filter((task) => task.state === "TODO");
  const inProgressTasks = myTasks?.filter(
    (task) => task.state === "IN_PROGRESS",
  );
  const inDoneTasks = myTasks?.filter((task) => task.state === "DONE");

  return (
    <>
      {!isLoading && (
        <TaskContainer
          ref={boardRef}
          onScroll={handleScroll}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          <TasksByState
            title="TODO"
            tasksByState={todoTasks ?? []}
            icon={<SiGoogletasks />}
          />
          <TasksByState
            title="IN_PROGRESS"
            tasksByState={inProgressTasks ?? []}
            icon={<GrInProgress />}
          />
          <TasksByState
            title="DONE"
            tasksByState={inDoneTasks ?? []}
            icon={<MdOutlineFileDownloadDone />}
          />
          <SprintsByState
            title="스프린트"
            sprintsByState={mySprints ?? []}
            icon={<GiSprint />}
          />
        </TaskContainer>
      )}
    </>
  );
};

export default TaskByAssigneePage;

const TaskContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: auto;
  cursor: grab;
`;
