// TreeNode.tsx
import React, { memo } from "react";
import styled, { css } from "styled-components";
import {
  BackendRowType,
  MilestoneNodeType,
  ProjectNodeType,  
  spaceNodeType,  
  SprintNodeType,
  TreeNodeType,
  WorkspaceTreeResponseType,
} from "../types/type";
import { LockIcon, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ========= 정렬 유틸 ========= */
const byPosThenId =
  <T extends { position?: number | null; id: number }>() =>
  (a: T, b: T) => {
    const ap = a.position ?? Number.MAX_SAFE_INTEGER;
    const bp = b.position ?? Number.MAX_SAFE_INTEGER;
    if (ap !== bp) return ap - bp;
    return a.id - b.id;
  };

/* ========= TreeRow[] -> workspaceTreeResponseType[] ========= */
export function rowsToWorkspaceTreeResponse(
  rows: BackendRowType[],
  workspaceNameMap?: Record<number, string>
): WorkspaceTreeResponseType[] {
  type MilestoneAgg = {
    id: number;
    name: string;
    position: number;
    canEnter: boolean;
  };

  type SprintAgg = {
    id: number;
    name: string;
    position: number;
    canEnter: boolean;
  };

  type TaskAgg = {
    id: number;
    name: string;
    position: number;
    canEnter: boolean;
  };

  type ProjectAgg = {
    id: number;
    name: string;
    position: number;
    canEnter: boolean; // OR
    milestones: Map<number, MilestoneAgg>;
    sprints: Map<number, SprintAgg>;
    tasks: Map<number, TaskAgg>;
  };

  type SpaceAgg = {
    id: number;
    name: string;
    position: number;
    canEnter: boolean; // OR
    projects: Map<number, ProjectAgg>;
  };

  type WSAgg = {
    id: number;
    name: string;
    position: number;
    canEnter: boolean; // OR
    spaces: Map<number, SpaceAgg>;
  };

  const workspaces = new Map<number, WSAgg>();

  for (const r of rows) {
    // Workspace
    let ws = workspaces.get(r.workspaceId);
    if (!ws) {
      ws = {
        id: r.workspaceId,
        position: r.workspacePosition,
        name: r.workspaceName ?? `Workspace ${r.workspaceId}`,
        canEnter: !!r.canEnterWorkspace,
        spaces: new Map(),
      };
      workspaces.set(r.workspaceId, ws);
    } else {
      ws.canEnter = ws.canEnter || !!r.canEnterWorkspace;
    }

    // Space
    let sp = ws.spaces.get(r.spaceId);
    if (!sp) {
      sp = {
        id: r.spaceId,
        name: r.spaceName ?? `Space ${r.spaceId}`,
        position: r.spacePosition,
        canEnter: !!r.canEnterSpace,
        projects: new Map(),
      };
      ws.spaces.set(r.spaceId, sp);
    } else {
      sp.canEnter = sp.canEnter || !!r.canEnterSpace;
    }

    // Project (nullable)
    if (r.projectId != null) {
      const pid = r.projectId;
      const pname = r.projectName ?? `Project ${pid}`;
      const ppos = r.projectPosition ?? Number.MAX_SAFE_INTEGER;

      let p = sp.projects.get(pid);
      if (!p) {
        p = {
          id: pid,
          name: pname,
          position: ppos,
          canEnter: !!r.canEnterProject,
          milestones: new Map(),
          sprints: new Map(),
          tasks: new Map(),
        };
        sp.projects.set(pid, p);
      } else {
        p.canEnter = p.canEnter || !!r.canEnterProject;
        if (!p.name) p.name = pname;
        if (p.position == null) p.position = ppos;
      }

      // Milestone (nullable)
      if (r.milestoneId != null) {
        const mid = r.milestoneId;
        const mname = r.milestoneName ?? `Milestone ${mid}`;
        const mpos = r.milestonePosition ?? Number.MAX_SAFE_INTEGER;

        const m = p.milestones.get(mid);
        if (!m) {
          p.milestones.set(mid, {
            id: mid,
            name: mname,
            position: mpos,
            canEnter: !!r.canEnterMilestone,
          });
        } else {
          m.canEnter = m.canEnter || !!r.canEnterMilestone;
          if (!m.name) m.name = mname;
          if (m.position == null) m.position = mpos;
        }
      }

      // Sprint (nullable)
      if (r.sprintId != null) {
        const mid = r.sprintId;
        const mname = r.sprintName ?? `Sprint ${mid}`;
        const mpos = r.sprintPosition ?? Number.MAX_SAFE_INTEGER;

        const m = p.sprints.get(mid);
        if (!m) {
          p.sprints.set(mid, {
            id: mid,
            name: mname,
            position: mpos,
            canEnter: !!r.canEnterSprint,
          });
        } else {
          m.canEnter = m.canEnter || !!r.canEnterSprint;
          if (!m.name) m.name = mname;
          if (m.position == null) m.position = mpos;
        }
      }

      // Task (nullable)
      if (r.taskId != null) {
        const tid = r.taskId;
        const tname = r.taskName ?? `Task ${tid}`;
        const tpos = r.taskPosition ?? Number.MAX_SAFE_INTEGER;

        const t = p.tasks.get(tid);
        if (!t) {
          p.tasks.set(tid, {
            id: tid,
            name: tname,
            position: tpos,
            canEnter: !!r.canEnterTask,
          });
        } else {
          t.canEnter = t.canEnter || !!r.canEnterTask;
          if (!t.name) t.name = tname;
          if (t.position == null) t.position = tpos;
        }
      }
    }
  }

  // Map -> Array + 정렬 + 타입 변환
  return Array.from(workspaces.values())
    .sort(byPosThenId<WSAgg>())
    .map<WorkspaceTreeResponseType>((ws) => ({
      workspaceId: ws.id,
      name: ws.name,
      type: "WORKSPACE",
      canEnter: ws.canEnter,
      spaces: Array.from(ws.spaces.values())
        .sort(byPosThenId<SpaceAgg>())
        .map<spaceNodeType>((sp) => ({
          id: sp.id,
          name: sp.name,
          type: "SPACE",
          canEnter: sp.canEnter,
          projectNodes: Array.from(sp.projects.values())
            .sort(byPosThenId<ProjectAgg>())
            .map<ProjectNodeType>((p) => ({
              id: p.id,
              name: p.name,
              type: "PROJECT",
              canEnter: p.canEnter,
              milestoneNodes: Array.from(p.milestones.values())
                .sort(byPosThenId<MilestoneAgg>())
                .map<MilestoneNodeType>((m) => ({
                  id: m.id,
                  name: m.name,
                  type: "MILESTONE",
                  canEnter: m.canEnter,
                })),
              sprintNodes: Array.from(p.sprints.values())
                .sort(byPosThenId<SprintAgg>())
                .map<SprintNodeType>((t) => ({
                  id: t.id,
                  name: t.name,
                  type: "SPRINT",
                  canEnter: t.canEnter,
                })),
            })),
        })),
    }));
}
/* ========= Data adapter (요청하신 식 그대로) ========= */
// ==== 5) 요청하신 어댑터: 응답 → 렌더 트리 (disabled 반영) ====
export function convertToTreeNode(
  data: WorkspaceTreeResponseType
): TreeNodeType {
  const spaces = Array.isArray(data.spaces) ? data.spaces : [];

  return {
    id: data.workspaceId,
    name: data.name,
    type: data.type, // "WORKSPACE"
    // 필요시: disabled: data.canEnter === false,
    children: spaces.map((space) => {
      const projects = Array.isArray(space.projectNodes)
        ? space.projectNodes
        : [];

      return {
        id: space.id,
        name: space.name,
        type: space.type, // "SPACE"
        disabled: space.canEnter === false,
        children: projects.map((project) => {
          const milestones = Array.isArray(project.milestoneNodes)
            ? project.milestoneNodes
            : [];
          const sprints = Array.isArray(project.sprintNodes)
            ? project.sprintNodes
            : [];
          // const tasks = Array.isArray(project.taskNodes)
          //   ? project.taskNodes
          //   : [];

          const children: TreeNodeType[] = [
            ...milestones.map((m) => ({
              id: m.id,
              name: m.name,
              type: "MILESTONE" as const,
              disabled: m.canEnter === false,
            })),
            ...sprints.map((t) => ({
              id: t.id,
              name: t.name,
              type: "SPRINT" as const,
              disabled: t.canEnter === false,
            })),
            // ...tasks.map((t) => ({
            //   id: t.id,
            //   name: t.name,
            //   type: "TASK" as const,
            //   disabled: t.canEnter === false,
            // })),
          ];

          return {
            id: project.id,
            name: project.name,
            type: project.type, // "PROJECT"
            disabled: project.canEnter === false,
            children,
          };
        }),
      };
    }),
  };
}

export function convertToRootTreeNode(
  dataList: WorkspaceTreeResponseType[] | null | undefined,
  rootName = "Workspaces"
): TreeNodeType {
  const list = Array.isArray(dataList) ? dataList : [];
  return {
    id: "root",
    name: rootName,
    type: "WORKSPACE",
    children: list.map(convertToTreeNode),
  };
}

/* ========= Props ========= */
type Props = {
  open: boolean;
  setOpen: (v: any) => void;
  node: TreeNodeType;
  depth?: number;
  selectedId?: string | number;
  onSelect?: (node: TreeNodeType) => void;
};

/* ========= TreeNode 컴포넌트 ========= */
export const TreeNode: React.FC<Props> = memo(function TreeNode({
  open,
  setOpen,
  node,
  depth = 0,
  selectedId,
  onSelect,
}) {
  const redirect = useNavigate();

  const hasChildren = Boolean(node.children?.length);
  const isSelected = selectedId === node.id;
  const isDisabled = node.disabled === true; // 🔒 권한 없으면 비활성

  const handleToggle = () => {
    // 펼치기/접기는 허용
    if (hasChildren) setOpen((v: any) => !v);
    onSelect?.(node);

    // 🚫 비활성 노드는 이동 금지
    if (isDisabled) return;

    if (node.id === "root") {
      redirect("/workspaces");
      return;
    }

    // ✅ 각 타입별 라우트는 node.id만 사용
    switch (node.type) {
      case "WORKSPACE":
        setOpen(false);
        redirect(`/workspace/${node.id}/spaces`);
        break;
      case "SPACE":
        setOpen(false);
        redirect(`/projects/spaces/${node.id}`);
        break;
      case "PROJECT":
        setOpen(false);
        redirect(`/workboards/${node.id}`);
        break;
      case "MILESTONE":
        setOpen(false);
        redirect(`/milestones/${node.id}`);
        break;
      case "SPRINT":
        setOpen(false);
        redirect(`/sprints/${node.id}`);
        break;
      case "TASK":
        setOpen(false);
        redirect(`/tasks/${node.id}`);
        break;
    }
  };

  return (
    <Item>
      <Row
        type="button"
        onClick={handleToggle}
        $depth={depth}
        $open={open}
        $hasChildren={hasChildren}
        aria-expanded={hasChildren ? open : undefined}
        aria-label={node.name}
        $selected={isSelected}
        $disabled={isDisabled} // 👈 추가
        aria-disabled={isDisabled || undefined}
        title={isDisabled ? `${node.name} (접근 권한 없음)` : node.name}
      >
        <Chevron $visible={hasChildren} $open={open} aria-hidden>
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path
              d="M9 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Chevron>
        {hasChildren ? (
          <FolderIcon $open={open} aria-hidden />
        ) : node.type === "MILESTONE" ? (
          <span style={{ color: node.disabled ? "#aaa" : "inherit" }}>M</span>
        ) : node.type === "SPRINT" ? (
          <span style={{ color: node.disabled ? "#aaa" : "inherit" }}>S</span>
        ) : node.type === "TASK" ? (
          <span style={{ color: node.disabled ? "#aaa" : "inherit" }}>T</span>
        ) : (
          <FileIcon aria-hidden />
        )}
        <Name style={{ display: "flex" }} $disabled={isDisabled}>
          {node.name}
          {node.type === "PROJECT" && (
            <Calendar
              onClick={(e) => {
                if(isDisabled) {
                  return;
                }
                e.stopPropagation();
                setOpen(false);
                redirect(`/sprints/projects/${node.id}`);
              }}
              style={{
                color: node.disabled ? "#aaa" : "inherit",
                width: "40px",
              }}
              size={16}
            />
          )}
        </Name>
        {isDisabled && (
          <LockIcon size={16} color="gray">
            <title>"접근 권한이 없습니다"</title>
          </LockIcon>
        )}
      </Row>

      <Children $open={open}>
        <Content $depth={depth}>
          {node.children?.map((child, idx) => (
            <TreeNode
              key={`${depth + 1}-${child.type ?? "NODE"}-${String(
                child.id ?? idx
              )}-${idx}`}
              open={open}
              setOpen={setOpen}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </Content>
      </Children>
    </Item>
  );
});

/* ===================== styled-components ===================== */

const vars = {
  radius: 10,
  padX: 10,
  padY: 8,
  indent: 9, // depth당 들여쓰기
};

const Item = styled.li`
  list-style: none;
  position: relative;
`;

/** 한 줄 (버튼) */
const Row = styled.button<{
  $depth: number;
  $open: boolean;
  $hasChildren: boolean;
  $selected?: boolean;
  $disabled?: boolean;
}>`
  --pad-x: ${vars.padX}px;
  --pad-y: ${vars.padY}px;

  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  padding: var(--pad-y) var(--pad-x);
  padding-left: calc(var(--pad-x) + ${({ $depth }) => $depth * vars.indent}px);

  border: 0;
  border-radius: ${vars.radius}px;
  cursor: pointer;
  text-align: left;
  background: ${({ $selected }) =>
    $selected
      ? `linear-gradient(0deg, rgba(99,102,241,0.14), rgba(99,102,241,0.14))`
      : "transparent"};
  color: ${({ $selected }) => ($selected ? "inherit" : "inherit")};

  position: relative;
  transition: background 160ms ease, box-shadow 160ms ease, transform 120ms ease;

  /* 좌측 세로 가이드 (트리 느낌) */
  &::before {
    content: "";
    position: absolute;
    left: calc(${vars.padX}px + ${({ $depth }) => ($depth ? 6 : 0)}px);
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: ${({ $hasChildren }) => ($hasChildren ? "60%" : "36%")};
    background: ${({ $selected }) =>
      $selected
        ? "rgba(99,102,241,0.35)"
        : "rgba(148,163,184,0.35)"}; /* slate-300 */
    border-radius: 1px;
    opacity: ${({ $depth }) => ($depth ? 1 : 0)}; /* 루트는 라인 숨김 */
    transition: background 160ms ease, height 160ms ease, opacity 160ms ease;
  }

  &:hover {
    background: ${({ $selected }) =>
      $selected
        ? "linear-gradient(0deg, rgba(99,102,241,0.2), rgba(99,102,241,0.2))"
        : "linear-gradient(0deg, rgba(15,23,42,0.06), rgba(15,23,42,0.06))"};
  }

  &:active {
    transform: translateY(0.5px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.38),
      0 6px 14px rgba(2, 6, 23, 0.08);
  }

  /* 자식이 없는 경우 */
  ${({ $hasChildren }) =>
    !$hasChildren &&
    css`
      opacity: 0.96;
    `}

  /* 다크모드 대응 */
  @media (prefers-color-scheme: dark) {
    background: ${({ $selected }) =>
      $selected ? "rgba(99,102,241,0.12)" : "transparent"};
    &:hover {
      background: ${({ $selected }) =>
        $selected
          ? "rgba(99,102,241,0.18)"
          : "rgba(241,245,249,0.06)"}; /* slate-50 on dark */
    }
    &::before {
      background: ${({ $selected }) =>
        $selected ? "rgba(129,140,248,0.45)" : "rgba(148,163,184,0.28)"};
    }
  }

  /* 고대비 모드 접근성 */
  @media (forced-colors: active) {
    box-shadow: none;
    &:focus-visible {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
  }
`;

const Name = styled.span<{ $disabled?: boolean }>`
  color: ${({ $disabled }) => ($disabled ? "#94a3b8" : "inherit")};
  font-size: 0.93rem;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  mask-image: linear-gradient(90deg, #000 85%, transparent 100%);
`;

/** 펼침 화살표 */
const Chevron = styled.span<{ $open: boolean; $visible: boolean }>`
  width: 18px;
  height: 18px;
  display: inline-grid;
  place-items: center;
  color: #64748b; /* slate-500 */
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: rotate(${({ $open }) => ($open ? 90 : 0)}deg);
  transition: transform 180ms ease, opacity 120ms ease, color 160ms ease;

  ${Row}:hover & {
    color: #4f46e5; /* indigo-600 */
  }

  @media (prefers-color-scheme: dark) {
    color: #94a3b8; /* slate-400 */
  }
`;

/** 폴더 / 파일 아이콘 */
const FolderIcon = styled.i<{ $open: boolean }>`
  width: 16px;
  height: 16px;
  display: inline-block;
  color: ${({ $open }) =>
    $open ? "#4680ff" : "#9ca3af"}; /* amber-500 / gray-400 */
  transition: color 160ms ease, transform 160ms ease;
  transform: ${({ $open }) => ($open ? "translateY(-1px)" : "none")};

  &::before {
    content: "";
    display: block;
    width: 16px;
    height: 12px;
    border: 2px solid currentColor;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom: 2px solid transparent;
    position: relative;
    box-shadow: inset 0 -6px 0 0 currentColor;
    background: ${({ $open }) =>
      $open ? "rgba(245, 158, 11, 0.08)" : "transparent"};
  }
  &::after {
    content: "";
    position: relative;
    display: block;
    width: 8px;
    height: 4px;
    margin-left: 2px;
    margin-top: -12px;
    background: currentColor;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }
`;

const FileIcon = styled.i`
  width: 16px;
  height: 16px;
  display: inline-block;
  color: #9ca3af; /* gray-400 */
  transition: color 160ms ease;
  ${Row}:hover & {
    color: #6b7280; /* gray-500 */
  }
  &::before {
    content: "";
    display: block;
    width: 12px;
    height: 14px;
    border: 2px solid currentColor;
    border-radius: 2px;
    position: relative;
    background: rgba(148, 163, 184, 0.06);
  }
  &::after {
    content: "";
    position: relative;
    display: block;
    width: 6px;
    height: 2px;
    margin-top: -12px;
    margin-left: 3px;
    background: currentColor;
    border-radius: 1px;
    box-shadow: 0 4px 0 0 currentColor, 0 8px 0 0 currentColor;
  }
`;

/** 펼침/접힘 컨테이너 */
const Children = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 220ms ease;
  will-change: grid-template-rows;
  overflow: hidden;

  > * {
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    transform: translateY(${({ $open }) => ($open ? "0px" : "-3px")});
    transition: opacity 180ms ease, transform 200ms ease;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    > * {
      transition: none;
    }
  }
`;

const Content = styled.ul<{ $depth: number }>`
  overflow: hidden;
  padding-left: 0;
  margin: 2px 0 0 0;
  border-left: 1px dashed rgba(148, 163, 184, 0.35);

  /* depth에 따라 좌측 여백 살짝 조절(라인 겹침 최소화) */
  margin-left: ${({ $depth }) => ($depth ? 6 : 0)}px;

  @media (prefers-color-scheme: dark) {
    border-left-color: rgba(148, 163, 184, 0.28);
  }
`;
