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
import ProjectListPage from "./pages/project.tsx/ProjectListPage";
import ProjectEditPage from "./pages/project.tsx/ProjectEditPage";
import { StyledToastContainer } from "./layouts/Toast";
import TaskListPage from "./pages/task/TaskListPage";
import TaskEditPage from "./pages/task/TaskEditPage";

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

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/workspaces" element={<WorkspaceListPage />} />
        <Route path="/workspace/:id" element={<WorkspaceEditPage />} />
        <Route
          path="/workspace/:workspaceId/spaces"
          element={<SpaceListPage />}
        />
        <Route
          path="/workspace/:workspaceId/spaces/:spaceId"
          element={<SpaceEditPage />}
        />
        <Route path="/projects/spaces/:spaceId" element={<ProjectListPage />} />
        <Route path="/projects/:projectId/edit" element={<ProjectEditPage />} />

        <Route path="/tasks/projects/:projectId" element={<TaskListPage />} />
        <Route path="/tasks/:taskId/edit" element={<TaskEditPage />} />
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
