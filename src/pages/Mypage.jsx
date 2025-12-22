import { useContext } from "react";
import { BookingContext } from "../contexts/Bookingcontext";
import { AuthContext } from "../contexts/Authcontext";
import { DataContext } from "../contexts/Datacontext";
import "./Mypage.css";

export default function Mypage() {
  const { myBookings } = useContext(BookingContext); // 예약내역 보기 함수 호출
  const { userid, username } = useContext(AuthContext); // 유저 정보 호출

  // 예약차량 예외처리
  if (!userid) return <p>로그인 후 이용해주세요.</p>;
  if (!myBookings.length) return <p>예약내역이 없습니다.</p>;



  // 1:1 문의내역
        //로컬스토리지 문의내역 받아오기
        const allInquiries = JSON.parse(localStorage.getItem("inquiries")) || [];
        console.log(allInquiries)
        // 변수에 필터한 배열 담기
        const myInquiries = allInquiries.filter(item => item.userid === userid);
        console.log(myInquiries)
        
  return (
    <>
    {/* 예약문의 div */}
    <div className="mypage-book">
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

    {/* 밑에는 1:1문의 div */}
     <div className="mypage-inquries">
            <h2>내 문의 내역</h2>
            {myInquiries.length === 0 && <p>문의 내역이 없습니다.</p>}
            {myInquiries.map((data) => (
                <div key={data.id}>
                    <h4>{data.title}</h4>
                    <p>{data.content}</p>
                </div>
            ))}
        </div>
    </>
    
  );
}

