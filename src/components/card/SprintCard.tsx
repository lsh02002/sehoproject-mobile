import React from "react";
import { SprintResponseType } from "../../types/type";
import { GiSprint } from "react-icons/gi";
import { useLogin } from "../../context/LoginContext";
import { useModalManager } from "../../context/ModalManager";

const SprintCard = ({ sprint }: { sprint: SprintResponseType }) => {
  const { setSprint } = useLogin();
  const { openModal } = useModalManager();

  const handleOpenSprint = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    setSprint(sprint);
    openModal("sprint");
  };

  return (
    <div className="card mb-3 shadow-sm" style={{ cursor: "pointer" }}>
      <div className="card-body d-flex justify-content-between align-items-center">
        {/* 좌측 정보 */}
        <div className="d-flex flex-column">
          {/* ID */}
          <div className="fw-semibold mb-1" style={{ color: "#4680ff" }}>
            #{sprint.id}
          </div>

          {/* 아이콘 + 이름 */}
          <div className="d-flex align-items-center gap-2 mb-1">
            <GiSprint />
            <div className="fw-medium">{sprint.name}</div>
          </div>

          {/* 상태 */}
          {sprint.state && (
            <div className="text-muted small">상태: {sprint.state}</div>
          )}

          {/* 기간 */}
          {(sprint.startDate || sprint.endDate) && (
            <div className="text-muted small">
              기간:&nbsp;
              {sprint.startDate
                ? new Date(sprint.startDate).toLocaleDateString()
                : "미정"}
              {" ~ "}
              {sprint.endDate
                ? new Date(sprint.endDate).toLocaleDateString()
                : "미정"}
            </div>
          )}
        </div>

        {/* 우측 버튼 */}
        <div className="ms-3">
          <span
            className="text-primary fw-medium"
            style={{ cursor: "pointer" }}
            onClick={(e) => handleOpenSprint(e)}
          >
            EDIT
          </span>
        </div>
      </div>
    </div>
  );
};

export default SprintCard;
