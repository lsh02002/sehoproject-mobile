import styled from "styled-components";

export const AddDiaryButton = styled.button`
  position: fixed;
  right: 24px;
  bottom: 28px;
  z-index: 200;
  width: 56px;
  height: 56px;
  border: 1px solid rgba(79, 70, 229, 0.22);
  border-radius: 18px;
  background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);
  color: #ffffff;
  font-size: 1.6rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.28);
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    filter 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 34px rgba(37, 99, 235, 0.34);
    filter: brightness(1.02);
    cursor: pointer;
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.16),
      0 18px 34px rgba(37, 99, 235, 0.32);
  }

  @media (max-width: 640px) {
    right: 16px;
    bottom: 20px;
    width: 52px;
    height: 52px;
    border-radius: 16px;
  }
`;
