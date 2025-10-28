import styled from "styled-components";

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid lightgray;
  box-sizing: border-box;
  margin: 10px 0;
  padding: 12px;
  transition: background-color 0.15s ease, border-bottom 0.15s ease;
  background-color: transparent;
  cursor: pointer;
  border-radius: 4px;
  outline: none;

  &:hover {
    background-color: #f7f9fc;
  }

  &:focus,
  &:active {
    border-bottom: 1px solid #4680ff;
    background-color: #f0f5ff;
  }
`;

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IdField = styled.div`
  color: #4680ff;
  font-weight: 600;
  margin-bottom: 4px;
  transition: color 0.15s ease;

  ${CardContainer}:hover & {
    color: #2e63d4;
  }
`;

export const NameField = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 4px;
  color: black;
`;

export const SlugField = styled.div`
  color: gray;
  font-size: 0.9rem;
  font-style: italic;
`;

export const EditButtonField = styled.span`
  color: #4680ff;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    text-decoration: underline;
    opacity: 0.85;
  }

  &:active {
    opacity: 0.6;
  }
`;

export const ButtonsField = styled.div`
  width: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

export const InfoBoxField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;
