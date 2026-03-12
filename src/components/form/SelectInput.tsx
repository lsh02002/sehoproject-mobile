import React from "react";
import styled from "styled-components";

export type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

const SelectInput = ({
  disabled,
  name,
  title,
  value,
  setValue,
  options,
  placeholder,
}: {
  disabled?: boolean;
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
        disabled={disabled}
        name={name}
        id={name}
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        $isPlaceholder={isPlaceholder}
      >
        {placeholder && (
          <option
            style={{ color: "#94a3b8", fontStyle: "normal" }}
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
  flex-direction: column;
  margin: 12px 0;
  height: 100%;
  box-sizing: border-box;

  label {
    width: 100%;
    display: block;
    margin-bottom: 8px;
    color: #0f172a;
    font-weight: 600;
    font-size: 0.92rem;
  }

  @media (max-width: 640px) {
    label {
      font-size: 0.88rem;
    }

    select {
      font-size: 16px;
      min-height: 44px;
    }
  }
`;

const SelectEl = styled.select<{ $isPlaceholder: boolean }>`
  width: 100%;
  min-height: 46px;
  padding: 0 42px 0 14px;
  font-size: 0.95rem;
  color: ${({ $isPlaceholder }) => ($isPlaceholder ? "#94a3b8" : "#0f172a")};
  background-color: #ffffff;
  background-image: linear-gradient(45deg, transparent 50%, #64748b 50%),
    linear-gradient(135deg, #64748b 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(50% - 2px),
    calc(100% - 14px) calc(50% - 2px);
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;
  border-radius: 14px;
  border: 1px solid #dbe2ea;
  box-sizing: border-box;
  appearance: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    border-color: #94a3b8;
    cursor: pointer;
  }

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
  }

  &:disabled {
    background-color: #f8fafc;
    color: #94a3b8;
    cursor: not-allowed;
  }

  option {
    color: #0f172a;
    font-style: normal;
  }
`;
