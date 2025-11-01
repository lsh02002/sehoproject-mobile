import { useState } from "react";
import ConfirmButton from "../../components/form/ConfirmButton";
import { TwoDiv } from "../../components/form/TwoDiv";
import { FooterBar, Section, SectionHeader, SettingsContainer } from "./SettingsLayout";
import TextInput from "../../components/form/TextInput";

export function ProjectDefaultsSettingsPage() {
  const [defaultProjectKey, setDefaultProjectKey] = useState("PM");
  const [boardName, setBoardName] = useState("Default Board");
  const onSave = () => alert("프로젝트 기본값이 저장되었습니다.");

  return (
    <SettingsContainer>
    <Section>
      <SectionHeader>프로젝트 기본값</SectionHeader>
      <TwoDiv>
        <TextInput name="defaultProjectKey" title="기본 프로젝트 키" data={defaultProjectKey} setData={setDefaultProjectKey} />
        <TextInput name="boardName" title="보드 이름" data={boardName} setData={setBoardName} />
      </TwoDiv>
      <FooterBar>
        <ConfirmButton title="저장하기" onClick={onSave} />
      </FooterBar>
    </Section>
    </SettingsContainer>
  );
}