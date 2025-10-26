import React from "react";
import { ProjectResponseType } from "../../../types/type";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ButtonsField, IdField, InfoBoxField, NameField } from "./field/Field";

const ProjectCard = ({ project }: { project: ProjectResponseType }) => {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate(`/boards/projects/${project.id}`)}>
      <Wrapper>
        <InfoBoxField>
          <IdField>{project.id}</IdField>
          <NameField>{project.name}</NameField>
        </InfoBoxField>
        <ButtonsField>
          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/projects/${project.id}/edit`);
            }}
          >
            EDIT
          </span>
        </ButtonsField>
      </Wrapper>
    </Container>
  );
};

export default ProjectCard;

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
