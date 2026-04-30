import React from "react";
import { useNavigate } from "react-router-dom";
import { ProjectResponseType } from "../../types/type";
import { SiPolymerproject } from "react-icons/si";

const ProjectCard = ({ project }: { project: ProjectResponseType }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card mb-3 shadow-sm"
      style={{ borderRadius: "16px", cursor: "pointer" }}
      onClick={() => navigate(`/boards/projects/${project.id}`)}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        {/* 좌측 정보 */}
        <div className="d-flex flex-column">
          <div className="fw-semibold mb-1" style={{ color: "#4680ff" }}>
            {project.projectKey}
          </div>

          <div className="d-flex align-items-center gap-2 mb-1">
            <SiPolymerproject />
            <div className="fw-medium">{project.name}</div>
          </div>

          <div className="text-muted small fst-italic">
            {project.spaceName} • {project.status}
          </div>

          {project.dueDate && (
            <div className="text-muted small fst-italic">
              마감일: {new Date(project.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* 우측 버튼 */}
        <div className="ms-3">
          <span
            className="text-primary fw-medium"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/projects/${project.id}/edit`);
            }}
          >
            EDIT
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
