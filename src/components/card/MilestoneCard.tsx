import React from "react";
import { MilestoneResponseType } from "../../types/type";
import { LuMilestone } from "react-icons/lu";
import { useLogin } from "../../context/LoginContext";

const MilestoneCard = ({ milestone }: { milestone: MilestoneResponseType }) => {  
  const { setMilestone, setIsMilestoneOpen } = useLogin();

  const handleOpenMilestone = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    setMilestone(milestone);
    setIsMilestoneOpen(true);
  };

  return (
    <div className="card mb-3 shadow-sm" style={{ cursor: "pointer" }}>
      <div className="card-body d-flex justify-content-between align-items-center">
        {/* 좌측 정보 영역 */}
        <div className="d-flex flex-column">
          {/* ID */}
          <div className="fw-semibold mb-1" style={{ color: "#4680ff" }}>
            #{milestone.id}
          </div>

          {/* 아이콘 + 이름 */}
          <div className="d-flex align-items-center gap-2 mb-1">
            <LuMilestone />
            <div className="fw-medium">{milestone.name}</div>
          </div>

          {/* 상태 */}
          {milestone.status && (
            <div className="text-muted small">상태: {milestone.status}</div>
          )}

          {/* 기간 */}
          {(milestone.startDate || milestone.dueDate) && (
            <div className="text-muted small">
              기간:&nbsp;
              {milestone.startDate
                ? new Date(milestone.startDate).toLocaleDateString()
                : "미정"}
              {" ~ "}
              {milestone.dueDate
                ? new Date(milestone.dueDate).toLocaleDateString()
                : "미정"}
            </div>
          )}
        </div>

        {/* 우측 버튼 */}
        <div className="ms-3">
          <span
            className="text-primary fw-medium"
            style={{ cursor: "pointer" }}
            onClick={(e) => handleOpenMilestone(e)}
          >
            EDIT
          </span>
        </div>
      </div>
    </div>
  );
};

export default MilestoneCard;
