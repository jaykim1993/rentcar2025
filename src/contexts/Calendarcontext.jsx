import {createContext } from "react";
import { useContext } from "react";
import { DataContext } from "./Datacontext";
import { useState } from "react";

// import './bootstrap/dist/css/bootstrap.min.css';

export const CalendarContext = createContext();

export default function CalendarProvider({children}) {

  const {cars} = useContext(DataContext);
  const [rentOk, setRentOk]=useState();
    // 시작일, 끝나는 일, 기간 담는 용도
    const [timeInfo, setTimeInfo] = useState([]);
  
// user가 로그인 한 후 이용날짜와 차량을 선택하면 Booking배열에 추가됨
 const Booking = [
    {
    id:1,
    user:'김ㅇㅇ',
    car_id:19,
    date:'2025-12-15',
    term:5
    },
    {
    id:2,
    user:'홍ㅇㅇ',
    car_id:37,
    date:'2025-12-15',
    term:2
    },
    {
    id:3,
    user:'이ㅇㅇ',
    car_id:55,
    date:'2025-12-19',
    term:2
    }
    ]

  
  // < 날짜 선택 후 '적용하기' 버튼 누르면 작동하는 핸들러 >
  const timeInfoArrHandler = (time) => {

    // 날짜 (문자열 -> 날짜형식으로 )
    const start = new Date(time.start);
    const end = new Date(time.end);
    const term = (end - start) / (1000 * 60 * 60 * 24);

    const timeInfoCopy= [...timeInfo];
    timeInfoCopy.push({start: time.start, end: time.end, term});
    setTimeInfo(timeInfoCopy);
    console.log(timeInfo);

    // 선택한 해당 날짜에 이미 예약된 차량 id 배열 출력
    const rentNo=[];
    for(let i=0; i<Booking.length; i++){
        if(timeInfo[0] && timeInfo[0].start == Booking[i].date){
            rentNo.push(Booking[i].car_id);
            console.log('시작일: ',timeInfo[0].start,'차 id: ',rentNo);
        }
    }

    // 선택한 날짜에 예약되지 않은(예약 가능) 차량 배열 출력
    const rentOkOk = cars.filter(item => !rentNo.includes(item.id));
    setRentOk(rentOkOk);
    console.log('예약 가능 차량: ',rentOk);
    console.log('전체 차량: ',cars);
  };

  return (
    <>
      <CalendarContext.Provider value={{timeInfoArrHandler,rentOk}}>
        {children}
      </CalendarContext.Provider>
    </>
  );
}
