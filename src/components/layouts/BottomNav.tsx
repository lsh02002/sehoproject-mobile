import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { ReactComponent as HomeIcon } from "../../assets/home.svg";
import { ReactComponent as InboxIcon } from "../../assets/inbox.svg";
import { ReactComponent as TaskListIcon } from "../../assets/task-list.svg";
import { ReactComponent as SettingsIcon } from "../../assets/dashboard.svg";
import { useModalManager } from "../../context/ModalManager";

const iconStyle: React.CSSProperties = {
  width: "2rem",
  height: "2rem",
  fill: "none",
};

const navItems = [
  { to: "/", icon: <HomeIcon style={iconStyle} />, label: "홈" },
  { to: "/inbox", icon: <InboxIcon style={iconStyle} />, label: "인박스" },
  {
    to: "/task-list",
    icon: <TaskListIcon style={iconStyle} />,
    label: "나의 태스크들",
  },
  {
    to: "/settings",
    icon: <SettingsIcon style={iconStyle} />,
    label: "설정",
  },
];

const navLinkBaseClass =
  "d-flex flex-column align-items-center justify-content-center flex-fill text-decoration-none small";

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${navLinkBaseClass} ${isActive ? "text-primary fw-semibold" : "text-secondary"}`;

const BottomNav = () => {
  const { closeAllModals } = useModalManager();

  return (
    <nav
      className="fixed-bottom border-top bg-white"
      style={{ height: "70px", zIndex: 200 }}
    >
      <div className="d-flex justify-content-evenly align-items-center h-100 text-center">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={getNavLinkClass}
            onClick={(e) => {
              e.stopPropagation(); // 필요하면 유지
              if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
              }
              closeAllModals();
            }}
          >
            {icon}
            <small>{label}</small>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
