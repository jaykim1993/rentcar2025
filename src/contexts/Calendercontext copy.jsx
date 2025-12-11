// MultiMonthRentalCalendar.jsx

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import 'bootstrap/dist/css/bootstrap.min.css';
import koLocale from '@fullcalendar/core/locales/ko';

import './Calender.css';
// sp!
export default function MultiMonthRentalCalendar() {
  const [selectedDate, setSelectedDate] = useState("12.31(수)");
  const [startTime, setStartTime] = useState("11:00");
  const [endTime, setEndTime] = useState("15:00");

  const generateTimes = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      times.push(`${String(hour).padStart(2, "0")}:00`);
      times.push(`${String(hour).padStart(2, "0")}:30`);
    }
    return times;
  };
  const timeOptions = generateTimes();

  const handleDateClick = (info) => {
    const clicked = info.dateStr;
    if (!selectedDate) {
      setSelectedDate({ start: clicked, end: null });
      return;
    }
    if (selectedDate && !selectedDate.end) {
      let start = selectedDate.start;
      let end = clicked;
      if (end < start) [start, end] = [end, start];
      setSelectedDate({ start, end });
      return;
    }
    setSelectedDate({ start: clicked, end: null });
  };

  const handelDay = (arg) => {
    return arg.dayNumberText.replace("일", "");
  };

  return (
    <div style={{ width: "700px", margin: "0 auto" }}>
      <h3>언제 필요하신가요?</h3>

      <FullCalendar
        plugins={[multiMonthPlugin, interactionPlugin]}
        initialView="twoMonth"        // multi-month 뷰 설정
        locale={koLocale}
        dateClick={handleDateClick}
        dayCellContent={handelDay}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next'
        }}
        // height, width 등 스타일은 CSS로 관리
        views={{
          twoMonth: {
            type: 'multiMonth',
            duration: { months: 2 }
          }
        }}
        height="auto"
        contentHeight="auto"
        expandRows={false}
        handleWindowResize={false}
      />

      {selectedDate && (
        <div style={{ marginTop: "20px" }}>
          <p>
            선택한 날짜: <br />
            <strong>{selectedDate.start}</strong>
            {selectedDate.end && (
              <>
                &nbsp;부터 <strong>{selectedDate.end}</strong> 까지
              </>
            )}
          </p>

          {selectedDate.end && (
            <div style={{ display: "flex", gap: "20px" }}>
              <div>
                <label>대여 시간</label>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                >
                  {timeOptions.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>반납 시간</label>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  {timeOptions.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {selectedDate.end && (
            <button style={{ marginTop: "20px" }}>
              적용하기
            </button>
          )}
        </div>
      )}
    </div>
  );
}
