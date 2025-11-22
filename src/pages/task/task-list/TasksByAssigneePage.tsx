import { useEffect, useState } from "react";
import { TaskResponseType } from "../../../types/type";
import { getTasksByAssigneeApi } from "../../../api/sehomanagerapi";
import TasksByState from "../../../components/list/TasksByState";
import { GrInProgress } from "react-icons/gr";
import { SiGoogletasks } from "react-icons/si";

const TaskByAssigneePage = () => {
  const [myTasks, setMyTasks] = useState<TaskResponseType[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const workspaceId = localStorage.getItem("workspaceId");

    getTasksByAssigneeApi(Number(workspaceId))
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

  const todoTasks = myTasks?.filter((task) => task.state === "TODO");
  const inProgressTasks = myTasks?.filter(
    (task) => task.state === "IN_PROGRESS"
  );

  return (
    <>
      {!isLoading && (
        <>
          <TasksByState title="TODO" tasksByState={todoTasks ?? []} icon={<SiGoogletasks />} />
          <TasksByState
            title="IN_PROGRESS"
            tasksByState={inProgressTasks ?? []}
            icon={<GrInProgress />}
          />
        </>
      )}
    </>
  );
};

export default TaskByAssigneePage;
