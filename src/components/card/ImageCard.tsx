import React from "react";
import { TaskResponseType } from "../../types/type";

const ImageCard = ({
  task,
  imageUrl,
}: {
  task: TaskResponseType;
  imageUrl: string;
}) => {
  return (
    <div
      className="overflow-hidden rounded-3"
      style={{
        width: "120px",
        height: "90px",
        cursor: "pointer",
        position: "relative",
        backgroundColor: "#f8f9fa",
      }}
    >
      <img
        src={imageUrl}
        alt="task"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      />

      {/* hover overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0)",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0)";
        }}
      />
    </div>
  );
};

export default React.memo(ImageCard);
