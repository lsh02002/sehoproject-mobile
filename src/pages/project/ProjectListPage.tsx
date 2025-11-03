import { useParams } from "react-router-dom";
import { ProjectResponseType } from "../../types/type";
import { useEffect, useState } from "react";
import { getProjectsBySpaceApi } from "../../api/sehomanagerapi";
import ProjectCard from "../../components/card/ProjectCard";
import ListLayout from "../../layouts/ListLayout";
import { SiPolymerproject } from "react-icons/si";

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
    <ListLayout title="프로젝트" to={`/projects/spaces/${spaceId}/create`} icon={<SiPolymerproject />}>      
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
