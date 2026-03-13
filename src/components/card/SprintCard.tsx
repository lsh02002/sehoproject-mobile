import React from "react";
import { SprintResponseType } from "../../types/type";
import { useNavigate } from "react-router-dom";
import {
  ButtonsField,
  CardContainer,
  EditButtonField,
  IdField,
  InfoBoxField,
  CardWrapper,
  IconAndNameField,
} from "./field/Field";
import { GiSprint } from "react-icons/gi";
import { useLogin } from "../../context/LoginContext";

const SprintCard = ({ sprint }: { sprint: SprintResponseType }) => {
  const navigate = useNavigate();
  const { setSprint, setIsSprintOpen } = useLogin();

  const handleOpenSprint = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setSprint(sprint);
    setIsSprintOpen(true);
  };

  return (
    <CardContainer onClick={(e) => handleOpenSprint(e)}>
      <CardWrapper>
        <InfoBoxField>
          <IdField>#{sprint.id}</IdField>
          <IconAndNameField icon={<GiSprint />} name={sprint.name} />
          {sprint.state && (
            <div style={{ color: "gray", fontSize: "0.9rem" }}>
              상태: {sprint.state}
            </div>
          )}
          {(sprint.startDate || sprint.endDate) && (
            <div style={{ color: "gray", fontSize: "0.9rem" }}>
              기간:&nbsp;
              {sprint.startDate
                ? new Date(sprint.startDate).toLocaleDateString()
                : "미정"}
              {" ~ "}
              {sprint.endDate
                ? new Date(sprint.endDate).toLocaleDateString()
                : "미정"}
            </div>
          )}
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
