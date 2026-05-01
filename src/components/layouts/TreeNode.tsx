// TreeNode.tsx
import React, { memo } from "react";
import {
  BackendRowType,
  MilestoneNodeType,
  ProjectNodeType,
  SpaceNodeType,
  SprintNodeType,
  TreeNodeType,
  WorkspaceTreeResponseType,
} from "../../types/type";
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
  workspaceNameMap?: Record<number, string>,
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
    canEnter: boolean;
    milestones: Map<number, MilestoneAgg>;
    sprints: Map<number, SprintAgg>;
    tasks: Map<number, TaskAgg>;
  };

  type SpaceAgg = {
    id: number;
    name: string;
    position: number;
    canEnter: boolean;
    projects: Map<number, ProjectAgg>;
  };

  type WSAgg = {
    id: number;
    name: string;
    position: number;
    canEnter: boolean;
    spaces: Map<number, SpaceAgg>;
  };

  const workspaces = new Map<number, WSAgg>();

  for (const r of rows) {
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

  return Array.from(workspaces.values())
    .sort(byPosThenId<WSAgg>())
    .map<WorkspaceTreeResponseType>((ws) => ({
      workspaceId: ws.id,
      name: ws.name,
      type: "WORKSPACE",
      canEnter: ws.canEnter,
      spaces: Array.from(ws.spaces.values())
        .sort(byPosThenId<SpaceAgg>())
        .map<SpaceNodeType>((sp) => ({
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

export function convertToTreeNode(
  data: WorkspaceTreeResponseType,
): TreeNodeType {
  const spaces = Array.isArray(data.spaces) ? data.spaces : [];

  return {
    id: data.workspaceId,
    name: data.name,
    type: data.type,
    children: spaces.map((space) => {
      const projects = Array.isArray(space.projectNodes)
        ? space.projectNodes
        : [];

      return {
        id: space.id,
        name: space.name,
        type: space.type,
        disabled: space.canEnter === false,
        children: projects.map((project) => {
          const children: TreeNodeType[] = [];

          return {
            id: project.id,
            name: project.name,
            type: project.type,
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
  rootName = "Workspaces",
): TreeNodeType {
  const list = Array.isArray(dataList) ? dataList : [];

  return {
    id: "root",
    name: rootName,
    type: "WORKSPACE",
    children: list.map(convertToTreeNode),
  };
}

type Props = {
  open: boolean;
  setOpen: (v: any) => void;
  node: TreeNodeType;
  depth?: number;
  selectedId?: string | number;
  onSelect?: (node: TreeNodeType) => void;
  fontSize?: number;
};

export const TreeNode: React.FC<Props> = memo(function TreeNode({
  open,
  setOpen,
  node,
  depth = 0,
  selectedId,
  onSelect,
  fontSize,
}) {
  const navigate = useNavigate();

  const hasChildren = Boolean(node.children?.length);
  const isSelected = selectedId === node.id;
  const isDisabled = node.disabled === true;

  const handleToggle = () => {
    if (hasChildren) setOpen((v: any) => !v);
    onSelect?.(node);

    if (isDisabled) return;

    // ⭐ 핵심 추가
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setOpen(false); // ⭐ panel 닫기

    if (node.id === "root") {
      navigate("/settings/workspaces");
      return;
    }

    switch (node.type) {
      case "WORKSPACE":
        navigate(`/settings/workspace/${node.id}/spaces`);
        break;
      case "SPACE":
        navigate(`/projects/spaces/${node.id}`);
        break;
      case "PROJECT":
        navigate(`/boards/projects/${node.id}`);
        break;
    }
  };

  return (
    <li
      style={{
        listStyle: "none",
        position: "relative",
      }}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={hasChildren ? open : undefined}
        aria-label={node.name}
        aria-disabled={isDisabled || undefined}
        title={isDisabled ? `${node.name} (접근 권한 없음)` : node.name}
        className="w-100 d-flex align-items-center border-0 text-start"
        style={{
          gap: 10,
          padding: "8px 10px",
          paddingLeft: 10 + depth * 9,
          borderRadius: 10,
          cursor: "pointer",
          fontSize: `clamp(12px, ${fontSize ?? 14}px, 20px)`,
          lineHeight: 1.2,
          background: isSelected ? "rgba(99,102,241,0.14)" : "transparent",
          color: "inherit",
          opacity: hasChildren ? 1 : 0.96,
          transition:
            "background 160ms ease, box-shadow 160ms ease, transform 120ms ease",
        }}
      >
        <span
          aria-hidden
          style={{
            width: "1.2em",
            height: "1.2em",
            display: "inline-grid",
            placeItems: "center",
            color: "#64748b",
            opacity: hasChildren ? 1 : 0,
            transform: `rotate(${open ? 90 : 0}deg)`,
            transition: "transform 180ms ease, opacity 120ms ease",
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 24 24" width="1em" height="1em">
            <path
              d="M9 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {hasChildren ? (
          <span
            aria-hidden
            style={{
              width: "1.1em",
              height: "1.1em",
              display: "inline-block",
              color: open ? "#4680ff" : "#9ca3af",
              flexShrink: 0,
            }}
          >
            📁
          </span>
        ) : node.type === "MILESTONE" ? (
          <span
            style={{
              color: node.disabled ? "#aaa" : "inherit",
              fontSize: "0.95em",
              flexShrink: 0,
            }}
          >
            M
          </span>
        ) : node.type === "SPRINT" ? (
          <span
            style={{
              color: node.disabled ? "#aaa" : "inherit",
              fontSize: "0.95em",
              flexShrink: 0,
            }}
          >
            S
          </span>
        ) : node.type === "TASK" ? (
          <span
            style={{
              color: node.disabled ? "#aaa" : "inherit",
              fontSize: "0.95em",
              flexShrink: 0,
            }}
          >
            T
          </span>
        ) : (
          <span
            aria-hidden
            style={{
              width: "1.1em",
              height: "1.1em",
              display: "inline-block",
              color: "#9ca3af",
              flexShrink: 0,
            }}
          >
            📄
          </span>
        )}

        <span
          style={{
            display: "flex",
            color: isDisabled ? "#94a3b8" : "inherit",
            fontSize: "0.93em",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flex: 1,
          }}
        >
          {node.name}

          {node.type === "PROJECT" && (
            <Calendar
              onClick={(e) => {
                if (isDisabled) return;
                e.stopPropagation();

                if (document.activeElement instanceof HTMLElement) {
                  document.activeElement.blur();
                }

                setOpen(false);
                navigate(`/sprints/projects/${node.id}/calendar`);
              }}
              style={{
                color: node.disabled ? "#aaa" : "inherit",
                width: "1.15em",
                height: "1.15em",
                marginLeft: "0.25em",
                flexShrink: 0,
              }}
            />
          )}
        </span>

        {isDisabled && (
          <LockIcon
            style={{
              width: "1em",
              height: "1em",
              color: "gray",
              flexShrink: 0,
            }}
          >
            <title>"접근 권한이 없습니다"</title>
          </LockIcon>
        )}
      </button>

      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 1000 : 0,
          transition: "max-height 220ms ease",
        }}
      >
        <ul
          style={{
            overflow: "hidden",
            paddingLeft: 0,
            margin: "2px 0 0 0",
            borderLeft: "1px dashed rgba(148, 163, 184, 0.35)",
            marginLeft: depth ? 6 : 0,
          }}
        >
          {node.children?.map((child, idx) => (
            <TreeNode
              key={`${depth + 1}-${child.type ?? "NODE"}-${String(
                child.id ?? idx,
              )}-${idx}`}
              open={open}
              setOpen={setOpen}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              fontSize={fontSize}
            />
          ))}
        </ul>
      </div>
    </li>
  );
});
