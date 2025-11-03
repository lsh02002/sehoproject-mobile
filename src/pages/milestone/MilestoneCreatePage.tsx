import ConfirmButton from "../../components/form/ConfirmButton";
import { useCallback, useEffect, useState } from "react";
import {
  createMilestoneApi,
  getTasksByProjectApi,
} from "../../api/sehomanagerapi";
import { MilestoneRequestType, TaskResponseType } from "../../types/type";
import TextInput from "../../components/form/TextInput";
import DateInput from "../../components/form/DateInput";
import { TwoDiv } from "../../components/form/TwoDiv";
import { toast } from "react-toastify";
import SelectArrayInput from "../../components/form/SelectArrayInput";
import SelectInput, { Option } from "../../components/form/SelectInput";
import { useParams } from "react-router-dom";
import {
  Container,
  PageIconAndNameWrapper,
  Title,
  Wrapper,
} from "../../components/pages-style/PageStyle";
import { LuMilestone } from "react-icons/lu";

const MilestoneCreatePage = () => {
  const { projectIdParam } = useParams();
  const [projectId, setProjectId] = useState(projectIdParam);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PLANNED");
  const [startDate, setStartDate] = useState<Date>();
  const [dueDate, setDueDate] = useState<Date>();
  const [taskIds, setTaskIds] = useState<TaskResponseType[]>([]);
  const [taskOptions, setTaskOptions] = useState<TaskResponseType[]>([]);

  const milestoneStatusOptions: Option[] = [
    { label: "PLANNED", value: "PLANNED" },
    { label: "IN_PROGRESS", value: "IN_PROGRESS" },
    { label: "DONE", value: "DONE" },
    { label: "ARCHIVED", value: "ARCHIVED" },
  ];

  useEffect(() => {
    if (projectId) {
      getTasksByProjectApi(Number(projectId))
        .then((res) => {
          console.log(res);
          setTaskOptions(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [projectId]);

  const handleSetTasks = useCallback(
    (names: string[]) => {
      const newTaskOptions: TaskResponseType[] = names.map((name) => ({
        id: taskOptions?.find((option) => option.name === name)?.id,
        projectKey: "",
        projectId: Number(projectId), // 실제로는 서버 id 또는 uuid로 대체
        name,
        description: "",
      }));

      setTaskIds(newTaskOptions);
    },
    [projectId, taskOptions]
  );

  const OnCreateSubmit = () => {
    const data: MilestoneRequestType = {
      projectId: Number(projectId),
      name,
      description,
      startDate,
      dueDate,
      status,
      taskIds: taskIds
        .map((taskId) => taskId.id)
        .filter((id): id is number => id !== undefined),
    };

    createMilestoneApi(data)
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
          <PageIconAndNameWrapper icon={<LuMilestone />} name="마일스톤 생성" />
        </Title>
        <TextInput
          name="projectId"
          title="프로젝트 아이디"
          disabled
          data={projectId ?? ""}
          setData={setProjectId}
        />
        <TextInput name="name" title="이름" data={name} setData={setName} />
        <TextInput
          name="description"
          title="상세설명"
          data={description}
          setData={setDescription}
        />
        <SelectInput
          name="state"
          title="작업 상태"
          value={status}
          setValue={setStatus}
          options={milestoneStatusOptions}
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
        <SelectArrayInput
          name="taskIds"
          title="태스크"
          values={taskIds.map((task: TaskResponseType) => String(task.name))}
          setValues={handleSetTasks}
          options={
            taskOptions.map((task: TaskResponseType) => ({
              label: task.name,
              value: task.name,
            })) ?? []
          }
        />
        <ConfirmButton title="생성" onClick={OnCreateSubmit} />
      </Wrapper>
    </Container>
  );
};

export default MilestoneCreatePage;
