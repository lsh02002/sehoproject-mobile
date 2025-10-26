import React from "react";
import TaskListPage from "../../task/TaskListPage";
import SprintListPage from "../../sprint/SprintListPage";
import MilestoneListPage from "../../milestone/MilestoneListPage";

const BoardList = () => {
  return (
    <>
      <TaskListPage />
      <SprintListPage />
      <MilestoneListPage />
    </>
  );
};

export default BoardList;
