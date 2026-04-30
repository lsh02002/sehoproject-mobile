import React from "react";
import { TaskResponseType } from "../../types/type";
import { SiGoogletasks } from "react-icons/si";
import { GrInProgress } from "react-icons/gr";
import { useLogin } from "../../context/LoginContext";

const TaskCard = ({ task }: { task: TaskResponseType }) => {
  const { setIsTaskOpen, setTask } = useLogin();

  const handleOpenTask = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    setTask(task);
    setIsTaskOpen(true);
  };

  return (
    <div className="card mb-3 shadow-sm" style={{ borderRadius: "16px" }}>
      <div className="card-body d-flex justify-content-between align-items-center">
        {/* 좌측 정보 */}
        <div className="d-flex flex-column">
          <div className="fw-semibold mb-1" style={{ color: "#4680ff" }}>
            #{task.id}
          </div>

          <div className="d-flex align-items-center gap-2 mb-1">
            {task.state === "TODO" ? (
              <SiGoogletasks />
            ) : task.state === "IN_PROGRESS" ? (
              <GrInProgress />
            ) : null}

            <div className="fw-medium">{task.name}</div>
          </div>

          {task.state && (
            <div className="text-muted small mt-1">상태: {task.state}</div>
          )}

          {task.dueDate && (
            <div className="text-muted small mt-1">
              마감일: {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}

          {task.projectId && (
            <div className="text-muted small fst-italic mt-2">
              📁 프로젝트 ID: {task.projectId}
            </div>
          )}
        </div>

        {/* 우측 버튼 */}
        <div className="ms-3">
          <span
            className="text-primary fw-medium"
            style={{ cursor: "pointer" }}
            onClick={(e) => handleOpenTask(e)}
          >
            EDIT
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
