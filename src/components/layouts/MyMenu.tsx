import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  TreeNode,
  convertToRootTreeNode,
  rowsToWorkspaceTreeResponse,
} from "./TreeNode";
import type { TreeNodeType } from "../../types/type";
import { getWorkspacesTreeApi } from "../../api/sehomanagerapi";
import { useLogin } from "../../context/LoginContext";

export default function SidebarMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const { isLogin, setIsLogin } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const { workspaceId } = useParams();
  const { isMemuRefresh } = useLogin();

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

  const handleSelect = (node: TreeNodeType) => {
    if (String(node.id).startsWith("p")) {
      navigate(`/workspaces/${workspaceId}/projects/${node.id}`);
    } else if (String(node.id).startsWith("space-")) {
      navigate(`/workspaces/${workspaceId}/spaces/${node.id}`);
    }
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
          setOpen={setOpen}
          node={root}
          selectedId={selectedId}
          onSelect={handleSelect}
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
          onClick={() => {
            setOpen(false);
            navigate("/settings/invitation-message");
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
              onClick={() => {
                setOpen(false);
                navigate("/change-password");
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
              onClick={() => {
                localStorage.removeItem("userId");
                localStorage.removeItem("name");
                localStorage.removeItem("workspaceId");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                setIsLogin(false);
                setOpen(false);
                navigate("/login");
              }}
            >
              로그아웃
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
            onClick={() => {
              setOpen(false);
              navigate("/login");
            }}
          >
            로그인
          </span>
        )}
      </div>
    </aside>
  );
}
