import { useEffect, useState, useRef } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home(){
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
    
    return(
    <div className="Home">
        {/* 예약 섹션 */}
        <div className="H_reservation">
            <div className="H_dateTable">
                  <p>언제?</p>
                  <h2>날짜선택</h2>
            </div>
    
            <div className="H_spotTable">
                <div className="spot_choice">
                    <p>어디?</p>
                    <h2>지점선택</h2>
                </div>
                <div className="searchButton">
                    <button type="submit">
                        예약할 차량 찾기
                        <i className="bi bi-arrow-right"></i>
                    </button>
                 </div>
            </div>
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
