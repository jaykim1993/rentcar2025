import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fullcalendar/bootstrap5/index.css';
import koLocale from '@fullcalendar/core/locales/ko';

import './Calender.css';

export default function RentalCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  const [startTime, setStartTime] = useState("11:00");
  const [endTime, setEndTime] = useState("15:00");

  // 30분 단위 시간 리스트 생성
  const generateTimes = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      times.push(`${String(hour).padStart(2, "0")}:00`);
      times.push(`${String(hour).padStart(2, "0")}:30`);
    }
    return times;
  };

  const timeOptions = generateTimes();

  // 날짜 클릭해서 시작일/종료일 선택
  const handleDateClick = (info) => {
    const clicked = info.dateStr;

    // 1) 아직 아무 날짜도 선택 안 했을 때 → 시작일 선택
    if (!selectedDate) {
      setSelectedDate({ start: clicked, end: null });
      return;
    }

    // 2) 시작일만 있고 종료일이 없는 경우 → 종료일 선택
    if (selectedDate && !selectedDate.end) {
      let start = selectedDate.start;
      let end = clicked;

      // 종료일이 시작일보다 앞이면 스왑
      if (end < start) {
        [start, end] = [end, start];
      }

      setSelectedDate({ start, end });
      return;
    }

    // 3) 이미 start + end가 모두 선택된 경우 → 다시 시작일로 리셋
    setSelectedDate({ start: clicked, end: null });
  };

  const handelDay = (arg) => {
    const daynumber = arg.dayNumberText.replace("일","");
    return daynumber;
  }

//   new FullCalendar.Calender(calenderEl, {
//     aspectRatio: 1.3
//   });

  return (
    <div style={{ width: "700px", margin: "0 auto" }}>
      <h3>언제 필요하신가요?</h3>

      {/* 월간 달력 */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        height="auto"
        locale="ko"
        dayCellContent={handelDay}
      />

      {/* 선택한 날짜 출력 */}
      {selectedDate && (
        <div style={{ marginTop: "20px" }}>
          <p>
            선택한 날짜: <br />
            <strong>{selectedDate.start}</strong>
            {selectedDate.end && (
              <>
                &nbsp;
                부터 <strong>{selectedDate.end}</strong> 까지
              </>
            )}
          </p>

          {/* 대여/반납 시간 UI */}
          {selectedDate.end && (
            <div style={{ display: "flex", gap: "20px" }}>
              <div>
                <label>대여 시간</label>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                >
                  {timeOptions.map((time) => (
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
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {selectedDate.end && (
            <button style={{ marginTop: "20px" }}>적용하기</button>
          )}
        </div>
      )}
    </div>
  );
}
