import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SpaceResponseType } from "../../types/type";
import { getSpacesByWorkspaceApi } from "../../api/sehomanagerapi";
import SpaceCard from "../../components/card/SpaceCard";
import ListLayout from "../../layouts/ListLayout";

const SpaceListPage = () => {
  const { workspaceId } = useParams();
  const [spaces, setSpaces] = useState<SpaceResponseType[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSpacesByWorkspaceApi(Number(workspaceId))
      .then((res) => {
        console.log(res);
        setSpaces(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [workspaceId]);

  return (
    <ListLayout
      title="스페이스"
      to={`/workspace/${workspaceId}/spaces/create`}
    >
      {isLoading && <div>로딩 중...</div>}
      {!isLoading && spaces?.length === 0 ? (
        <div>프로젝트가 존재하지 않습니다.</div>
      ) : (
        spaces?.map((space) => <SpaceCard key={space.id} space={space} />)
      )}
    </ListLayout>
  );
};

export default SpaceListPage;
