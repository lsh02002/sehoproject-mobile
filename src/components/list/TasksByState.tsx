import React from "react";
import ListLayout from "../../layouts/ListLayout";
import { TaskResponseType } from "../../types/type";
import TaskCard from "../card/TaskCard";

const TasksByState = ({
  title,
  tasksByState,
}: {
  title: string;
  tasksByState: TaskResponseType[];
}) => {
  return (
    <ListLayout title={title}>
      {tasksByState?.length === 0 ? (
        <div>해당 태스크가 존재하지 않습니다.</div>
      ) : (
        tasksByState?.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </ListLayout>
  );
};

export default TasksByState;
