import { useContext, useRef, useMemo } from "react";
import { CalendarContext } from "../contexts/Calendarcontext";
import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Calendar.css";

export default function RentalCalendar() {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    timeInfoArrHandler,
    setApply,
    HandleDateFilter,
  } = useContext(CalendarContext);

  const calendarRef = useRef(null);

  const handlePrev = () => {
    const api = calendarRef.current?.getApi();
    if (!api) return;

    const current = api.getDate();
    const prevMonth = new Date(
      current.getFullYear(),
      current.getMonth() - 1,
      1
    );

    const today = new Date();
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    if (prevMonth < thisMonthStart) {
      alert("이전달은 조회할 수 없습니다.");
      return;
    }

    api.gotoDate(prevMonth);
  };

  const handleNext = () => {
    const api = calendarRef.current?.getApi();
    if (!api) return;

    const current = api.getDate();
    api.gotoDate(
      new Date(current.getFullYear(), current.getMonth() + 1, 1)
    );
  };

  const handleDateClick = ({ dateStr }) => {
    // 시작일이 없으면 시작
    if (!startDate) {
      setStartDate(dateStr);
      setEndDate(null);
      return;
    }

    // 종료일 설정
    if (!endDate) {
      if (dateStr < startDate) {
        setEndDate(startDate);
        setStartDate(dateStr);
      } else {
        setEndDate(dateStr);
      }
      return;
    }

    // 다시 선택 시 초기화
    setStartDate(dateStr);
    setEndDate(null);
  };

  const handleApply = () => {
    if (!startDate || !endDate) {
      alert("날짜를 선택해주세요.");
      return;
    }

    HandleDateFilter({
      startDate,
      endDate,
      startTime,
      endTime,
    });
  };

  const renderDay = (arg) =>
    arg.dayNumberText.replace("일", "");

  const timeOptions = useMemo(() => {
    const times = [];
    for (let h = 0; h < 24; h++) {
      times.push(`${String(h).padStart(2, "0")}:00`);
      times.push(`${String(h).padStart(2, "0")}:30`);
    }
    return times;
  }, []);

  const backgroundEvents = useMemo(() => {
    if (!startDate || !endDate) return [];

    const events = [];
    let current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
      events.push({
        start: current.toISOString().split("T")[0],
        display: "background",
        className: "selected-range-bg",
      });
      current.setDate(current.getDate() + 1);
    }

    return events;
  }, [startDate, endDate]);

  return (
    <div className="calendarWrap">
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

      {startDate && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>{startDate}</strong>
            {endDate && (
              <>
                {" "}~ <strong>{endDate}</strong>
              </>
            )}
          </p>

          {endDate && (
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
