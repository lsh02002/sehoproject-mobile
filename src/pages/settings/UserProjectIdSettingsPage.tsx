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
import { Container, Wrapper } from "../../components/pages-style/PageStyle";
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
        console.log(res);
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getWorkspacesApi()
      .then((res) => {
        console.log(res);
        const workspaceList = res.data ?? [];
        setWorkspaces(workspaceList);

        if (userInfo?.workspaceId == null) {
          setSelectWorkspaceId("");          
        } else {
          setSelectWorkspaceId(String(userInfo.workspaceId));          
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userInfo?.workspaceId]);

  useEffect(() => {
    if (!selectWorkspaceId) {
      setSpaces([]);
      setSelectSpaceId("");
      return;
    }

    getSpacesByWorkspaceApi(Number(selectWorkspaceId))
      .then((res) => {
        console.log(res);
        const spaceList = res.data ?? [];
        setSpaces(spaceList);

        if (userInfo?.spaceId == null) {
          setSelectSpaceId("");          
        } else {
          setSelectSpaceId(String(userInfo.spaceId));          
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectWorkspaceId, userInfo?.spaceId]);

  useEffect(() => {
    if (!selectSpaceId) {
      setProjects([]);
      setSelectProjectId("");
      return;
    }

    getProjectsBySpaceApi(Number(selectSpaceId))
      .then((res) => {
        console.log(res);
        const projectList = res.data ?? [];
        setProjects(projectList);

        if (userInfo?.projectId == null) {
          setSelectProjectId("");          
        } else {
          setSelectProjectId(String(userInfo.projectId));          
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectSpaceId, userInfo?.projectId]);

  const handleSetUserProjectId = () => {
    setUserIdsInfoApi(
      Number(selectWorkspaceId),
      Number(selectSpaceId),
      Number(selectProjectId),
    )
      .then((res) => {
        console.log(res);

        localStorage.setItem("workspaceId", selectWorkspaceId);
        localStorage.setItem("spaceId", selectSpaceId);
        localStorage.setItem("projectId", selectProjectId);

        toast.success("설정 변경에 성공했습니다!");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container>
      <Wrapper>
        <SelectInput
          name="workspaces"
          title="워크스페이스"
          value={selectWorkspaceId}
          setValue={setSelectWorkspaceId}
          options={workspaces.map((workspace) => ({
            label: workspace.name,
            value: String(workspace.id),
          }))}
          placeholder="워크스페이스가 미설정 되있습니다"
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
          placeholder="스페이스가 미설정 되있습니다"
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
          placeholder="프로젝트가 미설정 되있습니다"
        />        
        <ConfirmButton title="설정값 저장" onClick={handleSetUserProjectId} />
      </Wrapper>
    </Container>
  );
};
