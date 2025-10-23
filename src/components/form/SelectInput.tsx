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
  margin: 6px 0;

  label {
    width: 100%;
    color: black;
    font-weight: 400;
    font-size: 0.8rem;
  }
`;

const SelectEl = styled.select<{ $isPlaceholder: boolean }>`
  width: 100%;
  padding: 0.7rem;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid lightgray;
  margin-top: 4px;
  font-size: 0.7rem;
  background: white;
  outline: none;
  appearance: none;

  /* placeholder 상태일 때만 스타일 적용 */
  color: ${({ $isPlaceholder }) => ($isPlaceholder ? "darkgray" : "inherit")};
  font-style: ${({ $isPlaceholder }) => ($isPlaceholder ? "italic" : "normal")};

  &:hover {
    border: 1px solid #4680ff;
    cursor: pointer;
  }
  &:focus {
    border: 1px solid #4680ff;
  }

  option {
    color: black;
    font-style: normal;
  }
`;
