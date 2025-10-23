// DateInput.tsx
import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import styled, { createGlobalStyle } from "styled-components";

// ✅ 달력 기본 스타일 임포트 (가장 중요)
import "react-datepicker/dist/react-datepicker.css";

// (선택) 한국어 로케일
import { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";
registerLocale("ko", ko);

interface DateInputProps {
  title: string;
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date | undefined>>;
}

const DateInput = ({ title, selected, setSelected }: DateInputProps) => {
  return (
    <Container>
      {/* 팝업 z-index, 기본 폰트 크기 등 글로벌 보정 */}
      <DatepickerGlobalFix />

      <label>{title}</label>
      <DatePicker
        className="datePicker"
        dateFormat="yyyy-MM-dd"
        selected={selected ?? null}
        onChange={(date: Date | null) => setSelected(date ?? undefined)}
        placeholderText="날짜를 선택하세요"
        // ✅ 보통 달력 느낌 옵션들
        locale="ko"
        fixedHeight
        showPopperArrow
        shouldCloseOnSelect
        popperPlacement="bottom-start"
        // (선택) 모바일에서 키보드 대신 달력만
        // onFocus={(e) => e.target.blur()}
      />
    </Container>
  );
};

export default DateInput;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 6px 0;

  label {
    color: black;
    font-weight: 400;
    font-size: 0.8rem;
  }

  .datePicker {
    width: 100%;
    padding: 0.7rem;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1px solid lightgray;
    margin-top: 4px;
    font-size: 0.85rem;
    outline: none;
    transition: border 0.2s ease-in-out;

    &:hover,
    &:focus {
      border: 1px solid #4680ff;
    }

    &::placeholder {
      color: gray;
      font-style: italic;
    }
  }
`;

// ✅ 달력 팝업이 모달/헤더 등에 가려지는 문제 해결 + 기본 look 정돈
const DatepickerGlobalFix = createGlobalStyle`
  /* 팝업이 다른 요소에 가려질 때 */
  .react-datepicker-popper {
    z-index: 9999;
  }

  /* 기본 달력 폰트/여백 살짝 정돈 (보통 모양) */
  .react-datepicker {
    font-size: 14px;
    border: 1px solid #e6e6e6;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    border-radius: 8px;
  }
  .react-datepicker__header {
    background: #fff;
    border-bottom: 1px solid #eee;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background: #4680ff;
    color: #fff;
  }
  .react-datepicker__day:hover {
    background: #eef4ff;
  }
`;
