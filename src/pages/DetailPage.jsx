import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/Datacontext";
import { CalendarContext } from "../contexts/Calendarcontext";
import './DetailPage.css'
import { Link, useParams } from "react-router-dom";
import { BookingContext } from "../contexts/Bookingcontext";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// MapContainer = 맵을 불러오는 상자 
// TileLayer 하단 설명 참고
// Marker 마커 좌표 설정시 마커 생성
// Popup 마커 클릭시 텍스트 출력
import 'leaflet/dist/leaflet.css';

export default function DetailPage(){
    // console.log('여기왔어');
    const { availableCars, filteredInfoUser } = useContext(CalendarContext);

    const { addBookInfo } = useContext(BookingContext);

    // 차 id 가져오기
    const { id } = useParams();

    const selectedCar = availableCars.find(car => car.id === Number(id)) || availableCars[0];
 
    
    console.log('selectedCar');
    console.log(selectedCar)

    // true인 옵션만 필터링
    const getActiveOptions = (car) => {
        const optionsMap = {
            navigation: { name: '내비게이션', icon: 'bi-map' },
            rear_camera: { name: '후방카메라', icon: 'bi-camera-video' },
            heated_seat: { name: '열선시트', icon: 'bi-thermometer-sun' },
            heated_handle: { name: '핸들열선', icon: 'bi-sun' },
            bluetooth: { name: '블루투스', icon: 'bi-bluetooth' },
            smart_key: { name: '스마트키', icon: 'bi-key' },
            sun_loof: { name: '썬루프', icon: 'bi-brightness-high' },
        };

        // car 객체에서 위 키값이 true인 것들만 배열로 반환
        return Object.keys(optionsMap).filter(key => car[key] === true).map(key => optionsMap[key]);
    };

    const activeOptions = getActiveOptions(selectedCar);

    // 지도
    // 여러 좌표를 배열로 관리 각 데이터에있는 주소 위도,경도 검색 후 삽입
    const positions = [
        {id:1, lat: 37.446842, lng: 126.454047, name: "인천공항" },
        {id:2, lat: 37.56517, lng: 126.803013, name: "김포공항" },
        {id:3, lat: 37.570097, lng: 127.064886, name: "서울동부" },
        {id:4, lat: 37.493788, lng: 127.012596, name: "서울남부" },
        {id:5, lat: 37.653579, lng: 127.058793, name: "서울북부" },
    ];
    const detail = positions.find(item => item.name === selectedCar.location);
  
    let detail_lat=detail?.lat;
    let detail_lng=detail?.lng;

    console.log(detail_lat);
    console.log(detail_lng);
    console.log(detail);

    if(!selectedCar) return <div>차량정보를 불러올 수 없습니다.</div>;

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
                    <p><img src={`/images/brands/${selectedCar.brand_logo}`} alt={`${selectedCar.brand}`} /> {selectedCar.brand}</p>
                    <h4>{selectedCar.model} {selectedCar.fuel_type}</h4>
                </div>

                <hr />

                {/* 차량정보 */}
                <div className="D_carInfo">
                    <h4>차량 정보</h4>
                    {/* 기본정보 */}
                    <ul className="basic_info_list">
                        <li><p><strong>{selectedCar.model_year}</strong>년식 이에요</p></li>
                        <li><span><strong>{selectedCar.seats}인승</strong>이에요</span></li>
                        <li><span><strong>{selectedCar.km_per}</strong></span></li>
                        <li><span><strong>{selectedCar.drive_license_type}</strong> 이상 이용 가능해요</span></li>
                        <li><span><strong>만 {selectedCar.driver_min_age}세 이상</strong> 이용 가능해요</span></li>
                    </ul>
                    {/* 옵션 */}
                    <div>
                        <p>옵션</p>
                        <ul className="option_list">
                        {activeOptions.length > 0 ? (
                            activeOptions.map((opt, index) => (
                                <li key={index}>
                                    <i className={`bi ${opt.icon}`}></i>
                                    <span>{opt.name}</span>
                                </li>
                            ))
                        ) : (
                            <li>포함된 옵션이 없습니다.</li>
                        )}
                    </ul>
                    </div>
                </div>

                <hr />

                {/* 요금안내 */}
                <div className="D_">
                    <Link to={'/guide'}><h4>요금안내 <i class="bi bi-arrow-right-circle-fill"></i></h4></Link>
                    <p></p>
                </div>

                <hr />
                
                {/* 지도 */}
                <div className="D_location">
                    <h4>대여 및 반납 장소</h4>
                    <MapContainer center={[detail_lat, detail_lng]} zoom={20} style={{ height: "300px", width: "300px" }}> 
                        <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                        />
                        {/* positions 배열을 map으로 돌면서 여러 Marker 렌더링 */}
                        {positions.map((spot) => (
                        <Marker key={spot.id} position={[spot.lat, spot.lng]}>
                            <Popup>{spot.name}</Popup>
                        </Marker>
                        ))}
                    </MapContainer>
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
                                <span className="val">{info.location}</span>
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
                    <button className="reserve_btn">예약하기</button>
                </div>
            </div>
        </div>
    )
}