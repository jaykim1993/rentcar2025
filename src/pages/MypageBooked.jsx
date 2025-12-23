import { useContext } from "react";
import { BookingContext } from "../contexts/Bookingcontext";
import { AuthContext } from "../contexts/Authcontext";
import { DataContext } from "../contexts/Datacontext";
import { Link, useParams } from "react-router-dom";
import "./MypageBooked.css";

export default function MypageBooked() {
  const { myBookings, bookedlistAll } = useContext(BookingContext); // 예약내역 보기 함수 호출
  const { userid, username } = useContext(AuthContext); // 유저 정보 호출
  
    console.log(myBookings)
    console.log(bookedlistAll)

  return (
    <> 
    <h1 className="guideMainText">마이페이지</h1>
    <h2 className="guideMainText">예약내역</h2>
   <div className="myPageBookWarp">
    {myBookings.length === 0?
    <div>
      <div className="mypageBookCard">
        <i class="bi bi-exclamation-lg warningIcon"></i>
        <p className="noBookedP">아직 예약 내역이 없습니다.</p>
      </div>
      <Link to={'/searchcarlist'} className="noBookedGoToBook">예약하러가기</Link>
    </div>
      :
    <div>
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
            <div>
              <div className="mypageBookinfo">
                <img
                src={`/images/cars/${book.car?.car_img}`}
                alt={book.car?.model}/>
                <div className="tomargin">
                  <h3 className="mapCarname">{book.car?.brand} {book.car?.model}</h3>
                  <h3 className="mapCarDays">{dText}</h3>
                  <p className="mapCarBooknum">예약번호 {book.id}</p>
                  <p className="mapCarBooknum" >{book.car?.location}점</p>
                  <p className="mapCarDate">
                    {book.startDate} {book.startTime}
                    {" ~ "}
                    {book.endDate} {book.endTime}
                  </p>
                </div>
              </div>
            </div>
            <div className="GoToDetailBoxmap">
                <Link to={`/mypage/detail/${book.id}`} className="mapGoToDetail">예약 상세보기</Link>
            </div>
          </div>
        );
      })}
      </div>   
      }
    </div>
    </>
  );
}


