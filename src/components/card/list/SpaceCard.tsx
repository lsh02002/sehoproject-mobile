import React from "react";
import { SpaceResponseType } from "../../../types/type";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SpaceCard = ({ space }: { space: SpaceResponseType }) => {
  const navigate = useNavigate();
  return (
    <Container onClick={(e) =>{ 
        e.stopPropagation();
        console.log(space.id);
        navigate(`/projects/spaces/${space.id}`)}}>
      <Wrapper>
        <Info>
          <Id>{space.id}</Id>
          <Name>{space.name}</Name>
          <Slug>{space.slug}</Slug>
          <WorkId>워크스페이스: {space.workspaceId}</WorkId>
        </Info>
        <Buttons>
          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/workspace/${space.workspaceId}/spaces/${space.id}`);
            }}
          >
            EDIT
          </span>
        </Buttons>
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

const Slug = styled.div`
  color: gray;
`;

const WorkId = styled.div`
  font-size: 0.9rem;
  color: gray;
`;

const Buttons = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #4680ff;
`;
