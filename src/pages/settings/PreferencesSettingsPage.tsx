import { useState } from "react";
import ConfirmButton from "../../components/form/ConfirmButton";
import { TwoDiv } from "../../components/form/TwoDiv";
import {
  FooterBar,
  Section,
  SectionHeader,
  SettingsContainer,
} from "./SettingsLayout";
import SelectInput, { Option } from "../../components/form/SelectInput";

export function PreferencesSettingsPage() {
  const [language, setLanguage] = useState("ko");
  const [timezone, setTimezone] = useState("Asia/Seoul");
  const [dateFormat, setDateFormat] = useState("yyyy-MM-dd");
  const [weekStart, setWeekStart] = useState("Mon");

  const languageOptions: Option[] = [
    { label: "한국어", value: "ko" },
    { label: "English", value: "en" },
    { label: "日本語", value: "ja" },
  ];
  const timezoneOptions: Option[] = [
    { label: "(GMT+9) Asia/Seoul", value: "Asia/Seoul" },
    { label: "(GMT+0) UTC", value: "UTC" },
    { label: "(GMT-8) America/Los_Angeles", value: "America/Los_Angeles" },
  ];
  const dateFormatOptions: Option[] = [
    { label: "yyyy-MM-dd", value: "yyyy-MM-dd" },
    { label: "dd/MM/yyyy", value: "dd/MM/yyyy" },
    { label: "MM-dd-yyyy", value: "MM-dd-yyyy" },
  ];
  const weekStartOptions: Option[] = [
    { label: "월요일", value: "Mon" },
    { label: "일요일", value: "Sun" },
  ];

  const onSave = () => alert("환경 설정이 저장되었습니다.");

  return (
    <SettingsContainer>
      <Section>
        <SectionHeader>환경 설정</SectionHeader>
        <TwoDiv>
          <SelectInput
            name="language"
            title="언어"
            value={language}
            setValue={setLanguage}
            options={languageOptions}
          />
          <SelectInput
            name="timezone"
            title="시간대"
            value={timezone}
            setValue={setTimezone}
            options={timezoneOptions}
          />
        </TwoDiv>
        <TwoDiv>
          <SelectInput
            name="dateFormat"
            title="날짜 형식"
            value={dateFormat}
            setValue={setDateFormat}
            options={dateFormatOptions}
          />
          <SelectInput
            name="weekStart"
            title="주 시작 요일"
            value={weekStart}
            setValue={setWeekStart}
            options={weekStartOptions}
          />
        </TwoDiv>
        <FooterBar>
          <ConfirmButton title="저장하기" onClick={onSave} />
        </FooterBar>
      </Section>
    </SettingsContainer>
  );
}
