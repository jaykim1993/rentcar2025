// MultiMonthRentalCalendar.jsx
import { useContext } from "react";
import { Calendercontext } from "../contexts/Calendercontext";
import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import 'bootstrap/dist/css/bootstrap.min.css';
import koLocale from '@fullcalendar/core/locales/ko';
import './Calender.css';

export default function RentalCalendar() {

  const {timeInfoArrHandler} = useContext(Calendercontext);
  const calendarRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState("12");
  const [startTime, setStartTime] = useState("11:00");
  const [endTime, setEndTime] = useState("15:00");

  // custom next 버튼 핸들러
  const handleNext = () => {
    const api = calendarRef.current?.getApi();
    if (!api) return;
    const current = api.getDate();             // 현재 뷰의 기준 날짜
    const year = current.getFullYear();
    const month = current.getMonth();          // 0부터 시작 (0 = 1월)
    api.gotoDate(new Date(year, month + 1, 1)); // 다음달 1일로 이동
  };


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

  // - 10일 -> 10 으로 변경하는 css 함수
  const handelDay = (arg) => {
    return arg.dayNumberText.replace("일", "");
  };

  return (
    <div style={{ width: "700px", margin: "0 auto" }}>
      {/* <h3>언제 필요하신가요?</h3> */}

      <FullCalendar
        plugins={[multiMonthPlugin, interactionPlugin]}
        initialView="twoMonth"        // multi-month 뷰 설정
        locale={koLocale}
        dateClick={handleDateClick}
        dayCellContent={handelDay}
        headerToolbar={{
          left: '',            // 기본 prev,next 대신
          center: 'title',
          right: 'myNext'      // 커스텀 next 버튼 이름
        }}
        customButtons={{
          myNext: { text: '다음', click: handleNext }
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
            <button style={{ marginTop: "20px" }} onClick={()=>timeInfoArrHandler(selectedDate)}> 
              적용하기
            </button>
          )}
        </div>
      )}
    </div>
  );
}
