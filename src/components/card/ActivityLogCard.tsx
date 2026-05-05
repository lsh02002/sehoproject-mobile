import React from "react";
import { ActivityLogResponseType } from "../../types/type";
import { FiClock } from "react-icons/fi";

const ActivityLogCard = ({ log }: { log: ActivityLogResponseType }) => {
  return (
    <div
      className="card border-0 shadow-sm mb-2"
      style={{
        borderRadius: "14px",
        transition: "background 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#f8fafc";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "";
      }}
    >
      <div className="card-body py-3 px-4">
        <div className="d-flex align-items-start gap-3">
          {/* 왼쪽 아이콘 (타임라인 느낌) */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#f1f5ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#4680ff",
              flexShrink: 0,
            }}
          >
            <FiClock size={16} />
          </div>

          {/* 내용 */}
          <div className="flex-grow-1">
            <div
              className="mb-1"
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.4,
                fontWeight: 500,
              }}
            >
              {log?.message}
            </div>

            <div className="text-muted small d-flex align-items-center gap-2">
              <span>{new Date(log.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ActivityLogCard);
