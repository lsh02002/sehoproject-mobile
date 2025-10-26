import React from "react";
import { SpaceResponseType } from "../../../types/type";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ButtonsField, IdField, InfoBoxField, NameField, SlugField } from "./field/Field";

const SpaceCard = ({ space }: { space: SpaceResponseType }) => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/projects/spaces/${space.id}`);
      }}
    >
      <Wrapper>
        <InfoBoxField>
          <IdField>{space.id}</IdField>
          <NameField>{space.name}</NameField>
          <SlugField>{space.slug}</SlugField>
          <span>
            워크스페이스:<IdField>{space.workspaceId}</IdField>
          </span>
        </InfoBoxField>
        <ButtonsField>
          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/workspace/${space.workspaceId}/spaces/${space.id}`);
            }}
          >
            EDIT
          </span>
        </ButtonsField>
      </Wrapper>
    </Container>
  );
};

export default SpaceCard;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding-left: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: flex;
    align-items: center;
  }
`;

