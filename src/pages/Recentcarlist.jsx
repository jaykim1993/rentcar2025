import { useContext } from "react";
import { AuthContext } from "../contexts/Authcontext";
import { Link } from "react-router-dom";
import { BookingContext } from "../contexts/Bookingcontext";

import './Recentcarlist.css';

export default function Recentcarlist() {
  const { userid, username } = useContext(AuthContext);
  const { myRecentlist, calculatePrice, setClickCar, clickCar} = useContext(BookingContext);


  const recentViews = myRecentlist(userid);

  if (!userid) return <p>로그인 후 이용해주세요.</p>;
  if (!recentViews.length) return <p>최근 본 차량이 없습니다.</p>;

  return (
    <div className="Recent_car_list">
      {/* 홈 > 예약 */}
      <div className="Recent_Head">
          <Link to={'/home'}><span>홈</span></Link>
          <i className="bi bi-caret-right-fill"></i>
          {/* 〉 */}
          <span>최근 본 차량</span>
      </div>
      {/* <h3><strong>{username}</strong>님의 최근 본 차량</h3> */}
      <p>총&nbsp;<strong>{recentViews.length}</strong>&nbsp;대</p>
      {/* <br /> */}
      <ul className="Recent_ByDate">
        {recentViews.map(item => (
           <Link to={`/searchcarlist`} key={item.id} className="recent_car_item">
            <li className="Recent_ByDate" onClick={()=>setClickCar(`${item.model}`)}>
              {/* 최근 본 날짜 */}
              {/* <h1>{item.viewDate}</h1> */}
              {/* <Link to={`/detail/${item.carId}`} key={item.id}> */}
              <div className="Recent_car_item" >
                <img
                  src={`/images/cars/${item.car_img}`}
                  alt={item.model}
                  className="Recent_car_item" />
                  {/* <hr className="Re_hr"/> */}
                <p>{item.brand} {item.model} {item.fuel_type}</p>
                {/* <p>{calculatePrice}</p> */}
              {/* </Link> */}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
