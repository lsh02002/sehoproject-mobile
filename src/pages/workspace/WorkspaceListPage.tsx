import React, { useEffect, useState } from "react";
import { workspaceResponseType } from "../../types/type";
import { getWorkspacesApi } from "../../api/sehomanagerapi";
import WorkspaceCard from "../../components/card/list/WorkspaceCard";
import ListLayout from "../../layouts/ListLayout";

const WorkspaceListPage = () => {
  const [workspaces, setWorkspaces] = useState<workspaceResponseType[] | null>(
    []
  );

  useEffect(() => {
    getWorkspacesApi()
      .then((res) => {
        console.log(res);
        setWorkspaces(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <ListLayout title="워크스페이스"  url={`/workspaces/create`}>
      {workspaces?.map((workspace) => (
        <WorkspaceCard key={workspace.id} workspace={workspace} />
      ))}
      {workspaces?.length === 0 && <div>해당 스페이스가 존재하지 않습니다.</div>}
    </ListLayout>
  );
};

export default WorkspaceListPage;
