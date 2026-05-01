import React, { useEffect, useState } from "react";
import {
  getProjectsBySpaceApi,
  getSpacesByWorkspaceApi,
  getUserByUserApi,
  getWorkspacesApi,
  setUserIdsInfoApi,
} from "../../api/sehomanagerapi";
import {
  ProjectResponseType,
  SignupResponseType,
  SpaceResponseType,
  WorkspaceResponseType,
} from "../../types/type";
import SelectInput from "../../components/form/SelectInput";
import ConfirmButton from "../../components/form/ConfirmButton";
import { toast } from "react-toastify";

export const UserProjectIdSettingsPage = () => {
  const [userInfo, setUserInfo] = useState<SignupResponseType>();

  const [workspaces, setWorkspaces] = useState<WorkspaceResponseType[]>([]);
  const [spaces, setSpaces] = useState<SpaceResponseType[]>([]);
  const [projects, setProjects] = useState<ProjectResponseType[]>([]);

  const [selectWorkspaceId, setSelectWorkspaceId] = useState("");
  const [selectSpaceId, setSelectSpaceId] = useState("");
  const [selectProjectId, setSelectProjectId] = useState("");

  useEffect(() => {
    getUserByUserApi()
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getWorkspacesApi()
      .then((res) => {
        const workspaceList = res.data ?? [];
        setWorkspaces(workspaceList);

        if (
          !workspaceList?.find(
            (workspace: WorkspaceResponseType) =>
              workspace?.id === userInfo?.workspaceId,
          )
        ) {
          setSelectWorkspaceId("");
        } else {
          setSelectWorkspaceId(String(userInfo?.workspaceId));
        }
      })
      .catch(() => {});
  }, [userInfo?.workspaceId]);

  useEffect(() => {
    if (!selectWorkspaceId) {
      setSpaces([]);
      setSelectSpaceId("");
      return;
    }

    getSpacesByWorkspaceApi(Number(selectWorkspaceId))
      .then((res) => {
        const spaceList = res.data ?? [];
        setSpaces(spaceList);

        if (
          !spaceList?.find(
            (space: SpaceResponseType) => space?.id === userInfo?.spaceId,
          )
        ) {
          setSelectSpaceId("");
        } else {
          setSelectSpaceId(String(userInfo?.spaceId));
        }
      })
      .catch(() => {});
  }, [selectWorkspaceId, userInfo?.spaceId]);

  useEffect(() => {
    if (!selectSpaceId) {
      setProjects([]);
      setSelectProjectId("");
      return;
    }

    getProjectsBySpaceApi(Number(selectSpaceId))
      .then((res) => {
        const projectList = res.data ?? [];
        setProjects(projectList);

        if (
          !projectList?.find(
            (project: ProjectResponseType) =>
              project?.id === userInfo?.projectId,
          )
        ) {
          setSelectProjectId("");
        } else {
          setSelectProjectId(String(userInfo?.projectId));
        }
      })
      .catch(() => {});
  }, [selectSpaceId, userInfo?.projectId]);

  const handleSetUserProjectId = () => {
    setUserIdsInfoApi(
      Number(selectWorkspaceId),
      Number(selectSpaceId),
      Number(selectProjectId),
    )
      .then((res) => {

        localStorage.setItem("workspaceId", selectWorkspaceId);
        localStorage.setItem("spaceId", selectSpaceId);
        localStorage.setItem("projectId", selectProjectId);

        toast.success("설정 변경에 성공했습니다!");
      })
      .catch(() => {});
  };

  return (
    <div className="p-3">
      <div className="bg-white shadow-sm p-3">
        <div className="d-flex flex-column gap-3">
          <SelectInput
            name="workspaces"
            title="워크스페이스"
            value={selectWorkspaceId}
            setValue={setSelectWorkspaceId}
            options={workspaces.map((workspace) => ({
              label: workspace.name,
              value: String(workspace.id),
            }))}
            placeholder="워크스페이스를 설정하세요"
          />

          <SelectInput
            name="spaces"
            title="스페이스"
            value={selectSpaceId}
            setValue={setSelectSpaceId}
            options={spaces.map((space) => ({
              label: space.name,
              value: String(space.id),
            }))}
            placeholder="스페이스를 설정하세요"
          />

          <SelectInput
            name="projects"
            title="프로젝트"
            value={selectProjectId}
            setValue={setSelectProjectId}
            options={projects.map((project) => ({
              label: project.name,
              value: String(project.id),
            }))}
            placeholder="프로젝트를 설정하세요"
          />

          <div className="pt-2">
            <ConfirmButton
              title="설정값 저장"
              onClick={handleSetUserProjectId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
