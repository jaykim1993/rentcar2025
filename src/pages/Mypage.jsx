import { useContext } from "react";
import { BookingContext } from "../contexts/Bookingcontext";
import { AuthContext } from "../contexts/Authcontext";
import { DataContext } from "../contexts/Datacontext";
import "./Mypage.css";

export default function Mypage() {
  const { myBookings } = useContext(BookingContext); // 예약내역 보기 함수 호출
  const { userid, username } = useContext(AuthContext); // 유저 정보 호출

  if (!userid) return <p>로그인 후 이용해주세요.</p>;
  if (!myBookings.length) return <p>최근 본 차량이 없습니다.</p>;

  return (
    <div className="mypage-wrap">
      <h2>{username}님의 예약 내역</h2>

      {myBookings.map(book => (
        <div key={book.id} className="mypage-card">
          <img
            src={`/images/cars/${book.car?.car_img}`}
            alt={book.car?.model}
          />

          <div className="mypage-info">
            <h3>
              {book.car?.brand} {book.car?.model}
            </h3>

            <p>연료: {book.car?.fuel_type}</p>
            <p>대여 지점: {book.car?.location}</p>

            <p>
              대여 기간<br />
              {book.startDate} {book.startTime}
              {" ~ "}
              {book.endDate} {book.endTime}
            </p>

            <p className="price">
              {book.price.toLocaleString()}원
            </p>

            <p className="booked-date">
              예약일: {book.bookedDate}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
