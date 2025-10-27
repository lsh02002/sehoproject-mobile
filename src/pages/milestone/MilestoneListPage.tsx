import { useParams } from "react-router-dom";
import { MilestoneResponseType } from "../../types/type";
import { useEffect, useState } from "react";
import { getMilestonesByProjectApi } from "../../api/sehomanagerapi";
import ListLayout from "../../layouts/ListLayout";
import MilestoneCard from "../../components/card/MilestoneCard";

const MilestoneListPage = () => {
  const { projectId } = useParams();
  const [milestones, setMilestones] = useState<MilestoneResponseType[] | null>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMilestonesByProjectApi(Number(projectId))
      .then((res) => {
        console.log(res);
        setMilestones(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [projectId]);

  return (
    <ListLayout
      title="마일스톤"
      to={`/milestones/projects/${projectId}/create`}
    >      
      {!isLoading && milestones?.length === 0 ? (
        <div>해당 마일스톤이 존재하지 않습니다.</div>
      ) : (
        milestones?.map((milestone) => (
          <MilestoneCard key={milestone.id} milestone={milestone} />
        ))
      )}
    </ListLayout>
  );
};

export default MilestoneListPage;
