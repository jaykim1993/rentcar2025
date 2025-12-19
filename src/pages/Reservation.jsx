import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { BookingContext } from '../contexts/Bookingcontext';
import { CalendarContext } from '../contexts/Calendarcontext';
import { AuthContext } from '../contexts/Authcontext';

import './Reservation.css';

export default function Reservation(){
    // const {  } = useContext(BookingContext);
    const location = useLocation();
    // navigate 보낼 때 넣었던 state 객체 꺼내기 / 비어있을 경우를 대비해 기본값 {} 설정
    const { car, filter, totalPrice, filterStartDate, filterEndDate, filterStartTime, filterEndTime } = location.state || {};
    const { availableCars, filteredInfoUser } = useContext(CalendarContext);
    const { userid, username } = useContext(AuthContext);

    // 예외처리
    if(!car) return <div className='ReservationSection'>날짜, 지점을 선택해주세요.</div>;

    return(
        <div className="ReservationSection">
            {/* 좌측 운전자 정보 */}
            <div className='Reser_reservationInfo'>
                <h2>예약하기</h2>
                <div className='Reser_driverInfo'>
                    <h3><span>운전자 정보(예약자)</span>를 입력해 주세요.</h3>
                    <p>입력한 정보는 안전하게 보호할게요.</p>
                    {/* 운전자 기본 정보 */}
                    <div className='Reser_driverBasicInfo'>
                        <h4>기본 정보</h4>
                        <ul>
                            <li>
                                <label>이름</label>
                                <h5>{username}</h5>
                            </li>
                            <li>
                                <label>휴대폰 번호</label>
                                <h5>{username}</h5>
                            </li>
                            <li>
                                <label>생년월일</label>
                                <h5>{username}</h5>
                            </li>
                            <li>
                                <label>주소</label>
                                
                            </li>
                        </ul>
                    </div>
                    {/* 운전면허 정보 */}
                    <div className='Reser_driverLicenseInfo'>
                        <h4>운전면허 정보</h4>
                        <div>
                            <ul>
                                <li>
                                    <label>면허종류</label>
                                    <input type='text' />
                                    <p>구면허증 : 서울0112345600 / 신면허증 : 110112345600</p>
                                </li>
                                <li>
                                    <label>면허정보</label>
                                    <input type='text' />
                                </li>
                                <li>
                                    <label>발급일자</label>
                                    <input type='text' />
                                </li>
                                <li>
                                    <label>만료일자</label>
                                    <input type='text' />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* 안내문구 */}
                <div className='Reser_reservationNotice'>
                    <p>· 입력한 운전자 정보와 예약자 정보가 드를 경우 대여가 제한될 수 있어요.</p>
                    <p>· 나이, 면허종휴, 운전경력에 따라 이용 가능한 차종 및 차량이 다를 수 있어요.</p>
                    {/* <p>자세한 자격 조건이 궁금하세요?</p> */}
                </div>
            </div>

            {/* 우측 선택일자, 지점, 차량 */}
            <div className='Reser_reservationSummary'>
                <div className="summary_card">
                    <h5>{username}님의 여정</h5>
                    <div className="info_box">
                        <p className="label">지점</p>
                        <h4 className="val">{car.location}</h4>
                        <hr />
                        <p className="label">일정</p>
                        <h4 className="val">{filterStartDate} {filterStartTime} ~ {filterEndDate} {filterEndTime}</h4>
                        <hr />
                        <p className="label">차량</p>
                        <h4 className="val">{car.model}</h4>
                        <hr />                        
                        <div className="price_total">
                            <p>총&nbsp;&nbsp;<strong>{totalPrice.toLocaleString()}</strong>&nbsp;원</p>
                        </div>
                        <button className="pay_btn"
                        // onClick={}
                        >결제하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}