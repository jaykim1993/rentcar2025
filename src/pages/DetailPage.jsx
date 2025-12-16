import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/Datacontext";
import { CalendarContext } from "../contexts/Calendarcontext";
import './DetailPage.css'
import { Link } from "react-router-dom";

export default function DetailPage(){
    const { availableCars } = useContext(CalendarContext);

    return(
        <div className="DetailPage">
            {/* 좌측 - 상세 전체 */}
            <div className="detailContent">
                {/* 홈 > 예약 */}
                <div className="D_Head">
                    <span>홈</span>
                    <i className="bi bi-caret-right-fill"></i>
                    <span>예약하기</span>
                </div>
                {/* 이미지, 차이름 등 */}
                <div className="D_imgInfo">
                    <img src={`./images/cars${availableCars.car_img}`} alt={`${availableCars.brand} ${availableCars.model}`} />
                </div>
            </div>
            {/* 우측 - 요약 및 예약하기 버튼 */}
            <div className="detailSummary">

            </div>
        </div>
    )
}