import { useState } from "react";
import ConfirmButton from "../../components/form/ConfirmButton";
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
    <div className="p-3">
      <section className="bg-white shadow-sm p-3 mb-3">
        <h4 className="fw-bold mb-3 text-dark">환경 설정</h4>

        {/* 첫 줄 */}
        <div className="row g-3 mb-2">
          <div className="col-12 col-md-6">
            <SelectInput
              name="language"
              title="언어"
              value={language}
              setValue={setLanguage}
              options={languageOptions}
            />
          </div>

          <div className="col-12 col-md-6">
            <SelectInput
              name="timezone"
              title="시간대"
              value={timezone}
              setValue={setTimezone}
              options={timezoneOptions}
            />
          </div>
        </div>

        {/* 두 번째 줄 */}
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <SelectInput
              name="dateFormat"
              title="날짜 형식"
              value={dateFormat}
              setValue={setDateFormat}
              options={dateFormatOptions}
            />
          </div>

          <div className="col-12 col-md-6">
            <SelectInput
              name="weekStart"
              title="주 시작 요일"
              value={weekStart}
              setValue={setWeekStart}
              options={weekStartOptions}
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
