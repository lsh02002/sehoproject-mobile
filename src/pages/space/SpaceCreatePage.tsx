import React, { useState } from "react";
import TextInput from "../../components/form/TextInput";
import { createSpaceApi } from "../../api/sehomanagerapi";
import ConfirmButton from "../../components/form/ConfirmButton";
import { SpaceRequestType } from "../../types/type";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSpaceAwesome } from "react-icons/fa6";
import { useQueryClient } from "@tanstack/react-query";

const SpaceCreatePage = () => {
  const { workspaceId } = useParams();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const OnCreateSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const data: SpaceRequestType = {
      name,
      slug,
    };

    createSpaceApi(Number(workspaceId), data)
      .then((res) => {
        toast.success("생성을 성공했습니다!");

        queryClient.invalidateQueries({
          queryKey: ["spaces", workspaceId],
        });
      })
      .catch(() => {})
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="container-fluid p-3 d-flex justify-content-center align-items-center">
      <div className="w-100 d-flex flex-column align-items-center">
        <div className="w-100 d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <FaSpaceAwesome />
            <h3 className="m-0 fw-medium">스페이스 생성</h3>
          </div>
        </div>

        <TextInput
          name="name"
          title="스페이스 이름"
          data={name}
          setData={setName}
        />

        <TextInput name="slug" title="슬러그" data={slug} setData={setSlug} />

        <ConfirmButton
          title="생성"
          onClick={OnCreateSubmit}
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};

export default SpaceCreatePage;
