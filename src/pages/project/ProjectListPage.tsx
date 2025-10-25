import { useParams } from "react-router-dom";
import { projectResponseType } from "../../types/type";
import { useEffect, useState } from "react";
import { getProjectsBySpaceApi } from "../../api/sehomanagerapi";
import ProjectCard from "../../components/card/list/ProjectCard";
import ListLayout from "../../layouts/ListLayout";

const ProjectListPage = () => {
  const { spaceId } = useParams();
  const [projects, setProjects] = useState<projectResponseType[] | null>([]);

  useEffect(() => {
    getProjectsBySpaceApi(Number(spaceId))
      .then((res) => {
        console.log(res);
        setProjects(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [spaceId]);

  return (
    <ListLayout title="프로젝트">
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      {projects?.length === 0 && <div>해당 프로젝트가 존재하지 않습니다.</div>}
    </ListLayout>
  );
};

export default ProjectListPage;
