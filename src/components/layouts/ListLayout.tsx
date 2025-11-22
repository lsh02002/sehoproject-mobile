import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

type ListLayoutProps = {
  title?: string;
  subtitle?: string; // 제목 아래 회색 설명
  to?: string; // 생성 버튼 이동 경로
  createLabel?: string; // 생성 버튼 레이블 (기본: "{title} 생성")
  rightActions?: React.ReactNode; // 우측에 배치할 임의의 액션들
  count?: number; // 아이템 개수 뱃지
  isEmpty?: boolean; // 빈 상태 여부
  emptyMessage?: string; // 빈 상태 메시지
  children: React.ReactNode;
  icon?: React.ReactNode;  
};

const ListLayout = ({
  title,
  subtitle,
  to,
  createLabel,
  rightActions,
  count,
  isEmpty,
  emptyMessage = "표시할 항목이 없습니다.",
  children,
  icon,
}: ListLayoutProps) => {
  const hasCreate = Boolean(to);

  return (
    <Container>
      <Wrapper>
        {(title || rightActions || hasCreate) && (
          <Header>
            <TitleBlock>
              {title && (
                <TitleRow>
                  {icon}
                  <Title>{title}</Title>
                  {typeof count === "number" && (
                    <CountBadge>{count}</CountBadge>
                  )}
                </TitleRow>
              )}
              {subtitle && <Subtitle>{subtitle}</Subtitle>}
            </TitleBlock>

            <Actions>
              {rightActions}
              {to && hasCreate ? (
                <CreateLink to={to!}>
                  {createLabel ?? `${title ?? "항목"} 생성`}
                </CreateLink>
              ) : (
                // 링크가 없으면 비활성 버튼으로 노출 (UX 안전)
                <CreateButton disabled aria-disabled>
                  {createLabel ?? `${title ?? "항목"} 생성`}
                </CreateButton>
              )}
            </Actions>
          </Header>
        )}

        <Content>
          {isEmpty ? <EmptyState>{emptyMessage}</EmptyState> : children}
        </Content>
      </Wrapper>
    </Container>
  );
};

export default ListLayout;

/* ====================== styled ====================== */

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 24px 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1040px; /* 중앙 정렬 + 가독성 */
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.2;
`;

const Subtitle = styled.div`
  color: #6b7280; /* gray-500 */
  font-size: 0.9rem;
`;

const CountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 9999px;
  background: #eef2ff; /* indigo-50 */
  color: #4f46e5; /* indigo-600 */
  font-size: 0.8rem;
  font-weight: 600;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid #4680ff;
  color: #4680ff;
  background: white;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background: #eef4ff;
  }

  &:active {
    background: #e1ecff;
  }
`;

const CreateLink = styled(Link)`
  ${buttonBase}
`;

const CreateButton = styled.button`
  ${buttonBase}
  opacity: 0.5;
  cursor: not-allowed;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EmptyState = styled.div`
  width: 100%;
  padding: 24px;
  border: 1px dashed #d1d5db; /* gray-300 */
  border-radius: 12px;
  text-align: center;
  color: #6b7280; /* gray-500 */
  background: #fafafa;
`;
