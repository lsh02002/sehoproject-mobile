import React from "react";
import { TaskResponseType } from "../../types/type";
import { SiGoogletasks } from "react-icons/si";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit3, FiCalendar, FiFolder } from "react-icons/fi";
import { useLogin } from "../../context/LoginContext";
import { useModalManager } from "../../context/ModalContext";
import ImageCard from "./ImageCard";

const TaskCard = ({ task }: { task: TaskResponseType }) => {
  const { setTask } = useLogin();
  const { openModal } = useModalManager();

  const handleOpenTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setTask(task);
    openModal("task");
  };

  const stateConfig = {
    TODO: {
      label: "TODO",
      icon: <SiGoogletasks />,
      className: "bg-primary-subtle text-primary",
    },
    IN_PROGRESS: {
      label: "IN PROGRESS",
      icon: <GrInProgress />,
      className: "bg-warning-subtle text-warning-emphasis",
    },
    DONE: {
      label: "DONE",
      icon: <IoMdDoneAll />,
      className: "bg-success-subtle text-success-emphasis",
    },
  } as const;

  const state = task.state
    ? stateConfig[task.state as keyof typeof stateConfig]
    : null;

  return (
    <div
      className="card border-0 shadow-sm mb-3 overflow-hidden"
      style={{
        cursor: "pointer",
        borderRadius: "18px",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span
                className="fw-bold"
                style={{
                  color: "#4680ff",
                  fontSize: "0.85rem",
                  letterSpacing: "0.03em",
                }}
              >
                #{task.id}
              </span>

              {state && (
                <span
                  className={`badge rounded-pill d-inline-flex align-items-center gap-1 px-3 py-2 ${state.className}`}
                  style={{ fontSize: "0.72rem" }}
                >
                  {state.icon}
                  {state.label}
                </span>
              )}
            </div>

            <h5 className="fw-bold mb-3" style={{ lineHeight: 1.35 }}>
              {task.name}
            </h5>

            <div className="d-flex flex-column gap-2 text-muted small">
              {task.dueDate && (
                <div className="d-flex align-items-center gap-2">
                  <FiCalendar />
                  <span>
                    마감일{" "}
                    <strong className="text-dark">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </strong>
                  </span>
                </div>
              )}

              {task.projectId && (
                <div className="d-flex align-items-center gap-2">
                  <FiFolder />
                  <span>
                    프로젝트 ID{" "}
                    <strong className="text-dark">{task.projectId}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-light border-0 rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "42px",
              height: "42px",
              color: "#4680ff",
              backgroundColor: "#f3f6ff",
            }}
            onClick={handleOpenTask}
            aria-label="Edit task"
          >
            <FiEdit3 size={18} />
          </button>
        </div>
      </div>

      {task?.imageResponses?.length > 0 && (
        <div className="px-3 pb-3">
          <div className="d-flex flex-wrap gap-3">
            {task.imageResponses.map((image) => (
              <ImageCard
                key={image?.id}
                imageUrl={image?.fileUrl}
                task={task}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TaskCard);
