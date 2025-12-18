import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/Datacontext";
import { CalendarContext } from "../contexts/Calendarcontext";
import './DetailPage.css'
import { Link, useParams } from "react-router-dom";
import { BookingContext } from "../contexts/Bookingcontext";

export default function DetailPage(){
    console.log('여기왔어');
    const { availableCars, filteredInfoUser } = useContext(CalendarContext);
    const { addBookInfo } = useContext(BookingContext);
    // 차 id 가져오기
    const { id } = useParams();

    const selectedCar = availableCars.find(car => car.id === Number(id)) || availableCars[0];

    if(!selectedCar)
        return
        <div>차량정보를 불러올 수 없습니다.</div>;

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
                    <img src={`/images/cars/${selectedCar.car_img}`} alt={`${selectedCar.brand} ${selectedCar.model}`} />
                    <h4>{selectedCar.brand} {selectedCar.model} {selectedCar.fuel_type}</h4>
                </div>
            </div>
            {/* 우측 - 요약 및 예약하기 버튼 */}
            <div className="detailSummary">
                <div className="summary_card">
                    <h3>예약 요약</h3>
                    {/* filteredInfoUser가 배열일 경우 map으로 돌리고, 단일 객체면 바로 출력 */}
                    {filteredInfoUser && [filteredInfoUser].map((info, idx) => (
                        <div key={idx} className="info_box">
                            <div className="info_item">
                                <span className="label">지점</span>
                                <span className="val">{info.location }</span>
                            </div>
                            <div className="info_item">
                                <span className="label">대여 기간</span>
                                <span className="val">{info.startDate} ~ {info.endDate}</span>
                            </div>
                        </div>
                    ))}

                    <hr />

                    <div className="price_total">
                        <span>최종 결제 금액</span>
                        <strong>{/* car_price */} 원</strong>
                    </div>
                    <button 
                    >예약하기</button>
                </div>
            </div>
        </div>
    )
}