import { useState } from "react";
import ConfirmButton from "../../components/form/ConfirmButton";
import { TwoDiv } from "../../components/form/TwoDiv";
import { FooterBar, Section, SectionHeader } from "./SettingsLayout";
import PasswordInput from "../../components/form/PasswordInput";

export function SecuritySettingsPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onSave = () => alert("보안 설정이 저장되었습니다.");

  return (
    <Section>
      <SectionHeader>보안</SectionHeader>
      <TwoDiv>
        <PasswordInput name="newPassword" title="새 비밀번호" data={newPassword} setData={setNewPassword} />
        <PasswordInput name="confirmPassword" title="새 비밀번호 확인" data={confirmPassword} setData={setConfirmPassword} />
      </TwoDiv>
      <FooterBar>
        <ConfirmButton title="저장하기" onClick={onSave} />
      </FooterBar>
    </Section>
  );
}