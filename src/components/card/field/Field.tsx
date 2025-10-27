import styled from "styled-components";

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  box-sizing: border-box;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 10px;
  transition: background-color 0.15s ease;
  border-radius: 4px;

  &:hover {
    background-color: #f7f9fc;
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
  font-weight: bold;
  margin-bottom: 4px;
`;

export const NameField = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 4px;
`;

export const SlugField = styled.div`
  color: gray;
  font-size: 0.9rem;
`;

export const EditButtonField = styled.span`
  color: #4680ff;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonsField = styled.div`
  width: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;  
`;

export const InfoBoxField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;  
`;
