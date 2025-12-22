import './MypageMyinfo.css'
import { useEffect, useState } from "react";
import { useContext } from "react"
import { AuthContext } from '../contexts/Authcontext';

export default function MypageMyinfo(){
    const {userid, username, user_email, user_resistnum, user_phonenum, address, address_detail, user_iskorean, user_license}=useContext(AuthContext);
    return(
        
        <>
            <div>
                <div className="mypage-book">
                    <h1 className="guideMainText">마이페이지</h1>
                    <h2 className="guideMainText">내 정보</h2>
                 </div>
                <p>아이디{userid}</p>
                <p>이름{username}</p>
                <p>이메일{user_email}</p>
                <p>주민번호{user_resistnum}</p>
                <p>전화번호{user_phonenum}</p>
                <p>주소{address}</p>
                <p>상세주소{address_detail}</p>
               <p>내외국인{user_iskorean}</p> 
               <p>면허{user_license}</p> 
            </div>
        </>
    )
}