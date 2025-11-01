import React, { useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/user/LoginPage";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/user/SignupPage";
import MainPage from "./pages/main/MainPage";
import BottomNav from "./layouts/BottomNav";
import Layout from "./layouts/Layout";
import { useLogin } from "./context/LoginContext";
import WorkspaceListPage from "./pages/workspace/WorkspaceListPage";
import WorkspaceEditPage from "./pages/workspace/WorkspaceEditPage";
import SpaceListPage from "./pages/space/SpaceListPage";
import SpaceEditPage from "./pages/space/SpaceEditPage";
import ProjectListPage from "./pages/project/ProjectListPage";
import ProjectEditPage from "./pages/project/ProjectEditPage";
import { StyledToastContainer } from "./layouts/Toast";
import TaskListPage from "./pages/task/TaskListPage";
import TaskEditPage from "./pages/task/TaskEditPage";
import SprintCalendarPage from "./pages/sprint/SprintCalendarPage";
import WorkspaceCreatePage from "./pages/workspace/WorkspaceCreatePage";
import SpaceCreatePage from "./pages/space/SpaceCreatePage";
import ProjectCreatePage from "./pages/project/ProjectCreatePage";
import TaskCreatePage from "./pages/task/TaskCreatePage";
import SprintListPage from "./pages/sprint/SprintListPage";
import BoardList from "./pages/project/board/BoardList";
import SprintEditPage from "./pages/sprint/SprintEditPage";
import SprintCreatePage from "./pages/sprint/SprintCreatePage";
import MilestoneListPage from "./pages/milestone/MilestoneListPage";
import MilestoneEditPage from "./pages/milestone/MilestoneEditPage";
import MilestoneCreatePage from "./pages/milestone/MilestoneCreatePage";
import TaskByAssigneePage from "./pages/task/task-list/TasksByAssigneePage";
import SettingsLayout from "./pages/settings/SettingsLayout";
import { ProfileSettingsPage } from "./pages/settings/ProfileSettingsPage";
import { PreferencesSettingsPage } from "./pages/settings/PreferencesSettingsPage";
import { NotificationsSettingsPage } from "./pages/settings/NotificationsSettingsPage";
import { ProjectDefaultsSettingsPage } from "./pages/settings/ProjectDefaultsSettingsPage";
import { SecuritySettingsPage } from "./pages/settings/SecuritySettingsPage";
import { getWorkspacesApi } from "./api/sehomanagerapi";

function App() {
  const { setIsLogin } = useLogin();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [setIsLogin]);

  useEffect(() => {
    if (!localStorage.getItem("workspaceId")) {
      getWorkspacesApi()
        .then((res) => {
          console.log(res);
          localStorage.setItem("workspaceId", res.data[0].id);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route
          path="/workspace/:workspaceId/spaces"
          element={<SpaceListPage />}
        />
        <Route
          path="/workspace/:workspaceId/spaces/:spaceId/edit"
          element={<SpaceEditPage />}
        />
        <Route
          path="/workspace/:workspaceId/spaces/create"
          element={<SpaceCreatePage />}
        />
        <Route path="/projects/spaces/:spaceId" element={<ProjectListPage />} />
        <Route path="/projects/:projectId/edit" element={<ProjectEditPage />} />
        <Route
          path="/projects/spaces/:spaceIdParam/create"
          element={<ProjectCreatePage />}
        />

        <Route
          path="/milestones/projects/:projectId"
          element={<MilestoneListPage />}
        />
        <Route
          path="/milestones/:milestoneId/edit"
          element={<MilestoneEditPage />}
        />
        <Route
          path="/milestones/projects/:projectIdParam/create"
          element={<MilestoneCreatePage />}
        />

        <Route
          path="/sprints/projects/:projectId"
          element={<SprintListPage />}
        />
        <Route path="/sprints/:sprintId/edit" element={<SprintEditPage />} />
        <Route
          path="/sprints/projects/:projectIdParam/create"
          element={<SprintCreatePage />}
        />
        <Route
          path="/sprints/projects/:projectId/calendar"
          element={<SprintCalendarPage />}
        />

        <Route path="/tasks/projects/:projectId" element={<TaskListPage />} />
        <Route path="/tasks/:taskId/edit" element={<TaskEditPage />} />
        <Route
          path="/tasks/projects/:projectIdParam/create"
          element={<TaskCreatePage />}
        />

        <Route path="/boards/projects/:projectId" element={<BoardList />} />

        <Route path="/task-list" element={<TaskByAssigneePage />} />

        <Route path="/settings" element={<SettingsLayout />}>
          <Route path="workspaces" element={<WorkspaceListPage />} />
          <Route path="workspace/:id/edit" element={<WorkspaceEditPage />} />
          <Route path="workspaces/create" element={<WorkspaceCreatePage />} />
          <Route path="profile" element={<ProfileSettingsPage />} />
          <Route path="preferences" element={<PreferencesSettingsPage />} />
          <Route path="notifications" element={<NotificationsSettingsPage />} />
          <Route
            path="project-defaults"
            element={<ProjectDefaultsSettingsPage />}
          />
          <Route path="security" element={<SecuritySettingsPage />} />
        </Route>
      </Routes>

      <StyledToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
        limit={1}
      />
      <BottomNav />
    </Layout>
  );
}

export default App;
