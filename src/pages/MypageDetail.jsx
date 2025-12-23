import './MypageDetail.css'
import { useContext, useState } from "react";
import { BookingContext } from "../contexts/Bookingcontext";
import { AuthContext } from "../contexts/Authcontext";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function MypageDetail(){
    const { id } = useParams(); // 예약번호
    const { myBookings, setBookedlistAll,bookedlistAll } = useContext(BookingContext); // 예약내역 보기 함수 호출
    const { userid, username } = useContext(AuthContext); // 유저 정보 호출
    const bookedThis = myBookings.find(book => book.id === id);

    const [showMap,setShowMap]=useState(false);

    const navigate = useNavigate()

    //리스트삭제핸들러
        const bookdeleteHandle = () => {
        setBookedlistAll(prev =>
            prev.filter(book => book.id !== id)
        );
        alert("예약이 취소되었습니다.");
        navigate("/mypage/booked");
        };

  

    let date = (new Date(`${bookedThis.endDate}T${bookedThis.endTime}`)-new Date(`${bookedThis.startDate}T${bookedThis.startTime}`))/ (1000 * 60 * 30);
    const hours = Math.floor(date / 2);
    const minutes = (date % 2) * 30;
    return(
        <>
            <h1 className="guideMainText">마이페이지</h1>
            <h2 className="guideMainText">예약상세</h2>
                
                <div>
                    <div>
                        <p>{username}</p>
                        <p>예약번호 : {bookedThis.id}</p>
                        <p>출발일시 : {bookedThis.startDate} - {bookedThis.startTime}</p>
                    </div>
                    <div>
                        <div>
                            <p>{bookedThis.car.brand}</p>
                            <p>{bookedThis.car.model}</p>
                        </div>
                        <div>
                            <img src={`/images/cars/${bookedThis.car?.car_img}`}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <p>지역</p>
                                <h4>{bookedThis.car.location}점</h4>
                            </div>
                            <div>
                                <button>지도보기</button>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>일정</p>
                                <h4>{bookedThis.startDate}-{bookedThis.startTime} ~ 
                                    {bookedThis.endDate}-{bookedThis.endTime} 
                                </h4>
                                <p>이용 시간: {hours}시간{minutes ? ` ${minutes}분` : ""}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>차량</p>
                                <h4>{bookedThis.car.model}</h4>
                                <h4>{bookedThis.car.model_year}년식</h4>
                                <h4>연료타입 : {bookedThis.car.fuel_type}</h4>
                                <p>이용 시간: {hours}시간{minutes ? ` ${minutes}분` : ""}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={bookdeleteHandle}>예약 취소하기</button>
                        </div>
                    </div>
                
                </div>
                :

        </>
    )
}