import React, { useState } from "react";
import TextInput from "../../components/form/TextInput";
import { createWorkspaceApi } from "../../api/sehomanagerapi";
import ConfirmButton from "../../components/form/ConfirmButton";
import { WorkspaceRequestType } from "../../types/type";
import { toast } from "react-toastify";
import { MdWorkspaces } from "react-icons/md";
import { layout } from "../../theme/Theme";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const WorkspaceCreatePage = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const OnCreateSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    const data: WorkspaceRequestType = {
      name,
      slug,
    };

    createWorkspaceApi(data)
      .then((res) => {
        const workspaceId = res?.data?.id;
        const storedWorkspaceId = localStorage.getItem("workspaceId");

        if (
          workspaceId &&
          (!storedWorkspaceId || storedWorkspaceId === "null")
        ) {
          localStorage.setItem("workspaceId", workspaceId);
        }

        toast.success("생성을 성공했습니다!");

        queryClient.invalidateQueries({
          queryKey: ["workspaces"],
        });

        navigate(-1);
      })
      .catch(() => {})
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100">
      <div
        className="w-100"
        style={{ maxWidth: layout.maxWidth, padding: "20px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <span className="d-flex align-items-center">
              <MdWorkspaces />
            </span>
            <h3 className="mb-0 fw-semibold" style={{ fontSize: "1rem" }}>
              워크스페이스 생성
            </h3>
          </div>
        </div>

        <TextInput
          name="name"
          title="워크스페이스 이름"
          data={name}
          setData={setName}
        />

        <TextInput name="slug" title="슬러그" data={slug} setData={setSlug} />

        <div className="mt-3">
          <ConfirmButton
            title="생성"
            onClick={OnCreateSubmit}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCreatePage;
