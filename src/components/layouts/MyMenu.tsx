import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  TreeNode,
  convertToRootTreeNode,
  rowsToWorkspaceTreeResponse,
} from "./TreeNode";
import type { TreeNodeType } from "../../types/type";
import { getWorkspacesTreeApi } from "../../api/sehomanagerapi";
import { useLogin } from "../../context/LoginContext";
import { useModalManager } from "../../context/ModalManager";

export default function SidebarMenu({ open }: { open: boolean }) {
  const { isLogin, setIsLogin } = useLogin();
  const nickname = localStorage.getItem("nickname");
  const navigate = useNavigate();
  const location = useLocation();
  const { isMemuRefresh } = useLogin();
  const { closeAllModals } = useModalManager();

  const [root, setRoot] = React.useState<TreeNodeType | null>(null);

  const selectedId = React.useMemo(() => {
    const m =
      location.pathname.match(/projects\/(\d+)/) ||
      location.pathname.match(/spaces\/(\d+)/);
    return m?.[1];
  }, [location.pathname]);

  React.useEffect(() => {
    let aborted = false;
    (async () => {
      const workspaceId = Number(localStorage.getItem("workspaceId"));

      if (Number.isNaN(workspaceId)) {
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
        return;
      }

      getWorkspacesTreeApi(Number(workspaceId))
        .then((res) => {
          const rows = res.data;
          const list = rowsToWorkspaceTreeResponse(rows);
          if (!aborted) setRoot(convertToRootTreeNode(list));
        })
        .catch(() => {
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

  const go = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    closeAllModals();

    setTimeout(() => {
      navigate(path);
    }, 0);
  };

  if (!root)
    return (
      <aside
        className="p-2"
        style={{
          minWidth: open ? 240 : 64,
          height: "calc(100vh - 250px)",
        }}
      >
        Loading…
      </aside>
    );

  return (
    <aside
      className="p-2 d-flex flex-column"
      style={{
        minWidth: open ? 240 : 64,
        height: "calc(100vh - 250px)",
        boxSizing: "border-box",
      }}
      aria-label="Workspace Tree Navigation"
    >
      <ul className="list-unstyled m-0 p-0">
        <TreeNode
          open={open}
          node={root}
          selectedId={selectedId}
          fontSize={16}
        />
      </ul>

      {/* 하단 메뉴 */}
      <div
        className="mt-auto w-100 d-flex flex-column"
        style={{
          padding: "10px 20px",
          gap: 8,
          background: "#fafafa",
          borderTop: "1px solid #eee",
        }}
      >
        <span
          className="small"
          style={{
            cursor: "pointer",
            padding: "6px 10px",
            borderRadius: 6,
          }}
          onClick={(e) => {            
            go(e, "/settings/invitation-message");
          }}
        >
          워크스페이스 초대함
        </span>

        {isLogin ? (
          <>
            <span
              className="small"
              style={{
                cursor: "pointer",
                padding: "6x 10px",
                border: 6,
              }}
              onClick={(e) => {                
                go(e, "/change-password");
              }}
            >
              비밀번호 변경
            </span>
            <span
              className="small"
              style={{
                cursor: "pointer",
                padding: "6px 10px",
                borderRadius: 6,
              }}
              onClick={(e) => {
                if (!window.confirm("로그아웃 하시겠습니까?")) {
                  return;
                }
                localStorage.removeItem("userId");
                localStorage.removeItem("name");
                localStorage.removeItem("workspaceId");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                setIsLogin(false);                
                go(e, "/login");
              }}
            >
              <div className="d-flex">로그아웃 ({nickname})</div>
            </span>
          </>
        ) : (
          <span
            className="small"
            style={{
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: 6,
            }}
            onClick={(e) => {              
              go(e, "/login");
            }}
          >
            로그인
          </span>
        )}
      </div>
    </aside>
  );
}
