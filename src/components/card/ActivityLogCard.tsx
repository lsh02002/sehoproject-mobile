import React from "react";
import { ActivityLogResponseType } from "../../types/type";

const ActivityLogCard = ({ log }: { log: ActivityLogResponseType }) => {
  return (
    <div className="card mb-3 shadow-sm" style={{ cursor: "pointer" }}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column w-100">
          <div className="mb-1" style={{ fontSize: "0.9rem" }}>
            {log?.message}
          </div>

          <div
            className="text-muted small w-100"
            style={{ fontStyle: "italic" }}
          >
            {log?.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogCard;
