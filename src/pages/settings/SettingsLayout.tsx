import { Outlet, Navigate, useLocation, NavLink } from "react-router-dom";
import { useState } from "react";

export default function SettingsLayout() {
  const location = useLocation();
  const isBaseSettingsPath = location.pathname === "/settings";
  const [showSidebar, setShowSidebar] = useState(false);

  const workspaceId = localStorage.getItem("workspaceId");

  const handleNavClick = () => {
    setShowSidebar(false);
  };

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link rounded-3 px-3 py-2 text-dark border ${
      isActive
        ? "bg-primary-subtle border-primary-subtle"
        : "border-transparent"
    }`;

  return (
    <div className="w-100 d-grid gap-3">
      <div className="w-100 d-flex justify-content-end align-items-center p-3">
        <button
          type="button"
          className="btn btn-light btn-sm border"
          onClick={toggleSidebar}
          aria-expanded={showSidebar}
        >
          {showSidebar ? "◀ 설정메뉴" : "▶ 설정메뉴"}
        </button>
      </div>

      {showSidebar && (
        <aside
          className="bg-white shadow-sm p-3 position-sticky align-self-start"
          style={{ top: 16, zIndex: 10 }}
        >
          <div className="fw-bold mb-2">설정메뉴</div>

          <nav className="nav flex-column gap-1">
            <NavLink
              to="/settings/userProjectId"
              onClick={handleNavClick}
              className={navLinkClass}
            >
              대표 프로젝트 설정
            </NavLink>

            <NavLink
              to="/settings/workspaces"
              onClick={handleNavClick}
              className={navLinkClass}
            >
              워크스페이스
            </NavLink>

            <NavLink
              to={`/settings/workspace/${workspaceId}/spaces`}
              onClick={handleNavClick}
              className={navLinkClass}
            >
              스페이스
            </NavLink>

            <NavLink
              to="/settings/profile"
              onClick={handleNavClick}
              className={navLinkClass}
            >
              프로필
            </NavLink>

            <NavLink
              to="/settings/preferences"
              onClick={handleNavClick}
              className={navLinkClass}
            >
              환경 설정
            </NavLink>

            <NavLink
              to="/settings/notifications"
              onClick={handleNavClick}
              className={navLinkClass}
            >
              알림
            </NavLink>

            <NavLink
              to="/settings/project-defaults"
              onClick={handleNavClick}
              className={navLinkClass}
            >
              프로젝트 기본값
            </NavLink>

            <NavLink
              to="/settings/security"
              onClick={handleNavClick}
              className={navLinkClass}
            >
              보안
            </NavLink>
          </nav>
        </aside>
      )}

      <main className="w-100">
        {isBaseSettingsPath ? (
          <Navigate to="/settings/profile" replace />
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
