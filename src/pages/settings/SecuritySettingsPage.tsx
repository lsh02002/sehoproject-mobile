import { useState } from "react";
import ConfirmButton from "../../components/form/ConfirmButton";
import PasswordInput from "../../components/form/PasswordInput";

export function SecuritySettingsPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onSave = () => alert("보안 설정이 저장되었습니다.");

  return (
    <div className="p-3">
      <section className="bg-white shadow-sm p-3 mb-3">
        <h4 className="fw-bold mb-3 text-dark">보안</h4>

        <div className="row g-3">
          <div className="col-12 col-md-6">
            <PasswordInput
              name="newPassword"
              title="새 비밀번호"
              data={newPassword}
              setData={setNewPassword}
            />
          </div>

          <div className="col-12 col-md-6">
            <PasswordInput
              name="confirmPassword"
              title="새 비밀번호 확인"
              data={confirmPassword}
              setData={setConfirmPassword}
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
