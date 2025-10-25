import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  assigneeRequestType,
  assignInfoType,
  tagResponseType,
  taskRequestType,  
} from "../../types/type";
import {
  createTaskApi,
  getTagsByProjectApi,
  getUserInfosApi,
} from "../../api/sehomanagerapi";
import TextInput from "../../components/form/TextInput";
import SelectInput, { Option } from "../../components/form/SelectInput";
import SelectArrayInput from "../../components/form/SelectArrayInput";
import styled from "styled-components";
import ConfirmButton from "../../components/form/ConfirmButton";
import { TwoDiv } from "../../components/form/TwoDiv";
import DateInput from "../../components/form/DateInput";
import { toast } from "react-toastify";

const TaskCreatePage = () => {
  const { projectIdParam } = useParams();
  const [projectId, setProjectId] = useState(projectIdParam);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("TODO");
  const [priority, setPriority] = useState("MEDIUM");
  const [type, setType] = useState("TASK");
  const [storyPoints, setStoryPoints] = useState("");
  const [assignees, setAssignees] = useState<assigneeRequestType[]>([]);
  const [assigneeOptions, setAssigneeOptions] = useState<assignInfoType[]>([]);
  const [tags, setTags] = useState<tagResponseType[]>([]);
  const [tagOptions, setTagOptions] = useState<tagResponseType[]>([]);
  const [dueDate, setDueDate] = useState<Date>();

  const stateOptions: Option[] = [
    { label: "TODO", value: "TODO" },
    { label: "IN_PROGRESS", value: "IN_PROGRESS" },
    { label: "BLOCKED", value: "BLOCKED" },
    { label: "DONE", value: "DONE" },
  ];

  const priorityOptions: Option[] = [
    { label: "LOW", value: "LOW" },
    { label: "MEDIUM", value: "MEDIUM" },
    { label: "HIGH", value: "HIGH" },
    { label: "URGENT", value: "URGENT" },
  ];

  const typeOptions: Option[] = [
    { label: "STORY", value: "STORY" },
    { label: "TASK", value: "TASK" },
    { label: "BUG", value: "BUG" },
    { label: "EPIC", value: "EPIC" },
  ];

  useEffect(() => {
    getUserInfosApi()
      .then((res) => {
        console.log(res.data);
        setAssigneeOptions(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getTagsByProjectApi(Number(projectId))
      .then((res) => {
        console.log(res);
        setTagOptions(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [projectId]);

  const handleSetAssignees = (emails: string[]) => {
    const newAssignees: assigneeRequestType[] = emails.map((email, index) => ({
      assigneeId: index, // 실제로는 서버 id 또는 uuid로 대체
      email,
      dynamicAssign: false, // 기본값 (필요에 따라 true/false 조정)
      type: "USER", // 기본 type (필요시 변경)
    }));

    setAssignees(newAssignees);
  };

  const handleSetTags = (names: string[]) => {
    const newTagsOptions: tagResponseType[] = names.map((name, index) => ({
      id: index,
      projectId: Number(projectId), // 실제로는 서버 id 또는 uuid로 대체
      name,
      description: "",
    }));

    setTags(newTagsOptions);
  };

  // const handleSetDependencyIds = (ids: (string | number)[]) => {
  //   const numericIds = ids.map((id) => Number(id)).filter((id) => !isNaN(id)); // NaN 제거
  //   setDependencyIds(numericIds);
  // };

  const OnCreateSubmit = () => {
    const data: taskRequestType = {
      projectId: Number(projectId),
      name,
      description,
      state,
      priority,
      type,
      storyPoints: Number(storyPoints),
      assignees: assigneeOptions.filter((option) =>
        assignees.some((user) => user.email === option.email)
      ),
      sprintId: null,
      milestoneId: null,
      tags: tagOptions
        .filter((option) => tags.some((tag) => tag.name === option.name))
        .map((tag) => tag.id),
      dependencyTaskIds: [],
      dueDate: dueDate,
    };

    console.log(data);

    createTaskApi(data)
      .then((res) => {
        console.log(res);
        toast.info("생성을 성공했습니다!");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          <h3>태스크 생성</h3>
        </Title>
        <TextInput
          name="projectId"
          title="프로젝트 아이디"
          disabled
          data={projectId ?? "null"}
          setData={setProjectId}
        />
        <TextInput name="name" title="이름" data={name} setData={setName} />
        <TextInput
          name="description"
          title="상세설명"
          data={description}
          setData={setDescription}
        />
        <TwoDiv>
          <SelectInput
            name="state"
            title="작업 상태"
            value={state}
            setValue={setState}
            options={stateOptions}
          />
          <SelectInput
            name="priority"
            title="우선순위"
            value={priority}
            setValue={setPriority}
            options={priorityOptions}
          />
          <SelectInput
            name="type"
            title="태스크 타입"
            value={type}
            setValue={setType}
            options={typeOptions}
          />
        </TwoDiv>
        <SelectArrayInput
          name="assignees"
          title="작업할당자"
          values={assignees.map((assignee) => assignee.email)}
          setValues={handleSetAssignees}
          options={assigneeOptions?.map((assignee: assignInfoType) => ({
            label: assignee.email,
            value: assignee.email,
          }))}
        />
        <TextInput
          name="storyPoints"
          title="스토리 포인트"
          data={storyPoints ?? "null"}
          setData={setStoryPoints}
        />
        <SelectArrayInput
          name="tags"
          title="태그"
          values={tags.map((tag: tagResponseType) => String(tag.name))}
          setValues={handleSetTags}
          options={
            tagOptions.map((tag: tagResponseType) => ({
              label: tag.name,
              value: tag.name,
            })) ?? []
          }
        />
        <DateInput title="마감일" selected={dueDate} setSelected={setDueDate} />
        <ConfirmButton title="생성" onClick={OnCreateSubmit} />
      </Wrapper>
    </Container>
  );
};

export default TaskCreatePage;

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
