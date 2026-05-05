import React from "react";
import { useNavigate } from "react-router-dom";
import { ProjectResponseType } from "../../types/type";
import { SiPolymerproject } from "react-icons/si";
import { FiEdit3, FiCalendar, FiMapPin } from "react-icons/fi";

const ProjectCard = ({ project }: { project: ProjectResponseType }) => {
  const navigate = useNavigate();

  const handleOpenProject = () => {
    navigate(`/boards/projects/${project.id}`);
  };

  const handleEditProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/projects/${project.id}/edit`);
  };

  const statusConfig = {
    TODO: "bg-secondary-subtle text-secondary-emphasis",
    IN_PROGRESS: "bg-primary-subtle text-primary",
    DONE: "bg-success-subtle text-success-emphasis",
    COMPLETED: "bg-success-subtle text-success-emphasis",
    CANCELLED: "bg-danger-subtle text-danger-emphasis",
  } as const;

  const statusClass =
    statusConfig[project.status as keyof typeof statusConfig] ??
    "bg-light text-muted";

  return (
    <div
      className="card border-0 shadow-sm mb-3 overflow-hidden"
      style={{
        cursor: "pointer",
        borderRadius: "18px",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onClick={handleOpenProject}
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
                {project.projectKey}
              </span>

              {project.status && (
                <span
                  className={`badge rounded-pill px-3 py-2 ${statusClass}`}
                  style={{ fontSize: "0.72rem" }}
                >
                  {project.status}
                </span>
              )}
            </div>

            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <SiPolymerproject />
              {project.name}
            </h5>

            <div className="d-flex flex-column gap-2 text-muted small">
              {project.spaceName && (
                <div className="d-flex align-items-center gap-2">
                  <FiMapPin />
                  <span>
                    스페이스{" "}
                    <strong className="text-dark">{project.spaceName}</strong>
                  </span>
                </div>
              )}

              {project.dueDate && (
                <div className="d-flex align-items-center gap-2">
                  <FiCalendar />
                  <span>
                    마감일{" "}
                    <strong className="text-dark">
                      {new Date(project.dueDate).toLocaleDateString()}
                    </strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            className="btn border-0 rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "42px",
              height: "42px",
              color: "#4680ff",
              backgroundColor: "#f3f6ff",
            }}
            onClick={handleEditProject}
            aria-label="Edit project"
          >
            <FiEdit3 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProjectCard);
