import styled from "styled-components";

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding-left: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IdField = styled.div`
  color: #4680ff;
`;

export const NameField = styled.div`
  font-size: 1.1rem;
`;

export const SlugField = styled.div`
  color: gray;
`;

export const EditButtonField = styled.span`
  color: #4680ff;
`;

export const ButtonsField = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #4680ff;
`;

export const InfoBoxField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px;
`;
