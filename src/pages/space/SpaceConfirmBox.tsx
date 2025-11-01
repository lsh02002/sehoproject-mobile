import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
// 기존 공용 폼 컴포넌트 (경로는 프로젝트에 맞게)
import TextInput from "../../components/form/TextInput";
import SelectInput from "../../components/form/SelectInput";
import SelectArrayInput from "../../components/form/SelectArrayInput";
import ConfirmButton from "../../components/form/ConfirmButton";
import {
  RequestRoleType,
  RoleProjectType,
  UsersInfoType,  
} from "../../types/type";
import {
  createProjectMemberApi,
  createSpaceMemberApi,  
  getProjectsBySpaceApi,
  getWorkspaceMembersApi,
} from "../../api/sehomanagerapi";

type ProjectLite = { id: number | string; name: string };

type SpacePrivilegePageProps = {
  workspaceId: number | string;
  spaceId: number | string;
};

// ===== 상수 =====
const SPACE_ROLE_CHOICES = [
  { id: "ADMIN", name: "ADMIN" },
  { id: "MEMBER", name: "MEMBER" },
  { id: "VIEWER", name: "VIEWER" },
];

const ROLE_PROJECT_CHOICES = [
  { id: "MANAGER", name: "MANAGER" },
  { id: "CONTRIBUTOR", name: "CONTRIBUTOR" },
  { id: "VIEWER", name: "VIEWER" },
];

// 타입가드
const isRequestRoleType = (v: unknown): v is RequestRoleType =>
  v === "ADMIN" || v === "MEMBER" || v === "VIEWER";
const isRoleProjectType = (v: unknown): v is RoleProjectType =>
  v === "MANAGER" || v === "CONTRIBUTOR" || v === "VIEWER";

// ===== 페이지 컴포넌트 =====
const SpaceConfirmBox: React.FC<SpacePrivilegePageProps> = ({
  workspaceId,
  spaceId,
}) => {
  // 폼 상태
  const [invitedUserEmail, setInvitedUserEmail] = useState("");
  const [acceptedUsers, setAcceptUsers] = useState<UsersInfoType[]>([]);
  const [requestRole, setRequestRole] = useState<RequestRoleType>("VIEWER");
  const [roleProject, setRoleProject] = useState<RoleProjectType>("VIEWER");
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [note, setNote] = useState("");

  // 프로젝트 리스트 로딩
  const [projects, setProjects] = useState<ProjectLite[]>([]);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    getWorkspaceMembersApi(Number(workspaceId))
      .then((res) => {
        console.log(res);
        setAcceptUsers(res.data);
        setInvitedUserEmail(res.data[0]?.email);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [workspaceId]);

  useEffect(() => {
    const wsIdNum = Number(spaceId);
    if (!Number.isFinite(wsIdNum)) {
      setProjects([]);
      return;
    }
    setLoading(true);
    getProjectsBySpaceApi(wsIdNum)
      .then((res) => setProjects(res.data))
      .catch((err) => {
        console.error(err);
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, [spaceId]);

  // 프로젝트 옵션 (SelectArrayInput은 options를 받도록 사용)
  const projectOptions = useMemo(
    () =>
      (projects ?? []).map((p) => ({
        label: p.name,
        value: String(p.id),
      })),
    [projects]
  );

  async function createSpaceMember(args: {
    workspaceId: number | string;
    spaceId: number | string;
    email: string;
    requestRole: RequestRoleType;
    roleProject: RoleProjectType;
    note: string;
  }) {
    const { workspaceId, spaceId, email, requestRole, roleProject, note } =
      args;

    createSpaceMemberApi(Number(workspaceId), Number(spaceId), {
      email,
      requestRole,
      roleProject,
      note,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function createProjectMember(args: {
    projectId: number | string;
    email: string;
    requestRole: RequestRoleType;
    roleProject: RoleProjectType;
    note?: string;
  }) {
    const { projectId, email, requestRole, roleProject, note } = args;

    createProjectMemberApi(Number(projectId), {
      email,
      requestRole,
      roleProject,
      note,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const onSubmit = async (values: {
    requestRole: RequestRoleType;
    roleProject: RoleProjectType;
  }) => {
    const requestRole = values.requestRole ?? "VIEWER";
    const roleProject = values.roleProject ?? "VIEWER";
    await createSpaceMember({
      workspaceId,
      spaceId,
      email: invitedUserEmail,
      requestRole: requestRole ?? "VIEWER",
      roleProject: roleProject || undefined,
      note: note?.trim(),
    });

    // 2) 프로젝트 권한 (선택): 프로젝트가 선택되어 있고, 프로젝트 역할이 선택된 경우만
    if (projectIds.length > 0 && roleProject) {
      const calls = projectIds
        .map((pid) => Number(pid))
        .filter((n) => Number.isFinite(n))
        .map((projectId) =>
          createProjectMember({
            projectId,
            email: invitedUserEmail,
            requestRole,
            roleProject,
            note: note?.trim() || undefined,
          })
        );
      await Promise.allSettled(calls);
    }
  };

  const handleClickSave: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    await onSubmit({
      requestRole,
      roleProject: roleProject || undefined, // 선택값이면 undefined 허용
    });
  };

  return (
    <Container>
      <Wrapper>
        <PageTitle>
          <h3>스페이스 권한 설정</h3>
        </PageTitle>

        <Section>
          <TwoCol>
            <ReadOnly>
              <TextInput
                name="workspaceId"
                title="워크스페이스"
                data={String(workspaceId)}
                setData={() => {}}
                disabled
              />
            </ReadOnly>
            <ReadOnly>
              <TextInput
                name="spaceId"
                title="스페이스"
                data={String(spaceId)}
                setData={() => {}}
                disabled
              />
            </ReadOnly>
          </TwoCol>

          <TwoCol>
            <SelectInput
              name="invitedUserEmail"
              title="대상 유저(이메일)"
              value={invitedUserEmail}
              setValue={setInvitedUserEmail}
              options={acceptedUsers?.map((user) => ({
                label: user.email,
                value: user.email,
              }))}
            />

            {/* 스페이스 역할 (필수) */}
            <Field>
              <SelectInput
                name="requestRole"
                title="스페이스 역할"
                value={requestRole}
                setValue={(v: string) => {
                  // OK: 컴포넌트가 요구하는 시그니처
                  if (isRequestRoleType(v)) setRequestRole(v);
                }}
                options={SPACE_ROLE_CHOICES.map((role) => ({
                  label: role.name,
                  value: role.name,
                }))}
              />
            </Field>
          </TwoCol>
        </Section>

        <Section>
          <SectionHeader>프로젝트 권한 (선택)</SectionHeader>
          <TwoCol>
            <Field>
              <SelectInput
                name="roleProject"
                title="프로젝트 역할"
                value={roleProject}
                setValue={(v: string) => {
                  if (isRoleProjectType(v)) setRoleProject(v);
                }}
                options={ROLE_PROJECT_CHOICES.map((role) => ({
                  label: role.name,
                  value: role.name,
                }))}
              />
            </Field>

            <Field>
              <SelectArrayInput
                name="projectIds"
                title="프로젝트 선택"
                values={projectIds}
                setValues={setProjectIds}
                options={projectOptions}
                // 프로젝트가 많다면 검색/가상 스크롤 등을 SelectArrayInput 내부에서 지원하는지 확인
              />
              {loading && <div>프로젝트 목록을 불러오는 중…</div>}
            </Field>
          </TwoCol>
        </Section>

        <Section>
          <SectionHeader>메모 (선택)</SectionHeader>
          <Field>
            <TextArea
              placeholder="메모를 입력하세요 (선택)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Field>
        </Section>

        <FooterBar>
          <ConfirmButton title="저장하기" onClick={handleClickSave} />
        </FooterBar>
      </Wrapper>
    </Container>
  );
};

export default SpaceConfirmBox;

/* =================== styled =================== */
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 920px;
`;

const PageTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  h3 {
    font-weight: 700;
    margin: 0;
  }
`;

const Section = styled.section`
  width: 100%;
  padding: 18px 16px;
  margin: 16px 0;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
`;

const SectionHeader = styled.h4`
  margin: 0 0 12px 0;
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const Field = styled.div`
  display: grid;
  gap: 6px;
`;

const ReadOnly = styled(Field)``;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 96px;
  resize: vertical;
  padding: 12px 14px;
  box-sizing: border-box;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  color: #111827;
  line-height: 1.45;
  &::placeholder {
    color: #9ca3af;
  }
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
  }
`;

const FooterBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
`;
