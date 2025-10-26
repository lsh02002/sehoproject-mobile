import React from "react";
import { SprintResponseType } from "../../../types/type";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ButtonsField, IdField, InfoBoxField, NameField } from "./field/Field";

const SprintCard = ({ sprint }: { sprint: SprintResponseType }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Wrapper>
        <InfoBoxField>
          <IdField>{sprint.id}</IdField>
          <NameField>{sprint.name}</NameField>
        </InfoBoxField>
        <ButtonsField>
          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/sprints/${sprint.id}/edit`);
            }}
          >
            EDIT
          </span>
        </ButtonsField>
      </Wrapper>
    </Container>
  );
};

export default SprintCard;

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

