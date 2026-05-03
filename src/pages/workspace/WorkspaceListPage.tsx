import WorkspaceCard from "../../components/card/WorkspaceCard";
import ListLayout from "../../components/layouts/ListLayout";
import { MdWorkspaces } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getWorkspacesApi } from "../../api/sehomanagerapi";
import { WorkspaceResponseType } from "../../types/type";

const WorkspaceListPage = () => {
  const {
    data: workspaces = [],
    isLoading,
    isError,
  } = useQuery<WorkspaceResponseType[]>({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const res = await getWorkspacesApi();
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <ListLayout
      title="워크스페이스"
      to="/settings/workspaces/create"
      icon={<MdWorkspaces />}
    >
      {isLoading ? (
        <div>불러오는 중...</div>
      ) : isError ? (
        <div>워크스페이스를 불러오지 못했습니다.</div>
      ) : workspaces.length === 0 ? (
        <div>해당 워크스페이스가 존재하지 않습니다.</div>
      ) : (
        workspaces.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))
      )}
    </ListLayout>
  );
};

export default WorkspaceListPage;