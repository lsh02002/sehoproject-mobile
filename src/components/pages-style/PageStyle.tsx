import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-weight: 500;
  }

  a {
    font-size: 0.7rem;
  }
`;

export const TabH3 = styled.h3<{ $active?: boolean }>`
  position: relative;
  margin: 0;
  padding: 10px 4px;
  font-weight: 700;
  font-size: 1rem;
  color: ${({ $active }) => ($active ? "#111827" : "#6b7280")};
  cursor: pointer;
  user-select: none;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    height: 3px;
    width: ${({ $active }) => ($active ? "100%" : "0")};
    background: #3b82f6;
    border-radius: 2px;
    transition: width 0.2s ease;
  }

  &:hover {
    color: #111827;
  }
`;

export const EmptyState = styled.div`
  padding: 12px 4px;

  h4 {
    margin: 0 0 8px 0;
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
  }
  p {
    margin: 0;
    color: #6b7280;
    font-size: 0.9rem;
  }
`;
