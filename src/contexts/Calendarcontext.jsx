import { createContext, useContext, useState, useMemo } from "react";
import { DataContext } from "./Datacontext";
import { AuthContext } from "./Authcontext";


export const CalendarContext = createContext();

const toDateTime = (date, time) =>
  new Date(`${date}T${time}:00`);

export default function CalendarProvider({ children }) {
  const { userid } = useContext(AuthContext);
  const { cars } = useContext(DataContext);

    /* ================= 예약 데이터 (임시 더미) ================= */
  const [bookedlistAll, setBookedlistAll] = useState([{
    id:1,
    userId:'user01',
    carId:19,
    filterStartDate:'2025-12-03',
    filterEndDate:'2025-12-04',
    filterStartTime:'10:00',
    filterEndTime:'16:00'
    },
    {
    id:2,
    userId:'user01',
    carId:105,
    filterStartDate:'2025-12-15',
    filterEndDate:'2025-12-20',
    filterStartTime:'09:00',
    filterEndTime:'10:00'
    },
    {
    id:3,
    userId:'user02',
    carId:25,
    filterStartDate:'2025-12-19',
    filterEndDate:'2025-12-20',
    filterStartTime:'16:30',
    filterEndTime:'18:00'
    },
    {
    id:4,
    userId:'user02',
    carId:32,
    filterStartDate:'2025-12-01',
    filterEndDate:'2025-12-10',
    filterStartTime:'08:30',
    filterEndTime:'18:00'
    },
    {
    id:5,
    userId:'user03',
    carId:40,
    filterStartDate:'2025-12-16',
    filterEndDate:'2025-12-17',
    filterStartTime:'10:30',
    filterEndTime:'13:00'
    },
    {
    id:6,
    userId:'user03',
    carId:56,
    filterStartDate:'2025-12-06',
    filterEndDate:'2025-12-14',
    filterStartTime:'09:00',
    filterEndTime:'21:30'
    },
    {
    id:7,
    userId:'user04',
    carId:102,
    filterStartDate:'2025-12-20',
    filterEndDate:'2025-12-24',
    filterStartTime:'07:00',
    filterEndTime:'22:30'
    },
    {
    id:8,
    userId:'user04',
    carId:96,
    filterStartDate:'2025-12-24',
    filterEndDate:'2025-12-25',
    filterStartTime:'10:00',
    filterEndTime:'22:00'
    },
    {
    id:9,
    userId:'user05',
    carId:90,
    filterStartDate:'2025-12-10',
    filterEndDate:'2025-12-11',
    filterStartTime:'17:00',
    filterEndTime:'23:00'
    },
    {
    id:10,
    userId:'user05',
    carId:110,
    filterStartDate:'2025-12-19',
    filterEndDate:'2025-12-21',
    filterStartTime:'07:00',
    filterEndTime:'16:30'
    },
    {
    id:11,
    userId:'user06',
    carId:116,
    filterStartDate:'2025-12-05',
    filterEndDate:'2025-12-07',
    filterStartTime:'10:00',
    filterEndTime:'22:30'
    },
    {
    id:12,
    userId:'user06',
    carId:80,
    filterStartDate:'2025-12-11',
    filterEndDate:'2025-12-14',
    filterStartTime:'16:00',
    filterEndTime:'22:00'
    },
    {
    id:13,
    userId:'user07',
    carId:116,
    filterStartDate:'2025-12-02',
    filterEndDate:'2025-12-06',
    filterStartTime:'08:30',
    filterEndTime:'22:00'
    },
    {
    id:14,
    userId:'user07',
    carId:50,
    filterStartDate:'2025-12-15',
    filterEndDate:'2025-12-17',
    filterStartTime:'06:30',
    filterEndTime:'10:00'
    },
    {
    id:15,
    userId:'user08',
    carId:100,
    filterStartDate:'2025-12-12',
    filterEndDate:'2025-12-13',
    filterStartTime:'16:00',
    filterEndTime:'20:00'
    },
    {
    id:16,
    userId:'user08',
    carId:187,
    filterStartDate:'2025-12-19',
    filterEndDate:'2025-12-20',
    filterStartTime:'20:00',
    filterEndTime:'23:00'
    },
    {
    id:17,
    userId:'user09',
    carId:180,
    filterStartDate:'2025-12-05',
    filterEndDate:'2025-12-08',
    filterStartTime:'12:00',
    filterEndTime:'16:00'
    },
    {
    id:18,
    userId:'user09',
    carId:64,
    filterStartDate:'2025-12-18',
    filterEndDate:'2025-12-20',
    filterStartTime:'14:00',
    filterEndTime:'20:00'
    },
    {
    id:19,
    userId:'user10',
    carId:190,
    filterStartDate:'2025-12-10',
    filterEndDate:'2025-12-12',
    filterStartTime:'13:30',
    filterEndTime:'17:30'
    },
    {
    id:20,
    userId:'user10',
    carId:195,
    filterStartDate:'2025-12-15',
    filterEndDate:'2025-12-18',
    filterStartTime:'13:30',
    filterEndTime:'17:30'
    }]);

  /* ================= UI 상태 ================= */
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:00");
  // 사용자 입력 차량 위치 정보, 홈에서 공유받아야 하며 지금은 임시
  const [location, setLocation] = useState("");
  const [apply, setApply] = useState(false);

  /* ================= A 필터 - 시간 필터 ================= */
  const blockedCarIds = useMemo(() => {
    if (!startDate || !endDate) return [];

    const filterStart = toDateTime(startDate, startTime);
    const filterEnd = toDateTime(endDate, endTime);

    return bookedlistAll
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
  }, [bookedlistAll, startDate, endDate, startTime, endTime]);

  /* ================= 예약 가능 차량 ================= */
  // 원본 cars 형식 그대로 필터 => 령경씨가 사용할 배열
  const availableCars = useMemo(() => {
    return cars.filter((car) => {
      if (blockedCarIds.includes(car.id)) return false;
      if (location && car.location !== location) return false;
      return true;
    });
  }, [cars, blockedCarIds, location]);
  console.log("시간 위치 필터 적용 원본 배열 availableCars: ", availableCars);

  /* ================= 검색 결과 가공 ================= */
  // 원본에서 필요 내용 + 사용자 필터 적용값 정리된 배열 
  const filteredInfoUser = useMemo(() => {
    if (!apply) return [];

    return availableCars.map((car) => ({
      carId: car.id,
      filterStartDate: startDate,
      filterEndDate: endDate,
      filterStartTime: startTime,
      filterEndTime: endTime,
      location: car.location,
      fuel_type: car.fuel_type,
    }));
  }, [
    apply,
    availableCars,
    startDate,
    endDate,
    startTime,
    endTime,
  ]);
  console.log("재가공된 filteredInfoUser: ", filteredInfoUser);

  /* ================= UI 트리거 ================= */
  // 날짜 선정 확인 함수
  const handleDateFilter = () => {
    if (!startDate || !endDate) {
      alert("대여 날짜를 선택해주세요.");
      return;
    }
    setApply(true);
  };
  // 예약 가능한 차량 검색 버튼
  const handleSearchBtn = (navigate) => {
  if (!availableCars.length) {
    alert("예약 가능한 차량이 없습니다.");
    return;
  }

  navigate("/searchcarlist");
};

  return (
    <CalendarContext.Provider
      value={{
        /* 날짜 / 시간 */
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime,

        /* 위치 */
        location,
        setLocation,

        /* 상태 */
        apply,
        setApply,

        /* 데이터 */
        bookedlistAll,
        availableCars,
        filteredInfoUser,

        /* 함수 */
        handleDateFilter,
        handleSearchBtn
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
