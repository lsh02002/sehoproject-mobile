import React from "react";
import { MilestoneResponseType } from "../../types/type";
import { useNavigate } from "react-router-dom";
import {
  ButtonsField,
  CardContainer,
  CardWrapper,
  EditButtonField,
  IdField,
  InfoBoxField,
  NameField,
} from "./field/Field";

const MilestoneCard = ({ milestone }: { milestone: MilestoneResponseType }) => {
  const navigate = useNavigate();
  return (
    <CardContainer>
      <CardWrapper>
        <InfoBoxField>
          <IdField>{milestone.id}</IdField>
          <NameField>{milestone.name}</NameField>
        </InfoBoxField>
        <ButtonsField>
          <EditButtonField
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/milestones/${milestone.id}/edit`);
            }}
          >
            EDIT
          </EditButtonField>
        </ButtonsField>
      </CardWrapper>
    </CardContainer>
  );
};

export default MilestoneCard;
