import TextInput from "../../components/form/TextInput";
import ConfirmButton from "../../components/form/ConfirmButton";
import {
  getOneSpaceByWorkspaceAndSpaceApi,
  putOneSpaceByWorkspaceAndSpaceApi,
} from "../../api/sehomanagerapi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SpaceRequestType } from "../../types/type";
import { toast } from "react-toastify";
import SpaceMemberPage from "./SpaceConfirmBox";
import { FaSpaceAwesome } from "react-icons/fa6";
import { useQueryClient } from "@tanstack/react-query";

type TabKey = "info" | "members";

const SpaceEditPage = () => {
  const { workspaceId, spaceId } = useParams();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [workspaceIdState, setWorkspaceIdState] = useState<string>(
    workspaceId?.toString() ?? "",
  );
  const [currentTab, setCurrentTab] = useState<TabKey>("info");

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  useEffect(() => {
    getOneSpaceByWorkspaceAndSpaceApi(Number(workspaceId), Number(spaceId))
      .then((res) => {
        setName(res.data.name);
        setSlug(res.data.slug);
      })
      .catch(() => {});
  }, [workspaceId, spaceId]);

  const OnEditSubmit = () => {
    const data: SpaceRequestType = {
      name,
      slug,
    };

    putOneSpaceByWorkspaceAndSpaceApi(
      Number(workspaceIdState),
      Number(spaceId),
      data,
    )
      .then((res) => {
        toast.success("생성을 성공했습니다!");

        queryClient.invalidateQueries({
          queryKey: ["spaces", workspaceId],
          refetchType: "active",
        });

        navigate(-1);
      })
      .catch(() => {});
  };

  return (
    <div className="container-fluid p-3 d-flex justify-content-center align-items-center">
      <div className="w-100 d-flex flex-column align-items-center">
        <div
          className="w-100 d-flex justify-content-between align-items-center border-bottom mb-3"
          role="tablist"
          aria-label="스페이스 설정"
        >
          <h3
            role="tab"
            aria-selected={currentTab === "info"}
            tabIndex={0}
            onClick={() => setCurrentTab("info")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setCurrentTab("info");
            }}
            className={`m-0 px-1 py-2 fw-bold fs-6 position-relative ${
              currentTab === "info"
                ? "text-dark border-bottom border-3 border-primary"
                : "text-secondary"
            }`}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            <div className="d-flex align-items-center gap-2">
              <FaSpaceAwesome />
              <span>스페이스 정보</span>
            </div>
          </h3>

          <h3
            role="tab"
            aria-selected={currentTab === "members"}
            tabIndex={0}
            onClick={() => setCurrentTab("members")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setCurrentTab("members");
            }}
            className={`m-0 px-1 py-2 fw-bold fs-6 ${
              currentTab === "members"
                ? "text-dark border-bottom border-3 border-primary"
                : "text-secondary"
            }`}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            스페이스 회원
          </h3>
        </div>

        {currentTab === "info" ? (
          <section className="w-100" aria-labelledby="tab-info">
            <TextInput
              name="name"
              title="스페이스 이름"
              data={name}
              setData={setName}
            />
            <TextInput
              name="slug"
              title="슬러그"
              data={slug}
              setData={setSlug}
            />
            <TextInput
              name="workspaceId"
              title="워크스페이스"
              disabled
              data={workspaceIdState}
              setData={setWorkspaceIdState}
            />
            <ConfirmButton title="수정" onClick={OnEditSubmit} />
          </section>
        ) : (
          <section className="w-100" aria-labelledby="tab-members">
            <SpaceMemberPage
              workspaceId={Number(workspaceId)}
              spaceId={Number(spaceId)}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default SpaceEditPage;
