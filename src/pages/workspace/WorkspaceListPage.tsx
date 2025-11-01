import React, { useEffect, useState } from "react";
import { WorkspaceResponseType } from "../../types/type";
import { getWorkspacesApi } from "../../api/sehomanagerapi";
import WorkspaceCard from "../../components/card/WorkspaceCard";
import ListLayout from "../../layouts/ListLayout";

const WorkspaceListPage = () => {
  const [workspaces, setWorkspaces] = useState<WorkspaceResponseType[] | null>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWorkspacesApi()
      .then((res) => {
        console.log(res);
        setWorkspaces(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <ListLayout title="워크스페이스" to={`/settings/workspaces/create`}>
      {!isLoading && workspaces?.length === 0 ? (
        <div>해당 스페이스가 존재하지 않습니다.</div>
      ) : (
        workspaces?.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))
      )}
    </ListLayout>
  );
};

export default WorkspaceListPage;
