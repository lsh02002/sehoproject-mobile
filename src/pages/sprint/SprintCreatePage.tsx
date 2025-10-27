import styled from "styled-components";
import ConfirmButton from "../../components/form/ConfirmButton";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  createSprintApi,
  getTasksByProjectApi,  
} from "../../api/sehomanagerapi";
import { SprintRequestType, TaskResponseType } from "../../types/type";
import TextInput from "../../components/form/TextInput";
import DateInput from "../../components/form/DateInput";
import { TwoDiv } from "../../components/form/TwoDiv";
import { toast } from "react-toastify";
import SelectArrayInput from "../../components/form/SelectArrayInput";
import SelectInput, { Option } from "../../components/form/SelectInput";

const SprintCreatePage = () => {
  const { projectIdParam } = useParams();
  const [projectId, setProjectId] = useState(projectIdParam);
  const [name, setName] = useState("");
  const [state, setState] = useState("PLANNED");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [taskIds, setTaskIds] = useState<TaskResponseType[]>([]);
  const [taskOptions, setTaskOptions] = useState<TaskResponseType[]>([]);

  const sprintStateOptions: Option[] = [
    { label: "PLANNED", value: "PLANNED" },
    { label: "ACTIVE", value: "ACTIVE" },
    { label: "CLOSED", value: "CLOSED" },    
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
    const data: SprintRequestType = {
      projectId: Number(projectId),
      name,
      startDate,
      endDate,
      state,
      taskIds: taskIds
        .map((taskId) => taskId.id)
        .filter((id): id is number => id !== undefined),
    };

    console.log(data);

    createSprintApi(data)
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
          <h3>스프린트 수정</h3>
        </Title>
        <TwoDiv>
          <TextInput
            name="projectId"
            title="프로젝트 아이디"
            disabled
            data={projectId ?? ""}
            setData={setProjectId}
          />
        </TwoDiv>
        <TextInput name="name" title="이름" data={name} setData={setName} />
        <TwoDiv>
          <DateInput
            title="시작일"
            selected={startDate}
            setSelected={setStartDate}
          />
          <DateInput
            title="마감일"
            selected={endDate}
            setSelected={setEndDate}
          />
        </TwoDiv>
        <SelectInput
          name="state"
          title="작업 상태"
          value={state}
          setValue={setState}
          options={sprintStateOptions}
        />
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
        <ConfirmButton title="수정" onClick={OnCreateSubmit} />
      </Wrapper>
    </Container>
  );
};

export default SprintCreatePage;

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
