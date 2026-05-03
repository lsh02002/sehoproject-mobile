import ConfirmButton from "../../components/form/ConfirmButton";
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
import { GiSprint } from "react-icons/gi";
import { useLogin } from "../../context/LoginContext";
import { useQueryClient } from "@tanstack/react-query";

const SprintCreatePage = () => {
  const projectIdLocal = localStorage.getItem("projectId");
  const { projectId, setProjectId } = useLogin();
  const [name, setName] = useState("");
  const [state, setState] = useState("PLANNED");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [taskIds, setTaskIds] = useState<TaskResponseType[]>([]);
  const [taskOptions, setTaskOptions] = useState<TaskResponseType[]>([]);

  const queryClient = useQueryClient();

  const sprintStateOptions: Option[] = [
    { label: "PLANNED", value: "PLANNED" },
    { label: "ACTIVE", value: "ACTIVE" },
    { label: "CLOSED", value: "CLOSED" },
  ];

  useEffect(() => {
    if (!projectId) {
      setProjectId(Number(projectIdLocal));
    }
  }, [projectId, projectIdLocal, setProjectId]);

  useEffect(() => {
    if (projectId) {
      getTasksByProjectApi(Number(projectId))
        .then((res) => {
          setTaskOptions(res.data);
        })
        .catch(() => {});
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
        imageResponses: [],
      }));

      setTaskIds(newTaskOptions);
    },
    [projectId, taskOptions],
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

    createSprintApi(data)
      .then((res) => {
        toast.success("생성을 성공했습니다!");

        queryClient.invalidateQueries({
        queryKey: ["sprints"],
      });
      })
      .catch(() => {});
  };

  return (
    <div className="container-fluid p-3 d-flex justify-content-center align-items-center">
      <div className="w-100 d-flex flex-column align-items-center">
        <div className="w-100 d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <GiSprint />
            <h3 className="m-0 fw-medium">스프린트 생성</h3>
          </div>
        </div>

        <TwoDiv>
          <TextInput
            name="projectId"
            title="프로젝트 아이디"
            disabled
            data={String(projectId) ?? projectIdLocal ?? ""}
            setData={() => {}}
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

        <ConfirmButton title="생성" onClick={OnCreateSubmit} />
      </div>
    </div>
  );
};

export default SprintCreatePage;
