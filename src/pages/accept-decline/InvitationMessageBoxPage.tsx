import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    getInvitationMessageApi()
      .then((res) => {
        console.log(res);
        setItems(res.data);
      })
      .catch((err) => console.error(err));
  }, [isLoading]);

  const accept = async (record: Invite) => {
    postInvitationAcceptApi(record.workspaceId, record.id)
      .then((res) => {
        console.log(res);
        setIsLoading((prev) => !prev);
      })
      .catch((err) => console.error(err));
  };

  const decline = async (record: Invite) => {
    postInvitationDeclineApi(record.workspaceId, record.id)
      .then((res) => {
        console.log(res);
        setIsLoading((prev) => !prev);
      })
      .catch((err) => console.error(err));
  };

  const renderStatus = (status?: Invite["status"]) => {
    if (!status || status === "PENDING") {
      return <span className="badge rounded-pill text-bg-primary">PENDING</span>;
    }

    if (status === "ACCEPTED") {
      return <span className="badge rounded-pill text-bg-success">ACCEPTED</span>;
    }

    return <span className="badge rounded-pill text-bg-secondary">DECLINED</span>;
  };

  return (
    <div className="container-fluid p-3">
      <div className="d-flex align-items-center gap-2 mb-3">
        <h3 className="m-0 fw-bold">받은 초대</h3>
      </div>

      <div className="d-grid gap-3">
        {items.length === 0 ? (
          <div className="border border-1 border-dashed rounded-3 bg-white p-3">
            <h4 className="mb-2 fw-bold fs-6">받은 초대가 없습니다.</h4>
            <p className="m-0 text-secondary">
              워크스페이스에서 보낸 초대가 여기에 표시됩니다.
            </p>
          </div>
        ) : (
          items.map((r) => (
            <article
              key={r.id}
              className="card border-0 shadow-sm rounded-4"
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                  <h4 className="m-0 fw-bold fs-6 text-dark">
                    {r.workspaceName ?? "-"}
                  </h4>
                  {renderStatus(r.status)}
                </div>

                <div className="row g-2">
                  <InfoRow label="초대 ID" value={`#${r.id}`} />
                  <InfoRow label="워크스페이스" value={String(r.workspaceId)} />
                  <InfoRow label="보낸 사람" value={r.inviterEmail ?? "-"} />
                  <InfoRow label="요청 역할" value={r.requestedRole ?? "-"} />

                  <div className="col-12">
                    <div className="row">
                      <div className="col-4 col-md-2 fw-bold text-dark">
                        메시지
                      </div>
                      <div
                        className="col-8 col-md-10 text-secondary"
                        style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                      >
                        {r.message ?? "-"}
                      </div>
                    </div>
                  </div>

                  <InfoRow
                    label="받은 시각"
                    value={
                      r.createdAt
                        ? new Date(r.createdAt).toLocaleString()
                        : "-"
                    }
                  />
                </div>

                <div className="d-flex justify-content-end gap-2 mt-3">
                  {r.status === "PENDING" ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm fw-bold"
                        onClick={(e) => {
                          e.preventDefault();
                          accept(r);
                        }}
                      >
                        수락
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm fw-semibold"
                        onClick={(e) => {
                          e.preventDefault();
                          decline(r);
                        }}
                      >
                        거절
                      </button>
                    </>
                  ) : (
                    <span className="text-secondary small">
                      이미 {r.status} 처리되었습니다.
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => {
  return (
    <div className="col-12 col-md-6">
      <div className="row">
        <div className="col-4 fw-bold text-dark">{label}</div>
        <div className="col-8 text-secondary text-break">{value}</div>
      </div>
    </div>
  );
};