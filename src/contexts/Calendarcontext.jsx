import { createContext, useContext, useState, useEffect } from "react";
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:00");
  // 사용자 입력 차량 위치 정보, 홈에서 공유받아야 하며 지금은 임시
    // 지점명 가져오는 변수
    const [location, setLocation] = useState(""); 
    console.log('지점: ', location);
  // 필터 적용된 상태 변수
    const [timeFilteredCars, setTimeFilteredCars] = useState([]);
    // availableCars: 
    // 원본 cars 형식 그대로 필터 => 령경씨가 사용할 배열
    const [availableCars, setAvailableCars] = useState([]); 
    // filteredInfoUser: 
    // 원본에서 필요 내용 + 사용자 필터 적용값 정리된 배열 
    // [{id, userId, carId, filterStartDate, filterEndDate, filterStartTime, filterEndTime, location(차량 위치 필터링 기능 편의를 위해 추가)}]
    const [filteredInfoUser, setFilteredInfoUser] = useState([]);

  

    
  // A 필터 - 시간 필터
    // 예시) 필터(17일 13:00 -19일 20:30)조건에 부합하는 예약가능한 결과값을 추출 const dateFiltered -> 예약가능한 리스트 맵으로 뿌리기
    const HandleDateFilter = ({
        startDate,
        startTime,
        endDate,
        endTime,
      }) => {
        const toDateTime = (date, time) =>
          new Date(`${date}T${time}:00`);
        // 사용자 지정한 날짜 & 시간 값 형식 추출하기
        const filterStart = toDateTime(startDate, startTime);
        const filterEnd = toDateTime(endDate, endTime);

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

            // 시간 겹침 판단
            return !(filterEnd <= bookStart || filterStart >= bookEnd);
          })
          .map((book) => book.carId);

        const dateFilteredResult = cars.filter(
          (car) => !blockedCarIds.includes(car.id)
        );

        setTimeFilteredCars(dateFilteredResult);
        console.log("날짜 필터 결과(버튼 클릭 시 변동)", dateFilteredResult);

        // 위치 선정 이후 날짜 값을 바꿀 경우 꼬임 방지
        if (location) {
        setAvailableCars(
          dateFilteredResult.filter(car => car.location === location)
        );
  }
      };

    // B 위치 필터
       // A 필터 적용 후 사용자가 선택한 지점 필터 함수
    useEffect(() => {
      // 날짜 필터가 아직 적용되지 않은 상태에서 값 변동 방어 코드
      if (!timeFilteredCars.length) return;

      // 지점 선택 안 될 시 방어 코드
      if (!location) return;

      const locationFilteredResult = timeFilteredCars.filter(
        car => car.location === location
      );

      setAvailableCars(locationFilteredResult);
      console.log("해당 지점 필터 결과(실시간 변동): ", locationFilteredResult);
    }, [location, timeFilteredCars]);



    // 검색하기 버튼 클릭 시 최근 본 차량 업데이트(예약 가능 데이터 후보 생성)
    const HandleSearchResult = () => {
      if (!availableCars.length) {
        alert("예약 가능한 차량이 없습니다.");
        return;
      }
      const recentViewResult = availableCars.map((car) => ({
        userId: userid,
        carId: car.id,
        filterStartDate: startDate,
        filterEndDate: endDate,
        filterStartTime: startTime,
        filterEndTime: endTime,
        location: car.location,
        carName: car.name,
        // 연료타입 추가 필요 
      }));

      setFilteredInfoUser(recentViewResult);
      console.log("검색 결과 리스트: ", recentViewResult)
    };


  // 더 만들어야 할 함수 목록

    // 예약하기 버튼 함수 (+ bookedListAll 에 추가된 예약 담기)
    // addBook




    // 예약 취소 버튼 함수
    // removeBook



  return (
    <CalendarContext.Provider
      value={{
        // 날짜 / 시간
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime,

        // 위치
        location,
        setLocation,

        // 데이터
        bookedlistAll,
        availableCars,
        filteredInfoUser,

        // 함수
        HandleDateFilter,
        HandleSearchResult,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}


