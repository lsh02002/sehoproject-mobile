import React, { useEffect, useMemo, useState } from "react";
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
  createSpaceAndProjectMembersApi,
  getProjectsBySpaceApi,
  getUsersNotInSpaceApi,
} from "../../api/sehomanagerapi";
import { toast } from "react-toastify";
import QuillEditorInput from "../../components/form/QuillEditorInput";
import { layout } from "../../theme/Theme";

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
  const [invitedUserEmails, setInvitedUserEmails] = useState<string[]>([]);
  const [acceptedUsers, setAcceptUsers] = useState<UsersInfoType[]>([]);
  const [requestRole, setRequestRole] = useState<RequestRoleType>("VIEWER");
  const [roleProject, setRoleProject] = useState<RoleProjectType>("VIEWER");
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [note, setNote] = useState("");

  // 프로젝트 리스트 로딩
  const [projects, setProjects] = useState<ProjectLite[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsersNotInSpaceApi(Number(workspaceId), Number(spaceId))
      .then((res) => {
        setAcceptUsers(res.data);
      })
      .catch(() => {});
  }, [spaceId, workspaceId]);

  useEffect(() => {
    const wsIdNum = Number(spaceId);

    setLoading(true);
    getProjectsBySpaceApi(wsIdNum)
      .then((res) => setProjects(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [spaceId]);

  // 프로젝트 옵션 (SelectArrayInput은 options를 받도록 사용)
  const projectOptions = useMemo(
    () =>
      (projects ?? []).map((p) => ({
        label: p.name,
        value: String(p.id),
      })),
    [projects],
  );

  type SubmitValues = {
    requestRole?: RequestRoleType | null;
    roleProject?: RoleProjectType | null;
  };

  const onSubmit = async (values: SubmitValues) => {
    // Resolve defaults once
    const requestRole: RequestRoleType = values.requestRole ?? "VIEWER";
    // Treat missing / falsy project role as undefined so it won’t be sent
    const roleProject: RoleProjectType | undefined =
      values.roleProject ?? undefined;

    const noteTrimmed = note?.trim() || undefined;

    // Parse & sanitize project IDs (dedupe + numeric only)
    const projectIdList: number[] = Array.from(
      new Set(
        (projectIds ?? [])
          .map((id) => Number(id))
          .filter((n) => Number.isFinite(n)),
      ),
    );

    createSpaceAndProjectMembersApi(
      Number(workspaceId),
      Number(spaceId),
      projectIdList,
      invitedUserEmails.map((email) => ({
        email,
        requestRole,
        roleProject: roleProject ?? "VIEWER",
        note: noteTrimmed,
      })),
    )
      .then((res) => {
        toast.success("권한 부여에 성공했습니다!");
      })
      .catch(() => {});
  };

  const handleClickSave: React.MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    e.preventDefault();
    await onSubmit({
      requestRole,
      roleProject: roleProject || undefined, // 선택값이면 undefined 허용
    });
  };

  return (
    <div className="container-fluid p-3 d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: layout.maxWidth }}>
        {/* Title */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold m-0">스페이스 권한 설정</h3>
        </div>

        {/* Section 1 */}
        <div className="border rounded-4 bg-white p-3 mb-3 shadow-sm">
          <div className="row g-3">
            <div className="col-md-6">
              <TextInput
                name="workspaceId"
                title="워크스페이스"
                data={String(workspaceId)}
                setData={() => {}}
                disabled
              />
            </div>

            <div className="col-md-6">
              <TextInput
                name="spaceId"
                title="스페이스"
                data={String(spaceId)}
                setData={() => {}}
                disabled
              />
            </div>

            <div className="col-md-6">
              <SelectArrayInput
                name="invitedUserEmail"
                title="대상 유저(이메일)"
                values={invitedUserEmails}
                setValues={setInvitedUserEmails}
                options={acceptedUsers?.map((user) => ({
                  label: user.email,
                  value: user.email,
                }))}
              />
            </div>

            <div className="col-md-6">
              <SelectInput
                name="requestRole"
                title="스페이스 역할"
                value={requestRole}
                setValue={(v: string) => {
                  if (isRequestRoleType(v)) setRequestRole(v);
                }}
                options={SPACE_ROLE_CHOICES.map((role) => ({
                  label: role.name,
                  value: role.name,
                }))}
              />
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="border rounded-4 bg-white p-3 mb-3 shadow-sm">
          <h4 className="fw-bold mb-3">프로젝트 권한 (선택)</h4>

          <div className="row g-3">
            <div className="col-md-6">
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
            </div>

            <div className="col-md-6">
              <SelectArrayInput
                name="projectIds"
                title="프로젝트 선택"
                values={projectIds}
                setValues={setProjectIds}
                options={projectOptions}
              />
              {loading && (
                <div className="text-secondary small mt-1">
                  프로젝트 목록을 불러오는 중…
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="border rounded-4 bg-white p-3 mb-3 shadow-sm">
          <h4 className="fw-bold mb-3">메모 (선택)</h4>

          <QuillEditorInput
            name="note"
            title="메모"
            data={note}
            setData={setNote}
          />
        </div>

        {/* Footer */}
        <div className="d-flex justify-content-end">
          <ConfirmButton title="저장하기" onClick={handleClickSave} />
        </div>
      </div>
    </div>
  );
};

export default SpaceConfirmBox;
