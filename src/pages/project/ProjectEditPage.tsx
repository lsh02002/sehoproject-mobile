import styled from "styled-components";
import ConfirmButton from "../../components/form/ConfirmButton";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneProjectApi, putOneProjectApi } from "../../api/sehomanagerapi";
import { ProjectRequestType, TagResponseType } from "../../types/type";
import TextInput from "../../components/form/TextInput";
import DateInput from "../../components/form/DateInput";
import { CompleteArrayInput } from "../../components/form/CompleteArrayInput";
import { TwoDiv } from "../../components/form/TwoDiv";
import { toast } from "react-toastify";

const ProjectEditPage = () => {
  const { projectId } = useParams();
  const [id, setId] = useState(projectId);
  const [spaceId, setSpaceId] = useState();
  const [spaceName, setSpaceName] = useState("");
  const [projectKey, setProjectKey] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [dueDate, setDueDate] = useState<Date>();
  const [creatorId, setCreatorId] = useState();
  const [creatorName, setCreatorName] = useState("");

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    getOneProjectApi(Number(projectId))
      .then((res) => {
        console.log(res);

        setId(res.data.id);
        setSpaceId(res.data.spaceId);
        setSpaceName(res.data.spaceName);
        setProjectKey(res.data.projectKey);
        setName(res.data.name);
        setDescription(res.data.description);
        setStartDate(res.data.startDate);
        setDueDate(res.data.dueDate);
        setCreatorId(res.data.creatorId);
        setCreatorName(res.data.creatorName);
        setTags(
          res.data.tagResponses?.map((tag: TagResponseType) => tag?.name)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, [projectId]);

  // Option 타입: 컴포넌트가 기대 (id/name = string)
  type Option = { id: string; name: string };

  /** 검색: 문자열 배열 -> Option[] 매핑 */
  async function fetchOptions(query: string): Promise<Option[]> {
    const q = query.trim().toLowerCase();
    // 가벼운 딜레이 (선택)
    await new Promise((r) => setTimeout(r, 200));

    return tags
      .filter((t) => t.toLowerCase().includes(q))
      .map((t) => ({ id: t, name: t }));
  }

  /** 생성: 새 태그 문자열을 Option으로 */
  async function createOption(name: string): Promise<Option> {
    const v = name.trim();
    if (!tags.includes(v)) tags.unshift(v); // 메모리 mock에 추가
    return { id: v, name: v };
  }

  /** 삭제: 문자열 id 기준 */
  async function deleteOption(id: string): Promise<void> {
    const idx = tags.indexOf(id);
    if (idx >= 0) tags.splice(idx, 1);
  }

  /** 하이드레이션: 선택된 string[] -> Option[] */
  async function hydrateSelected(ids: string[]): Promise<Option[]> {
    // 실제 환경에서는 서버에서 라벨 가져오는 용도
    await new Promise((r) => setTimeout(r, 80));
    // ids 순서를 그대로 유지하면서 존재하는 것만 매핑
    const set = new Set(tags);
    return ids.filter((id) => set.has(id)).map((id) => ({ id, name: id }));
  }

  const OnEditSubmit = () => {
    const data: ProjectRequestType = {
      spaceId: Number(spaceId),
      projectKey,
      name,
      description,
      startDate,
      dueDate,
      creatorId: Number(creatorId),
      tags,
    };

    putOneProjectApi(Number(projectId), data)
      .then((res) => {
        console.log(res);
        toast.success("수정을 성공했습니다!");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          <h3>프로젝트 수정</h3>
        </Title>
        <TwoDiv>
          <TextInput
            name="id"
            title="프로젝트 아이디"
            disabled
            data={id ?? "0"}
            setData={setId}
          />
          <TextInput
            name="spaceName"
            title="스페이스 이름"
            disabled
            data={spaceName}
            setData={setSpaceName}
          />
        </TwoDiv>
        <TextInput
          name="projectKey"
          title="프로젝트 키"
          disabled
          data={projectKey}
          setData={setProjectKey}
        />
        <TextInput name="name" title="이름" data={name} setData={setName} />
        <TextInput
          name="description"
          title="상세설명"
          data={description}
          setData={setDescription}
        />
        <TwoDiv>
          <DateInput
            title="시작일"
            selected={startDate}
            setSelected={setStartDate}
          />
          <DateInput
            title="마감일"
            selected={dueDate}
            setSelected={setDueDate}
          />
        </TwoDiv>
        <TextInput
          name="creatorName"
          title="생성자 이름"
          disabled
          data={creatorName}
          setData={setCreatorName}
        />
        <CompleteArrayInput
          name="tags"
          title="태그들"
          values={tags}
          setValues={setTags}
          fetchOptions={fetchOptions}
          createOption={createOption}
          deleteOption={deleteOption}
          hydrateSelected={hydrateSelected}
        />
        <ConfirmButton title="수정" onClick={OnEditSubmit} />
      </Wrapper>
    </Container>
  );
};

export default ProjectEditPage;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-weight: 500;
  }

  a {
    font-size: 0.7rem;
  }
`;
