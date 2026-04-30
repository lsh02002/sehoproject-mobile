import { useState } from "react";
import ConfirmButton from "../../components/form/ConfirmButton";
import SelectArrayInput from "../../components/form/SelectArrayInput";

export function NotificationsSettingsPage() {
  const [notificationChannels, setNotificationChannels] = useState<string[]>([
    "EMAIL",
  ]);
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
  <div className="p-3">
    <section className="bg-white shadow-sm p-3 mb-3">
      <h4 className="fw-bold mb-3 text-dark">알림</h4>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <SelectArrayInput
            name="notifications"
            title="알림 채널"
            values={notificationChannels}
            setValues={setNotificationChannels}
            options={notificationOptions}
          />
        </div>

        <div className="col-12 col-md-6">
          <SelectArrayInput
            name="defaultLabels"
            title="기본 라벨"
            values={defaultLabels}
            setValues={setDefaultLabels}
            options={defaultLabelOptions}
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
