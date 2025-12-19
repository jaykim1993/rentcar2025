import { useEffect, useState, useRef } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CalendarContext } from "../contexts/Calendarcontext";
import { AuthContext } from "../contexts/Authcontext";
import { BookingContext } from "../contexts/Bookingcontext";
import Calendar from './Calendar';
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// MapContainer = 맵을 불러오는 상자 
// TileLayer 하단 설명 참고
// Marker 마커 좌표 설정시 마커 생성
// Popup 마커 클릭시 텍스트 출력
import 'leaflet/dist/leaflet.css';

export default function Home(){
  const navigate = useNavigate();
  const {setLocation, location, startDate, endDate ,startTime, endTime, apply,
         handleSearchBtn, setIsLocation,setIsCalendar,isLocation, isCalendar} = useContext(CalendarContext);
  const {myRecentlist} = useContext(BookingContext);
  const {userid, username} = useContext(AuthContext);

    const images = [
      "/images/banner/banner01.png",
      "/images/banner/banner02.png",
      "/images/banner/banner03.png",
      "/images/banner/banner04.png",
    ];
  
    const [index, setIndex] = useState(0);
  
    const startX = useRef(0);
    const isDragging = useRef(false);
    const currentX = useRef(0);
  
    // 3초마다 자동 슬라이드
    useEffect(() => {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(timer);
    }, []);
  
    // 드래그 시작
    const handleStart = (clientX) => {
      isDragging.current = true;
      startX.current = clientX;
    };
  
    // 드래그 이동
    const handleMove = (clientX) => {
      if(!isDragging.current) return;
      currentX.current = clientX - startX.current;
    };
  
    // 드래그 종료
    const handleEnd = () => {
      if(!isDragging.current) return;
      isDragging.current = false;
  
      if(currentX.current > 50) {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (currentX.current < -50) {
        setIndex((prev) => (prev + 1) % images.length);
      }
  
      currentX.current = 0;
    };

    const calendarHandler=()=>{
      setIsCalendar(!isCalendar);
      setIsLocation(false);
    };
    const locationHandler=()=>{
      setIsCalendar(false);
      setIsLocation(!isLocation);
    };
    
    // 오전 오후
    const timeAMPM= (time)=>{
      const hours=Number(time.slice(0,2));
      const minutes=time.slice(3);
      const ampm= hours<12 ?'오전':'오후';
      return ` ${ampm} ${hours}:${minutes}`;
    }

    // 지점 상세보기 모달
    const [isDetail,setIsDetail]=useState(null);
    // console.log('번호: ',isDetail);

    // 여러 좌표를 배열로 관리  각 데이터에있는 주소 위도,경도 검색 후 삽입
  const positions = [
    {id:1, lat: 37.446842, lng: 126.454047, name: "인천공항점" , address: "인천광역시 중구 공항로 271" },
    {id:2, lat: 37.56517, lng: 126.803013, name: "김포공항점" , address: "서울특별시 강서구 하늘길 38"},
    {id:3, lat: 37.570097, lng: 127.064886, name: "서울동부점", address: "서울 동대문구 한천로 100 1-2층" },
    {id:4, lat: 37.493788, lng: 127.012596, name: "서울남부점", address: "서울특별시 서초구 서초대로 283" },
    {id:5, lat: 37.653579, lng: 127.058793, name: "서울북부점", address: "서울 노원구 노해로 456 동방빌딩 1층"},
  ];
  
  const detail=positions.find(item => item.id === isDetail);
  
  let detail_lat=detail?.lat;
  let detail_lng=detail?.lng;
  

  useEffect(()=>{
    setIsDetail(null);
  },[isLocation]);
    
// 상세보기 close 버튼 핸들러함수
  const detailCloseHandler=()=>{
    if(isDetail){
      setIsDetail(false);
    }else{
      setIsLocation(false);
    }
  };

// 최근 본 차량
const recentViewList = myRecentlist(userid);

    return(
    <div className="Home">
        {/* 예약 섹션 */}
        <div className="H_reservation">
            <div className={`H_dateTable ${isCalendar ? "open" : ""}`}>
                  <p>언제?</p>
                  <div className="H_dateTitle" onClick={calendarHandler}>
                    {apply?
                    <p>
                     {startDate &&`${startDate.replaceAll('-','.')}${timeAMPM(startTime)}`} ~ {endDate &&`${endDate.replaceAll('-','.')}${timeAMPM(endTime)}`}
                    </p>:
                    <p>날짜를 선택하세요</p>}
                  </div>
            </div>
    
            {/* 지점 선택 파트 */}
            <div className="H_spotTable">
                <div className={`spot_choice ${isLocation ? "open" : ""}`}>
                    <p>어디?</p>
                    <div className="H_spotTitle" onClick={locationHandler}>{location? <p>{location}</p> 
                    :<p>지점을 선택하세요</p>}
                    </div>
                </div>
                <button className="H_searchButton" type="submit" onClick={()=>handleSearchBtn(navigate)}>
                    예약할 차량 찾기
                    <i className="bi bi-arrow-right"></i>
                </button>
            </div>
        </div>

       {/* 지점 모달 파트 */}
{isLocation && (
  <div className="H_location">
    <span className="H_close01" onClick={detailCloseHandler}><i className="bi bi-x-lg"></i></span>
    {/* 상세 위치 (지도.) */}
    {isDetail ? (
      <>
        <div className="H_selectLocation_detail">

          <MapContainer center={[detail_lat, detail_lng]} zoom={20} style={{ height: "300px", width: "394px"}}> 
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
          <h5>{detail.name}</h5>
          <p className="H_detial_address_title">주소</p>
          <span className="H_detial_address">{detail.address}</span>
        </div>
        
      </>
    ) : (
    // 지점 목록 
      <>
        <h3>지점을 선택하세요</h3>
        <div className="H_selectLocation">
          <span>서울</span>
          <div className="H_seoul">
            <div className="H_gu">
              <div className="H_Click" onClick={()=>setIsLocation(false)}>
                <p onClick={()=>setLocation("서울북부")}>
                  서울 북부 <span>노원구</span>
                </p>
              </div>
              <button className="H_detail" onClick={()=>setIsDetail(5)}>상세</button>
            </div>

            <div className="H_gu">
              <div className="H_Click" onClick={()=>setIsLocation(false)}>
                <p onClick={()=>setLocation("서울남부")}>
                  서울 남부 <span>서초구</span>
                </p>
              </div>
              <button className="H_detail" onClick={()=>setIsDetail(4)}>상세</button>
            </div>

            <div className="H_gu">
              <div className="H_Click" onClick={()=>setIsLocation(false)}>
                <p onClick={()=>setLocation("서울동부")}>
                  서울 동부 <span>동대문구</span>
                </p>
              </div>
              <button className="H_detail" onClick={()=>setIsDetail(3)}>상세</button>
            </div>
          </div>

          <span>김포</span>
          <div className="H_gimpo">
            <div className="H_gu">
              <div className="H_Click" onClick={()=>setIsLocation(false)}>
                <p onClick={()=>setLocation("김포공항")}>
                  김포공항 <span>강서구</span>
                </p>
              </div>
              <button className="H_detail" onClick={()=>setIsDetail(2)}>상세</button>
            </div>
          </div>

          <span>인천</span>
          <div className="H_gu">
            <div className="H_Click" onClick={()=>setIsLocation(false)}>
              <p onClick={()=>setLocation("인천공항")}>
                인천공항 <span>서초구</span>
              </p>
            </div>
            <button className="H_detail" onClick={()=>setIsDetail(1)}>상세</button>
          </div>
        </div>
      </>
    )}
  </div>
)}

        {isCalendar && <div className={`calendar-slide ${isCalendar ? "open" : ""}`}>
          <span className="H_close02" onClick={()=>setIsCalendar(false)}><i className="bi bi-x-lg"></i></span>
	        <Calendar />
	      </div>}

        {/* sec01 - 배너 슬라이드 */}
        <div className="H_sec01"
            style={{
            overflow: "hidden",
            width: "100%",
            userSelect: "none",
            }}
    
            // 마우스 드래그 슬라이드 넘기기
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseMove={(e) => {
            if(isDragging.current) {
                e.preventDefault(); 
                handleMove(e.clientX);
            }}}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}>
            <div style={{
                display: "flex",
                transition: "transform 0.4s ease",
                transform: `translateX(-${index * 100}%)`,
            }}>
            {images.map((img, i) => (
                <img key={i} src={img} alt="banner"
                style={{
                    width: "100%",
                    flexShrink: 0,
                    pointerEvents: "none"}}/>
            ))}
            </div>
        </div>
    

        {/* sec02 - 인기차량 */}
        <div className="H_sec02">
            <h2>인기순</h2>
            <button type="button">많이 찾는 모델</button>
        </div>
        <div className="H_sec02_1">
            <div className="H_good"><img src='/images/cars/hy_2.webp' alt='car_img'/></div>
            <div className="H_good"><img src='/images/cars/hy_2.webp' alt='car_img'/></div>
            <div className="H_good"><img src='/images/cars/hy_2.webp' alt='car_img'/></div>
            <div className="H_good"><img src='/images/cars/hy_2.webp' alt='car_img'/></div>
            <div className="H_good"><img src='/images/cars/hy_2.webp' alt='car_img'/></div>
        </div>
        

        {/* sec03 - 최근본차량 */}
        {userid && <div className="H_section03">
        <div className="H_sec03">
            <h2>{username}님의 최근 본 차량</h2>
            <Link to={'/recent'} className="H_more">
              <span>더보기</span>
            </Link>
        </div>
        <div className="H_sec03_1">
            {recentViewList.map(item=>(
              <Link to={`/detail/${item.carId}`} key={item.id} className="recent_car_item">
                <img src={`/images/cars/${item.car_img}`} alt={item.model}/>
              </Link>
            ))}
        </div>
        </div>}

        {/* 고객센터 */}
        <div className="H_customer">
            <h2>고객센터</h2>
        </div>
    </div>
    )
}