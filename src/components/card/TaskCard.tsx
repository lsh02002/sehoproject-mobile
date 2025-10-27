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
          {task.state && (
            <div style={{ color: "gray", fontSize: "0.9rem" }}>
              상태: {task.state}
            </div>
          )}
          {task.dueDate && (
            <div style={{ color: "gray", fontSize: "0.9rem" }}>
              마감일: {new Date(task.dueDate).toLocaleDateString()}
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
