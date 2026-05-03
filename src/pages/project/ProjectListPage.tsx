import { useParams } from "react-router-dom";
import { ProjectResponseType } from "../../types/type";
import { getProjectsBySpaceApi } from "../../api/sehomanagerapi";
import ProjectCard from "../../components/card/ProjectCard";
import ListLayout from "../../components/layouts/ListLayout";
import { SiPolymerproject } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";

const ProjectListPage = () => {
  const { spaceId } = useParams();
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery<ProjectResponseType[]>({
    queryKey: ["projects", Number(spaceId)],
    queryFn: async () => {
      const res = await getProjectsBySpaceApi(Number(spaceId));
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <ListLayout
      title="프로젝트"
      to={`/projects/spaces/${spaceId}/create`}
      icon={<SiPolymerproject />}
    >
      {isLoading ? (
        <div>불러오는 중...</div>
      ) : isError ? (
        <div>프로젝트를 불러오지 못했습니다.</div>
      ) : projects.length === 0 ? (
        <div>해당 프로젝트가 존재하지 않습니다.</div>
      ) : (
        projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))
      )}
    </ListLayout>
  );
};

export default ProjectListPage;
