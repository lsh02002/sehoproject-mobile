import React from "react";
import { TaskResponseType } from "../../types/type";
import { useNavigate } from "react-router-dom";
import {
  ButtonsField,
  CardContainer,
  EditButtonField,
  IdField,
  InfoBoxField,
  NameField,
  CardWrapper,
} from "./field/Field";

const TaskCard = ({ task }: { task: TaskResponseType }) => {
  const navigate = useNavigate();

  return (
    <CardContainer onClick={() => navigate(`/tasks/${task.id}/edit`)}>
      <CardWrapper>
        <InfoBoxField>
          <IdField>#{task.id}</IdField>
          <NameField>{task.name}</NameField>

          {/* 상태 */}
          {task.state && (
            <div style={{ color: "gray", fontSize: "0.9rem", marginTop: "4px" }}>
              상태: {task.state}
            </div>
          )}

          {/* 마감일 */}
          {task.dueDate && (
            <div style={{ color: "gray", fontSize: "0.9rem", marginTop: "2px" }}>
              마감일: {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}

          {/* 프로젝트 ID */}
          {task.projectId && (
            <div
              style={{
                color: "#888",
                fontSize: "0.85rem",
                marginTop: "6px",
                fontStyle: "italic",
              }}
            >
              📁 프로젝트 ID: {task.projectId}
            </div>
          )}
        </InfoBoxField>

        <ButtonsField>
          <EditButtonField
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/tasks/${task.id}/edit`);
            }}
          >
            EDIT
          </EditButtonField>
        </ButtonsField>
      </CardWrapper>
    </CardContainer>
  );
};

export default TaskCard;
