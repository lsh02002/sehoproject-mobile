import React from "react";
import { useNavigate } from "react-router-dom";
import { ProjectResponseType } from "../../types/type";
import {
  ButtonsField,
  CardContainer,
  CardWrapper,
  EditButtonField,
  IdField,
  InfoBoxField,
  NameField,
  SlugField,
} from "./field/Field";

const ProjectCard = ({ project }: { project: ProjectResponseType }) => {
  const navigate = useNavigate();

  return (
    <CardContainer onClick={() => navigate(`/boards/projects/${project.id}`)}>
      <CardWrapper>
        <InfoBoxField>
          <IdField>{project.projectKey}</IdField>
          <NameField>{project.name}</NameField>
          <SlugField>
            {project.spaceName} • {project.status}
          </SlugField>
          {project.dueDate && (
            <SlugField>
              마감일: {new Date(project.dueDate).toLocaleDateString()}
            </SlugField>
          )}
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
