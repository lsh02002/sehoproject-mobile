import { getTasksByProjectApi } from "../../api/sehomanagerapi";
import { TaskResponseType } from "../../types/type";
import ListLayout from "../../components/layouts/ListLayout";
import TaskCard from "../../components/card/TaskCard";
import { MdAddTask } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { useLogin } from "../../context/LoginContext";

const TaskListPage = () => {
  const { projectId } = useLogin();

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery<TaskResponseType[]>({
    queryKey: ["tasks", projectId],
    queryFn: async () => {
      const res = await getTasksByProjectApi(Number(projectId));
      return res.data;
    },
    retry: false,
    enabled: projectId !== 0, // 👈 key fix
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <ListLayout title="태스크" icon={<MdAddTask />} componentType="task">
      {isLoading ? (
        <div>불러오는 중...</div>
      ) : isError ? (
        <div>태스크를 불러오지 못했습니다.</div>
      ) : tasks.length === 0 ? (
        <div>해당 태스크가 존재하지 않습니다.</div>
      ) : (
        tasks?.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </ListLayout>
  );
};

export default TaskListPage;
