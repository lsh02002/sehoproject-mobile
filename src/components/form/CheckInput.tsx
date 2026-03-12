import React from "react";
import styled from "styled-components";

const CheckboxInput = ({
  disabled,
  name,
  title,
  checked,
  setChecked,
}: {
  disabled?: boolean;
  name: string;
  title: string;
  checked: boolean;
  setChecked: (v: boolean) => void;
}) => {
  return (
    <Container>
      <label htmlFor={name}>{title}</label>
      <CheckboxWrapper>
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </CheckboxWrapper>
    </Container>
  );
};

export default CheckboxInput;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 12px 0;
  padding: 16px 18px;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #ffffff;
  box-sizing: border-box;

  label {
    width: 100%;
    display: block;
    color: #0f172a;
    font-weight: 600;
    font-size: 0.92rem;
    line-height: 1.4;
  }

  @media (max-width: 640px) {
    padding: 14px 16px;

    label {
      font-size: 0.88rem;
    }
  }
`;

const CheckboxWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    appearance: none;
    width: 22px;
    height: 22px;
    border: 1.5px solid #cbd5e1;
    border-radius: 7px;
    background: #f8fafc;
    cursor: pointer;
    transition: border-color 0.2s ease, background-color 0.2s ease,
      box-shadow 0.2s ease, transform 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      border-color: #6366f1;
      background: #eef2ff;
    }

    &:checked {
      background-color: #4f46e5;
      border-color: #4f46e5;
    }

    &:checked::after {
      content: "✓";
      color: white;
      font-size: 15px;
      font-weight: 700;
    }

    &:focus-visible {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.14);
    }

    &:disabled {
      background: #f1f5f9;
      border-color: #dbe2ea;
      cursor: not-allowed;
      opacity: 0.72;
    }
  }
`;
