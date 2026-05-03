import React from "react";
import { useParams } from "react-router-dom";
import { SpaceResponseType } from "../../types/type";
import { getSpacesByWorkspaceApi } from "../../api/sehomanagerapi";
import SpaceCard from "../../components/card/SpaceCard";
import ListLayout from "../../components/layouts/ListLayout";
import { FaSpaceAwesome } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";

const SpaceListPage = () => {
  const { workspaceId } = useParams();
  const {
    data: spaces = [],
    isLoading,
    isError,
  } = useQuery<SpaceResponseType[]>({
    queryKey: ["spaces", workspaceId],
    queryFn: async () => {
      const res = await getSpacesByWorkspaceApi(Number(workspaceId));
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <ListLayout
      title="스페이스"
      to={`/settings/workspace/${workspaceId}/spaces/create`}
      icon={<FaSpaceAwesome />}
    >
      {isLoading ? (
        <div>불러오는 중...</div>
      ) : isError ? (
        <div>스페이스를 불러오지 못했습니다.</div>
      ) : spaces.length === 0 ? (
        <div>해당 스페이스가 존재하지 않습니다.</div>
      ) : (
        spaces?.map((space) => <SpaceCard key={space.id} space={space} />)
      )}
    </ListLayout>
  );
};

export default SpaceListPage;
