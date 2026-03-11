import React, { useEffect, useState } from "react";
import { ActivityLogResponseType, WorkspaceResponseType } from "../../types/type";
import { getLogMessagesByUserApi, getWorkspacesApi } from "../../api/sehomanagerapi";
import WorkspaceCard from "../../components/card/WorkspaceCard";
import ListLayout from "../../components/layouts/ListLayout";
import { MdWorkspaces } from "react-icons/md";
import ActivityLogCard from "../../components/card/ActivityLogCard";

const WorkspaceListPage = () => {
  const [workspaces, setWorkspaces] = useState<WorkspaceResponseType[] | null>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const [logMessages, setLogMessages] = useState([]);

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

  useEffect(() => {
    getLogMessagesByUserApi()
      .then((res) => {
        console.log(res);
        setLogMessages(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <ListLayout
      title="워크스페이스"
      to={`/settings/workspaces/create`}
      icon={<MdWorkspaces />}
    >
      {!isLoading && workspaces?.length === 0 ? (
        <div>해당 스페이스가 존재하지 않습니다.</div>
      ) : (
        workspaces?.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))
      )}
      <div>내 활동 내역({logMessages?.length}) - 임시로</div>
      {logMessages &&
        (logMessages?.length > 0 ? (
          logMessages?.map((log: ActivityLogResponseType) => (
            <ActivityLogCard key={log?.id} log={log} />
          ))
        ) : (
          <div>해당 메시지가 없습니다!</div>
        ))}
    </ListLayout>
  );
};

export default WorkspaceListPage;
