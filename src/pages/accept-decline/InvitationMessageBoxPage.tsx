import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getInvitationMessageApi,
  postInvitationAcceptApi,
  postInvitationDeclineApi,
} from "../../api/sehomanagerapi";

type Invite = {
  id: number;
  workspaceId: number;
  workspaceName?: string;
  inviterEmail?: string;
  message?: string | null;
  requestedRole?: "ADMIN" | "MAINTAINER" | "MEMBER" | null;
  createdAt?: string;
  status?: "PENDING" | "ACCEPTED" | "DECLINED";
};

export const InvitationMessageBoxPage: React.FC = () => {
  const [items, setItems] = useState<Invite[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 목록 로드
  useEffect(() => {
    getInvitationMessageApi()
      .then((res) => {
        console.log(res);
        setItems(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isLoading]);

  const accept = async (record: Invite) => {
    postInvitationAcceptApi(record.workspaceId, record.id)
      .then((res) => {
        console.log(res);
        setIsLoading(!isLoading);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const decline = async (record: Invite) => {
    postInvitationDeclineApi(record.workspaceId, record.id)
      .then((res) => {
        console.log(res);
        setIsLoading(!isLoading);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const renderStatus = (status?: Invite["status"]) => {
    if (!status || status === "PENDING")
      return <Badge $tone="blue">PENDING</Badge>;
    if (status === "ACCEPTED") return <Badge $tone="green">ACCEPTED</Badge>;
    return <Badge $tone="gray">DECLINED</Badge>;
  };

  return (
    <Container>
      <HeaderRow>
        <Title>받은 초대</Title>
      </HeaderRow>

      <ListWrap>
        {items.length === 0 ? (
          <Empty>
            <h4>받은 초대가 없습니다.</h4>
            <p>워크스페이스에서 보낸 초대가 여기에 표시됩니다.</p>
          </Empty>
        ) : (
          items.map((r) => (
            <Card key={r.id}>
              <CardTop>
                <Name>{r.workspaceName ?? "-"}</Name>
                {renderStatus(r.status)}
              </CardTop>

              <Grid>
                <Row>
                  <Label>초대 ID</Label>
                  <Value>#{r.id}</Value>
                </Row>
                <Row>
                  <Label>워크스페이스</Label>
                  <Value>{r.workspaceId}</Value>
                </Row>
                <Row>
                  <Label>보낸 사람</Label>
                  <Value>{r.inviterEmail ?? "-"}</Value>
                </Row>
                <Row>
                  <Label>요청 역할</Label>
                  <Value>{r.requestedRole ?? "-"}</Value>
                </Row>
                <RowFull>
                  <Label>메시지</Label>
                  <Value $multiline>{r.message ?? "-"}</Value>
                </RowFull>
                <Row>
                  <Label>받은 시각</Label>
                  <Value>
                    {r.createdAt ? new Date(r.createdAt).toLocaleString() : "-"}
                  </Value>
                </Row>
              </Grid>

              <Actions>
                {r.status === "PENDING" ? (
                  <>
                    <PrimaryBtn
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        accept(r);
                      }}
                    >
                      수락
                    </PrimaryBtn>
                    <SecondaryBtn
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        decline(r);
                      }}
                    >
                      거절
                    </SecondaryBtn>
                  </>
                ) : (
                  <Muted>이미 {r.status} 처리되었습니다.</Muted>
                )}
              </Actions>
            </Card>
          ))
        )}
      </ListWrap>
    </Container>
  );
};

/* =============== styled (기존 서비스 톤) =============== */

const Container = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const Title = styled.h3`
  margin: 0;
  font-weight: 700;
`;

const ListWrap = styled.div`
  display: grid;
  gap: 12px;
`;

const Card = styled.article`
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  padding: 16px;
  box-sizing: border-box;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 12px;
  margin-bottom: 12px;
`;

const Name = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: #111827;
`;

const Badge = styled.span<{ $tone: "blue" | "green" | "gray" }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
  ${({ $tone }) =>
    $tone === "blue"
      ? `background:#dbeafe; color:#1e3a8a; border:1px solid #bfdbfe;`
      : $tone === "green"
      ? `background:#dcfce7; color:#065f46; border:1px solid #bbf7d0;`
      : `background:#f3f4f6; color:#374151; border:1px solid #e5e7eb;`}
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px;
  align-items: baseline;
`;

const RowFull = styled(Row)`
  grid-column: 1 / -1;
`;

const Label = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: #111827;
`;

const Value = styled.div<{ $multiline?: boolean }>`
  font-size: 0.95rem;
  color: #374151;
  white-space: ${({ $multiline }) => ($multiline ? "pre-wrap" : "normal")};
  word-break: break-word;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 14px;
`;

const PrimaryBtn = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: #3b82f6;
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
  transition: background-color 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    background: #2563eb;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
  }
`;

const SecondaryBtn = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  color: #1f2937;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: #f3f4f6;
    border-color: #cbd5e1;
  }
`;

const Muted = styled.span`
  color: #6b7280;
  font-size: 0.9rem;
`;

const Empty = styled.div`
  padding: 16px;
  border: 1px dashed #e5e7eb;
  border-radius: 12px;
  background: #fff;

  h4 {
    margin: 0 0 6px 0;
    font-weight: 700;
  }
  p {
    margin: 0;
    color: #6b7280;
  }
`;
