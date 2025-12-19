import { createContext, useContext, useState, useMemo } from "react";
import { DataContext } from "./Datacontext";
import { AuthContext } from "./Authcontext";
import { BookingContext } from "./Bookingcontext";

export const CalendarContext = createContext();

const toDateTime = (date, time) =>
  new Date(`${date}T${time}:00`);

export default function CalendarProvider({ children }) {
  const { userid } = useContext(AuthContext);
  const { cars } = useContext(DataContext);
  const { bookedlistAll } = useContext(BookingContext);

  /* ================= UI 상태 ================= */
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:00");
  // 사용자 입력 차량 위치 정보, 홈에서 공유받아야 하며 지금은 임시
  const [location, setLocation] = useState("");
  const [apply, setApply] = useState(false);

  /* ================= 시간 필터 ================= */
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
  // console.log("시간 위치 필터 적용 원본 배열 availableCars: ", availableCars);

  /* ================= 검색 결과 가공 ================= */
  // 원본에서 필요 내용 + 사용자 필터 적용값 정리된 배열 
  const filteredInfoUser = useMemo(() => {
    if (!apply || !userid) return [];

    return availableCars.map((car) => ({
        // userId: userid,
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
      userid,
      startDate,
      endDate,
      startTime,
      endTime,
  ]);
  // console.log("재가공된 filteredInfoUser: ", filteredInfoUser);

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
