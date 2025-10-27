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
    <CardContainer onClick={() => navigate(`/projects/spaces/${space.id}`)}>
      <CardWrapper>
        <InfoBoxField>
          <IdField>#{space.id}</IdField>
          <NameField>{space.name}</NameField>
          {space.slug && <SlugField>{space.slug}</SlugField>}
          <SlugField>워크스페이스 ID: {space.workspaceId}</SlugField>
        </InfoBoxField>

        <ButtonsField>
          <EditButtonField
            onClick={(e) => {
              e.stopPropagation();
              // 편집 페이지 경로가 다르면 아래 라우트만 맞춰주세요.
              navigate(`/workspace/${space.workspaceId}/spaces/${space.id}/edit`);
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
