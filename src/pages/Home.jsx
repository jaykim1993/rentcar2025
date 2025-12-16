import { useEffect, useState, useRef, useActionState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CalendarContext } from "../contexts/Calendarcontext";
import Calendar from './Calendar';

export default function Home(){

  const {setLocation, selectedDate, HandleSearchResult} = useContext(CalendarContext);

    const images = [
      "https://picsum.photos/1200/430?random=1",
      "https://picsum.photos/1200/430?random=2",
      "https://picsum.photos/1200/430?random=3",
      "https://picsum.photos/1200/430?random=4",
      "https://picsum.photos/1200/430?random=5",
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

    // 지점 모달 toggle
    const [isLocation, setIsLocation] = useState(false);
    // 달력 모달 toggle
    const [iscalendar, setIscalendar] = useState(false);

    // 지점 검색내역담는 변수
    // const locateSearch=setLocation(e.target.value);

    const calendarHandler=()=>{
      setIscalendar(!iscalendar);
      setIsLocation(false);
    };
    const locationHandler=()=>{
      setIscalendar(false);
      setIsLocation(!isLocation);
    };
    
    return(
    <div className="Home">
        {/* 예약 섹션 */}
        <div className="H_reservation">
            <div className="H_dateTable">
                  <p>언제?</p>
                  <h2 onClick={calendarHandler}>날짜선택</h2>
                 {selectedDate?.start && selectedDate?.end && (
            <p>
              {selectedDate.start.slice(5).replace('-', '.')} 부터 
              {selectedDate.end.slice(5).replace('-', '.')}
            </p>
          )}
            </div>
    

            <div className="H_spotTable">
                <div className="spot_choice">
                    <p>어디?</p>
                    <h2 onClick={locationHandler}>지점선택</h2>
                </div>
                <div className="searchButton">
                    <Link to={'/searchcarlist'}>
                      <button type="submit" onClick={HandleSearchResult}>
                          예약할 차량 찾기
                          <i className="bi bi-arrow-right"></i>
                      </button>
                    </Link>
                 </div>
            </div>
        </div>
        {isLocation && <div className="H_location">
          <h3>지점을 선택하세요</h3>
          <input type="text" defaultValue={location} name="location" placeholder="지역,지점을 검색해보세요. "></input>
          <button type="button">검색</button>
          <p onClick={()=>setLocation("서울북부")}>서울 북부</p>
          <p onClick={()=>setLocation("서울남부")}>서울 남부</p>
          <p onClick={()=>setLocation("서울동부")}>서울 동부</p>
          <p onClick={()=>setLocation("김포공항")}>김포공항</p>
          <p onClick={()=>setLocation("인천공항")}>인천공항</p>
        </div>}
        <div className={`calendar-slide ${iscalendar ? "open" : ""}`}>
	              <Calendar />
	            </div>

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
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>

        {/* sec03 - 최근본차량 */}
        <div className="H_sec03">
            <h2>최근본차량</h2>
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>

        {/* 고객센터 */}
        <div className="H_customer">
            <h2>고객센터</h2>
        </div>
    </div>
    )
}
