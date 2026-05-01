import React, { useEffect, useMemo, useState } from "react";
import TextInput from "../../components/form/TextInput";
import ConfirmButton from "../../components/form/ConfirmButton";
import SelectInput from "../../components/form/SelectInput";
import { toast } from "react-toastify";
import {
  getUsersNotInWorkpaceApi,
  postWorkspaceInvite,
} from "../../api/sehomanagerapi";
import { UsersInfoType, WorkspaceInviteType } from "../../types/type";
import SelectArrayInput from "../../components/form/SelectArrayInput";

const WorkspaceInviteBox = ({ workspaceId }: { workspaceId: number }) => {
  const [invitedUserEmails, setInvitedUserEmails] = useState<string[]>([]);
  const [requestedRole, setRequestedRole] = useState<string>("MEMBER");
  const [message, setMessage] = useState<string>("");
  const [users, setUsers] = useState<UsersInfoType[]>([]);

  useEffect(() => {
    getUsersNotInWorkpaceApi(workspaceId)
      .then((res) => {
        setUsers(res.data);
      })
      .catch(() => {});
  }, [workspaceId]);

  const userOptions = useMemo(
    () =>
      users?.map((u) => ({
        label: u.email,
        value: u.email,
      })) ?? [],
    [users],
  );

  const roleOptions = useMemo(
    () => [
      { label: "GUEST", value: "GUEST" },
      { label: "MEMBER", value: "MEMBER" },
      { label: "ADMIN", value: "ADMIN" },
      { label: "OWNER", value: "OWNER" },
    ],
    [],
  );

  const handleSubmit = async () => {
    const payloads: WorkspaceInviteType[] = invitedUserEmails.map((email) => ({
      invitedUserEmail: email,
      message: message?.trim() ? message : null,
      requestedRole: requestedRole || null,
      workspaceId: workspaceId ?? null,
    }));

    postWorkspaceInvite(payloads)
      .then((res) => {
        toast.success?.("초대 완료");
      })
      .catch(() => {});
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center py-3">
        <h3 className="mb-0 fw-bold" style={{ fontSize: "1rem" }}>
          워크스페이스에 유저 초대
        </h3>
      </div>

      <div className="d-grid gap-3">
        <SelectArrayInput
          name="invitedUserEmail"
          title="이메일"
          values={invitedUserEmails}
          setValues={setInvitedUserEmails}
          options={userOptions}
        />

        <SelectInput
          name="requestedRole"
          title="역할(선택)"
          value={requestedRole}
          setValue={setRequestedRole}
          options={roleOptions}
        />

        <textarea
          className="form-control rounded-3"
          style={{ minHeight: "96px", resize: "vertical" }}
          placeholder="간단한 메시지를 입력하세요 (선택)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <TextInput
          name="workspaceId"
          title="워크스페이스"
          data={String(workspaceId ?? "")}
          setData={() => {}}
          disabled
        />
      </div>

      <div className="d-flex justify-content-end gap-2 mt-3">
        <ConfirmButton title="초대 보내기" onClick={handleSubmit} />
      </div>
    </>
  );
};

export default WorkspaceInviteBox;
