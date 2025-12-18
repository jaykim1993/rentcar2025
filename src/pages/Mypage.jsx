import { useContext } from "react"
import { AuthContext } from "../contexts/Authcontext"

export default function Mypage(){
    //로그인한 userid불러오기
    const {userid}=useContext(AuthContext)
        //로컬스토리지 문의내역 받아오기
        const allInquiries = JSON.parse(localStorage.getItem("inquiries")) || [];
        console.log(allInquiries)
        // 변수에 필터한 배열 담기
        const myInquiries = allInquiries.filter(item => item.userid === userid);
        console.log(myInquiries)
//그리고 그거 맵 
    return(
        <div>
            <h2>내 문의 내역</h2>
            {myInquiries.length === 0 && <p>문의 내역이 없습니다.</p>}
            {myInquiries.map((data) => (
                <div key={data.id}>
                    <h4>{data.title}</h4>
                    <p>{data.content}</p>
                </div>
            ))}
        </div>
  );
}