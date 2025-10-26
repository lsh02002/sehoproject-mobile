import React from "react";
import { ProjectResponseType } from "../../types/type";
import { useNavigate } from "react-router-dom";
import {
  ButtonsField,
  CardContainer,
  CardWrapper,
  EditButtonField,
  IdField,
  InfoBoxField,
  NameField,
} from "./field/Field";

const ProjectCard = ({ project }: { project: ProjectResponseType }) => {
  const navigate = useNavigate();
  return (
    <CardContainer onClick={() => navigate(`/boards/projects/${project.id}`)}>
      <CardWrapper>
        <InfoBoxField>
          <IdField>{project.id}</IdField>
          <NameField>{project.name}</NameField>
        </InfoBoxField>
        <ButtonsField>
          <EditButtonField
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/projects/${project.id}/edit`);
            }}
          >
            EDIT
          </EditButtonField>
        </ButtonsField>
      </CardWrapper>
    </CardContainer>
  );
};

export default ProjectCard;
