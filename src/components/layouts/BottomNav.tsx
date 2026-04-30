import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../../assets/home.svg";
import Inbox from "../../assets/inbox.svg";
import TaskList from "../../assets/task-list.svg";
import Settings from "../../assets/dashboard.svg";

const BottomNav = () => {
  return (
    <nav
      className="fixed-bottom border-top bg-white"
      style={{ height: "70px", zIndex: 200 }}
    >
      <div className="d-flex justify-content-evenly align-items-center h-100 text-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `d-flex flex-column align-items-center text-decoration-none ${
              isActive ? "text-primary fw-semibold" : "text-secondary"
            }`
          }
        >
          <img src={Home} alt="" style={{ width: "2rem", height: "2rem" }} />
          <small>홈</small>
        </NavLink>

        <NavLink
          to="/inbox"
          className={({ isActive }) =>
            `d-flex flex-column align-items-center text-decoration-none ${
              isActive ? "text-primary fw-semibold" : "text-secondary"
            }`
          }
        >
          <img src={Inbox} alt="" style={{ width: "2rem", height: "2rem" }} />
          <small>인박스</small>
        </NavLink>

        <NavLink
          to="/task-list"
          className={({ isActive }) =>
            `d-flex flex-column align-items-center text-decoration-none ${
              isActive ? "text-primary fw-semibold" : "text-secondary"
            }`
          }
        >
          <img
            src={TaskList}
            alt=""
            style={{ width: "2rem", height: "2rem" }}
          />
          <small>나의 태스크들</small>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `d-flex flex-column align-items-center text-decoration-none ${
              isActive ? "text-primary fw-semibold" : "text-secondary"
            }`
          }
        >
          <img
            src={Settings}
            alt=""
            style={{ width: "2rem", height: "2rem" }}
          />
          <small>설정</small>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
