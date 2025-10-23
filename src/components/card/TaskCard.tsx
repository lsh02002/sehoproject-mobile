import React from "react";
import { TaskResponseType } from "../../types/type";
import styled from "styled-components";

const TaskCard = ({ task }: { task: TaskResponseType }) => {  
  return (
    <Container>
      <Wrapper>
        <Info>
          <Id>{task.id}</Id>
          <Name>{task.name}</Name>          
        </Info>
        <Buttons>          
          <span
            onClick={(e) => {
              e.stopPropagation();
            //   navigate(`/projects/${project.id}/edit`);
            }}
          >
            EDIT
          </span>
        </Buttons>
      </Wrapper>
    </Container>
  );
};

export default TaskCard;

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