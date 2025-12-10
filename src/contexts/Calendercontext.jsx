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

  // - 30분 단위 시간 리스트 생성
  const generateTimes = () => {
    const times = []; // 시간 리스트가 들어갈 빈 배열
    for (let hour = 0; hour < 24; hour++) {
      // 문자열로 시간("00" ~ "24") 두자리씩,한자리수일 경우 "0"추가  ex) 1:20 -> 01:20
      times.push(`${String(hour).padStart(2, "0")}:00`); 
      times.push(`${String(hour).padStart(2, "0")}:30`);
    }
    return times;
  };

  const timeOptions = generateTimes();

  // - 날짜 클릭해서 시작일/종료일 선택
  const handleDateClick = (info) => {
    // 클릭한 날짜를 문자열로 clicked에 넣음 (dateStr -> full Calender의 property name 작명 X)
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

  // - 10일 -> 10 으로 변경하는 css 함수
  const handelDay = (arg) => {
    const daynumber = arg.dayNumberText.replace("일","");
    return daynumber;
  }

  // 시작일, 끝나는 일, 시간을 담는 배열
  const timeInfo = [];
  const timeInfoArrHandler = (time) => {
    timeInfo.push({start: time.start, end: time.end})
    console.log(timeInfo)
  };

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
        headerToolbar={{
        left: 'prev',         // 왼쪽에 이전 버튼만
        center: 'title',      // 중앙에 달력 제목 (예: "2025년 12월")
        right: 'next'         // 오른쪽에 다음 버튼만
      }}
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
            <button style={{ marginTop: "20px" }} onClick={()=>timeInfoArrHandler(selectedDate)}>적용하기</button>
          )}
        </div>
      )}
    </div>
  );
}
