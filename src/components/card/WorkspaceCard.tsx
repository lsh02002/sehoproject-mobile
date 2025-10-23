import React from "react";
import { workspaceResponseType } from "../../types/type";
import styled from "styled-components";
import Invitation from "../../assets/invitation.svg";
import { useNavigate } from "react-router-dom";

const WorkspaceCard = ({ workspace }: { workspace: workspaceResponseType }) => {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate(`/workspace/${workspace.id}/spaces`)}>
      <Wrapper>
        <Info>
          <Id>{workspace.id}</Id>
          <Name>{workspace.name}</Name>
          <Slug>{workspace.slug}</Slug>
        </Info>
        <Buttons>
          <img src={Invitation} alt="" width={28} />
          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/workspace/${workspace.id}`);
            }}
          >
            EDIT
          </span>
        </Buttons>
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
  border: 1px solid gray;
  padding-left: 10px;
  border-radius: 5px;
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
  justify-content: center;
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

const Buttons = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #4680ff;
`;
