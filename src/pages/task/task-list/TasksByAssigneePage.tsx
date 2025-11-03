import { useEffect, useState } from "react";
import { TaskResponseType } from "../../../types/type";
import { getTasksByAssigneeApi } from "../../../api/sehomanagerapi";
import TasksByState from "../../../components/list/TasksByState";
import { GrInProgress } from "react-icons/gr";
import { MdAddTask } from "react-icons/md";

const TaskByAssigneePage = () => {
  const [myTasks, setMyTasks] = useState<TaskResponseType[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTasksByAssigneeApi()
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
          <TasksByState title="TODO" tasksByState={todoTasks ?? []} icon={<MdAddTask />} />
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
