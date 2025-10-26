import React from "react";
import { TaskResponseType } from "../../../types/type";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ButtonsField, IdField, InfoBoxField, NameField } from "./field/Field";

const TaskCard = ({ task }: { task: TaskResponseType }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Wrapper>
        <InfoBoxField>
          <IdField>{task.id}</IdField>
          <NameField>{task.name}</NameField>
        </InfoBoxField>
        <ButtonsField>
          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/tasks/${task.id}/edit`);
            }}
          >
            EDIT
          </span>
        </ButtonsField>
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
