import React from "react";
import styled from "styled-components";

const ConfirmButton = ({
  title,
  onClick,
}: {
  title: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return <Button onClick={onClick}>{title}</Button>;
};

export default ConfirmButton;

const Button = styled.button`
  width: 100%;
  padding: 0.6rem;
  margin-top: 35px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #4680ff;
  font-size: 0.8rem;
`;
