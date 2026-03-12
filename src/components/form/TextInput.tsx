import React from "react";
import styled from "styled-components";

const TextInput = ({
  disabled,
  name,
  title,
  data,
  setData,
}: {
  disabled?: boolean;
  name: string;
  title: string;
  data: string;
  setData: (v: string) => void;
}) => {
  return (
    <Container>
      <label htmlFor={name}>{title}</label>
      <input
        type="text"
        name={name}
        value={data}
        disabled={disabled}
        onChange={(e) => setData(e.target.value)}
        placeholder={`${title}을(를) 입력하세요`}
      />
    </Container>
  );
};

export default TextInput;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 12px 0;

  label {
    width: 100%;
    display: block;
    margin-bottom: 8px;
    color: #0f172a;
    font-weight: 600;
    font-size: 0.92rem;
  }

  input {
    width: 100%;
    min-height: 46px;
    padding: 12px 14px;
    border: 1px solid #dbe2ea;
    border-radius: 14px;
    background: #ffffff;
    box-sizing: border-box;
    color: #0f172a;
    line-height: 1.5;
    transition: border-color 0.2s ease, box-shadow 0.2s ease,
      background-color 0.2s ease;

    &:hover {
      border-color: #94a3b8;
    }

    &:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
    }

    &::placeholder {
      color: #94a3b8;
    }

    &:disabled {
      background: #f8fafc;
      color: #94a3b8;
      cursor: not-allowed;
    }
  }

  @media (max-width: 640px) {
    label {
      font-size: 0.88rem;
    }

    input {
      font-size: 16px;
      min-height: 44px;
    }
  }
`;
