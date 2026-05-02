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
import { LuMilestone } from "react-icons/lu";
import QuillEditorInput from "../../components/form/QuillEditorInput";
import { useLogin } from "../../context/LoginContext";

const MilestoneCreatePage = () => {
  const projectIdLocal = localStorage.getItem("projectId");
  const { projectId, setProjectId } = useLogin();
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
        projectId: Number(projectId),
        name,
        description: "",
      }));

      setTaskIds(newTaskOptions);
    },
    [projectId, taskOptions],
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
        toast.success("생성을 성공했습니다!");
      })
      .catch(() => {});
  };

  return (
    <div className="container-fluid p-3 d-flex justify-content-center align-items-center">
      <div className="w-100 d-flex flex-column align-items-center">
        <div className="w-100 d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <LuMilestone />
            <h3 className="m-0 fw-medium">마일스톤 생성</h3>
          </div>
        </div>

        <TextInput
          name="projectId"
          title="프로젝트 아이디"
          disabled
          data={String(projectId) ?? projectIdLocal ?? ""}
          setData={() => {}}
        />
        <TextInput name="name" title="이름" data={name} setData={setName} />
        <QuillEditorInput
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
      </div>
    </div>
  );
};

export default MilestoneCreatePage;
