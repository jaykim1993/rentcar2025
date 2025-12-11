import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

// import "@fullcalendar/daygrid/index.css";
// import "@fullcalendar/timegrid/index.css";

// import "./ReservationCalendar.css";

export default function ReservationCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleDateSelect = (info) => {
    setSelectedSlot({
      start: info.startStr,
      end: info.endStr,
    });
  };

  const confirmReservation = () => {
    if (!isLoggedIn) {
      alert("예약을 확정하려면 로그인이 필요합니다.");
      return;
    }

    setEvents([
      ...events,
      {
        title: "예약됨",
        start: selectedSlot.start,
        end: selectedSlot.end,
        backgroundColor: "#4fa3ff",
        borderColor: "#4fa3ff",
      },
    ]);

    setSelectedSlot(null);
    alert("예약이 완료되었습니다!");
  };

  return (
    <div className="reservation_wrapper">

      {/* 왼쪽 달력 */}
      <div className="calendar_container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          select={handleDateSelect}
          events={events}
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </div>

      {/* 오른쪽 패널 */}
      <div className="reservation_panel">
        <h3>예약 정보</h3>

        {selectedSlot ? (
          <div className="selected_info">
            <p><strong>선택된 시간</strong></p>
            <p>시작: {selectedSlot.start}</p>
            <p>종료: {selectedSlot.end}</p>

            <button className="confirm_btn" onClick={confirmReservation}>
              예약 확정하기
            </button>
          </div>
        ) : (
          <p>날짜 또는 시간을 클릭하세요.</p>
        )}

        <hr />

        <h4>예약 목록</h4>
        {events.length === 0 && <p>예약 없음</p>}
        {events.map((ev, idx) => (
          <div key={idx} className="event_item">
            <strong>{ev.title}</strong>
            <div>{ev.start}</div>
          </div>
        ))}

        <hr />

        {/* 로그인 토글 (테스트용) */}
        <button
          className="login_btn"
          onClick={() => setIsLoggedIn(!isLoggedIn)}
        >
          {isLoggedIn ? "로그아웃" : "로그인 (테스트용)"}
        </button>
      </div>
    </div>
  );
}