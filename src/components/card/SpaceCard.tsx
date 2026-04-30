import React from "react";
import { SpaceResponseType } from "../../types/type";
import { useNavigate } from "react-router-dom";
import { FaSpaceAwesome } from "react-icons/fa6";

const SpaceCard = ({ space }: { space: SpaceResponseType }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card mb-3 shadow-sm"
      style={{ borderRadius: "16px", cursor: "pointer" }}
      onClick={() =>
        navigate(
          `/settings/workspace/${space.workspaceId}/spaces/${space.id}/edit`,
        )
      }
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        {/* 좌측 정보 */}
        <div className="d-flex flex-column">
          {/* ID */}
          <div className="fw-semibold mb-1" style={{ color: "#4680ff" }}>
            #{space.id}
          </div>

          {/* 아이콘 + 이름 */}
          <div className="d-flex align-items-center gap-2 mb-1">
            <FaSpaceAwesome />
            <div className="fw-medium">{space.name}</div>
          </div>

          {/* slug */}
          {space.slug && (
            <div className="text-muted small fst-italic">{space.slug}</div>
          )}

          {/* workspace id */}
          <div className="text-muted small fst-italic">
            워크스페이스 ID: {space.workspaceId}
          </div>
        </div>

        {/* 우측 버튼 */}
        <div className="ms-3">
          <span
            className="text-primary fw-medium"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                `/settings/workspace/${space.workspaceId}/spaces/${space.id}/edit`,
              );
            }}
          >
            EDIT
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;
