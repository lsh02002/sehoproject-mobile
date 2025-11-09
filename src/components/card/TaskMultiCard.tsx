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

const TaskMultiCard = ({ task }: { task: TaskResponseType }) => {
  const [assignees, setAssignees] = useState(task.assignees || []);
  const [assigneeOptions, setAssigneeOptions] = useState([]);
  const [priority, setPriority] = useState(task.priority || "Medium");
  const [state, setState] = useState(task.state || "TODO");
  const [dueDate, setDueDate] = useState(task.dueDate || "");

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
          marginTop: "5px",
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
          style={{            
            width: "auto", // ★ 콘텐츠 만큼만 차지
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px",
            boxSizing: "border-box",
          }}
        >
          <Label>🔥작업순위</Label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // ✅ 세로 중앙 정렬
              height: "80px",
            }}
          >
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{
                width: "100%",
                padding: "4px",
                borderRadius: "6px",
              }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px",
            boxSizing: "border-box",
          }}
        >
          <Label>📋 진행상태</Label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // ✅ 세로 중앙 정렬
              height: "80px",
            }}
          >
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              style={{ width: "100%", padding: "4px", borderRadius: "6px" }}
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px",
            boxSizing: "border-box",
          }}
        >
          <Label>⏰ 마감일</Label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // ✅ 세로 중앙 정렬
              height: "80px",
            }}
          >
            <input
              type="date"
              value={
                dueDate ? new Date(dueDate).toISOString().slice(0, 10) : ""
              }
              onChange={(e) => setDueDate(e.target.value)}
              style={{ width: "100%", padding: "4px", borderRadius: "6px" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px",
            boxSizing: "border-box",
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
