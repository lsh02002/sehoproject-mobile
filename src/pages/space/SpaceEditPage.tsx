import TextInput from "../../components/form/TextInput";
import ConfirmButton from "../../components/form/ConfirmButton";
import {
  getOneSpaceByWorkspaceAndSpaceApi,
  putOneSpaceByWorkspaceAndSpaceApi,
} from "../../api/sehomanagerapi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SpaceRequestType } from "../../types/type";
import { toast } from "react-toastify";
import {
  Container,
  PageIconAndNameWrapper,
  TabH3,
  Title,
  Wrapper,
} from "../../components/pages-style/PageStyle";
import { Section } from "../settings/SettingsLayout";
import SpaceMemberPage from "./SpaceConfirmBox";
import { FaSpaceAwesome } from "react-icons/fa6";

type TabKey = "info" | "members";

const SpaceEditPage = () => {
  const { workspaceId, spaceId } = useParams();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [workspaceIdState, setWorkspaceIdState] = useState<string>(
    workspaceId?.toString() ?? ""
  );
  const [currentTab, setCurrentTab] = useState<TabKey>("info");

  useEffect(() => {
    getOneSpaceByWorkspaceAndSpaceApi(Number(workspaceId), Number(spaceId))
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setSlug(res.data.slug);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [workspaceId, spaceId]);

  const OnEditSubmit = () => {
    const data: SpaceRequestType = {
      name,
      slug,
    };

    putOneSpaceByWorkspaceAndSpaceApi(
      Number(workspaceIdState),
      Number(spaceId),
      data
    )
      .then((res) => {
        console.log(res);
        toast.success("생성을 성공했습니다!");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title role="tablist" aria-label="스페이스 설정">
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
            <PageIconAndNameWrapper
              icon={<FaSpaceAwesome />}
              name="스페이스 정보"
            />
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
            스페이스 회원
          </TabH3>
        </Title>
        {currentTab === "info" ? (
          <Section aria-labelledby="tab-info">
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
          </Section>
        ) : (
          <Section aria-labelledby="tab-members">
            <SpaceMemberPage
              workspaceId={Number(workspaceId)}
              spaceId={Number(spaceId)}
            />
          </Section>
        )}
      </Wrapper>
    </Container>
  );
};

export default SpaceEditPage;
