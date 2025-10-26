import React from "react";
import { WorkspaceResponseType } from "../../../types/type";
import styled from "styled-components";
import Invitation from "../../../assets/invitation.svg";
import { useNavigate } from "react-router-dom";
import {
  ButtonsField,
  IdField,
  InfoBoxField,
  NameField,
  SlugField,
} from "./field/Field";

const WorkspaceCard = ({ workspace }: { workspace: WorkspaceResponseType }) => {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate(`/workspace/${workspace.id}/spaces`)}>
      <Wrapper>
        <InfoBoxField>
          <IdField>{workspace.id}</IdField>
          <NameField>{workspace.name}</NameField>
          <SlugField>{workspace.slug}</SlugField>
        </InfoBoxField>
        <ButtonsField>
          <img src={Invitation} alt="" width={28} />
          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/workspace/${workspace.id}`);
            }}
          >
            EDIT
          </span>
        </ButtonsField>
      </Wrapper>
    </Container>
  );
};

export default WorkspaceCard;

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
`;
