import './MypageMyinfo.css'
import { useContext } from "react"
import { AuthContext } from '../contexts/Authcontext';

export default function MypageMyinfo(){
    const {userid, username, user_email, user_resistnum, user_phonenum, address, address_detail, user_iskorean, user_license}=useContext(AuthContext);
    return(
        
            <div className="myinfo-Wrap">
                <div className="myinfo-header">
                    <h1 className="guideMainText">마이페이지</h1>
                    <h2 className="guideMainText">내 정보</h2>
                </div>

                <div className="myinfo-context">
                    <ul className="myinfo-list">
                        <li>
                            <span className="myinfo-label">아이디</span>
                            <span className="myinfo-value">{userid}</span>
                        </li>
                        <li>
                            <span className="myinfo-label">이름</span>
                            <span className="myinfo-value">{username}</span>
                        </li>
                        <li>
                            <span className="myinfo-label">이메일</span>
                            <span className="myinfo-value">{user_email}</span>
                        </li>
                        <li>
                            <span className="myinfo-label">주민번호</span>
                            <span className="myinfo-value">{user_resistnum}</span>
                        </li>
                        <li>
                            <span className="myinfo-label">전화번호</span>
                            <span className="myinfo-value">{user_phonenum}</span>
                        </li>
                        <li>
                            <span className="myinfo-label">주소</span>
                            <span className="myinfo-value">{address} {address_detail}</span>
                        </li>
                        <li>
                            <span className="myinfo-label">국적</span>
                            <span className="myinfo-value">
                            {user_iskorean ? "한국 국적자" : "해외 국적자"}
                            </span>
                        </li>
                        <li>
                            <span className="myinfo-label">면허</span>
                            <span className="myinfo-value">{user_license}</span>
                        </li>
                    </ul>
                    <button className='myinfo-btn' type='button'>정보 수정</button>
                </div>
            </div>
    )
}