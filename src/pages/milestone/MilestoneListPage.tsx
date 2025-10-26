import { useParams } from "react-router-dom";
import { MilestoneResponseType } from "../../types/type";
import { useEffect, useState } from "react";
import { getMilestonesByProjectApi } from "../../api/sehomanagerapi";
import ListLayout from "../../layouts/ListLayout";
import MilestoneCard from "../../components/card/list/MilestoneCard";

const MilestoneListPage = () => {
  const { projectId } = useParams();
  const [milestones, setMilestones] = useState<MilestoneResponseType[] | null>([]);

  useEffect(() => {
    getMilestonesByProjectApi(Number(projectId))
      .then((res) => {
        console.log(res);
        setMilestones(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [projectId]);

  return (
    <ListLayout title="마일스톤" url={`/milestones/projects/${projectId}/create`}>
      {milestones?.map((milestone) => (
        <MilestoneCard key={milestone.id} milestone={milestone} />
      ))}
      {milestones?.length === 0 && <div>해당 마일스톤이 존재하지 않습니다.</div>}
    </ListLayout>
  );
};

export default MilestoneListPage;
