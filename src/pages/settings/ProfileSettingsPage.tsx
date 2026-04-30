import { useState } from "react";
import ConfirmButton from "../../components/form/ConfirmButton";
import TextInput from "../../components/form/TextInput";
import PasswordInput from "../../components/form/PasswordInput";
import DateInput from "../../components/form/DateInput";

/*********************************
 * 2) 각 단일 페이지 컴포넌트
 *********************************/
export function ProfileSettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState<Date | undefined>(undefined);

  const onSave = () => alert("프로필이 저장되었습니다.");

  return (
    <div className="p-3">
      <section className="bg-white shadow-sm p-3 mb-3">
        <h4 className="fw-bold mb-3 text-dark">프로필</h4>

        {/* 첫 줄 */}
        <div className="row g-3 mb-2">
          <div className="col-12 col-md-6">
            <TextInput name="name" title="이름" data={name} setData={setName} />
          </div>

          <div className="col-12 col-md-6">
            <TextInput
              name="email"
              title="이메일"
              data={email}
              setData={setEmail}
            />
          </div>
        </div>

        {/* 두 번째 줄 */}
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <PasswordInput
              name="password"
              title="비밀번호"
              data={password}
              setData={setPassword}
            />
          </div>

          <div className="col-12 col-md-6">
            <DateInput
              title="생년월일"
              selected={birthday}
              setSelected={setBirthday}
            />
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="position-sticky bottom-0 bg-white pt-3 mt-3 border-top">
          <ConfirmButton title="저장하기" onClick={onSave} />
        </div>
      </section>
    </div>
  );
}
