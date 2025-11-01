import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TextInput from "../../components/form/TextInput";
import ConfirmButton from "../../components/form/ConfirmButton";
import { WorkspaceRequestType, WorkspaceResponseType } from "../../types/type";
import { getOneWorkspaceApi, putOneWorkspaceApi } from "../../api/sehomanagerapi";
import { Container, TabH3, Title, Wrapper } from "../../components/pages-style/PageStyle";
import { Section } from "../settings/SettingsLayout";
import InviteBox from "./WorkspaceInviteBox";

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
    <Container>
      <Wrapper>
        <Title role="tablist" aria-label="워크스페이스 설정">
          <TabH3
            role="tab"
            aria-selected={currentTab === "info"}
            $active={currentTab === "info"}
            tabIndex={0}
            onClick={() => setCurrentTab("info")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setCurrentTab("info");
            }}
          >
            워크스페이스 정보
          </TabH3>
          <TabH3
            role="tab"
            aria-selected={currentTab === "members"}
            $active={currentTab === "members"}
            tabIndex={0}
            onClick={() => setCurrentTab("members")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setCurrentTab("members");
            }}
          >
            워크스페이스 회원
          </TabH3>
        </Title>

        {currentTab === "info" ? (
          <Section aria-labelledby="tab-info">
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
            <ConfirmButton title="수정" onClick={OnEditSubmit} />
          </Section>
        ) : (
          <Section aria-labelledby="tab-members">
            {/* 회원 탭 콘텐츠: 필요 시 컴포넌트 분리/연결 */}
            <InviteBox workspaceId={Number(id)} />
          </Section>
        )}
      </Wrapper>
    </Container>
  );
};

export default WorkspaceEditPage;
