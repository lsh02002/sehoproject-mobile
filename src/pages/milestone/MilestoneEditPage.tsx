import styled from "styled-components";
import ConfirmButton from "../../components/form/ConfirmButton";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {  
    getOneMilestoneApi,
  getTasksByProjectApi,
  putOneMilestoneApi,  
} from "../../api/sehomanagerapi";
import { MilestoneRequestType, TaskResponseType } from "../../types/type";
import TextInput from "../../components/form/TextInput";
import DateInput from "../../components/form/DateInput";
import { TwoDiv } from "../../components/form/TwoDiv";
import { toast } from "react-toastify";
import SelectArrayInput from "../../components/form/SelectArrayInput";
import SelectInput, { Option } from "../../components/form/SelectInput";

const MilestoneEditPage = () => {
  const { milestoneId } = useParams();
  const [id, setId] = useState(milestoneId);
  const [projectId, setProjectId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
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
    getOneMilestoneApi(Number(milestoneId))
      .then((res) => {
        console.log(res);

        setId(res.data.id);
        setProjectId(res.data.projectId);
        setName(res.data.name);
        setDescription(res.data.description);
        setStatus(res.data.status);
        setStartDate(res.data.startDate);
        setDueDate(res.data.dueDate);
        setTaskIds(res.data.taskIds);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [milestoneId]);

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

  const OnEditSubmit = () => {
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

    putOneMilestoneApi(Number(id), data)
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
          <h3>마일스톤 수정</h3>
        </Title>
        <TwoDiv>
          <TextInput
            name="id"
            title="마일스톤 아이디"
            disabled
            data={id ?? "0"}
            setData={setId}
          />
          <TextInput
            name="projectId"
            title="프로젝트 아이디"
            disabled
            data={projectId}
            setData={setProjectId}
          />
        </TwoDiv>
        <TextInput name="name" title="이름" data={name} setData={setName} />
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
        <ConfirmButton title="수정" onClick={OnEditSubmit} />
      </Wrapper>
    </Container>
  );
};

export default MilestoneEditPage;

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
