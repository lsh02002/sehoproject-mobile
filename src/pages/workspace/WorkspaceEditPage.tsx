import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TextInput from "../../components/form/TextInput";
import ConfirmButton from "../../components/form/ConfirmButton";
import { WorkspaceRequestType, WorkspaceResponseType } from "../../types/type";
import {
  getOneWorkspaceApi,
  putOneWorkspaceApi,
} from "../../api/sehomanagerapi";
import InviteBox from "./WorkspaceInviteBox";
import { MdWorkspaces } from "react-icons/md";

type TabKey = "info" | "members";

const WorkspaceEditPage = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [currentTab, setCurrentTab] = useState<TabKey>("info");

  useEffect(() => {
    getOneWorkspaceApi(Number(id))
      .then((res) => {
        const data: WorkspaceResponseType = res.data;
        setName(data.name);
        setSlug(data.slug);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const OnEditSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const data: WorkspaceRequestType = { name, slug };
    putOneWorkspaceApi(Number(id), data)
      .then(() => {
        toast.success("수정을 성공했습니다!");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-start w-100 p-3">
      <div className="w-100 d-flex flex-column" style={{ maxWidth: "400px" }}>
        <div
          className="d-flex justify-content-between align-items-center w-100 mb-3 border-bottom"
          role="tablist"
          aria-label="워크스페이스 설정"
        >
          <button
            type="button"
            className={`btn border-0 rounded-0 px-1 py-2 fw-bold ${
              currentTab === "info"
                ? "text-dark border-bottom border-3 border-primary"
                : "text-secondary"
            }`}
            role="tab"
            aria-selected={currentTab === "info"}
            onClick={() => setCurrentTab("info")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setCurrentTab("info");
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <span className="d-flex align-items-center">
                <MdWorkspaces />
              </span>
              <h3 className="mb-0 fw-semibold" style={{ fontSize: "1rem" }}>
                워크스페이스 수정
              </h3>
            </div>
          </button>

          <button
            type="button"
            className={`btn border-0 rounded-0 px-1 py-2 fw-bold ${
              currentTab === "members"
                ? "text-dark border-bottom border-3 border-primary"
                : "text-secondary"
            }`}
            role="tab"
            aria-selected={currentTab === "members"}
            onClick={() => setCurrentTab("members")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setCurrentTab("members");
            }}
          >
            워크스페이스 회원
          </button>
        </div>

        {currentTab === "info" ? (
          <div className="w-100" role="tabpanel" aria-labelledby="tab-info">
            <TextInput
              name="name"
              title="워크스페이스 이름"
              data={name}
              setData={setName}
            />

            <TextInput
              name="slug"
              title="슬러그"
              data={slug}
              setData={setSlug}
            />

            <div className="mt-3">
              <ConfirmButton title="수정" onClick={OnEditSubmit} />
            </div>
          </div>
        ) : (
          <div className="w-100" role="tabpanel" aria-labelledby="tab-members">
            <InviteBox workspaceId={Number(id)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceEditPage;
