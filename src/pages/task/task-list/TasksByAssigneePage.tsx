import { useEffect, useState } from "react";
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

const TaskByAssigneePage = () => {
  const [myTasks, setMyTasks] = useState<TaskResponseType[] | null>([]);
  const [mySprints, setMySprints] = useState<SprintResponseType[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        <TaskContainer>
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
`;
