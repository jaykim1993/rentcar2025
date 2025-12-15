import { createContext, useContext, useState } from "react";
import { DataContext } from "./Datacontext";
import { AuthContext } from "./Authcontext";

export const CalendarContext = createContext();

export default function CalendarProvider({ children }) {
  const { userid } = useContext(AuthContext);
  // 원본 배열 불러오기
  const { cars } = useContext(DataContext);

  // bookedlistAll 배열
  // 모든 회원의 과거 포함 모든 예약정보를 담고 있는 배열
  const [bookedlistAll, setBookedlistAll] = useState([{
    id:'user01',
    userId:1,
    carId:19,
    filterStartDate:'2025-12-03',
    filterEndDate:'2025-12-04',
    filterStartTime:'10:00',
    filterEndTime:'16:00'
    },
    {
    id:'user02',
    userId:1,
    carId:105,
    filterStartDate:'2025-12-15',
    filterEndDate:'2025-12-20',
    filterStartTime:'09:00',
    filterEndTime:'10:00'
    },
    {
    id:3,
    userId:2,
    carId:25,
    filterStartDate:'2025-12-19',
    filterEndDate:'2025-12-20',
    filterStartTime:'16:30',
    filterEndTime:'18:00'
    },
    {
    id:4,
    userId:3,
    carId:32,
    filterStartDate:'2025-12-01',
    filterEndDate:'2025-12-10',
    filterStartTime:'08:30',
    filterEndTime:'18:00'
    },
    {
    id:5,
    userId:3,
    carId:40,
    filterStartDate:'2025-12-16',
    filterEndDate:'2025-12-17',
    filterStartTime:'10:30',
    filterEndTime:'13:00'
    },
    {
    id:6,
    userId:4,
    carId:56,
    filterStartDate:'2025-12-06',
    filterEndDate:'2025-12-14',
    filterStartTime:'09:00',
    filterEndTime:'21:30'
    },
    {
    id:7,
    userId:4,
    carId:102,
    filterStartDate:'2025-12-20',
    filterEndDate:'2025-12-24',
    filterStartTime:'07:00',
    filterEndTime:'22:30'
    },
    {
    id:8,
    userId:5,
    carId:96,
    filterStartDate:'2025-12-24',
    filterEndDate:'2025-12-25',
    filterStartTime:'10:00',
    filterEndTime:'22:00'
    },
    {
    id:9,
    userId:6,
    carId:90,
    filterStartDate:'2025-12-10',
    filterEndDate:'2025-12-11',
    filterStartTime:'17:00',
    filterEndTime:'23:00'
    },
    {
    id:10,
    userId:6,
    carId:110,
    filterStartDate:'2025-12-19',
    filterEndDate:'2025-12-21',
    filterStartTime:'07:00',
    filterEndTime:'16:30'
    },
    {
    id:11,
    userId:7,
    carId:116,
    filterStartDate:'2025-12-05',
    filterEndDate:'2025-12-07',
    filterStartTime:'10:00',
    filterEndTime:'22:30'
    },
    {
    id:12,
    userId:7,
    carId:80,
    filterStartDate:'2025-12-11',
    filterEndDate:'2025-12-14',
    filterStartTime:'16:00',
    filterEndTime:'22:00'
    },
    {
    id:13,
    userId:8,
    carId:116,
    filterStartDate:'2025-12-02',
    filterEndDate:'2025-12-06',
    filterStartTime:'08:30',
    filterEndTime:'22:00'
    },
    {
    id:14,
    userId:8,
    carId:50,
    filterStartDate:'2025-12-15',
    filterEndDate:'2025-12-17',
    filterStartTime:'06:30',
    filterEndTime:'10:00'
    },
    {
    id:15,
    userId:9,
    carId:100,
    filterStartDate:'2025-12-12',
    filterEndDate:'2025-12-13',
    filterStartTime:'16:00',
    filterEndTime:'20:00'
    },
    {
    id:16,
    userId:9,
    carId:187,
    filterStartDate:'2025-12-19',
    filterEndDate:'2025-12-20',
    filterStartTime:'20:00',
    filterEndTime:'23:00'
    },
    {
    id:17,
    userId:10,
    carId:180,
    filterStartDate:'2025-12-05',
    filterEndDate:'2025-12-08',
    filterStartTime:'12:00',
    filterEndTime:'16:00'
    },
    {
    id:18,
    userId:10,
    carId:64,
    filterStartDate:'2025-12-18',
    filterEndDate:'2025-12-20',
    filterStartTime:'14:00',
    filterEndTime:'20:00'
    },
    {
    id:19,
    userId:11,
    carId:190,
    filterStartDate:'2025-12-10',
    filterEndDate:'2025-12-12',
    filterStartTime:'13:30',
    filterEndTime:'17:30'
    },
    {
    id:20,
    userId:11,
    carId:195,
    filterStartDate:'2025-12-15',
    filterEndDate:'2025-12-18',
    filterStartTime:'13:30',
    filterEndTime:'17:30'
    }]);

  // Calendar.jsx 에 공유될 변수
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(selectedDate);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:00");

  // 필터 적용된 상태 변수
    // availableCars: 
    // 원본 cars 형식 그대로 필터 => 령경씨가 사용할 배열
    const [availableCars, setAvailableCars] = useState([]); 
    // dateFiltered: 
    // 원본에서 필요 내용 + 사용자 필터 적용값 정리된 배열 
    // [{id, userId, carId, filterStartDate, filterEndDate, filterStartTime, filterEndTime, location(차량 위치 필터링 기능 편의를 위해 추가)}]
    const [dateFiltered, setDateFiltered] = useState([]);

  const toDateTime = (date, time) =>
    new Date(`${date}T${time}:00`);

  // 지점명 가져오는 변수
  const [location,setLocation] = useState(null);
  console.log('지점: ', location);
  

  // 필터 적용하기 버튼 함수
    // 예시) 필터(17일 13:00 -19일 20:30)조건에 부합하는 예약가능한 결과값을 추출 const dateFiltered -> 예약가능한 리스트 맵으로 뿌리기
  const timeInfoArrHandler = ({
    startDate,
    endDate,
    startTime,
    endTime,
  }) => {
    console.log("사용자가 정의한 필터 값", {
    startDate,
    endDate,
    startTime,
    endTime,
  });
    const filterStart = toDateTime(startDate, startTime);
    const filterEnd = toDateTime(endDate, endTime);

    // 예약 겹치는 carId 추출
    const blockedCarIds = bookedlistAll
      .filter((book) => {
        const bookStart = toDateTime(
          book.filterStartDate,
          book.filterStartTime
        );
        const bookEnd = toDateTime(
          book.filterEndDate,
          book.filterEndTime
        );

        return !(filterEnd <= bookStart || filterStart >= bookEnd);
      })
      .map((book) => book.carId);

    // 예약 가능한 차량 (지역 변수 선언, 상태변수와 별개!)
    const availableCars = cars.filter(
      (car) => !blockedCarIds.includes(car.id)
    );

    // 예약 버튼용 정제 데이터 (지역 변수 선언, 상태변수와 별개!)
    const dateFiltered = availableCars.map((car, index) => ({
      id: index + 1,            
      userId: userid,
      carId: car.id,
      filterStartDate: startDate,
      filterEndDate: endDate,
      filterStartTime: startTime,
      filterEndTime: endTime,
      location: car.location,
      carName: car.name,
    }));

    // 상태 변수 값 입력
    setAvailableCars(availableCars);
    console.log("예약 가능한 차량", availableCars);
    setDateFiltered(dateFiltered);
    console.log("정제된 예약 데이터", dateFiltered);
  };


  // 지점 선택 필터링



  // 더 만들어야 할 함수 목록

    // 예약하기 버튼 함수 (+ bookedListAll 에 추가된 예약 담기)
    // addBook



    // 예약 취소 버튼 함수
    // removeBook





  return (
    <CalendarContext.Provider
      value={{
        bookedlistAll,
        selectedDate,
        setSelectedDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        timeInfoArrHandler,
        availableCars, 
        dateFiltered,
        setLocation
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
