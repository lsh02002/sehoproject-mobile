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
          <IdField>#{workspace.id}</IdField>
          <NameField>{workspace.name}</NameField>
          <SlugField>{workspace.slug}</SlugField>
        </InfoBoxField>

        <ButtonsField
          style={{
            justifyContent: "space-between",
            filter:
              "invert(47%) sepia(79%) saturate(1448%) hue-rotate(194deg) brightness(103%) contrast(101%)",
          }}
        >
          <img
            src={Invitation}
            alt="Invite"
            width={24}
            height={24}
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/workspace/${workspace.id}/invite`);
            }}
          />
          <EditButtonField
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/workspace/${workspace.id}/edit`);
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
