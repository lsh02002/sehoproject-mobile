import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import TextInput from "../../components/form/TextInput";
import ConfirmButton from "../../components/form/ConfirmButton";
import SelectInput from "../../components/form/SelectInput";
import { toast } from "react-toastify";
import { getUsersNotInWorkpaceApi, postWorkspaceInvite } from "../../api/sehomanagerapi";
import { UsersInfoType, WorkspaceInviteType } from "../../types/type";
import SelectArrayInput from "../../components/form/SelectArrayInput";
// 필요 시: import { toast } from "react-toastify";

const WorkspaceInviteBox = ({ workspaceId }: { workspaceId: number }) => {
  const [invitedUserEmails, setInvitedUserEmails] = useState<string[]>([]);
  const [requestedRole, setRequestedRole] = useState<string>("MEMBER");
  const [message, setMessage] = useState<string>("");
  const [users, setUsers] = useState<UsersInfoType[]>([]);

  useEffect(() => {
    getUsersNotInWorkpaceApi(workspaceId)
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [workspaceId]);

  const userOptions = useMemo(
    () =>
      users?.map((u) => ({
        label: u.email,
        value: u.email,
      })) ?? [],
    [users]
  );

  const roleOptions = useMemo(
    () => [
      { label: "GUEST", value: "GUEST" },
      { label: "MEMBER", value: "MEMBER" },
      { label: "ADMIN", value: "ADMIN" },
      { label: "OWNER", value: "OWNER" },
    ],
    []
  );

  const handleSubmit = async () => {
    const payloads: WorkspaceInviteType[] = invitedUserEmails.map((email) =>({
      invitedUserEmail: email,
      message: message?.trim() ? message : null,
      requestedRole: requestedRole || null,
      workspaceId: workspaceId ?? null,
  }));

    postWorkspaceInvite(payloads)
      .then((res) => {
        console.log(res);
        toast.success?.("초대 완료");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Header>
        <Title>워크스페이스에 유저 초대</Title>
      </Header>

      <Body>
        {/* 이메일 선택 */}
        <SelectArrayInput
          name="invitedUserEmail"
          title="이메일"
          values={invitedUserEmails}
          // 프로젝트의 SelectInput 시그니처가 onChange(event)라면 아래와 같이:
          setValues={setInvitedUserEmails}
          options={userOptions}
        />

        {/* 역할(선택) */}
        <SelectInput
          name="requestedRole"
          title="역할(선택)"
          value={requestedRole}
          setValue={setRequestedRole}
          options={roleOptions}
        />

        {/* 메시지(선택) */}
        {/* 프로젝트에 TextArea 컴포넌트가 없다면 styled textarea 사용 */}
        <TextArea
          placeholder="간단한 메시지를 입력하세요 (선택)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* 워크스페이스 (읽기전용) */}
        <TextInput
          name="workspaceId"
          title="워크스페이스"
          data={String(workspaceId ?? "")}
          setData={() => {}}
          disabled
        />
      </Body>

      <Footer>
        <ConfirmButton title="초대 보내기" onClick={handleSubmit} />
      </Footer>
    </>
  );
};

export default WorkspaceInviteBox;

/* ============== styled ============== */

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;  
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: #111827;
`;

const Body = styled.div`
  /* padding: 16px; */
  display: grid;
  gap: 14px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 96px;
  resize: vertical;
  padding: 12px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  color: #111827;
  line-height: 1.45;
  box-sizing: border-box;
  &::placeholder {
    color: #9ca3af;
  }
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
  }
`;

const Footer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;    
`;
