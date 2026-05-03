import { useEffect, useState } from "react";
import {
  AssigneeRequestType,
  AssignInfoType,
  TagResponseType,
  TaskRequestType,
} from "../../types/type";
import {
  createTaskApi,
  getTagsByProjectApi,
  getUserInfosApi,
} from "../../api/sehomanagerapi";
import TextInput from "../../components/form/TextInput";
import SelectInput, { Option } from "../../components/form/SelectInput";
import SelectArrayInput from "../../components/form/SelectArrayInput";
import ConfirmButton from "../../components/form/ConfirmButton";
import { TwoDiv } from "../../components/form/TwoDiv";
import DateInput from "../../components/form/DateInput";
import { toast } from "react-toastify";
import { MdAddTask } from "react-icons/md";
import QuillEditorInput from "../../components/form/QuillEditorInput";
import { useLogin } from "../../context/LoginContext";
import ImageInput from "../../components/form/ImageInput";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const TaskCreatePage = () => {
  const projectIdLocal = localStorage.getItem("projectId");
  const { projectId, setProjectId } = useLogin();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("TODO");
  const [priority, setPriority] = useState("MEDIUM");
  const [type, setType] = useState("TASK");
  const [storyPoints, setStoryPoints] = useState("");
  const [assignees, setAssignees] = useState<AssigneeRequestType[]>([]);
  const [assigneeOptions, setAssigneeOptions] = useState<AssignInfoType[]>([]);
  const [tags, setTags] = useState<TagResponseType[]>([]);
  const [tagOptions, setTagOptions] = useState<TagResponseType[]>([]);
  const [dueDate, setDueDate] = useState<Date>();
  const [images, setImages] = useState<File[] | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

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
    if (!projectId) {
      setProjectId(Number(projectIdLocal));
    }
  }, [projectId, projectIdLocal, setProjectId]);

  useEffect(() => {
    getUserInfosApi()
      .then((res) => {
        setAssigneeOptions(res.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (projectId) {
      getTagsByProjectApi(projectId)
        .then((res) => {
          setTagOptions(res.data);
        })
        .catch(() => {});
    }
  }, [projectId]);

  const handleSetAssignees = (emails: string[]) => {
    const newAssignees: AssigneeRequestType[] = emails.map((email, index) => ({
      assigneeId: index, // 실제로는 서버 id 또는 uuid로 대체
      email,
      dynamicAssign: false, // 기본값 (필요에 따라 true/false 조정)
      type: "USER", // 기본 type (필요시 변경)
    }));

    setAssignees(newAssignees);
  };

  const handleSetTags = (names: string[]) => {
    const newTagsOptions: TagResponseType[] = names.map((name, index) => ({
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
    if (isSubmitting) return;
    setIsSubmitting(true);

    const data: TaskRequestType = {
      projectId: Number(projectId),
      name,
      description,
      state,
      priority,
      type,
      storyPoints: Number(storyPoints),
      assignees,
      sprintId: null,
      milestoneId: null,
      tags: tagOptions
        .filter((option) => tags.some((tag) => tag.name === option.name))
        .map((tag) => tag.id),
      dependencyTaskIds: [],
      dueDate: dueDate,
    };

    const formDataToSend = new FormData();

    formDataToSend.append(
      "request",
      new Blob([JSON.stringify(data)], { type: "application/json" }),
    );

    (images ?? []).forEach((file) => {
      formDataToSend.append("files", file);
    });

    createTaskApi(formDataToSend)
      .then((res) => {
        toast.success("생성을 성공했습니다!");

        queryClient.invalidateQueries({
          queryKey: ["tasks", String(projectId)],
          refetchType: "active",
        });

        navigate(-1);
      })
      .catch(() => {})
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="container-fluid p-3 d-flex justify-content-center align-items-center">
      <div className="w-100 d-flex flex-column align-items-center">
        <div className="w-100 d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <span className="d-flex align-items-center">
              <MdAddTask />
            </span>
            <h3 className="mb-0 fw-semibold" style={{ fontSize: "1rem" }}>
              태스크 생성
            </h3>
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
        </TwoDiv>

        <SelectInput
          name="type"
          title="태스크 타입"
          value={type}
          setValue={setType}
          options={typeOptions}
        />

        <SelectArrayInput
          name="assignees"
          title="작업할당자"
          values={assignees.map((assignee) => assignee.email)}
          setValues={handleSetAssignees}
          options={assigneeOptions?.map((assignee: AssignInfoType) => ({
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
          values={tags.map((tag: TagResponseType) => String(tag.name))}
          setValues={handleSetTags}
          options={
            tagOptions.map((tag: TagResponseType) => ({
              label: tag.name,
              value: tag.name,
            })) ?? []
          }
        />

        <DateInput title="마감일" selected={dueDate} setSelected={setDueDate} />

        <ImageInput
          name="images"
          title="이미지들"
          data={images ?? []}
          setData={setImages}
          previewUrls={imageUrls}
          setPreviewUrls={setImageUrls}
        />

        <ConfirmButton
          title="생성"
          onClick={OnCreateSubmit}
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};

export default TaskCreatePage;
