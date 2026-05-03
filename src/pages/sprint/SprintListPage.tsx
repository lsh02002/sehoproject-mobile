import { SprintResponseType } from "../../types/type";
import { getSprintsByProjectApi } from "../../api/sehomanagerapi";
import ListLayout from "../../components/layouts/ListLayout";
import SprintCard from "../../components/card/SprintCard";
import { GiSprint } from "react-icons/gi";
import { useQuery } from "@tanstack/react-query";
import { useLogin } from "../../context/LoginContext";

const SprintListPage = () => {
  const { projectId } = useLogin();

  const {
    data: sprints = [],
    isLoading,
    isError,
  } = useQuery<SprintResponseType[]>({
    queryKey: ["sprints", projectId],
    queryFn: async () => {
      const res = await getSprintsByProjectApi(Number(projectId));
      return res.data;
    },
    enabled: projectId !== 0, // 👈 key fix
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <ListLayout title="스프린트" icon={<GiSprint />} componentType="sprint">
      {isLoading ? (
        <div>불러오는 중...</div>
      ) : isError ? (
        <div>스프린트를 불러오지 못했습니다.</div>
      ) : sprints.length === 0 ? (
        <div>해당 스프린트가 존재하지 않습니다.</div>
      ) : (
        sprints?.map((sprint) => <SprintCard key={sprint.id} sprint={sprint} />)
      )}
    </ListLayout>
  );
};

export default SprintListPage;
