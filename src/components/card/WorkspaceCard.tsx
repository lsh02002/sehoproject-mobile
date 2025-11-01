import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CardContainer,
  CardWrapper,
  InfoBoxField,
  IdField,
  NameField,
  SlugField,
  ButtonsField,
  EditButtonField,
} from "./field/Field"; // styled 분리되어 있다면 해당 경로 유지
import styled from "styled-components";
import { WorkspaceResponseType } from "../../types/type";
import { TwoDiv } from "../form/TwoDiv";

const WorkspaceCard = ({ workspace }: { workspace: WorkspaceResponseType }) => {
  const navigate = useNavigate();
  const currentWorkspaceId = localStorage.getItem("workspaceId");
  const isCurrent = currentWorkspaceId === String(workspace.id);

  return (
    <CardContainer
      onClick={() => navigate(`/settings/workspace/${workspace.id}/edit`)}
    >
      <CardWrapper>
        <InfoBoxField>
          <TwoDiv>
            <IdField>#{workspace.id}</IdField>
            {isCurrent && <CurrentBadge>현재 워크스페이스</CurrentBadge>}
          </TwoDiv>

          <NameField>{workspace.name}</NameField>
          <SlugField>{workspace.slug}</SlugField>
        </InfoBoxField>

        <ButtonsField
          style={{
            justifyContent: "flex-end",
            filter:
              "invert(47%) sepia(79%) saturate(1448%) hue-rotate(194deg) brightness(103%) contrast(101%)",
          }}
        >
          <EditButtonField
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/settings/workspace/${workspace.id}/edit`);
            }}
          >
            EDIT
          </EditButtonField>
        </ButtonsField>
      </CardWrapper>
    </CardContainer>
  );
};

export default WorkspaceCard;

/* ================================
   Styled (이전에 있던 이름 유지)
================================ */

const CurrentBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 9999px;
  border: 1px solid #bfdbfe;
  background: #dbeafe;
  color: #1e3a8a;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #3b82f6;
  }
`;
