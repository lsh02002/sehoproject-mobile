import { useState } from "react";
import ConfirmButton from "../../components/form/ConfirmButton";
import TextInput from "../../components/form/TextInput";

export function ProjectDefaultsSettingsPage() {
  const [defaultProjectKey, setDefaultProjectKey] = useState("PM");
  const [boardName, setBoardName] = useState("Default Board");
  const onSave = () => alert("프로젝트 기본값이 저장되었습니다.");

  return (
    <div className="p-3">
      <section className="bg-white shadow-sm p-3 mb-3">
        <h4 className="fw-bold mb-3 text-dark">프로젝트 기본값</h4>

        <div className="row g-3">
          <div className="col-12 col-md-6">
            <TextInput
              name="defaultProjectKey"
              title="기본 프로젝트 키"
              data={defaultProjectKey}
              setData={setDefaultProjectKey}
            />
          </div>

          <div className="col-12 col-md-6">
            <TextInput
              name="boardName"
              title="보드 이름"
              data={boardName}
              setData={setBoardName}
            />
          </div>
        </div>

        <div className="position-sticky bottom-0 bg-white pt-3 mt-3 border-top">
          <ConfirmButton title="저장하기" onClick={onSave} />
        </div>
      </section>
    </div>
  );
}
