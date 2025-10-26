import React from "react";
import { SpaceResponseType } from "../../types/type";
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

const SpaceCard = ({ space }: { space: SpaceResponseType }) => {
  const navigate = useNavigate();
  return (
    <CardContainer
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/projects/spaces/${space.id}`);
      }}
    >
      <CardWrapper>
        <InfoBoxField>
          <IdField>{space.id}</IdField>
          <NameField>{space.name}</NameField>
          <SlugField>{space.slug}</SlugField>
          <span>
            워크스페이스:<IdField>{space.workspaceId}</IdField>
          </span>
        </InfoBoxField>
        <ButtonsField>
          <EditButtonField
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/workspace/${space.workspaceId}/spaces/${space.id}`);
            }}
          >
            EDIT
          </EditButtonField>
        </ButtonsField>
      </CardWrapper>
    </CardContainer>
  );
};

export default SpaceCard;
