import React from "react";
import { useNavigate } from "react-router-dom";
import { WorkspaceResponseType } from "../../types/type";
import { MdWorkspaces } from "react-icons/md";

const WorkspaceCard = ({ workspace }: { workspace: WorkspaceResponseType }) => {
  const navigate = useNavigate();
  const currentWorkspaceId = localStorage.getItem("workspaceId");
  const isCurrent = currentWorkspaceId === String(workspace.id);

  return (
    <div
  className="card mb-3 shadow-sm"
  style={{ borderRadius: "16px", cursor: "pointer" }}
  onClick={() => navigate(`/settings/workspace/${workspace.id}/edit`)}
>
  <div className="card-body d-flex justify-content-between align-items-center">
    
    {/* 좌측 */}
    <div className="d-flex flex-column">

      {/* ID + 현재 뱃지 */}
      <div className="d-flex align-items-center gap-2 mb-1">
        <div className="fw-semibold" style={{ color: "#4680ff" }}>
          #{workspace.id}
        </div>

        {isCurrent && (
          <span
            className="badge rounded-pill"
            style={{
              backgroundColor: "#dbeafe",
              color: "#1e3a8a",
              border: "1px solid #bfdbfe",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                display: "inline-block",
              }}
            />
            현재 워크스페이스
          </span>
        )}
      </div>

      {/* 아이콘 + 이름 */}
      <div className="d-flex align-items-center gap-2 mb-1">
        <MdWorkspaces />
        <div className="fw-medium">{workspace.name}</div>
      </div>

      {/* slug */}
      <div className="text-muted small fst-italic">
        {workspace.slug}
      </div>
    </div>

    {/* 우측 버튼 */}
    <div
      className="ms-3 d-flex justify-content-end"
      style={{
        filter:
          "invert(47%) sepia(79%) saturate(1448%) hue-rotate(194deg) brightness(103%) contrast(101%)",
      }}
    >
      <span
        className="text-primary fw-medium"
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/settings/workspace/${workspace.id}/edit`);
        }}
      >
        EDIT
      </span>
    </div>

  </div>
</div>
  );
};

export default WorkspaceCard;
