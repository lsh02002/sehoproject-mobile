import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLogin } from "../../context/LoginContext";
import { Calendar } from "lucide-react";
import { useModalManager } from "../../context/ModalManager";

type ListLayoutProps = {
  title?: string;
  subtitle?: string;
  to?: string;
  createLabel?: string;
  rightActions?: React.ReactNode;
  count?: number;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  componentType?: "null" | "task" | "sprint" | "milestone";
};

const ListLayout = ({
  title,
  subtitle,
  to,
  createLabel,
  rightActions,
  count,
  isEmpty,
  emptyMessage = "표시할 항목이 없습니다.",
  children,
  icon,
  componentType = "null",
}: ListLayoutProps) => {
  const hasCreate = Boolean(to);
  const navigator = useNavigate();
  const { setTask, setSprint, setMilestone } = useLogin();
  const { openModal } = useModalManager();
  const { projectIdParam } = useParams();
  const projectId = Number(projectIdParam ?? localStorage.getItem("projectId"));

  const handleOpen = () => {
    if (componentType === "task") {
      setTask(undefined);
      openModal("task");

      return;
    } else if (componentType === "sprint") {
      setSprint(undefined);
      openModal("sprint");

      return;
    } else if (componentType === "milestone") {
      setMilestone(undefined);
      openModal("milestone");
    }
  };

  return (
    <div
      className="w-100 d-flex justify-content-center"
      style={{
        minWidth: 320,
        boxSizing: "border-box",
        padding: "24px 20px",
      }}
    >
      <div
        className="w-100 d-flex flex-column"
        style={{
          maxWidth: 1040,
          gap: 16,
        }}
      >
        {(title || rightActions || hasCreate) && (
          <header className="w-100 d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column" style={{ gap: 6 }}>
              {title && (
                <div className="d-flex align-items-center" style={{ gap: 10 }}>
                  {icon}
                  <h3 className="m-0 fs-5" style={{ lineHeight: 1.2 }}>
                    {title}
                  </h3>

                  {typeof count === "number" && (
                    <span
                      className="d-inline-flex align-items-center fw-semibold"
                      style={{
                        padding: "2px 8px",
                        borderRadius: 9999,
                        background: "#eef2ff",
                        color: "#4f46e5",
                        fontSize: "0.8rem",
                      }}
                    >
                      {count}
                    </span>
                  )}

                  {componentType === "sprint" && (
                    <Calendar
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator(`/sprints/projects/${projectId}/calendar`);
                      }}
                      style={{
                        width: "1.15em",
                        height: "1.15em",
                        marginLeft: "0.25em",
                        flexShrink: 0,
                        cursor: "pointer",
                      }}
                    />
                  )}
                </div>
              )}

              {subtitle && (
                <div className="text-secondary" style={{ fontSize: "0.9rem" }}>
                  {subtitle}
                </div>
              )}
            </div>
          </header>
        )}

        <div className="w-100 d-flex flex-column" style={{ gap: 12 }}>
          {isEmpty ? (
            <div
              className="w-100 text-center text-secondary"
              style={{
                padding: 24,
                border: "1px dashed #d1d5db",
                borderRadius: 12,
                background: "#fafafa",
              }}
            >
              {emptyMessage}
            </div>
          ) : (
            children
          )}

          <div className="d-flex align-items-center w-100" style={{ gap: 10 }}>
            {rightActions}

            {to && hasCreate ? (
              <Link
                to={to}
                className="btn w-100 d-inline-flex align-items-center justify-content-center fw-semibold text-decoration-none"
                style={{
                  height: 32,
                  padding: "0 12px",
                  borderRadius: 8,
                  fontSize: "0.9rem",
                  border: "1px solid #4680ff",
                  color: "#4680ff",
                  background: "white",
                }}
              >
                {createLabel ?? `${title ?? "항목"} 생성`}
              </Link>
            ) : (
              <button
                className="btn w-100 d-inline-flex align-items-center justify-content-center fw-semibold"
                onClick={handleOpen}
                style={{
                  height: 32,
                  padding: "0 12px",
                  borderRadius: 8,
                  fontSize: "0.9rem",
                  border: "1px solid #4680ff",
                  color: "#4680ff",
                  background: "white",
                }}
              >
                {createLabel ?? `${title ?? "항목"} 생성`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListLayout;
