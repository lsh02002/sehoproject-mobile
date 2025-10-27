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

const MilestoneCard = ({
  milestone,
}: {
  milestone: MilestoneResponseType;
}) => {
  const navigate = useNavigate();

  return (
    <CardContainer onClick={() => navigate(`/milestones/${milestone.id}/edit`)}>
      <CardWrapper>
        <InfoBoxField>
          <IdField>#{milestone.id}</IdField>
          <NameField>{milestone.name}</NameField>

          {milestone.status && (
            <div style={{ color: "gray", fontSize: "0.9rem" }}>
              상태: {milestone.status}
            </div>
          )}

          {(milestone.startDate || milestone.dueDate) && (
            <div style={{ color: "gray", fontSize: "0.9rem" }}>
              기간:&nbsp;
              {milestone.startDate
                ? new Date(milestone.startDate).toLocaleDateString()
                : "미정"}
              {" ~ "}
              {milestone.dueDate
                ? new Date(milestone.dueDate).toLocaleDateString()
                : "미정"}
            </div>
          )}
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
