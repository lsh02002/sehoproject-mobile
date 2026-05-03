import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AssigneeRequestType,
  AssignInfoType,
  ImageResponseType,
  TagResponseType,
  TaskUpdateRequestType,
} from "../../types/type";
import {
  getOneTaskApi,
  getProjectMembersApi,
  getTagsByProjectApi,
  putOneTaskApi,
} from "../../api/sehomanagerapi";
import TextInput from "../../components/form/TextInput";
import SelectInput, { Option } from "../../components/form/SelectInput";
import SelectArrayInput from "../../components/form/SelectArrayInput";
import ConfirmButton from "../../components/form/ConfirmButton";
import { TwoDiv } from "../../components/form/TwoDiv";
import { toast } from "react-toastify";
import { MdAddTask } from "react-icons/md";
import QuillEditorInput from "../../components/form/QuillEditorInput";
import ImageInput from "../../components/form/ImageInput";
import { useQueryClient } from "@tanstack/react-query";

const TaskEditPage = ({ windowOpenTaskId }: { windowOpenTaskId?: number }) => {
  const { taskId } = useParams();
  const [id, setId] = useState("");
  const [projectKey, setProjectKey] = useState("");
  const [projectId, setProjectId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("");
  const [storyPoints, setStoryPoints] = useState();
  const [assignees, setAssignees] = useState<AssigneeRequestType[]>([]);
  const [assigneeOptions, setAssigneeOptions] = useState<AssignInfoType[]>([]);
  const [sprintId, setSprintId] = useState("");
  const [milestoneId, setMilestoneId] = useState("");
  const [tags, setTags] = useState<TagResponseType[]>([]);
  const [tagOptions, setTagOptions] = useState<TagResponseType[]>([]);
  const [dependencyIds, setDependencyIds] = useState<number[]>([]);
  const [dueDate, setDueDate] = useState<Date>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setImageResponses] = useState<ImageResponseType[]>([]);

  const queryClient = useQueryClient();

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
    if (projectId) {
      getProjectMembersApi(Number(projectId))
        .then((res) => {
          setAssigneeOptions(res.data);
        })
        .catch(() => {});
    }
  }, [projectId]);

  useEffect(() => {
    if (windowOpenTaskId || taskId) {
      getOneTaskApi(Number(windowOpenTaskId ?? taskId))
        .then((res) => {
          setId(res.data.id);
          setProjectKey(res.data.projectKey);
          setProjectId(res.data.projectId);
          setName(res.data.name);
          setDescription(res.data.description);
          setState(res.data.state);
          setPriority(res.data.priority);
          setType(res.data.type);
          setStoryPoints(res.data.storyPoints);
          setAssignees(res.data.assignees);
          setSprintId(res.data.sprintId);
          setMilestoneId(res.data.milestoneId);
          setTags(res.data.tags);
          setDependencyIds(res.data.dependencyIds);
          setDueDate(res.data.dueDate);
          setImageResponses(res.data.imageResponses);
          setImageUrls(
            res.data.imageResponses.map(
              (image: ImageResponseType) => image.fileUrl,
            ),
          );

          getTagsByProjectApi(Number(res.data.projectId))
            .then((res) => {
              setTagOptions(res.data);
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  }, [projectId, taskId, windowOpenTaskId]);

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

  const OnEditSubmit = () => {
    const data: TaskUpdateRequestType = {
      projectId: Number(projectId),
      name,
      description,
      state,
      priority,
      type,
      storyPoints: Number(storyPoints),
      assignees,
      sprintId: Number(sprintId),
      milestoneId: Number(milestoneId),
      tags: tagOptions
        .filter((option) => tags.some((tag) => tag.name === option.name))
        .map((tag) => tag.id),
      dependencyTaskIds: dependencyIds,
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

    putOneTaskApi(Number(windowOpenTaskId ?? taskId), formDataToSend)
      .then((res) => {
        toast.success("수정을 성공했습니다!");

        queryClient.invalidateQueries({
          predicate: (query) => {
            const key = query.queryKey;
            return (
              key[1] === Number(projectId) &&
              (key[0] === "tasks" || key[0] === "myTasks")
            );
          },
        });

        navigate(-1);
      })
      .catch(() => {});
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
              태스크 수정
            </h3>
          </div>
        </div>

        <TwoDiv>
          <TextInput
            name="id"
            title="태스크 아이디"
            disabled
            data={id ?? "null"}
            setData={setId}
          />
          <TextInput
            name="projectId"
            title="프로젝트 아이디"
            disabled
            data={projectId ?? "null"}
            setData={setProjectId}
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
            title="작업 우선순위"
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

        <TwoDiv>
          <TextInput
            name="sprintId"
            title="스프린트 아이디"
            disabled
            data={sprintId ?? "null"}
            setData={setSprintId}
          />
          <TextInput
            name="milestoneId"
            title="마일스톤 아이디"
            disabled
            data={milestoneId ?? "null"}
            setData={setMilestoneId}
          />
        </TwoDiv>

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

        <ImageInput
          name="images"
          title="이미지들"
          data={images ?? []}
          setData={setImages}
          previewUrls={imageUrls}
          setPreviewUrls={setImageUrls}
        />

        <ConfirmButton title="수정" onClick={OnEditSubmit} />
      </div>
    </div>
  );
};

export default TaskEditPage;
