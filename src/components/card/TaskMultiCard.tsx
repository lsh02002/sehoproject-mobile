import React, { useEffect, useState } from "react";
import {
  AssigneeRequestType,
  AssignInfoType,
  TaskResponseType,
} from "../../types/type";
import { SiGoogletasks } from "react-icons/si";
import { GrInProgress } from "react-icons/gr";
import { getProjectMembersApi } from "../../api/sehomanagerapi";
import SelectArrayInput from "../form/SelectArrayInput";
import styled from "styled-components";
import SelectInput, { Option } from "../form/SelectInput";
import DateInput from "../form/DateInput";

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

const TaskMultiCard = ({ task }: { task: TaskResponseType }) => {
  const [assignees, setAssignees] = useState(task.assignees || []);
  const [assigneeOptions, setAssigneeOptions] = useState([]);
  const [priority, setPriority] = useState(task.priority || "Medium");
  const [state, setState] = useState(task.state || "TODO");
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task.dueDate ? new Date(task.dueDate) : undefined
  );

  useEffect(() => {
    getProjectMembersApi(task.projectId)
      .then((res) => {
        console.log(res.data);
        setAssigneeOptions(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [task.projectId]);

  const handleSetAssignees = (emails: string[]) => {
    const newAssignees: AssigneeRequestType[] = emails.map((email, index) => ({
      assigneeId: index, // 실제로는 서버 id 또는 uuid로 대체
      email,
      dynamicAssign: false, // 기본값 (필요에 따라 true/false 조정)
      type: "USER", // 기본 type (필요시 변경)
    }));

    setAssignees(newAssignees);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        background: "white",
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        transition: "transform 0.1s ease",
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {state === "TODO" ? (
          <SiGoogletasks color="#666" />
        ) : (
          <GrInProgress color="#666" />
        )}
        <h3 style={{ fontSize: "1rem", margin: 0 }}>{task.name}</h3>
        <p style={{ color: "#888", fontSize: "1rem" }}>#{task.id}</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: "8px",
          overflowX: "scroll",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          justifyContent: "space-between",          
        }}
      >
        <SelectArrayInput
          name="assignees"
          title="👤 작업할당자"
          values={assignees?.map((assignee) => assignee.email)}
          setValues={handleSetAssignees}
          options={assigneeOptions?.map((assignee: AssignInfoType) => ({
            label: assignee.email,
            value: assignee.email,
          }))}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px",
            boxSizing: "border-box",            
            flex: "0 0 120px",
            backgroundColor: "white",
          }}
        >
          <SelectInput
            name="priority"
            title="🔥작업순위"
            value={priority}
            setValue={setPriority}
            options={priorityOptions}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px",
            boxSizing: "border-box",
            flex: "0 0 120px",
            backgroundColor: "white",
          }}
        >
          <SelectInput
            name="state"
            title="📋 진행상태"
            value={state}
            setValue={setState}
            options={stateOptions}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",            
            boxSizing: "border-box",
            flex: "0 0 120px",
            backgroundColor: "white",
          }}
        >
          <DateInput
            title="⏰ 마감일"
            selected={dueDate}
            setSelected={setDueDate}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px",
            boxSizing: "border-box",
            width: "100%",            
          }}
        >
          <Label>수정하기</Label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // ✅ 세로 중앙 정렬
              height: "80px",
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                // navigate(`/tasks/${task.id}/edit`);
              }}
              style={{
                width: "100%",
                background: "#4a90e2",
                color: "white",
                border: "none",
                padding: "6px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskMultiCard;

const Label = styled.label`
  width: 100%;
  display: block;
  margin-bottom: 8px;
  color: #111827;
  font-weight: 600;
  font-size: 0.9rem;
`;
