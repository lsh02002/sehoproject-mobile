import React from "react";
import { WorkspaceResponseType } from "../../types/type";
import Invitation from "../../assets/invitation.svg";
import { useNavigate } from "react-router-dom";
import {
  ButtonsField,
  CardContainer,
  EditButtonField,
  IdField,
  InfoBoxField,
  NameField,
  SlugField,
  CardWrapper,
} from "./field/Field";

const WorkspaceCard = ({ workspace }: { workspace: WorkspaceResponseType }) => {
  const navigate = useNavigate();
  return (
    <CardContainer
      onClick={() => navigate(`/workspace/${workspace.id}/spaces`)}
    >
      <CardWrapper>
        <InfoBoxField>
          <IdField>{workspace.id}</IdField>
          <NameField>{workspace.name}</NameField>
          <SlugField>{workspace.slug}</SlugField>
        </InfoBoxField>
        <ButtonsField>
          <img src={Invitation} alt="" width={28} />
          <EditButtonField
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/workspace/${workspace.id}`);
            }}
          >
            EDIT
          </EditButtonField>
        </ButtonsField>
      </CardWrapper>
    </CardContainer>
  );
};

export default WorkspaceCard;
