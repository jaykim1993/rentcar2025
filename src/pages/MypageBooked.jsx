import { useContext } from "react";
import { BookingContext } from "../contexts/Bookingcontext";
import { AuthContext } from "../contexts/Authcontext";
import { DataContext } from "../contexts/Datacontext";
import { useParams } from "react-router-dom";
import "./MypageBooked.css";

export default function MypageBooked() {
  const { myBookings } = useContext(BookingContext); // 예약내역 보기 함수 호출
  const { userid, username } = useContext(AuthContext); // 유저 정보 호출

  // 예약차량 예외처리
  if (!userid) return <p>로그인 후 이용해주세요.</p>;
  if (!myBookings.length) return <p>최근 본 차량이 없습니다.</p>;


    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [y, m, d] = myBookings[0].startDate.split('-');
    const startDate = new Date(y, m - 1, d);
    const diffDays = Math.ceil(
      (startDate - today) / (1000 * 60 * 60 * 24)
    );
  
  return (
    <>
   <div className="myPageBookWarp">
      {myBookings.map(book => {
        // 오늘 (날짜 기준)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const [y, m, d] = book.startDate.split('-');
        const startDate = new Date(y, m - 1, d);
        const diffDays = Math.ceil(
          (startDate - today) / (1000 * 60 * 60 * 24)
        );
        let dText;
        if (diffDays > 0) dText = `D-${diffDays}`;
        else if (diffDays === 0) dText = 'D-Day';
        else dText = `D+${Math.abs(diffDays)}`;

        return (
          <div key={book.id} className="mypageBookCard">
            <img
              src={`/images/cars/${book.car?.car_img}`}
              alt={book.car?.model}
            />

            <div className="mypageBookinfo">
              <h3>{book.car?.brand} {book.car?.model}</h3>
              <h3 className="mapCarDays">{dText}</h3>
              <p>예약번호 {book.id}</p>
              <p>대여 지점: {book.car?.location}점</p>
              <p>
                {book.startDate} {book.startTime}
                {" ~ "}
                {book.endDate} {book.endTime}
              </p>

              <p className="price">
                결제금액 : {book.price.toLocaleString()}원
              </p>

              <p className="booked-date">
                예약일: {book.bookedDate}
              </p>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
}


