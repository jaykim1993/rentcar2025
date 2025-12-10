import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function RentalCalendar() {
  const [selectedRange, setSelectedRange] = useState(null);

  const selectHandler = (info) => {
    const start = info.startStr;
    const end = info.endStr;
    setSelectedRange({ start, end });
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"  // 시간 선택 가능 View
        selectable={true}
        selectMirror={true}
        select={selectHandler}
        slotDuration="00:30:00"   // ⬅ 30분 단위 선택
        slotLabelInterval="01:00" // 시간 라벨 간격 (원하는 대로 조정 가능)
        allDaySlot={false}        // 하루종일 영역 숨김 (원한다면 유지 가능)
      />

      {selectedRange && (
        <div style={{ marginTop: "20px" }}>
          <p>
            선택한 시간: <br />
            <strong>{selectedRange.start}</strong> 부터 <strong>{selectedRange.end}</strong> 까지
          </p>
          <button onClick={() => {/* 예약 확정 로직 */ null}}>
            예약하기
          </button>
        </div>
      )}
    </div>
  );
}
