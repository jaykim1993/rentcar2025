import { createContext, useContext, useState } from "react";
import { AuthContext } from "./Authcontext";
import { DataContext } from "./Datacontext";
import { useEffect, useMemo } from "react";


export const BookingContext = createContext();

export default function BookingProvider({ children }) {
  const { userid } = useContext(AuthContext);
  const { cars } = useContext(DataContext);

      // bookedlistAll (기존 예약 배열)
      // 20개의 초기값
      // local storage에 저장되어있음
    const INITIAL_BOOKED_LIST= [
      {
      id:'1766041300000_user01',
      bookedDate: '2025-12-08',
      userId:'user01',
      carId:19,
      startDate:'2025-12-29',
      endDate:'2025-12-31',
      startTime:'10:00',
      endTime:'16:00',
      price:14000
      },
      {
      id:'1766041300001_user01',
      bookedDate: '2025-12-09',
      userId:'user01',
      carId:105,
      startDate:'2025-12-26',
      endDate:'2025-12-27',
      startTime:'09:00',
      endTime:'10:00',
      price:114000
      },
      {
      id:'1766041300002_user02',
      bookedDate: '2025-12-09',
      userId:'user02',
      carId:25,
      startDate:'2025-12-26',
      endDate:'2025-12-27',
      startTime:'16:30',
      endTime:'18:00',
      price:18000
      },
      {
      id:'1766041300003_user02',
      bookedDate: '2025-12-10',
      userId:'user02',
      carId:32,
      startDate:'2025-12-28',
      endDate:'2025-12-31',
      startTime:'08:30',
      endTime:'18:00',
      price:25000
      },
      {
      id:'1766041300004_user03',
      bookedDate: '2025-12-10',
      userId:'user03',
      carId:40,
      startDate:'2025-12-28',
      endDate:'2025-12-28',
      startTime:'10:30',
      endTime:'13:00',
      price:200000
      },
      {
      id:'1766041300005_user03',
      bookedDate: '2025-12-10',
      userId:'user03',
      carId:56,
      startDate:'2025-12-29',
      endDate:'2025-12-31',
      startTime:'09:00',
      endTime:'21:30',
      price:14000
      },
      {
      id:'1766041300006_user04', 
      bookedDate: '2025-12-11',
      userId:'user04',
      carId:102,
      startDate:'2025-12-26',
      endDate:'2025-12-27',
      startTime:'07:00',
      endTime:'22:30',
      price:14000
      },
      {
      id:'1766041300007_user04',
      bookedDate: '2025-12-11',
      userId:'user04',
      carId:96,
      startDate:'2025-12-29',
      endDate:'2025-12-30',
      startTime:'10:00',
      endTime:'22:00',
      price:14000
      },
      {
      id:'1766041300008_user05',
      bookedDate: '2025-12-11',
      userId:'user05',
      carId:90,
      startDate:'2025-12-25',
      endDate:'2025-12-27',
      startTime:'17:00',
      endTime:'23:00',
      price:14000
      },
      {
      id:'1766041300009_user05',
      bookedDate: '2025-12-11',
      userId:'user05',
      carId:110,
      startDate:'2025-12-28',
      endDate:'2025-12-31',
      startTime:'07:00',
      endTime:'16:30',
      price:14000
      },
      {
      id:'1766041300010_user06',
      bookedDate: '2025-12-11',
      userId:'user06',
      carId:116,
      startDate:'2025-12-28',
      endDate:'2025-12-30',
      startTime:'10:00',
      endTime:'22:30',
      price:14000
      },
      {
      id:'1766041300011_user06',
      bookedDate: '2025-12-11',
      userId:'user06',
      carId:80,
      startDate:'2025-12-26',
      endDate:'2025-12-27',
      startTime:'16:00',
      endTime:'22:00',
      price:14000
      },
      {
      id:'1766041300012_user07',
      bookedDate: '2025-12-12',
      userId:'user07',
      carId:116,
      startDate:'2025-12-22',
      endDate:'2025-12-27',
      startTime:'08:30',
      endTime:'22:00',
      price:14000
      },
      {
      id:'1766041300013_user07',
      bookedDate: '2025-12-12',
      userId:'user07',
      carId:50,
      startDate:'2025-12-28',
      endDate:'2025-12-30',
      startTime:'06:30',
      endTime:'10:00',
      price:14000
      },
      {
      id:'1766041300014_user08',
      bookedDate: '2025-12-12',
      userId:'user08',
      carId:100,
      startDate:'2025-12-27',
      endDate:'2025-12-28',
      startTime:'16:00',
      endTime:'20:00',
      price:14000
      },
      {
      id:'1766041300015_user08',
      bookedDate: '2025-12-12',
      userId:'user08',
      carId:187,
      startDate:'2025-12-29',
      endDate:'2025-12-30',
      startTime:'20:00',
      endTime:'23:00',
      price:14000
      },
      {
      id:'1766041300016_user09',
      bookedDate: '2025-12-12',
      userId:'user09',
      carId:180,
      startDate:'2025-12-25',
      endDate:'2025-12-26',
      startTime:'12:00',
      endTime:'16:00',
      price:14000
      },
      {
      id:'1766041300017_user09',
      bookedDate: '2025-12-12',
      userId:'user09',
      carId:64,
      startDate:'2025-12-27',
      endDate:'2025-12-30',
      startTime:'14:00',
      endTime:'20:00',
      price:14000
      },
      {
      id:'1766041300018_user10',
      bookedDate: '2025-12-12',
      userId:'user10',
      carId:190,
      startDate:'2025-12-27',
      endDate:'2025-12-28',
      startTime:'13:30',
      endTime:'17:30',
      price:14000
      },
      {
      id:'1766041300019_user10',
      bookedDate: '2025-12-12',
      userId:'user10',
      carId:195,
      startDate:'2025-12-29',
      endDate:'2025-12-30',
      startTime:'13:30',
      endTime:'17:30',
      price:14000
      }
    ];
    const [bookedlistAll, setBookedlistAll] = useState(() => {
      const saved = localStorage.getItem("bookedlistAll");
      return saved ? JSON.parse(saved) : INITIAL_BOOKED_LIST;
    });
    useEffect(() => {
      localStorage.setItem(
        "bookedlistAll",
        JSON.stringify(bookedlistAll)
      );
      // console.log(bookedlistAll);
    }, [bookedlistAll]);


    
    // 예약 취소 버튼 함수
    // 마이페이지 혹은 예약내역 페이지에서 예약 취소 버튼용
      // const removeBookInfo = (bookId) => {
      //   // booklistUser 에서 해당 데이터 제거
      //   setBooklistUser((prev) =>
      //     prev.((book) => book.id !== bookId)
      //   );

      //   // booklistAll 에서 해당 데이터 제거
      //   setBookedlistAll((prev) =>
      //     prev.((book) => book.id !== bookId)
      //   );

      //   alert("예약이 취소되었습니다.");
      // };


    //  Mypage.jsx 용 
      // 예약 내역 보이기
      // 전체 예약에서 userid 매칭해서 해당 user 예약내역
      // + 차량 정보 합치기(cars)
      const myBookings = useMemo(() => {
          return bookedlistAll
            .filter(book => book.userId === userid)
            .map(book => {
              const car = cars.find(c => c.id === book.carId);
              return { ...book, car };
            })
            .sort(
              (a, b) => new Date(b.bookedDate) - new Date(a.bookedDate)
            );
          }, [bookedlistAll, userid, cars]);


      
      // Recentcarlist.jsx 용
      // 최근 본 차량 목록 보이기
      // 목록은 배열로 실존하지 않으며 local storage에만 존재한다
      // localStorage 내에서 해당 userid에 부합하는 내용만 찾기
        const myRecentlist = (userid) => {
          if (!userid) return [];
          const data = JSON.parse(localStorage.getItem("recentView")) || [];
          return data
            .filter(item => item.userid === userid)
            .sort((a, b) => b.viewed_at - a.viewed_at)
        };



  // ================= 금액 =================
  const calculatePrice = (car) => {
    const basePrice = 700;  // 기본요금
    let totalPrice = basePrice;  // 값이 담길 변수

    // 연식
    const baseModelYear = car.model_year;

    if(baseModelYear === 2022){
        totalPrice -= 100;
    }else if(baseModelYear === 2023){
        totalPrice -= 50;
    }else if(baseModelYear === 2025){
        totalPrice += 100;
    }else{
        totalPrice += 0;
    }

    // 크기
    const baseVehicleSize = car.car_size;

    if(baseVehicleSize === '중형'){
        totalPrice += 50;
    }else if(baseVehicleSize === '대형'){
        totalPrice += 100;
    }else{
        totalPrice += 0;
    }

    // 연료
    const baseFuelType = car.fuel_type;

    if(baseFuelType === '휘발유'){
        totalPrice += 50;
    }else if(baseFuelType === '하이브리드'){
        totalPrice += 100;
    }else{
        totalPrice += 0;
    }

    // 옵션
    if(car.heated_seat){ totalPrice += 50; }
    if(car.heated_handle){ totalPrice += 50; }
    if(car.sun_loof){ totalPrice += 100; }
    else{ null }

    // 브랜드별 값
    const priceValue = car.price_value;

    // 최종 산출금액
    const finalPrice = Math.round(totalPrice * priceValue);

    return finalPrice;
  }

  // 인기순 차량 선택 변수
  const [clickCar, setClickCar] = useState('');
  
  const [clickCarArr, setClickCarArr] = useState([]); // 클릭된 모델 리스트 상태



  return (
    <BookingContext.Provider value={{
      calculatePrice,
      bookedlistAll, 
      setBookedlistAll,
      myBookings,
      myRecentlist,
      setClickCar,
      clickCar,
      clickCarArr, 
      setClickCarArr
      // removeBookInfo
    }}>
      {children}
    </BookingContext.Provider>
  );
}

