import { useParams } from "react-router-dom";
import { SprintResponseType } from "../../types/type";
import { useEffect, useState } from "react";
import { getSprintsByProjectApi } from "../../api/sehomanagerapi";
import ListLayout from "../../components/layouts/ListLayout";
import SprintCard from "../../components/card/SprintCard";
import { GiSprint } from "react-icons/gi";

const SprintListPage = () => {
  const { projectId } = useParams();
  const [sprints, setSprints] = useState<SprintResponseType[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSprintsByProjectApi(Number(projectId))
      .then((res) => {
        setSprints(res.data);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [projectId]);

  return (
    <ListLayout title="스프린트" icon={<GiSprint />} componentType="sprint">
      {!isLoading && sprints?.length === 0 ? (
        <div>해당 스프린트가 존재하지 않습니다.</div>
      ) : (
        sprints?.map((sprint) => <SprintCard key={sprint.id} sprint={sprint} />)
      )}
    </ListLayout>
  );
};

export default SprintListPage;
