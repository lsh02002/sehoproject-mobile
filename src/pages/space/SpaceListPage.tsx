import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SpaceResponseType } from "../../types/type";
import { getSpacesByWorkspaceApi } from "../../api/sehomanagerapi";
import SpaceCard from "../../components/card/SpaceCard";
import ListLayout from "../../layouts/ListLayout";

const SpaceListPage = () => {
  const { workspaceId } = useParams();
  const [spaces, setSpaces] = useState<SpaceResponseType[] | null>([]);

  useEffect(() => {
    getSpacesByWorkspaceApi(Number(workspaceId))
      .then((res) => {
        console.log(res);
        setSpaces(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [workspaceId]);

  return (
    <ListLayout title="스페이스">
      {spaces?.map((space) => (
        <SpaceCard key={space.id} space={space} />
      ))}
    </ListLayout>
  );
};

export default SpaceListPage;
