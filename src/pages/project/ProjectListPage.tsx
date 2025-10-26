import { useParams } from "react-router-dom";
import { ProjectResponseType } from "../../types/type";
import { useEffect, useState } from "react";
import { getProjectsBySpaceApi } from "../../api/sehomanagerapi";
import ProjectCard from "../../components/card/ProjectCard";
import ListLayout from "../../layouts/ListLayout";

const ProjectListPage = () => {
  const { spaceId } = useParams();
  const [projects, setProjects] = useState<ProjectResponseType[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProjectsBySpaceApi(Number(spaceId))
      .then((res) => {
        console.log(res);
        setProjects(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [spaceId]);

  return (
    <ListLayout title="프로젝트" url={`/projects/spaces/${spaceId}/create`}>
      {isLoading && <div>로딩 중...</div>}
      {!isLoading && projects?.length === 0 ? (
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
