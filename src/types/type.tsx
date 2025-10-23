export type userSignupType = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
};

export type usersInfoType = {
  userId: number;
  name: string;
  email: string;
  createdAt: string;
  deletedAt: string;
};

export type assignInfoType = {
  assigneeId: number;
  dynamicAssign: boolean;
  type: string;
  email: string;
};

export type workspaceResponseType = {
  id: number;
  name: string;
  slug: string;
};

export type workspaceRequestType = {
  name: string;
  slug: string;
};

export type spaceRequestType = {
  name: string;
  slug: string;
};

export type projectRequestType = {
  spaceId: number;
  projectKey: string;
  name: string;
  description: string;
  startDate?: Date;
  dueDate?: Date;
  creatorId: number;
  tags?: string[];
};

export type tagRequestType = {
  projectId: number;
  name: string;
  description: string | null;
};

export type tagResponseType = {
  id: number;
  projectId: number;
  name: string;
  description: string;
};

export type projectResponseType = {
  id: number;
  spaceId: number;
  spaceName: string;
  projectKey: string;
  name: string;
  description: string;
  status: string;
  startDate: Date;
  dueDate: Date;
  creatorId: number;
  creatorName: string;
  tagResponses: tagResponseType[];
};

export type assigneeRequestType = {
  assigneeId: number;
  email: string;
  dynamicAssign: boolean;
  type: string;
};

export type taskRequestType = {
  projectId: number;
  name: string;
  description: string;
  assignees: assigneeRequestType[];
  sprintId: number | null;
  milestoneId: number | null;
  tags: number[];
  dependencyTaskIds: number[];
  priority: string;
  type: string;
  state: string;
  storyPoints: number | null;
  dueDate: Date | undefined;
};

export type taskUpdateRequestType = {
  projectId: number;
  name: string;
  description: string;
  priority: string; // 예: "HIGH", "MEDIUM", "LOW"
  type: string; // 예: "BUG", "STORY", "TASK"
  state: string;
  storyPoints: number;
  dueDate: Date | undefined;
  sprintId: number; // null: 변경 없음, 0 이하: 스프린트 해제
  milestoneId: number; // null: 변경 없음, 0 이하: 마일스톤 해제
  tags: number[]; // null: 변경 없음, empty: 모두 제거
  dependencyTaskIds: number[]; // null: 변경 없음, empty: 모두 제거
  assignees: assigneeRequestType[];
};

export type TaskResponseType = {
  id: number; // Long
  projectKey: string;
  projectId: number;
  name: string;
  description?: string;
  state?: string;
  priority?: string;
  type?: string;
  storyPoints?: number;
  assignees?: any[];
  sprintId?: number | null;
  milestoneId?: number | null;
  tags?: any[];
  dependencyIds?: number[];
  dueDate?: string; // or Date/LocalDate 포맷에 맞게
  createdAt?: string; // or Date/LocalDateTime 포맷에 맞게
};

export type spaceNodeType = {
  id: number;
  name: string;
  type: "SPACE";
  canEnter?: boolean;
  projectNodes: ProjectNodeType[];
};

export type MenuType = "WORKSPACE" | "SPACE" | "PROJECT" | "MILESTONE" | "TASK";

export type TaskNodeType = {
  id: number;
  name: string;
  type: "TASK";
  canEnter?: boolean;
};

/* ========= 서버에서 오는 플랫 형태 (예시) ========= */
export type TreeRowType = {
  workspaceId: number;
  workspacePosition: number;

  spaceId: number;
  spaceName: string;
  spacePosition: number;

  projectId: number | null;
  projectName: string | null;
  projectPosition: number | null;
};

// ==== 1) 백엔드 Row 타입 (boolean 플래그 포함) ====
export type BackendRowType = {
  workspaceId: number;
  workspacePosition: number;

  spaceId: number;
  spaceName: string;
  spacePosition: number;

  projectId: number | null;
  projectName: string | null;
  projectPosition: number | null;

  milestoneId: number | null;
  milestoneName: string | null;
  milestonePosition: number | null;

  sprintId: number | null;
  sprintName: string | null;
  sprintPosition: number | null;

  taskId: number | null;
  taskName: string | null;
  taskPosition: number | null;

  canEnterWorkspace: boolean;
  canEnterSpace: boolean;
  canEnterProject: boolean;
  canEnterMilestone: boolean;
  canEnterSprint: boolean;
  canEnterTask: boolean;
};

export type MilestoneNodeType = {
  id: number;
  name: string;
  type: "MILESTONE";
  canEnter?: boolean;
};

export type SprintNodeType = {
  id: number;
  name: string;
  type: "SPRINT";
  canEnter?: boolean;
};

// ==== 2) 프런트 응답 타입 (요청하신 구조 + canEnter) ====
export type ProjectNodeType = {
  id: number;
  name: string;
  type: "PROJECT";
  canEnter?: boolean;
  milestoneNodes?: MilestoneNodeType[]; // ✅ 마일스톤 목록 추가
  sprintNodes?: SprintNodeType[];
  taskNodes?: TaskNodeType[];
};

export type SpaceResponseType = {
  id: number;
  name: string;
  slug: string;
  workspaceId: number;
};

export type WorkspaceTreeResponseType = {
  workspaceId: number;
  name: string; // 필요 시 name map으로 주입
  type: "WORKSPACE";
  canEnter?: boolean; // (선택) 필요하면 사용
  spaces: spaceNodeType[];
};

// UI 트리 노드 (disabled로 렌더 제어)
export type TreeNodeType = {
  id: string | number;
  name: string;
  type: "WORKSPACE" | "SPACE" | "PROJECT" | "MILESTONE" | "SPRINT" | "TASK";
  disabled?: boolean; // canEnter의 반대
  children?: TreeNodeType[];
};

export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER" | "GUEST";

export type SprintType = {
  id: string;
  name: string;
  startDate: [number, number, number];
  endDate: [number, number, number];
  display: string;
  color: string;
};
