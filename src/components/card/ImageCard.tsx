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
    <div className="d-flex justify-content-center box-sizing-border-box py-2">
      <img
        style={{ objectFit: "fill", cursor: "pointer" }}
        width="100%"
        height="100%"
        src={imageUrl}
        alt="그림"
        className="rounded"
      />
    </div>
  );
};

export default React.memo(ImageCard);
