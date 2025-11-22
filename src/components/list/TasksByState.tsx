import React from "react";
import ListLayout from "../layouts/ListLayout";
import { TaskResponseType } from "../../types/type";
import TaskMultiCard from "../card/TaskMultiCard";

const TasksByState = ({
  title,
  tasksByState,
  icon,
}: {
  title: string;
  tasksByState: TaskResponseType[];
  icon?: React.ReactNode;
}) => {
  return (
    <ListLayout title={title} icon={icon}>
      {tasksByState?.length === 0 ? (
        <div>해당 태스크가 존재하지 않습니다.</div>
      ) : (
        tasksByState?.map((task) => <TaskMultiCard key={task.id} task={task} />)
      )}
    </ListLayout>
  );
};

export default TasksByState;
