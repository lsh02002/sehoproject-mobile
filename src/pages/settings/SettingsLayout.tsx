import { Outlet, Navigate, useLocation, NavLink } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

export default function SettingsLayout() {
  const location = useLocation();
  const isBaseSettingsPath = location.pathname === "/settings";
  const [showSidebar, setShowSidebar] = useState(false);

  const handleNavClick = () => {
    setShowSidebar(false); // 메뉴 클릭 시 사이드바 숨김
  };

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <Root $sidebar={showSidebar}>
      <HeaderBar>
        <ToggleButton
          type="button"
          onClick={toggleSidebar}
          aria-expanded={showSidebar}
        >
          {showSidebar ? "◀ 설정메뉴" : "▶ 설정메뉴"}
        </ToggleButton>
      </HeaderBar>
      {showSidebar && (
        <Sidebar>
          <SidebarTitle>설정메뉴</SidebarTitle>
          <Nav>
            <NavItem to={`/settings/workspaces`} onClick={handleNavClick}>
              워크스페이스
            </NavItem>
            <NavItem to="/settings/profile" onClick={handleNavClick}>
              프로필
            </NavItem>
            <NavItem to="/settings/preferences" onClick={handleNavClick}>
              환경 설정
            </NavItem>
            <NavItem to="/settings/notifications" onClick={handleNavClick}>
              알림
            </NavItem>
            <NavItem to="/settings/project-defaults" onClick={handleNavClick}>
              프로젝트 기본값
            </NavItem>
            <NavItem to="/settings/security" onClick={handleNavClick}>
              보안
            </NavItem>
          </Nav>
        </Sidebar>
      )}

      <Content>
        {isBaseSettingsPath ? (
          <Navigate to="/settings/profile" replace />
        ) : (
          <Outlet />
        )}
      </Content>
    </Root>
  );
}

/*********************************
 * styled-components
 *********************************/
export const Root = styled.div<{ $sidebar: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ $sidebar }) => ($sidebar ? "260px 1fr" : "1fr")};
  gap: 20px;  
`;

export const Sidebar = styled.aside`
  position: sticky;
  top: 16px;
  align-self: start;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  padding: 16px;
  box-sizing: border-box;
  z-index: 10;
`;

export const SidebarTitle = styled.div`
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 8px;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const NavItem = styled(NavLink)`
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid transparent;
  color: #111827;
  box-sizing: border-box;

  &.active {
    background: #dbeafe;
    border-color: #bfdbfe;
  }
  &:hover {
    background: #eff6ff;
  }
`;

export const Content = styled.main`
  width: 100%;
`;

export const HeaderBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

export const ToggleButton = styled.button`
  background: #e5e7eb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }
`;

export const Section = styled.section`
  width: 100%;
  padding: 18px 16px;
  margin: 16px 0;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
`;

export const SectionHeader = styled.h4`
  margin: 0 0 12px 0;
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
`;

export const FooterBar = styled.div`
  position: sticky;
`;

/* 필요하다면 FooterBar에 bottom, 배경 그라데이션 등 추가:
  bottom: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.86) 0%, #fff 22%);
  padding: 10px 0 4px;
*/
