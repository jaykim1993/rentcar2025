import { createContext, useContext, useState } from "react";
import { AuthContext } from "./Authcontext";
import { CalendarContext } from "./Calendarcontext";

export const BookingContext = createContext();

export default function BookingProvider({ children }) {
  const { userid } = useContext(AuthContext);
  const { bookedlistAll, setBookedlistAll } = useContext(CalendarContext);

    // 개인의 최근 본 차량 내역 담길 상태 변수
    // 로그인 상태에서 상세페이지를 눌렀을 때 데이터가 담기게
    // recentViewlist=[{car_id,car_img,brand_logo,model_year, fuel_type}]
    const [recentViewlist, setRecentViewlist] = useState([]);
    // 개인의 예약된 내역 담길 상태변수
    // booklistUser 는 recentViewResult와 같으나 앞 부분에 두개의 키 추가된 형태(booking_num, book_date)
    const [booklistUser, setBooklistUser] = useState([]);



  // 해당 차량 상세보기 클릭 시 해당 데이터 담기 함수
    // 해당 데이터는 쿠키혹은 세션으로 남기기(더 권장되는 방식으로)
    const addRecentView = (car) => {
      setRecentViewlist((prev) => {
        // 이미 본 차량 제거 (중복 방지)
        const filtered = prev.filter(
          (item) => item.car_id !== car.id
        );

        // 최근 본 차량 데이터 형태
        const newItem = {
          car_id: car.id,
          car_img: car.image,
          brand_logo: car.brand_logo,
          model_year: car.model_year,
          fuel_type: car.fuel_type,
        };

        // 맨 앞에 추가
        return [newItem, ...filtered];
      });
    };

  
  // 예약 버튼 함수
    const addBookInfo = (selectedCar) => {
  // selectedCar === filteredInfoUser 의 단일 객체

      const bookingData = {
        ...selectedCar,              // 화면에 쓰던 데이터 그대로
        id: Date.now(),              // booking id만 추가
        booking_num: `BK-${Date.now()}`,
        book_date: Date.now(),
      };
      // 개인 예약 내역
      setBooklistUser((prev) => [...prev, bookingData]);
      // 전체 예약 내역
      setBookedlistAll((prev) => [...prev, bookingData]);

      alert("예약이 완료되었습니다.");
      // booklistUser 에 담기기
          // booklistAll 에 담기기
          // 마이페이지로 이동됨('/mypage')
          console.log('개인예약 배열: ', booklistUser);
          console.log('전체예약 배열: ', bookedlistAll );
    };


    // 예약 취소 버튼 함수
    // removeBookInfo
      const removeBookInfo = (bookId) => {
        // booklistUser 에서 해당 데이터 제거
        setBooklistUser((prev) =>
          prev.filter((book) => book.id !== bookId)
        );

        // booklistAll 에서 해당 데이터 제거
        setBookedlistAll((prev) =>
          prev.filter((book) => book.id !== bookId)
        );

        alert("예약이 취소되었습니다.");
      };

  // ================= 금액 =================
  const calculatePrice = (car) => {
    const basePrice = 3000;  // 기본요금
    let totalPrice = basePrice;  // 값이 담길 변수

    // 연식
    const baseModelYear = car.model_year;

    if(baseModelYear === 2022){
        totalPrice -= 200;
    }else if(baseModelYear === 2023){
        totalPrice -= 100;
    }else if(baseModelYear === 2025){
        totalPrice += 200;
    }else{
        totalPrice += 0;
    }

    // 크기
    const baseVehicleSize = car.car_size;

    if(baseVehicleSize === '중형'){
        totalPrice += 100;
    }else if(baseVehicleSize === '대형'){
        totalPrice += 200;
    }else{
        totalPrice += 0;
    }

    // 연료
    const baseFuelType = car.fuel_type;

    if(baseFuelType === '휘발유'){
        totalPrice += 100;
    }else if(baseFuelType === '하이브리드'){
        totalPrice += 200;
    }else{
        totalPrice += 0;
    }

    // 옵션
    if(car.heated_seat){ totalPrice += 100; }
    if(car.heated_handle){ totalPrice += 100; }
    if(car.sun_loof){ totalPrice += 200; }
    else{ null }

    // 브랜드별 값
    const priceValue = car.price_value;

    // 최종 산출금액
    const finalPrice = Math.round(totalPrice * priceValue);

    return finalPrice;
  }

  return (
    <BookingContext.Provider value={{
      recentViewlist,
      booklistUser,
      addRecentView,
      addBookInfo,
      removeBookInfo,
      calculatePrice,
    }}>
      {children}
    </BookingContext.Provider>
  );
}





    // 예약하기 버튼 클릭 시 함수
        // addBookInfo

    //     {filteredInfoUser.map((item) => (
    //   <button
    //     key={item.carId}
    //     onClick={() => addBookInfo(item)}
    //   >
    //     예약하기
    //   </button>
    // ))}