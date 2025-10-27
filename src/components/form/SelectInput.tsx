import React from "react";
import styled from "styled-components";

export type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

const SelectInput = ({
  name,
  title,
  value,
  setValue,
  options,
  placeholder,
}: {
  name: string;
  title: string;
  value: string;
  setValue: (v: string) => void;
  options: Option[];
  placeholder?: string;
}) => {
  const isPlaceholder = value === "";

  return (
    <Container>
      <label htmlFor={name}>{title}</label>
      <SelectEl
        name={name}
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        $isPlaceholder={isPlaceholder}
      >
        {placeholder && (
          <option
            style={{ color: "darkgray", fontStyle: "italic" }}
            value=""
            disabled
          >
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </SelectEl>
    </Container>
  );
};

export default SelectInput;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: 10px 0;

  &:hover {
    background-color: #f7f9fc;
  }

  label {
    width: 100%;
    color: black;
    font-weight: 500;
    font-size: 0.95rem;
    margin-bottom: 4px;
  }
`;

const SelectEl = styled.select<{ $isPlaceholder: boolean }>`
  width: 100%;
  padding: 0.7rem;
  box-sizing: border-box;  
  border: none;
  border-bottom: 1px solid lightgray;  
  font-size: 0.95rem;
  background: white;
  outline: none;
  appearance: none;
  background-color: transparent;

  /* placeholder 상태일 때만 스타일 적용 */
  color: ${({ $isPlaceholder }) => ($isPlaceholder ? "darkgray" : "inherit")};
  font-style: ${({ $isPlaceholder }) => ($isPlaceholder ? "italic" : "normal")};

  &:hover {
    border-bottom: 1px solid #4680ff;
    cursor: pointer;
  }
  &:focus {
    border-bottom: 1px solid #4680ff;
  }

  option {
    color: black;
    font-style: normal;
  }
`;
