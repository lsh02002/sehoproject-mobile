import { useParams } from "react-router-dom";
import { SprintResponseType } from "../../types/type";
import { useEffect, useState } from "react";
import { getSprintsByProjectApi } from "../../api/sehomanagerapi";
import ListLayout from "../../layouts/ListLayout";
import SprintCard from "../../components/card/list/SprintCard";

const SprintListPage = () => {
  const { projectId } = useParams();
  const [sprints, setSprints] = useState<SprintResponseType[] | null>([]);
   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSprintsByProjectApi(Number(projectId))
      .then((res) => {
        console.log(res);
        setSprints(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(()=>{
        setIsLoading(false);
      });
  }, [projectId]);

  return (
    <ListLayout title="스프린트" url={`/sprints/projects/${projectId}/create`}>
      {isLoading && <div>로딩 중...</div>}
      {!isLoading && sprints?.length === 0 ? (
        <div>해당 스프린트가 존재하지 않습니다.</div>
      ) : (
        sprints?.map((sprint) => <SprintCard key={sprint.id} sprint={sprint} />)
      )}
    </ListLayout>
  );
};

export default SprintListPage;
