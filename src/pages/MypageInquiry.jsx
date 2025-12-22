import './MypageInquiry.css'
import { useContext } from "react"
import { AuthContext } from '../contexts/Authcontext';

export default function MypageInquiry(){

        const {userid}=useContext(AuthContext);
        // 1:1 문의내역
        //로컬스토리지 문의내역 받아오기
        const allInquiries = JSON.parse(localStorage.getItem("inquiries")) || [];
        console.log(allInquiries)
        // 변수에 필터한 배열 담기
        const myInquiries = allInquiries.filter(item => item.userid === userid);
        console.log(myInquiries)

    return(
        <>
        {/* 밑에는 1:1문의 div */}
     <div className="mypage-inquries">
            <h1 className="guideMainText">마이페이지</h1>
            <h2 className="guideMainText">1:1문의내역</h2>
            {myInquiries.length === 0 && <p>문의 내역이 없습니다.</p>}
            {myInquiries.map((data) => (
                <div key={data.id}>
                    <h4>{data.title}</h4>
                    <p>{data.content}</p>
                </div>
            ))}
        </div>
        </>
    )
}