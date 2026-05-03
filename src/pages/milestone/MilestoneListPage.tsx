import { useParams } from "react-router-dom";
import { MilestoneResponseType } from "../../types/type";
import { getMilestonesByProjectApi } from "../../api/sehomanagerapi";
import ListLayout from "../../components/layouts/ListLayout";
import MilestoneCard from "../../components/card/MilestoneCard";
import { LuMilestone } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";

const MilestoneListPage = () => {
  const { projectId } = useParams();
  const {
    data: milestones = [],
    isLoading,
    isError,
  } = useQuery<MilestoneResponseType[]>({
    queryKey: ["milestones"],
    queryFn: async () => {
      const res = await getMilestonesByProjectApi(Number(projectId));
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <ListLayout
      title="마일스톤"
      icon={<LuMilestone />}
      componentType="milestone"
    >
      {isLoading ? (
        <div>불러오는 중...</div>
      ) : isError ? (
        <div>마일스톤을 불러오지 못했습니다.</div>
      ) : milestones.length === 0 ? (
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
