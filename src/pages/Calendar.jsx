import { useContext, useRef, useMemo } from "react";
import { CalendarContext } from "../contexts/CalendarContext";
import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Calendar.css";

export default function RentalCalendar() {
  /* =====================
     Context
  ====================== */
  const {
    selectedDate,
    setSelectedDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    timeInfoArrHandler,
    setApply
  } = useContext(CalendarContext);

  const calendarRef = useRef(null);

  /* =====================
     Handlers
  ====================== */
  // 이전달 이동
    const handlePrev = () => {
      const api = calendarRef.current?.getApi();
      if (!api) return;

      const current = api.getDate();
      const prevMonth = new Date(current.getFullYear(), current.getMonth() - 1, 1);

      const today = new Date();
      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      if (prevMonth < thisMonthStart) return alert("이전달은 조회할 수 없습니다.") ;

      api.gotoDate(prevMonth);
    };
  // 다음달 이동
  const handleNext = () => {
    const api = calendarRef.current?.getApi();
    if (!api) return;

    const current = api.getDate();
    api.gotoDate(
      new Date(current.getFullYear(), current.getMonth() + 1, 1)
    );
  };

  // 날짜 클릭 (범위 선택)
  const handleDateClick = ({ dateStr }) => {
    if (!selectedDate) {
      setSelectedDate({ start: dateStr, end: null });
      return;
    }

    if (!selectedDate.end) {
      let start = selectedDate.start;
      let end = dateStr;
      if (end < start) [start, end] = [end, start];
      setSelectedDate({ start, end });
      return;
    }

    setSelectedDate({ start: dateStr, end: null });
  };

  

  // 적용 버튼
  const handleApply = () => {
    timeInfoArrHandler({
      startDate: selectedDate.start,
      endDate: selectedDate.end,
      startTime,
      endTime,
    });
    setApply(true);
  };
  console.log()

  /* =====================
     Utils
  ====================== */

  // 날짜 숫자만 표시
  const renderDay = (arg) => arg.dayNumberText.replace("일", "");

  // 30분 단위 시간 목록
  const timeOptions = useMemo(() => {
    const times = [];
    for (let h = 0; h < 24; h++) {
      times.push(`${String(h).padStart(2, "0")}:00`);
      times.push(`${String(h).padStart(2, "0")}:30`);
    }
    return times;
  }, []);

  // 선택 날짜 → background event
  const backgroundEvents = useMemo(() => {
    if (!selectedDate?.start || !selectedDate?.end) return [];

    const events = [];
    let current = new Date(selectedDate.start);
    const end = new Date(selectedDate.end);

    while (current <= end) {
      const dateStr = current.toISOString().split("T")[0];

      events.push({
        start: dateStr,
        display: "background",
        className: "selected-range-bg",
      });

      current.setDate(current.getDate() + 1);
    }

    return events;
  }, [selectedDate]);

  /* =====================
     Render
  ====================== */

  return (
    <div style={{ width: "700px", margin: "0 auto" }}>
      <FullCalendar
        ref={calendarRef}
        plugins={[multiMonthPlugin, interactionPlugin]}
        initialView="twoMonth"
        locale={koLocale}
        dateClick={handleDateClick}
        dayCellContent={renderDay}
        events={backgroundEvents}
        headerToolbar={{
          left: "myPrev",
          center: "title",
          right: "myNext",
        }}
        customButtons={{
          myPrev: { text: "이전", click: handlePrev },
          myNext: { text: "다음", click: handleNext },
        }}
        views={{
          twoMonth: {
            type: "multiMonth",
            duration: { months: 2 },
          },
        }}
        height="auto"
        expandRows={false}
      />


      {selectedDate?.start && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>{selectedDate.start}</strong>
            {selectedDate.end && (
              <>
                &nbsp;~ <strong>{selectedDate.end}</strong>
              </>
            )}
          </p>

          {selectedDate.end && (
            <>
              <div style={{ display: "flex", gap: "20px" }}>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                >
                  {timeOptions.map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </select>

                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  {timeOptions.map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
              </div>

              <button style={{ marginTop: "20px" }} onClick={handleApply}>
                적용하기
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
