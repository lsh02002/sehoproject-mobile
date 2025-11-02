// SidebarMenu.tsx
import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

// 지금 만든 TreeNode/convertToTreeNode를 가져옵니다.
import {
  TreeNode,
  convertToRootTreeNode,
  rowsToWorkspaceTreeResponse,
} from "./TreeNode";
import type { TreeNodeType } from "../types/type";
import { getWorkspacesTreeApi } from "../api/sehomanagerapi";
import { useLogin } from "../context/LoginContext";

const Panel = styled.aside<{ $open: boolean }>`
  min-width: ${({ $open }) => ($open ? 240 : 64)}px;
  padding: 8px;
  height: calc(100vh + 80px);
  box-sizing: border-box;  
`;

export default function SidebarMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const { isLogin, setIsLogin } = useLogin();
  // const [open] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { workspaceId } = useParams();
  const { isMemuRefresh } = useLogin();

  const [root, setRoot] = React.useState<TreeNodeType | null>(null);
  const selectedId = React.useMemo(() => {
    // 라우트 규칙에 맞춰서 선택 로직을 조정하세요.
    // 예: /workspaces/:workspaceId/spaces/:spaceId/projects/:projectId
    const m =
      location.pathname.match(/projects\/(\d+)/) ||
      location.pathname.match(/spaces\/(\d+)/);
    return m?.[1]; // 대략적인 예시
  }, [location.pathname]);

  React.useEffect(() => {
    let aborted = false;
    (async () => {
      // 백엔드 연동 (예: GET /api/workspaces/{workspaceId}/tree)
      getWorkspacesTreeApi()
        .then((res) => {
          const rows = res.data;
          const list = rowsToWorkspaceTreeResponse(rows);
          if (!aborted) setRoot(convertToRootTreeNode(list));
        })
        .catch((err) => {
          console.error(`GET tree failed: ${err.status}`);

          console.error(err);
          // 실패 시 최소 더미 트리
          if (!aborted) {
            setRoot({
              id: "workspace",
              name: "Workspace",
              type: "WORKSPACE",
              children: [
                {
                  id: "space-1",
                  name: "Space A",
                  type: "SPACE",
                  children: [{ id: "p1", name: "Project 1", type: "PROJECT" }],
                },
                {
                  id: "space-2",
                  name: "Space B",
                  type: "SPACE",
                  children: [{ id: "p2", name: "Project 2", type: "PROJECT" }],
                },
              ],
            });
          }
        });
    })();
    return () => {
      aborted = true;
    };
  }, [isMemuRefresh]);

  const handleSelect = (node: TreeNodeType) => {
    // 노드 id → 라우트 매핑을 프로젝트 규칙에 맞게 작성하세요.
    // 예시: space-*, p* 패턴으로 라우팅
    if (String(node.id).startsWith("p")) {
      navigate(`/workspaces/${workspaceId}/projects/${node.id}`);
    } else if (String(node.id).startsWith("space-")) {
      navigate(`/workspaces/${workspaceId}/spaces/${node.id}`);
    }
  };

  if (!root) return <Panel $open={open}>Loading…</Panel>;

  return (
    <Panel $open={open} aria-label="Workspace Tree Navigation">
      <ul style={{ padding: 0, margin: 0 }}>
        <TreeNode
          open={open}
          setOpen={setOpen}
          node={root}
          selectedId={selectedId}
          onSelect={handleSelect}
          fontSize={16}
        />
      </ul>
      <LoginMenuItem>
        <span
          onClick={() => {
            setOpen(false);
            navigate("/settings/invitation-message");
          }}
        >
          워크스페이스 초대함
        </span>
        {isLogin ? (
          <span
            onClick={() => {
              setIsLogin(false);
              setOpen(false);
              navigate("/login");
            }}
          >
            로그아웃
          </span>
        ) : (
          <span
            onClick={() => {
              setOpen(false);
              navigate("/login");
            }}
          >
            로그인
          </span>
        )}
      </LoginMenuItem>
    </Panel>
  );
}

const LoginMenuItem = styled.div`
  padding: 10px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  background: #fafafa;
  border-top: 1px solid #eee;
  box-sizing: border-box;

  span {
    font-size: 14px;
    color: #333;
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 6px;
    transition: all 0.2s ease-in-out;    

    &:hover {
      background-color: #f0f0f0;
      color: #007aff;      
    }

    &:active {
      background-color: #e6e6e6;
      transform: scale(0.98);
    }
  }
`;

