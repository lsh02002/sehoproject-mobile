// src/pages/SprintPage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getSprintsByProjectApi } from "../../api/sehomanagerapi";
import { useParams } from "react-router-dom";
import { SprintType } from "../../types/type";
import { EventInput } from "@fullcalendar/core";
import koLocale from "@fullcalendar/core/locales/ko";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Mousewheel } from "swiper/modules";
import "swiper/css";

// ===== 유틸 =====
export const tupleToISO = (t: [number, number, number]) => {
  const [y, m, d] = t;
  const dt = new Date(y, m - 1, d);
  return dt.toISOString().slice(0, 10);
};

export const addDaysISO = (iso: string, days: number) => {
  const dt = new Date(iso);
  dt.setDate(dt.getDate() + days);
  return dt.toISOString().slice(0, 10);
};

const addMonthsClamped = (date: Date, months: number) => {
  const d = new Date(date);
  d.setDate(1); // 월 변경 시 1일로 고정
  d.setMonth(d.getMonth() + months);
  return d;
};

const formatYM = (date: Date) =>
  date.toLocaleDateString("ko-KR", { year: "numeric", month: "long" });

const ymKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}`;

// 🎨 색상 팔레트 + 해시
const PALETTE = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899",
  "#14b8a6", "#f97316", "#6366f1", "#22c55e", "#eab308", "#dc2626",
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
const SprintPage = () => {
  const { projectId } = useParams();
  const [sprints, setSprints] = useState<SprintType[]>([]);
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
        start: addDaysISO(tupleToISO(sprint.startDate), 1),
        end: addDaysISO(tupleToISO(sprint.endDate), 1),
        display: "block",
        color: getStableColor(sprint.id),
      })),
    [sprints]
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
    <div className="sprint-page">
      {/* 상단 커스텀 헤더 */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
        <h2 style={{ margin: 0 }}>{formatYM(currMonth)}</h2>
      </div>

      <div style={{ height: 720 }}>
        <Swiper
          modules={[A11y, Mousewheel]}
          initialSlide={1}                 // 0: 이전, 1: 현재, 2: 다음
          onSlideChange={handleSlideChange}
          onTransitionEnd={handleTransitionEnd}
          mousewheel={{ forceToAxis: true }}
          simulateTouch
          allowTouchMove
          grabCursor
          slidesPerView={1}
          spaceBetween={0}
          style={{ height: "100%" }}
        >
          {/* 이전 달 */}
          <SwiperSlide>
            <FullCalendar
              key={`prev-${ymKey(prevMonth)}`}   // 🔑 리마운트 트리거
              height={"700px"}
              initialView="dayGridMonth"
              initialDate={prevMonth}
              plugins={[dayGridPlugin, interactionPlugin]}
              locale={koLocale}
              headerToolbar={false}
              events={events}
            />
          </SwiperSlide>

          {/* 현재 달 */}
          <SwiperSlide>
            <FullCalendar
              key={`curr-${ymKey(currMonth)}`}   // 🔑 리마운트 트리거
              height={"700px"}
              initialView="dayGridMonth"
              initialDate={currMonth}
              plugins={[dayGridPlugin, interactionPlugin]}
              locale={koLocale}
              headerToolbar={false}
              events={events}
            />
          </SwiperSlide>

          {/* 다음 달 */}
          <SwiperSlide>
            <FullCalendar
              key={`next-${ymKey(nextMonth)}`}   // 🔑 리마운트 트리거
              height={"700px"}
              initialView="dayGridMonth"
              initialDate={nextMonth}
              plugins={[dayGridPlugin, interactionPlugin]}
              locale={koLocale}
              headerToolbar={false}
              events={events}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SprintPage;
