import axios from "axios";
import {
  AddMemberRequestType,
  MilestoneRequestType,
  ProjectRequestType,
  SpaceRequestType,
  SprintRequestType,
  TaskRequestType,
  TaskUpdateRequestType,
  UserSignupType,
  WorkspaceInviteType,
  WorkspaceRequestType,
} from "../types/type";
import { BASE_URL } from "./BASE_URL";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터: 매 요청마다 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      config.headers["accessToken"] = accessToken;
      config.headers["refreshToken"] = refreshToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터: 새 accessToken이 오면 자동 저장
api.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["accesstoken"]; // 헤더 키 이름은 서버와 동일하게
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    return response;
  },
  (error) => {
    // ✅ detailMessage가 있으면 가장 먼저 콘솔에 출력
    if (error.response?.data?.detailMessage) {
      toast.error(error.response.data.detailMessage);
    }
    // 그 외의 에러도 같이 로깅
    if (error.message) {
      console.error(error.message);
    }
    console.error("⚠️ Axios Error:", error);
    return Promise.reject(error);
  }
);

const UserLoginApi = async (email: string, password: string) => {
  return api.post(`/user/login`, {
    email,
    password,
  });
};

const UserSignupApi = async (data: UserSignupType) => {
  return api.post(`/user/sign-up`, data);
};

const UserLogoutApi = async () => {
  return api.delete(`/user/logout`);
};

const getUserInfosApi = async () => {
  return api.get(`/user`);
};

const setUserWorkspaceId = async (workspaceId: number) => {
  return api.post(`/user/workspaces/${workspaceId}`);
}

const getWorkspacesTreeApi = async (workspaceId: number) => {
  return api.get(`/workspaces/tree/${workspaceId}`);
};

const getWorkspacesApi = async () => {
  return api.get(`/workspaces`);
};

const getOneWorkspaceApi = async (id: number) => {
  return api.get(`/workspaces/${id}`);
};

const putOneWorkspaceApi = async (
  id: number,
  data: { name: string; slug: string }
) => {
  return api.put(`/workspaces/${id}`, data);
};

const postWorkspaceInvite = async (payload: WorkspaceInviteType) => {
  return api.post(`/workspaces/invites`, payload);
};

const getSpacesByWorkspaceApi = async (workspaceId: number) => {
  return api.get(`/workspace/${workspaceId}/spaces`);
};

const getOneSpaceByWorkspaceAndSpaceApi = async (
  workspaceId: number,
  spaceId: number
) => {
  return api.get(`/workspace/${workspaceId}/spaces/${spaceId}`);
};

const putOneSpaceByWorkspaceAndSpaceApi = async (
  workspaceId: number,
  spaceId: number,
  data: { name: string; slug: string }
) => {
  return api.put(`/workspace/${workspaceId}/spaces/${spaceId}`, data);
};

const getWorkspaceMembersApi = async (workspaceId: number) => {
  return api.get(`/workspaces/${workspaceId}/members`);
};

const getInvitationMessageApi = async () => {
  return api.get(`/workspaces/invitations`);
};

const postInvitationAcceptApi = async (
  workspaceId: number,
  inviteId: number
) => {
  return api.post(`workspaces/${workspaceId}/invites/${inviteId}/accept`);
};

const postInvitationDeclineApi = async (
  workspaceId: number,
  inviteId: number
) => {
  return api.post(`workspaces/${workspaceId}/invites/${inviteId}/decline`);
};

const getProjectsBySpaceApi = async (spaceId: number) => {
  return api.get(`/projects/spaces/${spaceId}`);
};

const getOneProjectApi = async (projectId: number) => {
  return api.get(`/projects/${projectId}`);
};

const putOneProjectApi = async (
  projectId: number,
  data: ProjectRequestType
) => {
  return api.put(`/projects/${projectId}/edit`, data);
};

const getProjectMembersApi = async (projectId: number) => {
  return api.get(`/projects/${projectId}/members`);
}

const getMilestonesByProjectApi = async (projectId: number) => {
  return api.get(`/milestones/projects/${projectId}`);
};

const getOneMilestoneApi = async (milestoneId: number) => {
  return api.get(`/milestones/${milestoneId}`);
};

const putOneMilestoneApi = async (
  milestoneId: number,
  data: MilestoneRequestType
) => {
  return api.put(`/milestones/${milestoneId}`, data);
};

const getTasksByProjectApi = async (projectId: number) => {
  return api.get(`/tasks/projects/${projectId}`);
};

const getOneTaskApi = async (taskId: number) => {
  return api.get(`/tasks/${taskId}`);
};

const getTasksByAssigneeApi = async () => {
  return api.get(`/tasks/assignee`);
};

const putOneTaskApi = async (taskId: number, data: TaskUpdateRequestType) => {
  return api.put(`/tasks/${taskId}/edit`, data);
};

const getTagsByProjectApi = async (projectId: number) => {
  return api.get(`/tags/projects/${projectId}/tags`);
};

const getOneSprintApi = async (sprintId: number) => {
  return api.get(`/sprints/${sprintId}`);
};

const getSprintsByProjectApi = async (projectId: number) => {
  return api.get(`/sprints/projects/${projectId}`);
};

const putOneSprintApi = async (sprintId: number, data: SprintRequestType) => {
  return api.put(`/sprints/${sprintId}`, data);
};

const createWorkspaceApi = async (data: WorkspaceRequestType) => {
  return api.post(`/workspaces/create`, data);
};

const createSpaceApi = async (workspaceId: number, data: SpaceRequestType) => {
  return api.post(`/workspace/${workspaceId}/spaces/create`, data);
};

const createSpaceMemberApi = async (
  workspaceId: number,
  spaceId: number,
  data: AddMemberRequestType
) => {
  return api.post(`/workspaces/${workspaceId}/spaces/${spaceId}/members`, data);
};

const createProjectApi = async (data: ProjectRequestType) => {
  return api.post(`/projects/create`, data);
};

const createProjectMemberApi = async (
  projectId: number,
  data: AddMemberRequestType
) => {
  return api.post(`/projects/${projectId}/members`, data);
};

const createTaskApi = async (data: TaskRequestType) => {
  return api.post(`/tasks/create`, data);
};

const createSprintApi = async (data: SprintRequestType) => {
  return api.post(`/sprints/create`, data);
};

const createMilestoneApi = async (data: MilestoneRequestType) => {
  return api.post(`/milestones/create`, data);
};

export {
  UserLoginApi,
  UserSignupApi,
  UserLogoutApi,
  setUserWorkspaceId,
  getWorkspacesTreeApi,
  getWorkspacesApi,
  getOneWorkspaceApi,
  putOneWorkspaceApi,
  postWorkspaceInvite,
  getWorkspaceMembersApi,
  getInvitationMessageApi,
  postInvitationAcceptApi,
  postInvitationDeclineApi,
  getSpacesByWorkspaceApi,
  getOneSpaceByWorkspaceAndSpaceApi,
  putOneSpaceByWorkspaceAndSpaceApi,
  getProjectsBySpaceApi,
  getOneProjectApi,
  putOneProjectApi,
  getProjectMembersApi,
  getUserInfosApi,
  getMilestonesByProjectApi,
  getOneMilestoneApi,
  putOneMilestoneApi,
  getTasksByProjectApi,
  getOneTaskApi,
  putOneTaskApi,
  getTagsByProjectApi,
  getTasksByAssigneeApi,
  getSprintsByProjectApi,
  getOneSprintApi,
  putOneSprintApi,
  createWorkspaceApi,
  createSpaceApi,
  createSpaceMemberApi,
  createProjectApi,
  createProjectMemberApi,
  createTaskApi,
  createSprintApi,
  createMilestoneApi,
};
