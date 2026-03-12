// DateInput.tsx
import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import styled, { createGlobalStyle } from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

import { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";
registerLocale("ko", ko);

interface DateInputProps {
  disabled?: boolean;
  title: string;
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date | undefined>>;
}

const DateInput = ({ disabled, title, selected, setSelected }: DateInputProps) => {
  return (
    <Container>
      <DatepickerGlobalFix />

      <label>{title}</label>
      <DatePicker
        disabled={disabled}
        className="datePicker"
        dateFormat="yyyy-MM-dd"
        selected={selected ?? null}
        onChange={(date: Date | null) => setSelected(date ?? undefined)}
        placeholderText="날짜를 선택하세요"
        locale="ko"
        fixedHeight
        shouldCloseOnSelect
        withPortal
        portalId="app-datepicker-portal"
        popperProps={{
          placement: "bottom-start",
          strategy: "fixed",
        }}
      />
    </Container>
  );
};

export default DateInput;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 12px 0;
  height: 100%;

  label {
    width: 100%;
    display: block;
    margin-bottom: 8px;
    color: #0f172a;
    font-weight: 600;
    font-size: 0.92rem;
  }

  .datePicker {
    width: 100%;
    min-height: 46px;
    padding: 11px 14px;
    box-sizing: border-box;
    border: 1px solid #dbe2ea;
    border-radius: 14px;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #0f172a;
    background: #ffffff;
    transition: border-color 0.2s ease, box-shadow 0.2s ease,
      background-color 0.2s ease;

    &:hover {
      border-color: #94a3b8;
      background: #fcfdff;
    }

    &:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
    }

    &::placeholder {
      color: #94a3b8;
    }

    &:disabled {
      background: #f8fafc;
      color: #94a3b8;
      cursor: not-allowed;
    }
  }
`;

const DatepickerGlobalFix = createGlobalStyle`
  .react-datepicker-popper { z-index: 9999; }

  .react-datepicker {
    font-size: 14px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(15, 23, 42, 0.06);
    border-radius: 16px;
    background: #fff;
    overflow: hidden;
  }

  .react-datepicker__header {
    background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
    border-bottom: 1px solid #edf2f7;
    padding-top: 12px;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    color: #0f172a;
    font-weight: 700;
  }

  .react-datepicker__day-name {
    color: #64748b;
    font-weight: 600;
  }

  .react-datepicker__day,
  .react-datepicker__time-name {
    border-radius: 10px;
    color: #1e293b;
  }

  .react-datepicker__day:hover,
  .react-datepicker__month-text:hover,
  .react-datepicker__quarter-text:hover,
  .react-datepicker__year-text:hover {
    background: #eef2ff;
  }

  .react-datepicker__day--today {
    font-weight: 700;
    color: #4338ca;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background: #4f46e5;
    color: #fff;
  }

  .react-datepicker__navigation-icon::before {
    border-color: #64748b;
  }
`;
