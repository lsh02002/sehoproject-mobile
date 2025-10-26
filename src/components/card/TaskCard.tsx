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
    <CardContainer>
      <CardWrapper>
        <InfoBoxField>
          <IdField>{task.id}</IdField>
          <NameField>{task.name}</NameField>
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
