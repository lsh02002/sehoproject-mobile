import React from "react";
import { MilestoneResponseType } from "../../types/type";
import { LuMilestone } from "react-icons/lu";
import { FiEdit3, FiCalendar } from "react-icons/fi";
import { useLogin } from "../../context/LoginContext";
import { useModalManager } from "../../context/ModalContext";

const MilestoneCard = ({ milestone }: { milestone: MilestoneResponseType }) => {
  const { setMilestone } = useLogin();
  const { openModal } = useModalManager();

  const handleOpenMilestone = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMilestone(milestone);
    openModal("milestone");
  };

  const statusConfig = {
    TODO: "bg-secondary-subtle text-secondary-emphasis",
    IN_PROGRESS: "bg-primary-subtle text-primary",
    DONE: "bg-success-subtle text-success-emphasis",
    COMPLETED: "bg-success-subtle text-success-emphasis",
    CANCELLED: "bg-danger-subtle text-danger-emphasis",
  } as const;

  const statusClass =
    statusConfig[milestone.status as keyof typeof statusConfig] ??
    "bg-light text-muted";

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
                #{milestone.id}
              </span>

              {milestone.status && (
                <span
                  className={`badge rounded-pill px-3 py-2 ${statusClass}`}
                  style={{ fontSize: "0.72rem" }}
                >
                  {milestone.status}
                </span>
              )}
            </div>

            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <LuMilestone />
              {milestone.name}
            </h5>

            {(milestone.startDate || milestone.dueDate) && (
              <div className="d-flex align-items-center gap-2 text-muted small">
                <FiCalendar />
                <span>
                  기간{" "}
                  <strong className="text-dark">
                    {milestone.startDate
                      ? new Date(milestone.startDate).toLocaleDateString()
                      : "미정"}
                    {" ~ "}
                    {milestone.dueDate
                      ? new Date(milestone.dueDate).toLocaleDateString()
                      : "미정"}
                  </strong>
                </span>
              </div>
            )}
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
            onClick={handleOpenMilestone}
            aria-label="Edit milestone"
          >
            <FiEdit3 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MilestoneCard);
