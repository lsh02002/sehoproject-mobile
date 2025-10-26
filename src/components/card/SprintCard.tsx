import React from "react";
import { SprintResponseType } from "../../types/type";
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

const SprintCard = ({ sprint }: { sprint: SprintResponseType }) => {
  const navigate = useNavigate();
  return (
    <CardContainer>
      <CardWrapper>
        <InfoBoxField>
          <IdField>{sprint.id}</IdField>
          <NameField>{sprint.name}</NameField>
        </InfoBoxField>
        <ButtonsField>
          <EditButtonField
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/sprints/${sprint.id}/edit`);
            }}
          >
            EDIT
          </EditButtonField>
        </ButtonsField>
      </CardWrapper>
    </CardContainer>
  );
};

export default SprintCard;
