import { useParams } from "react-router-dom";
import { getTasksByProjectApi } from "../../api/sehomanagerapi";
import { TaskResponseType } from "../../types/type";
import { useEffect, useState } from "react";
import ListLayout from "../../layouts/ListLayout";
import TaskCard from "../../components/card/list/TaskCard";

const TaskListPage = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<TaskResponseType[] | null>([]);

  useEffect(() => {
    getTasksByProjectApi(Number(projectId))
      .then((res) => {
        console.log(res);
        setTasks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [projectId]);

  return (
    <ListLayout title="태스크">
      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </ListLayout>
  );
};

export default TaskListPage;
