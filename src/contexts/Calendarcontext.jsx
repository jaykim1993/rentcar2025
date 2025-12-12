import {createContext, useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "./Datacontext";
import { AuthContext } from "./Authcontext";
import { useState } from "react";

export const CalendarContext = createContext();

export default function CalendarProvider({children}) {

  
// 테스트용 예약정보 배열 (임시)
// dateFiltered = [{id, userId, carId, filterStartDate, filterEndDate, filterStartTime, filterEndTime}]
 const dateFilteredTemp = [
    {
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
    }
    
    ]

  
  // < 날짜 선택 후 '적용하기' 버튼 누르면 작동하는 핸들러 >
    const timeInfoArrHandler = (time) => {

    // 날짜 (문자열 -> 날짜형식으로 )
    const start = new Date(time.start);
    const end = new Date(time.end);
    const term = (end - start) / (1000 * 60 * 60 * 24);

   
};

  return (
    <>
      <CalendarContext.Provider value={{timeInfoArrHandler,rentOk}}>
        {children}
      </CalendarContext.Provider>
    </>
  );
}
