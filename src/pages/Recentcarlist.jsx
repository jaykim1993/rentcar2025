import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../contexts/Authcontext";
import { Link, useNavigate } from "react-router-dom"; // 차량 클릭시 serchcarlist ,12.23 성중
import { BookingContext } from "../contexts/Bookingcontext";
import { useEffect } from "react";

import './Recentcarlist.css';

export default function Recentcarlist() {
  const { userid } = useContext(AuthContext);
  const { myRecentlist } = useContext(BookingContext);
  const navigate = useNavigate(); // 차량 클릭시 serchcarlist 12.23 성중

  // 화면에 출력되는 차량의 수
  const [viewMore, setViewMore] = useState(8);
  // 더보기 toggle
  // const [isMore, setIsMore] = useState(true);
  // // 숨기기 toggle
  // const [isHidden, setIsHidden] = useState(false);
  
  // const moreHandler = () => {
  //   if(recentViews.length > viewMore){
  //     setViewMore(prev => prev+8);
  //     setIsHidden(true);
  //   }else if(viewMore > recentViews.length){
  //     setViewMore(false);
  //     setIsHidden(true);
  //   }else{
  //     setIsMore(true);
  //     setIsHidden(false);
  //   }
  // };

  const moreHandler = () => {
    setViewMore(prev => prev + 8);
  };

  const hiddenHandler = () => {
    setViewMore(8); // 기본 8개로 접기
  };
  
  const recentViews = myRecentlist(userid);

  // 해당 차량 브랜드 searchcarlist로 넘기기 12.23 성중
  const goToSearchcarlist = (model) => {
    navigate("/searchcarlist", {
      state: { model }
    });
  };
  if (!userid) return <p>로그인 후 이용해주세요.</p>;
  if (!recentViews.length) return <p>최근 본 차량이 없습니다.</p>;

  useEffect(() => {
  window.scrollTo(0, 0);
  }, []);

  return (
    <div className="Recent_car_list">

      <div className="Recent_Head">
          <Link to={'/'}><span>홈</span></Link>
          <i class="bi bi-caret-right-fill"></i>
          <span>최근 본 차량</span>
      </div>

      <p>총&nbsp;<strong>{recentViews.length}</strong>&nbsp;대</p>

      <ul className="Recent_ByDate">

        {recentViews.slice(0,viewMore).map(item => (
          // 해당 차량 브랜드 searchcarlist로 넘기기 12.23 성중
          <li className="Recent_ByDate" key={item.id} onClick={()=>goToSearchcarlist(item.model)}>

            <div className="Recent_car_item">
              <img className="Recent_logo" src={`/images/brands/${item.brand}.png`}/>
              <img
                src={`/images/cars/${item.car_img}`}
                alt={item.model}
                className="Recent_car_img" />
              <p className="Recent_car_p"> {item.model} <span className="Recent_car_span">{item.fuel_type}</span></p>
              <p className="RecentCar_viewDate">최근 본 날짜 : {item.viewDate.replaceAll('-','.')}</p>
            </div>
          </li>
        ))}
      </ul>
      {/* 버튼 영역 */}
      <div className="Recent_buttons">
        {viewMore < recentViews.length && (
          <button onClick={moreHandler} ><i class="bi bi-caret-down-fill"></i></button>
        )}
        {viewMore > 8 && (
          <button onClick={hiddenHandler}><i class="bi bi-caret-up-fill"></i></button>
        )}
      </div>

    </div>
  );
}
