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
    <ListLayout title="워크스페이스">
      {workspaces?.map((workspace) => (
        <WorkspaceCard key={workspace.id} workspace={workspace} />
      ))}
    </ListLayout>
  );
};

export default WorkspaceListPage;
