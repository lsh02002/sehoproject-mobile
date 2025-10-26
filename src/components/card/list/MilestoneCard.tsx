import React from "react";
import { MilestoneResponseType } from "../../../types/type";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MilestoneCard = ({ milestone }: { milestone: MilestoneResponseType }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Wrapper>
        <Info>
          <Id>{milestone.id}</Id>
          <Name>{milestone.name}</Name>
        </Info>
        <Buttons>
          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/milestones/${milestone.id}/edit`);
            }}
          >
            EDIT
          </span>
        </Buttons>
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

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px;
`;

const Id = styled.div`
  color: #4680ff;
`;

const Name = styled.div`
  font-size: 1.1rem;
`;

const Buttons = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #4680ff;
`;
