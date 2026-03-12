import React from "react";
import styled from "styled-components";

const ConfirmButton = ({
  disabled,
  title,
  onClick,
}: {
  disabled?: boolean;
  title: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return <Button disabled={disabled} onClick={onClick}>{title}</Button>;
};

export default ConfirmButton;

const Button = styled.button`
  width: 100%;
  min-height: 48px;
  padding: 13px 16px;
  margin-top: 24px;
  border: 1px solid rgba(79, 70, 229, 0.18);
  border-radius: 14px;
  color: #ffffff;
  background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);
  font-size: 0.98rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.2);
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    filter 0.18s ease;

  &:hover {
    background: linear-gradient(135deg, #4338ca 0%, #1d4ed8 100%);
    box-shadow: 0 14px 28px rgba(37, 99, 235, 0.24);
    transform: translateY(-1px);
    cursor: pointer;
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.16),
      0 14px 28px rgba(37, 99, 235, 0.22);
  }

  &:disabled {
    background: #c7d2fe;
    border-color: #c7d2fe;
    color: #eef2ff;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;
