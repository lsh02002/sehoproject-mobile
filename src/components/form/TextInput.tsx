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
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: 6px 0;

  label {
    width: 100%;
    color: black;
    font-weight: 400;
    font-size: 0.8rem;
  }
  input {
    width: 100%;
    padding: 0.7rem;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 4px;
    font-size: 0.7rem;
    //*****매우 중요 outline *****//
    outline: none;

    &:hover {
      border: 1px solid #4680ff;
    }

    &:focus {
      border: 1px solid #4680ff;
    }

    &::placeholder {
      color: gray;
      font-style: italic;
    }
  }
`;
