import React from "react";
import { MilestoneResponseType } from "../../../types/type";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ButtonsField, IdField, InfoBoxField, NameField } from "./field/Field";

const MilestoneCard = ({ milestone }: { milestone: MilestoneResponseType }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Wrapper>
        <InfoBoxField>
          <IdField>{milestone.id}</IdField>
          <NameField>{milestone.name}</NameField>
        </InfoBoxField>
        <ButtonsField>
          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/milestones/${milestone.id}/edit`);
            }}
          >
            EDIT
          </span>
        </ButtonsField>
      </Wrapper>
    </Container>
  );
};

export default MilestoneCard;

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
