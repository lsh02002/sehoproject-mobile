import ConfirmButton from "../../components/form/ConfirmButton";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { createProjectApi } from "../../api/sehomanagerapi";
import { ProjectRequestType } from "../../types/type";
import TextInput from "../../components/form/TextInput";
import DateInput from "../../components/form/DateInput";
import { TwoDiv } from "../../components/form/TwoDiv";
import { toast } from "react-toastify";
import { Container, Title, Wrapper } from "../../components/pages-style/PageStyle";

const ProjectCreatePage = () => {
  const { spaceIdParam } = useParams();
  const [spaceId, setSpaceId] = useState(spaceIdParam);
  const [projectKey, setProjectKey] = useState("PROJECT");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [dueDate, setDueDate] = useState<Date>();

  const OnCreateSubmit = () => {
    const data: ProjectRequestType = {
      spaceId: Number(spaceId),
      name,
      projectKey,
      description,
      startDate,
      dueDate,
    };

    createProjectApi(data)
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
        <Title>
          <h3>프로젝트 생성</h3>
        </Title>
        <TwoDiv>
          <TextInput
            name="spaceId"
            title="스페이스 아이디"
            disabled
            data={spaceId ?? ""}
            setData={setSpaceId}
          />
        </TwoDiv>
        <TextInput
          name="name"
          title="프로젝트 이름"
          data={name}
          setData={setName}
        />
        <TextInput
          name="projectKey"
          title="프로젝트 키"
          data={projectKey}
          setData={setProjectKey}
        />
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
        {/* <CompleteArrayInput
          name="tags"
          title="태그들"
          values={tags}
          setValues={setTags}
          fetchOptions={fetchOptions}
          createOption={createOption}
          deleteOption={deleteOption}
          hydrateSelected={hydrateSelected}
        /> */}
        <ConfirmButton title="생성" onClick={OnCreateSubmit} />
      </Wrapper>
    </Container>
  );
};

export default ProjectCreatePage;
