import { useState } from "react";
import ConfirmButton from "../../components/form/ConfirmButton";
import { TwoDiv } from "../../components/form/TwoDiv";
import { SettingsContainer, FooterBar, Section, SectionHeader } from "./SettingsLayout";
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
    <SettingsContainer>
      <Section>
        <SectionHeader>프로필</SectionHeader>
        <TwoDiv>
          <TextInput name="name" title="이름" data={name} setData={setName} />
          <TextInput
            name="email"
            title="이메일"
            data={email}
            setData={setEmail}
          />
        </TwoDiv>
        <TwoDiv>
          <PasswordInput
            name="password"
            title="비밀번호"
            data={password}
            setData={setPassword}
          />
          <DateInput
            title="생년월일"
            selected={birthday}
            setSelected={setBirthday}
          />
        </TwoDiv>
        <FooterBar>
          <ConfirmButton title="저장하기" onClick={onSave} />
        </FooterBar>
      </Section>
    </SettingsContainer>
  );
}
