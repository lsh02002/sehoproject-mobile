import { useParams } from "react-router-dom";
import { getTasksByProjectApi } from "../../api/sehomanagerapi";
import { TaskResponseType } from "../../types/type";
import { useEffect, useState } from "react";
import ListLayout from "../../layouts/ListLayout";
import TaskCard from "../../components/card/list/TaskCard";

const TaskListPage = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<TaskResponseType[] | null>([]);
   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTasksByProjectApi(Number(projectId))
      .then((res) => {
        console.log(res);
        setTasks(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(()=>{
        setIsLoading(false);
      });
  }, [projectId]);

  return (
    <ListLayout title="태스크" url={`/tasks/projects/${projectId}/create`}>
      {isLoading && <div>로딩 중...</div>}
      {!isLoading && tasks?.length === 0 ? (
        <div>해당 태스크가 존재하지 않습니다.</div>
      ) : (
        tasks?.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </ListLayout>
  );
};

export default TaskListPage;
