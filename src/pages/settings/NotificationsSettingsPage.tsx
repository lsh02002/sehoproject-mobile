import { useState } from "react";
import ConfirmButton from "../../components/form/ConfirmButton";
import SelectArrayInput from "../../components/form/SelectArrayInput";
import { TwoDiv } from "../../components/form/TwoDiv";
import { FooterBar, Section, SectionHeader } from "./SettingsLayout";

export function NotificationsSettingsPage() {
  const [notificationChannels, setNotificationChannels] = useState<string[]>(["EMAIL"]);
  const [defaultLabels, setDefaultLabels] = useState<string[]>([]);

  const notificationOptions = [
    { label: "이메일", value: "EMAIL" },
    { label: "브라우저 푸시", value: "WEB_PUSH" },
    { label: "모바일 푸시", value: "MOBILE_PUSH" },
    { label: "슬랙", value: "SLACK" },
  ];
  const defaultLabelOptions = [
    { label: "bug", value: "bug" },
    { label: "feature", value: "feature" },
    { label: "documentation", value: "documentation" },
    { label: "urgent", value: "urgent" },
  ];

  const onSave = () => alert("알림 설정이 저장되었습니다.");

  return (
    <Section>
      <SectionHeader>알림</SectionHeader>
      <TwoDiv>
        <SelectArrayInput name="notifications" title="알림 채널" values={notificationChannels} setValues={setNotificationChannels} options={notificationOptions} />
        <SelectArrayInput name="defaultLabels" title="기본 라벨" values={defaultLabels} setValues={setDefaultLabels} options={defaultLabelOptions} />
      </TwoDiv>
      <FooterBar>
        <ConfirmButton title="저장하기" onClick={onSave} />
      </FooterBar>
    </Section>
  );
}