import React, { useEffect } from "react";
import TaskListPage from "../../task/TaskListPage";
import SprintListPage from "../../sprint/SprintListPage";
import MilestoneListPage from "../../milestone/MilestoneListPage";
import { useParams } from "react-router-dom";
import { useLogin } from "../../../context/LoginContext";

const BoardList = () => {
  const { projectId } = useParams();
  const { setProjectId } = useLogin();

  useEffect(() => {
    setProjectId(Number(projectId) ?? 0);

    return () => {
      setProjectId(0);
    };
  }, [projectId, setProjectId]);

  return (
    <>
      <TaskListPage />
      <SprintListPage />
      <MilestoneListPage />
    </>
  );
};

export default BoardList;
