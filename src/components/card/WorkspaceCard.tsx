import React from "react";
import { useNavigate } from "react-router-dom";
import { WorkspaceResponseType } from "../../types/type";
import { MdWorkspaces } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";

const WorkspaceCard = ({ workspace }: { workspace: WorkspaceResponseType }) => {
  const navigate = useNavigate();
  const currentWorkspaceId = localStorage.getItem("workspaceId");
  const isCurrent = currentWorkspaceId === String(workspace.id);

  const handleNavigate = () => {
    navigate(`/settings/workspace/${workspace.id}/edit`);
  };

  return (
    <div
      className="card border-0 shadow-sm mb-3 overflow-hidden"
      style={{
        cursor: "pointer",
        borderRadius: "18px",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onClick={handleNavigate}
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
            {/* ID + 현재 뱃지 */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <span
                className="fw-bold"
                style={{
                  color: "#4680ff",
                  fontSize: "0.85rem",
                  letterSpacing: "0.03em",
                }}
              >
                #{workspace.id}
              </span>

              {isCurrent && (
                <span
                  className="badge rounded-pill d-inline-flex align-items-center gap-1 px-3 py-2"
                  style={{
                    fontSize: "0.72rem",
                    backgroundColor: "#e0f2fe",
                    color: "#0369a1",
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#0ea5e9",
                      display: "inline-block",
                    }}
                  />
                  CURRENT
                </span>
              )}
            </div>

            {/* 이름 */}
            <h5 className="fw-bold mb-2 d-flex align-items-center gap-2">
              <MdWorkspaces />
              {workspace.name}
            </h5>

            {/* slug */}
            <div className="text-muted small">{workspace.slug}</div>
          </div>

          {/* EDIT 버튼 */}
          <button
            type="button"
            className="btn border-0 rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "42px",
              height: "42px",
              color: "#4680ff",
              backgroundColor: "#f3f6ff",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
            aria-label="Edit workspace"
          >
            <FiEdit3 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(WorkspaceCard);
