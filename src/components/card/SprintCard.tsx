import React from "react";
import { SprintResponseType } from "../../types/type";
import { GiSprint } from "react-icons/gi";
import { FiEdit3, FiCalendar } from "react-icons/fi";
import { useLogin } from "../../context/LoginContext";
import { useModalManager } from "../../context/ModalManager";

const SprintCard = ({ sprint }: { sprint: SprintResponseType }) => {
  const { setSprint } = useLogin();
  const { openModal } = useModalManager();

  const handleOpenSprint = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSprint(sprint);
    openModal("sprint");
  };

  const stateConfig = {
    PLANNED: {
      label: "PLANNED",
      className: "bg-secondary-subtle text-secondary-emphasis",
    },
    ACTIVE: {
      label: "ACTIVE",
      className: "bg-primary-subtle text-primary",
    },
    COMPLETED: {
      label: "COMPLETED",
      className: "bg-success-subtle text-success-emphasis",
    },
  } as const;

  const state = sprint.state
    ? stateConfig[sprint.state as keyof typeof stateConfig]
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
                #{sprint.id}
              </span>

              {state && (
                <span
                  className={`badge rounded-pill d-inline-flex align-items-center gap-1 px-3 py-2 ${state.className}`}
                  style={{ fontSize: "0.72rem" }}
                >
                  {state.label}
                </span>
              )}
            </div>

            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <GiSprint />
              {sprint.name}
            </h5>

            {(sprint.startDate || sprint.endDate) && (
              <div className="d-flex align-items-center gap-2 text-muted small">
                <FiCalendar />
                <span>
                  기간{" "}
                  <strong className="text-dark">
                    {sprint.startDate
                      ? new Date(sprint.startDate).toLocaleDateString()
                      : "미정"}
                    {" ~ "}
                    {sprint.endDate
                      ? new Date(sprint.endDate).toLocaleDateString()
                      : "미정"}
                  </strong>
                </span>
              </div>
            )}
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
            onClick={handleOpenSprint}
            aria-label="Edit sprint"
          >
            <FiEdit3 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SprintCard);
