// src/pages/SprintPage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getSprintsByProjectApi } from "../../api/sehomanagerapi";
import { useParams } from "react-router-dom";
import { SprintCalendarType } from "../../types/type";
import { EventInput } from "@fullcalendar/core";
import koLocale from "@fullcalendar/core/locales/ko";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Mousewheel } from "swiper/modules";
import "swiper/css";
import { GiSprint } from "react-icons/gi";

const addDaysISO = (iso: string, days: number) => {
  const dt = new Date(iso);
  dt.setDate(dt.getDate() + days);
  return dt.toISOString();
};

const addMonthsClamped = (date: Date, months: number) => {
  const d = new Date(date);
  d.setDate(1); // 월 변경 시 1일로 고정
  d.setMonth(d.getMonth() + months);
  return d;
};

const formatYM = (date: Date) =>
  date?.toLocaleDateString("ko-KR", { year: "numeric", month: "long" });

const ymKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}`;

// 🎨 색상 팔레트 + 해시
const PALETTE = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#6366f1",
  "#22c55e",
  "#eab308",
  "#dc2626",
];

const hashString = (s: string | number) => {
  const str = String(s);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 1000000007;
  }
  return hash;
};

const getStableColor = (seed: string | number) => {
  const h = hashString(seed);
  return PALETTE[h % PALETTE.length];
};

// ===== 메인 컴포넌트 =====
const SprintCalendarPage = () => {
  const { projectId } = useParams();
  const [sprints, setSprints] = useState<SprintCalendarType[]>([]);
  const [baseDate, setBaseDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(0);
    return d; // 현재 달의 1일
  });

  // ➕ 되감기(프로그램적 slide) 무시용 가드
  const snappingRef = useRef(false);

  useEffect(() => {
    getSprintsByProjectApi(parseInt(projectId ?? "0", 10))
      .then((res) => setSprints(res.data))
      .catch((err) => console.error(err));
  }, [projectId]);

  // 이벤트 변환
  const events: EventInput[] = useMemo(
    () =>
      (sprints ?? []).map((sprint) => ({
        id: String(sprint.id),
        title: sprint.name,
        // FullCalendar의 end는 exclusive → +1일 보정
        start: addDaysISO(sprint.startDate?.toString(), 1),
        end: addDaysISO(sprint.endDate?.toString(), 1),
        display: "block",
        color: getStableColor(sprint.id),
      })),
    [sprints],
  );

  // 이전/현재/다음 달 계산
  const prevMonth = useMemo(() => addMonthsClamped(baseDate, -1), [baseDate]);
  const currMonth = baseDate;
  const nextMonth = useMemo(() => addMonthsClamped(baseDate, 1), [baseDate]);

  // 슬라이드 변경 시: 방향에 따라 ±1개월, 이후 되감기는 무시
  const handleSlideChange = (swiper: any) => {
    if (snappingRef.current) return; // 되감기 중이면 무시

    const { activeIndex, previousIndex } = swiper;
    if (previousIndex == null || activeIndex == null) return;

    const dir = Math.sign(activeIndex - previousIndex); // -1(왼쪽), +1(오른쪽), 0(변화없음)
    if (dir === 0) return;

    setBaseDate((d) => addMonthsClamped(d, dir));

    // 가운데(1)로 즉시 스냅하되, 그 전환은 무시
    snappingRef.current = true;
    swiper.slideTo(1, 0);
  };

  // 스냅 종료 후 가드 해제 (transitionEnd 타이밍)
  const handleTransitionEnd = () => {
    if (snappingRef.current) {
      // 스냅이 끝났으므로 다음부터 사용자 슬라이드만 처리
      snappingRef.current = false;
    }
  };

  return (
    <>
      <style>{`
  .bootstrap-calendar .fc {
    font-family: inherit;
  }

  .bootstrap-calendar .fc-theme-standard td,
  .bootstrap-calendar .fc-theme-standard th {
    border-color: var(--bs-border-color);
  }

  .bootstrap-calendar .fc-col-header-cell {
    background-color: var(--bs-light);
    padding: 0.75rem 0;
    font-weight: 600;
  }

  .bootstrap-calendar .fc-daygrid-day {
    transition: background-color 0.15s ease;
  }

  .bootstrap-calendar .fc-daygrid-day:hover {
    background-color: var(--bs-light);
  }

  .bootstrap-calendar .fc-day-today {
    background-color: rgba(var(--bs-primary-rgb), 0.08) !important;
  }

  .bootstrap-calendar .fc-daygrid-day-number {
    color: var(--bs-body-color);
    text-decoration: none;
    padding: 0.5rem;
    font-weight: 500;
  }

  .bootstrap-calendar .fc-event {
    // border-radius: 999px !important;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.2rem 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  }

  .bootstrap-calendar .fc-event-title {
    color: #fff;
  }
`}</style>
      <div
        className="sprint-page bootstrap-calendar"
        style={{ padding: "20px", boxSizing: "border-box" }}
      >
        <div className="container-fluid p-3 sprint-page">
          {/* 헤더 */}
          <div className="d-flex align-items-center gap-2 mb-2">
            <GiSprint />
            <h3 className="mb-0">스프린트 달력</h3>
          </div>

          {/* 월 표시 */}
          <div className="d-flex justify-content-center mb-2">
            <h2 className="mb-0">{formatYM(currMonth)}</h2>
          </div>

          {/* 캘린더 영역 */}
          <div style={{ height: 720 }}>
            <Swiper
              modules={[A11y, Mousewheel]}
              initialSlide={1}
              onSlideChange={handleSlideChange}
              onTransitionEnd={handleTransitionEnd}
              mousewheel={{ forceToAxis: true }}
              simulateTouch
              allowTouchMove
              grabCursor
              slidesPerView={1}
              className="h-100"
            >
              {/* 이전 달 */}
              <SwiperSlide>
                <FullCalendar
                  key={`prev-${ymKey(prevMonth)}`}
                  height={"700px"}
                  initialView="dayGridMonth"
                  initialDate={prevMonth}
                  plugins={[dayGridPlugin, interactionPlugin]}
                  locale={koLocale}
                  headerToolbar={false}
                  events={events}
                  viewClassNames="bootstrap-calendar"
                  dayCellClassNames="border bg-white"
                />
              </SwiperSlide>

              {/* 현재 달 */}
              <SwiperSlide>
                <FullCalendar
                  key={`curr-${ymKey(currMonth)}`}
                  height={"700px"}
                  initialView="dayGridMonth"
                  initialDate={currMonth}
                  plugins={[dayGridPlugin, interactionPlugin]}
                  locale={koLocale}
                  headerToolbar={false}
                  events={events}
                  viewClassNames="bootstrap-calendar"
                  dayCellClassNames="border bg-white"
                />
              </SwiperSlide>

              {/* 다음 달 */}
              <SwiperSlide>
                <FullCalendar
                  key={`next-${ymKey(nextMonth)}`}
                  height={"700px"}
                  initialView="dayGridMonth"
                  initialDate={nextMonth}
                  plugins={[dayGridPlugin, interactionPlugin]}
                  locale={koLocale}
                  headerToolbar={false}
                  events={events}
                  viewClassNames="bootstrap-calendar"
                  dayCellClassNames="border bg-white"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default SprintCalendarPage;
