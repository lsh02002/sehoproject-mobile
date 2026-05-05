import React from "react";
import { SpaceResponseType } from "../../types/type";
import { useNavigate } from "react-router-dom";
import { FaSpaceAwesome } from "react-icons/fa6";
import { FiEdit3, FiFolder } from "react-icons/fi";

const SpaceCard = ({ space }: { space: SpaceResponseType }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(
      `/settings/workspace/${space.workspaceId}/spaces/${space.id}/edit`,
    );
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
            {/* ID */}
            <div className="mb-3">
              <span
                className="fw-bold"
                style={{
                  color: "#4680ff",
                  fontSize: "0.85rem",
                  letterSpacing: "0.03em",
                }}
              >
                #{space.id}
              </span>
            </div>

            {/* 이름 */}
            <h5 className="fw-bold mb-2 d-flex align-items-center gap-2">
              <FaSpaceAwesome />
              {space.name}
            </h5>

            {/* slug */}
            {space.slug && (
              <div className="text-muted small mb-1">{space.slug}</div>
            )}

            {/* workspace id */}
            <div className="d-flex align-items-center gap-2 text-muted small">
              <FiFolder />
              <span>
                워크스페이스{" "}
                <strong className="text-dark">{space.workspaceId}</strong>
              </span>
            </div>
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
            aria-label="Edit space"
          >
            <FiEdit3 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SpaceCard);
