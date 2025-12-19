import { useContext } from "react";
import { AuthContext } from "../contexts/Authcontext";
import { Link } from "react-router-dom";
import { BookingContext } from "../contexts/Bookingcontext";

export default function Recentcarlist() {
  const { userid, username } = useContext(AuthContext);
  const { myRecentlist } = useContext(BookingContext);


  const recentViews = myRecentlist(userid);

  if (!userid) return <p>로그인 후 이용해주세요.</p>;
  if (!recentViews.length) return <p>최근 본 차량이 없습니다.</p>;

  return (
    <div className="recent_car_list">
        <h3>{username}님의 최근 본 차량</h3>
      {recentViews.map(item => (
        <Link
          to={`/detail/${item.carId}`}
          key={item.id}
          className="recent_car_item"
        >
          <img
            style={{ width: "300px" }}
            src={`/images/cars/${item.car_img}`}
            alt={item.model}
          />
          <div>
            <p>{item.brand} {item.model}</p>
            <span>{item.fuel_type}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
